import React from 'react';
import { ROOT_FOLDER } from './../hooks/useFolder';
import { Link } from 'react-router-dom';

const FolderBreadcumps = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if(currentFolder) path = [...path, ...currentFolder.path];

    return (
        <nav className="flex py-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {
                    path.map((folder, index) => (
                        <Link key={folder.id} to={ {
                                pathname: folder.id ? `/folders/${folder.id}` : "/",
                                state: { folder: { ...folder, path: path.slice(1, index) } }
                            }} >
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20" 
                                        xmlns="http://www.w3.org/2000/svg">
                                            <path 
                                            fillRule="evenodd" 
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                                            clipRule="evenodd">
                                                </path>
                                    </svg>
                                    <span path="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                        { folder.name }
                                    </span>
                                </div>
                            </li>
                        </Link>
                    ))
                }
                {
                    currentFolder && (
                    <Link to={currentFolder.id ? `/folders/${currentFolder.id}` : "/"} >
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path 
                                        fillRule="evenodd" 
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                                        clipRule="evenodd">
                                            </path>
                                </svg>
                                <span path="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    { currentFolder.name }
                                </span>
                            </div>
                        </li>
                    </Link>
                    )
                }
            </ol>
        </nav>
    );
};

export default FolderBreadcumps;