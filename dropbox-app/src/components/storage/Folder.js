import React from 'react';
import { FolderIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const Folder = ({ folder }) => {
    return (
        <Link className="flex items-center" to={{
            pathname: `/folders/${folder.id}`,
            state: { folder: folder }
            }}>
            <FolderIcon
                className="h-7 w-7 mr-1" 
                aria-hidden="true"
            />
            <span className="ml-1 text-lg font-base">{ folder.name }</span>
        </Link>
    );
};

export default Folder;