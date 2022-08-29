import React from 'react';
import StorageNavBar from '../components/storage/StorageNavBar';
import { useFolder } from './../components/hooks/useFolder';
import Folder from './../components/storage/Folder';
import File from './../components/storage/File';
import { useParams } from "react-router-dom";
import FolderBreadcumps from './../components/storage/FolderBreadcumps';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useAuth } from '../components/store/AuthStore';
import { doc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
    const { id } = useParams();
    const { folder, childFolders, childFiles } = useFolder(id);
    const { currentUser } = useAuth();

    const deleteFolder = async (name) => {
        const storage = getStorage();
        const currentPath = folder.path.map(u => u.name).join('/');
        const desertRef = ref(storage, currentPath ?
                            `files/${currentUser.uid}/${currentPath}/${name}` :
                            `files/${currentUser.uid}/${name}`);



        deleteObject(desertRef).then(() => {
            alert("Delete");
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <div className="container mx-auto">
            <div className="">
                <FolderBreadcumps currentFolder={folder}/>
            </div>
            <div className="">
                <StorageNavBar currentFolder={folder}/>
            </div>
            <div className="mt-6 border p-2"
                style={{ maxHeight: window.innerHeight - 300, height: window.innerHeight - 300 }}
            >
                { childFolders.length > 0 && (
                    <div className="b">
                        {
                            childFolders.map(childFolder => (
                                <div
                                    className="border-b p-1 hover:bg-slate-100 flex justify-between"
                                    key={childFolder.id}>
                                    <Folder folder={childFolder}/>
                                    {/* <div onClick={() => deleteFolder(childFolder.name)}>
                                        Delete
                                    </div> */}
                                </div>
                            ))
                        }
                    </div>
                ) }

                {/*{ childFolders.length > 0 && childFiles.length > 0 && <hr/> }*/}
                { childFiles.length > 0 && (
                    <div>
                        {
                            childFiles.map(file => (
                                <div className="border-b p-1 hover:bg-slate-100 flex justify-between" key={file.id}>
                                    <File file={file}/>
                                    {/* <div onClick={() => deleteFolder(file.name)}>
                                        Delete
                                    </div> */}
                                </div>
                            ))
                        }
                    </div>
                ) }
            </div>
        </div>
    );
};

export default Dashboard;
