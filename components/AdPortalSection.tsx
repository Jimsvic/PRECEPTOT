

import React, { useState } from 'react';
import type { Advert, AdvertType } from '../types';
import { PlusIcon } from './icons';
import Modal from './Modal';
import AdvertCard from './AdvertCard';

interface AdPortalSectionProps {
  adverts: Advert[];
  addAdvert: (ad: Omit<Advert, 'id'>) => void;
}

const AdPortalSection: React.FC<AdPortalSectionProps> = ({ adverts, addAdvert }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAd, setNewAd] = useState<Omit<Advert, 'id'>>({
    title: '', creator: '', content: '', advert_type: 'CFP', promo_level: 'free'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(newAd.title && newAd.creator && newAd.content) {
      addAdvert(newAd);
      setIsModalOpen(false);
      setNewAd({ title: '', creator: '', content: '', advert_type: 'CFP', promo_level: 'free' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Advertisement Portal</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Promote calls for papers, new issues, and textbooks.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <PlusIcon className="h-5 w-5" />
          Create Advert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adverts.map(ad => (
          <AdvertCard key={ad.id} advert={ad} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Advertisement">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" name="title" value={newAd.title} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organizer / Creator</label>
            <input type="text" name="creator" value={newAd.creator} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Advert Type</label>
              <select name="advert_type" value={newAd.advert_type} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option value="CFP">Call for Papers (CFP)</option>
                <option value="book">Book Launch</option>
                <option value="journal">Journal Issue</option>
                <option value="conference">Conference Promotion</option>
              </select>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content / Description</label>
            <textarea name="content" value={newAd.content} onChange={handleInputChange} rows={4} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Post Advert</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdPortalSection;