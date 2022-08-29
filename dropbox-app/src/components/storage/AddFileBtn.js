import React, { useEffect, useState } from 'react';
import ReactDOM  from "react-dom";
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import { storage } from '../../firebase';
import { useAuth } from './../store/AuthStore';
import { ROOT_FOLDER } from './../hooks/useFolder';
import { database } from './../../firebase';
import { v4 as uuidV4 } from "uuid";

const AddFileBtn = ({ currentFolder }) => {
    const [uplaodingFiles, setUploadingFiles] = useState([]);
    const { currentUser } = useAuth();

    const handleUpload = (e) => {
        const file = e.target.files[0];

        if(currentFolder === null || !file) return;

        const id = uuidV4();
        setUploadingFiles(prev => [
            ...prev,
            { id: id, name: file.name, progress: 0, error: false }
        ])

        const currentPath = currentFolder.path.map(u => u.name).join('/');

        const filePath =
            currentFolder === ROOT_FOLDER
                ?
                    `${currentPath}/${file.name}`
                :
                    `${currentPath}/${currentFolder.name}/${file.name}`


        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file);


        uploadTask.on("state-changed", snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            setUploadingFiles(prev => {
                return prev.map(uploadFile => {
                    if(uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }

                    return uploadFile;
                })
            });
        },
        () => {
            setUploadingFiles(prev => {
                return prev.map(uploadFile => {
                    if(uploadFile.id === id) {
                        return { ...uploadFile, error: true }
                    }

                    return uploadFile;
                })
            })
        },
        () => {
            setUploadingFiles(prev => {
                return prev.filter(uploadFile => uploadFile.id !== id)
            });

            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files
                    .where("name", "==", file.name)
                    .where("userId", "==", currentUser.uid)
                    .where("folderId", "==", currentFolder.id)
                    .get()
                    .then(existingFiles => {
                        const existingFile = existingFiles.docs[0];
                        if(existingFile) {
                            existingFile.ref.update({ url: url  });
                        } else {
                            database.files.add({
                                url: url,
                                name: file.name,
                                createdAt: database.getCurrentTimestamp(),
                                folderId: currentFolder.id,
                                userId: currentUser.uid
                            })
                        }
                    })
            })
        })
    }

    return (
        <>
            <label className="ml-4">
                <div className="text-dark flex items-center px-4 py-1 w-full font-base bg-slate-200 hover:bg-slate-300 cursor-pointer">
                    <ArrowUpTrayIcon
                        className="h-5 w-5 mr-1"
                        aria-hidden="true"
                    />
                    Upload
                </div>
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{display: "none"}}
                />
            </label>
            {   uplaodingFiles.length > 0 &&
                ReactDOM.createPortal((
                    <div className="bg-black border rounded-lg p-2 text-white" style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "calc(50% - 350px / 2)",
                        width: "350px"
                    }}>
                        { uplaodingFiles.length > 0 && uplaodingFiles.map(file => (
                            <div className="" key={file.id}>
                                <div className="text-center mb-4">
                                    <h4 className={ file.error ? "text-red-800 font-medium text-lg" :  "font-medium text-lg"}>
                                        { file.error ?  `Error uploading file ${file.name}` : file.name }
                                    </h4>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className={`${file.error ? "bg-red-800" : "bg-blue-600"} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full` }
                                    style={{
                                        width: `${Math.round( file.progress * 100)}%`
                                    }}>
                                        { `${Math.round( file.progress * 100)}%` }
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                    ),
                    document.body
                )
            }
        </>
    );
};

export default AddFileBtn;
