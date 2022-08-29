import React from 'react';
import AddFileBtn from './AddFileBtn';
import AddFolderBtn from './AddFolderBtn';

const StorageNavBar = ({ currentFolder }) => {
    return (
        <div className="flex">
            <AddFolderBtn currentFolder={currentFolder}/>
            <AddFileBtn currentFolder={currentFolder}/>
        </div>
    );
};

export default StorageNavBar;