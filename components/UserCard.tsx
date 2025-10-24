import React from 'react';
import type { User } from '../types';
import { OrcidIcon, MailIcon, LocationMarkerIcon } from './icons';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{user.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.affiliations[0]}</p>
                
                {user.orcid && (
                    <a href={`https://orcid.org/${user.orcid}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors self-start">
                        <OrcidIcon className="h-4 w-4 mr-1.5" />
                        {user.orcid}
                    </a>
                )}
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed h-16 overflow-hidden">
                    {user.bio}
                </p>

                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
                     <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <LocationMarkerIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{`${user.location.lga}, ${user.location.state}, ${user.location.country}`}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MailIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a href={`mailto:${user.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{user.email}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;