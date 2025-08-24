import React, { useState, useEffect } from 'react';
import RegistrationStatus from "../components/registration-status.js";

// Mock data to simulate data from the backend
const mockRegistrationData = [
    { id: 1, status: '검토중', name: 'Item A' },
    { id: 2, status: '승인완료', name: 'Item B' },
    { id: 3, status: '검토중', name: 'Item C' },
    { id: 4, status: '승인거부', name: 'Item D' },
    { id: 5, status: '승인완료', name: 'Item E' },
];

export default function Producermain() { // Renamed from Home to Producermain for clarity
    const [allRegistrations, setAllRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        // Simulate fetching data from backend
        // In a real application, you would make an API call here
        setAllRegistrations(mockRegistrationData);
        setFilteredRegistrations(mockRegistrationData); // Initially show all
    }, []);

    useEffect(() => {
        // Filter data whenever allRegistrations or currentFilter changes
        if (currentFilter === 'all') {
            setFilteredRegistrations(allRegistrations);
        } else {
            const filtered = allRegistrations.filter(item => item.status === currentFilter);
            setFilteredRegistrations(filtered);
        }
    }, [allRegistrations, currentFilter]);

    const handleFilterChange = (status) => {
        setCurrentFilter(status);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <RegistrationStatus
                data={filteredRegistrations} // Pass filtered data
                onFilterChange={handleFilterChange}
            />
            
        </div>
    );
}
