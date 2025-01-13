import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white p-8 rounded-xl shadow-lg text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            {[0, 1, 2, 3].map((index) => (
              <motion.span
                key={index}
                className="absolute w-full h-full border-4 border-transparent border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2
                }}
                style={{
                  top: index * 2,
                  left: index * 2,
                }}
              />
            ))}
          </div>
          <motion.p 
            className="text-lg font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Processing Video...
          </motion.p>
          <motion.p 
            className="text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            This may take a few moments
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;