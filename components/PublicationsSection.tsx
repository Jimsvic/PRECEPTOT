import React, { useState } from 'react';
import type { Publication, PublicationType } from '../types';
import { PlusIcon, UploadIcon } from './icons';
import Modal from './Modal';
import PublicationCard from './PublicationCard';

interface PublicationsSectionProps {
  publications: Publication[];
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (pub: Publication) => void;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications, addPublication, updatePublication }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPub, setNewPub] = useState<Omit<Publication, 'id'>>({
    title: '', authors: [], year: new Date().getFullYear(), pub_type: 'article', visibility: 'public', files: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'authors') {
      setNewPub({ ...newPub, authors: value.split(',').map(a => a.trim()) });
    } else if (name === 'year') {
        setNewPub({ ...newPub, year: parseInt(value) });
    }
    else {
      setNewPub({ ...newPub, [name]: value });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPub({ ...newPub, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPub.title && newPub.authors.length > 0) {
      addPublication(newPub);
      setIsModalOpen(false);
      setNewPub({ title: '', authors: [], year: new Date().getFullYear(), pub_type: 'article', visibility: 'public', files: [] });
    }
  };
  
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would parse the BibTeX/RIS file here.
      // For this demo, we'll simulate it with a mock publication.
      alert(`Simulating import of "${file.name}"...`);
      const mockImportedPub: Omit<Publication, 'id'> = {
        title: "From BibTeX: The Art of Citation",
        authors: ["D. Knuth"],
        year: 1984,
        pub_type: "article",
        venue: "A Fictional Journal",
        doi: "10.mock/bibtex",
        visibility: 'public'
      };
      addPublication(mockImportedPub);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Publications</h2>
        <div className="flex gap-2">
          <label htmlFor="import-file" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <UploadIcon className="h-5 w-5" />
            <span>Import BibTeX/RIS</span>
            <input type="file" id="import-file" className="hidden" accept=".bib,.ris" onChange={handleFileImport} />
          </label>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <PlusIcon className="h-5 w-5" />
            Add Manually
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {publications.map(pub => (
          <PublicationCard key={pub.id} publication={pub} onUpdate={updatePublication} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Publication">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" name="title" value={newPub.title} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Authors (comma-separated)</label>
            <input type="text" name="authors" value={newPub.authors.join(', ')} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
              <input type="number" name="year" value={newPub.year} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select name="pub_type" value={newPub.pub_type} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="chapter">Book Chapter</option>
                <option value="conference">Conference Paper</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Venue / Journal / Publisher</label>
            <input type="text" name="venue" value={newPub.venue || ''} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">DOI</label>
            <input type="text" name="doi" value={newPub.doi || ''} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
            <select name="visibility" value={newPub.visibility} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="collaborators">Collaborators</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Document (PDF/DOC)</label>
            <input 
              type="file" 
              name="file" 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx" 
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-200 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
            />
             {newPub.files && newPub.files.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected file: {newPub.files[0].name}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Publication</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PublicationsSection;