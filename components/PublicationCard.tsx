import React, { useState } from 'react';
import type { Publication } from '../types';
import { ArticleIcon, BookOpenIcon, ConferenceIcon, LinkIcon, PaperClipIcon, GlobeEuropeAfricaIcon, LockClosedIcon, UserGroupIcon, ShareIcon, ClipboardIcon, TwitterIcon, LinkedInIcon, FacebookIcon } from './icons';
import Modal from './Modal';

interface PublicationCardProps {
  publication: Publication;
  onUpdate: (pub: Publication) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onUpdate }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const publicationUrl = `${window.location.origin}/publication/${publication.id}`;

  const getIcon = () => {
    switch (publication.pub_type) {
      case 'article':
        return <ArticleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
      case 'book':
      case 'chapter':
        return <BookOpenIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
      case 'conference':
        return <ConferenceIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <ArticleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVisibility = e.target.value as Publication['visibility'];
    onUpdate({ ...publication, visibility: newVisibility });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicationUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const visibilityOptions: { [key in Publication['visibility']]: { label: string; icon: React.ReactElement } } = {
    public: { label: 'Public', icon: <GlobeEuropeAfricaIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" /> },
    private: { label: 'Private', icon: <LockClosedIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" /> },
    collaborators: { label: 'Collaborators', icon: <UserGroupIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" /> },
  };


  const pubTypeMap = {
      article: 'Journal Article',
      book: 'Book',
      chapter: 'Book Chapter',
      conference: 'Conference Paper'
  }

  return (
    <>
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 dark:bg-gray-700 rounded-lg">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-indigo-500 dark:text-indigo-400 tracking-wider">
            {pubTypeMap[publication.pub_type]} &bull; {publication.year}
          </p>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1">{publication.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{publication.authors.join(', ')}</p>
          {publication.venue && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2"><em>Published in:</em> {publication.venue}</p>}
          {publication.publisher && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2"><em>Publisher:</em> {publication.publisher}</p>}
        </div>
      </div>

       <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
              {publication.doi && (
                  <a 
                      href={`https://doi.org/${publication.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                      <LinkIcon className="h-4 w-4 mr-1.5" />
                      DOI: {publication.doi}
                  </a>
              )}
               {publication.isbn && (
                  <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                      ISBN: {publication.isbn}
                  </span>
              )}
          </div>
           <div className="flex items-center space-x-4">
            {publication.files && publication.files.length > 0 && (
              <a href={URL.createObjectURL(publication.files[0])} download={publication.files[0].name} className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <PaperClipIcon className="h-4 w-4 mr-1.5" />
                Download
              </a>
            )}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ShareIcon className="h-4 w-4 mr-1.5" />
              Share
            </button>
            <div className="flex items-center">
                {visibilityOptions[publication.visibility].icon}
                <select 
                    id={`visibility-${publication.id}`} 
                    value={publication.visibility} 
                    onChange={handleVisibilityChange} 
                    className="text-sm bg-transparent font-medium text-gray-700 dark:text-gray-300 border-none focus:ring-0 appearance-none"
                    style={{ paddingRight: '1.5rem', backgroundPosition: 'right 0.2rem center' }}
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="collaborators">Collaborators</option>
                </select>
            </div>
        </div>
       </div>
    </div>
    <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Share Publication">
        <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Share this publication using the link below or on social media.</p>
            <div className="flex space-x-2">
                <input
                    type="text"
                    readOnly
                    value={publicationUrl}
                    className="flex-grow border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 w-28 justify-center"
                >
                    <ClipboardIcon className="h-5 w-5 mr-2" />
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="flex items-center space-x-4 justify-center pt-2">
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(publicationUrl)}&text=${encodeURIComponent(publication.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <TwitterIcon className="h-8 w-8" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicationUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500">
                    <LinkedInIcon className="h-8 w-8" />
                </a>
                 <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicationUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-600">
                    <FacebookIcon className="h-8 w-8" />
                </a>
            </div>
        </div>
    </Modal>
    </>
  );
};

export default PublicationCard;