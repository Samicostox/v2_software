import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableCard2 = () => {
  
  return (
    <div className ='App'>
        <motion.div className='card'>    
        <motion.h2>Laurent Bot 🤖</motion.h2>
        <motion.div>
            <p>ORDA Expert</p>
            <p>ORDA Expert Laurent is your personalized bot!</p>
        </motion.div>

        </motion.div>
    </div>
  );
};

export default ExpandableCard2;
