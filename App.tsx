import React, { useState, useMemo, useEffect } from 'react';
import type { User, Publication, Advert, Location } from './types';
import { View } from './types';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import PublicationsSection from './components/PublicationsSection';
import CVGeneratorSection from './components/CVGeneratorSection';
import AdPortalSection from './components/AdPortalSection';
import DirectorySection from './components/DirectorySection';

// Mock Data
const initialUser: User = {
  id: 'user-1',
  name: 'Dr. Evelyn Reed',
  email: 'e.reed@university.edu',
  orcid: '0000-0002-1825-0097',
  affiliations: ['University of Fictional Science', 'Institute of Advanced Studies'],
  location: { country: 'United States', state: 'California', lga: 'Santa Clara County' },
  bio: 'AI researcher focusing on large language models and their applications in scientific discovery. Passionate about open-source and collaborative research.',
  researchInterests: ['Artificial Intelligence', 'Natural Language Processing', 'Computational Linguistics']
};

const initialPublications: Publication[] = [
  { id: 'pub-1', title: 'The Foundations of Modern AI', authors: ['E. Reed', 'J. Doe'], doi: '10.1000/xyz123', venue: 'Journal of Artificial Intelligence Research', year: 2023, pub_type: 'article', visibility: 'public' },
  { id: 'pub-2', title: 'A Novel Architecture for Neural Networks', authors: ['E. Reed', 'A. Smith'], doi: '10.1001/abc456', venue: 'Proceedings of the International Conference on Machine Learning', year: 2022, pub_type: 'conference', visibility: 'public' },
  { id: 'pub-3', title: 'Computational Thinking', authors: ['E. Reed'], isbn: '978-3-16-148410-0', publisher: 'Academic Press', year: 2021, pub_type: 'book', visibility: 'public' }
];

const initialAdverts: Advert[] = [
    { id: 'ad-1', creator: 'Journal of AI Ethics', advert_type: 'CFP', title: 'Call for Papers: Special Issue on AI in Society', content: 'Submit your latest research on the societal impact of AI. Deadline: Dec 31, 2024.', promo_level: 'featured' },
    { id: 'ad-2', creator: 'Tech Publishing House', advert_type: 'book', title: 'New Book: "Deep Learning in Practice"', content: 'A hands-on guide to building and deploying deep learning models. Available now!', promo_level: 'free' }
];

const allUsers: User[] = [
    initialUser,
    { id: 'user-2', name: 'Dr. Kenji Tanaka', email: 'k.tanaka@tokyo.ac.jp', orcid: '0000-0001-2345-6789', affiliations: ['University of Tokyo'], location: { country: 'Japan', state: 'Tokyo', lga: 'Bunkyo' }, bio: 'Specialist in quantum computing and theoretical physics.', researchInterests: ['Quantum Mechanics', 'Algorithms'] },
    { id: 'user-3', name: 'Dr. Maria Garcia', email: 'm.garcia@madrid.es', orcid: '0000-0003-9876-5432', affiliations: ['Complutense University of Madrid'], location: { country: 'Spain', state: 'Madrid', lga: 'Madrid' }, bio: 'Biomedical engineer developing new imaging techniques.', researchInterests: ['Biomedical Imaging', 'Medical Devices'] }
];


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Profile);
  const [user, setUser] = useState<User>(initialUser);
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [adverts, setAdverts] = useState<Advert[]>(initialAdverts);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const profileCompleteness = useMemo(() => {
    let score = 0;
    if (user.name) score += 20;
    if (user.affiliations.length > 0) score += 20;
    if (user.orcid) score += 20;
    if (publications.length > 0) score += 20;
    if (user.location.country) score += 20;
    return score;
  }, [user, publications]);

  const addPublication = (pub: Omit<Publication, 'id'>) => {
    const newPub: Publication = { ...pub, id: `pub-${Date.now()}` };
    setPublications(prev => [newPub, ...prev]);
  };

  const updatePublication = (updatedPub: Publication) => {
    setPublications(publications.map(p => p.id === updatedPub.id ? updatedPub : p));
  };
  
  const addAdvert = (advert: Omit<Advert, 'id'>) => {
    const newAd: Advert = { ...advert, id: `ad-${Date.now()}` };
    setAdverts(prev => [newAd, ...prev]);
  };

  const renderContent = () => {
    switch (activeView) {
      case View.Profile:
        return <ProfileSection user={user} setUser={setUser} completeness={profileCompleteness} />;
      case View.Publications:
        return <PublicationsSection publications={publications} addPublication={addPublication} updatePublication={updatePublication} />;
      case View.CV:
        return <CVGeneratorSection user={user} publications={publications} />;
      case View.AdPortal:
        return <AdPortalSection adverts={adverts} addAdvert={addAdvert} />;
      case View.Directory:
        return <DirectorySection allUsers={allUsers} />;
      default:
        return <ProfileSection user={user} setUser={setUser} completeness={profileCompleteness} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <Header activeView={activeView} setActiveView={setActiveView} theme={theme} toggleTheme={toggleTheme} />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;