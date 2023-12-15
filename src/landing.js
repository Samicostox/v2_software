import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Framer = () => {
    const projects = [
        { id: 1, title: 'SolarisNet', subtitle: 'Revolutionizing Renewable Energy with AI-Driven Solar Grids' },
        { id: 2, title: 'AquaPurify', subtitle: 'Sustainable Water Purification for Remote Communities' },
        { id: 3, title: 'EduVirtual', subtitle: 'Interactive Virtual Reality Platform for Immersive Learning' },
        { id: 4, title: 'GreenUrban', subtitle: 'Smart Urban Gardening Solutions for City Dwellers' },
        { id: 5, title: 'HealthTrack', subtitle: 'Advanced Wearable Tech for Personalized Health Monitoring' },
    ];

    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {projects.map(item => (
                <Card 
                    key={item.id} 
                    item={item} 
                    isSelected={item.id === selectedId}
                    onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                />
            ))}
        </div>
    );
};

const Card = ({ item, isSelected, onClick }) => {
    const { title, subtitle } = item;

    return (
        <motion.div 
            layout
            initial={{ borderRadius: 10 }}
            onClick={onClick}
            className={`p-4 border border-gray-300 rounded-lg bg-white cursor-pointer ${
                isSelected ? 'ring ring-blue-300' : ''
            }`}
        >
            <motion.h2 layout="position" className="text-lg font-bold">{title}</motion.h2>
            <motion.h5 layout="position" className="text-sm text-gray-600">{subtitle}</motion.h5>
            {isSelected && (
                <motion.div className="extra-content pt-4" layout>
                    <p className="text-gray-800">More details about the project...</p>
                    {/* Add additional content here */}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Framer;