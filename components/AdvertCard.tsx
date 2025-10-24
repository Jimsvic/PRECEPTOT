import React from 'react';
import type { Advert } from '../types';
import { CalendarIcon, TagIcon } from './icons';

interface AdvertCardProps {
  advert: Advert;
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert }) => {
    
    const typeStyles = {
        CFP: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        book: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        journal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        conference: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };

    const typeLabels = {
        CFP: 'Call for Papers',
        book: 'Book Launch',
        journal: 'Journal Issue',
        conference: 'Conference'
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeStyles[advert.advert_type]}`}>
                        {typeLabels[advert.advert_type]}
                    </span>
                    {advert.promo_level === 'featured' && (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            Featured
                        </span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-3">{advert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex-grow">{advert.content}</p>
            </div>
            <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <TagIcon className="h-4 w-4 mr-2" />
                    <span>Posted by: <strong className="font-semibold text-gray-700 dark:text-gray-200">{advert.creator}</strong></span>
                </div>
            </div>
        </div>
    );
};

export default AdvertCard;