

import React, { useState } from 'react';
import type { User, Publication } from '../types';
import { DocumentArrowDownIcon } from './icons';
import Modal from './Modal';

interface CVGeneratorSectionProps {
  user: User;
  publications: Publication[];
}

const CVGeneratorSection: React.FC<CVGeneratorSectionProps> = ({ user, publications }) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('apa');

    const generateCVContent = () => {
        const sortedPublications = [...publications].sort((a, b) => b.year - a.year);
        const articles = sortedPublications.filter(p => p.pub_type === 'article');
        const books = sortedPublications.filter(p => p.pub_type === 'book' || p.pub_type === 'chapter');
        const conferences = sortedPublications.filter(p => p.pub_type === 'conference');

        return (
            <div className="prose dark:prose-invert max-w-none p-4 font-serif text-sm">
                <h1 className="text-center text-3xl mb-0">{user.name}</h1>
                <p className="text-center text-sm">{user.email} | {user.affiliations[0]}</p>
                
                <h2 className="border-b pb-1 mt-6">Education & Affiliations</h2>
                <ul className="list-disc pl-5">
                    {user.affiliations.map((aff, i) => <li key={i}>{aff}</li>)}
                </ul>

                <h2 className="border-b pb-1 mt-6">Research Interests</h2>
                <p>{user.researchInterests?.join(', ')}</p>

                {articles.length > 0 && (
                    <>
                        <h2 className="border-b pb-1 mt-6">Peer-Reviewed Articles</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            {articles.map(p => <li key={p.id}><strong>{p.authors.join(', ')}</strong> ({p.year}). {p.title}. <em>{p.venue}</em>. {p.doi && `doi:${p.doi}`}</li>)}
                        </ol>
                    </>
                )}
                {books.length > 0 && (
                     <>
                        <h2 className="border-b pb-1 mt-6">Books and Chapters</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                             {books.map(p => <li key={p.id}><strong>{p.authors.join(', ')}</strong> ({p.year}). <em>{p.title}</em>. {p.publisher}.</li>)}
                        </ol>
                    </>
                )}
                {conferences.length > 0 && (
                     <>
                        <h2 className="border-b pb-1 mt-6">Conference Presentations</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                             {conferences.map(p => <li key={p.id}><strong>{p.authors.join(', ')}</strong> ({p.year}). {p.title}. Paper presented at <em>{p.venue}</em>.</li>)}
                        </ol>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">CV Generator</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Automatically generate a formatted academic CV from your profile data.</p>
            
            <div className="max-w-md space-y-4">
                <div>
                    <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Template</label>
                    <select 
                        id="template" 
                        name="template"
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="apa">Standard APA-like</option>
                        <option value="ieee">Modern IEEE-like</option>
                        <option value="compact">Compact List</option>
                    </select>
                </div>

                <div className="flex space-x-3">
                    <button 
                        onClick={() => setIsPreviewOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Preview CV
                    </button>
                    <button 
                        onClick={() => alert('Downloading PDF... (simulation)')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                        Download as PDF
                    </button>
                </div>
            </div>

            <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="CV Preview">
                <div className="bg-gray-100 dark:bg-gray-900 max-h-[70vh] overflow-y-auto">
                    {generateCVContent()}
                </div>
            </Modal>
        </div>
    );
};

export default CVGeneratorSection;