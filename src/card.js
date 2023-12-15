import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableCard = () => {
  const [selectedId, setSelectedId] = useState(null);

  const items = [
    { id: 'item1', title: 'Title 1', subtitle: 'Subtitle 1', description: 'Description for Item 1' },
    { id: 'item2', title: 'Title 2', subtitle: 'Subtitle 2', description: 'Description for Item 2' },
    { id: 'item3', title: 'Title 3', subtitle: 'Subtitle 3', description: 'Description for Item 3' },
    // Add more items as needed
  ];

  const findItemById = id => items.find(item => item.id === id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map(item => (
          <motion.div 
            key={item.id} 
            layoutId={item.id} 
            onClick={() => setSelectedId(item.id)}
            className="p-4 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer"
          >
            <motion.h5 className="text-sm font-semibold">{item.subtitle}</motion.h5>
            <motion.h2 className="text-lg font-bold">{item.title}</motion.h2>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            layoutId={selectedId} 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="absolute top-2 right-2 text-black"
                onClick={() => setSelectedId(null)}
              >
                Close
              </motion.button>
              {selectedId && (
                <>
                  <motion.h5 className="text-sm font-semibold">{findItemById(selectedId).subtitle}</motion.h5>
                  <motion.h2 className="text-lg font-bold mb-2">{findItemById(selectedId).title}</motion.h2>
                  <motion.p>{findItemById(selectedId).description}</motion.p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpandableCard;
