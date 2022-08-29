import React from 'react';
import { DocumentIcon } from '@heroicons/react/20/solid';

const File = ({ file }) => {
    return (
        <a href={file.url}  className="flex items-center">
            <DocumentIcon
                className="h-7 w-7 mr-1 text-blue-500" 
                aria-hidden="true"
            />
            <span className="ml-1 text-lg font-base">{ file.name }</span>
        </a>
    );
};

export default File;