

import React, { useState, useMemo } from 'react';
import type { User } from '../types';
import UserCard from './UserCard';

interface DirectorySectionProps {
    allUsers: User[];
}

const DirectorySection: React.FC<DirectorySectionProps> = ({ allUsers }) => {
    const [countryFilter, setCountryFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [interestFilter, setInterestFilter] = useState('');


    const countries = useMemo(() => [...new Set(allUsers.map(u => u.location.country))], [allUsers]);
    const states = useMemo(() => {
        if (!countryFilter) return [];
        return [...new Set(allUsers.filter(u => u.location.country === countryFilter).map(u => u.location.state))];
    }, [allUsers, countryFilter]);

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const countryMatch = !countryFilter || user.location.country === countryFilter;
            const stateMatch = !stateFilter || user.location.state === stateFilter;
            const interestMatch = !interestFilter || user.researchInterests?.some(interest => interest.toLowerCase().includes(interestFilter.toLowerCase()));
            return countryMatch && stateMatch && interestMatch;
        });
    }, [allUsers, countryFilter, stateFilter, interestFilter]);
    
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryFilter(e.target.value);
        setStateFilter(''); // Reset state filter when country changes
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Directory</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Find researchers by location and research interest.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Country</label>
                    <select id="country" value={countryFilter} onChange={handleCountryChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="">All Countries</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                     <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by State/Province</label>
                    <select id="state" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} disabled={!countryFilter} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:opacity-50">
                        <option value="">All States</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                     <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Research Interest</label>
                    <input
                        type="text"
                        id="interest"
                        value={interestFilter}
                        onChange={(e) => setInterestFilter(e.target.value)}
                        placeholder="e.g., Artificial Intelligence"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No researchers found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectorySection;