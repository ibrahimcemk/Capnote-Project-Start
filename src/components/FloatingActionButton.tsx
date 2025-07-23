import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, DocumentTextIcon, CreditCardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface FloatingActionButtonProps {
  onCreateNote: () => void;
  onCreatePayment: () => void;
}

export function FloatingActionButton({ onCreateNote, onCreatePayment }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-30">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            />
            
            {/* Menu items */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 sm:bottom-20 right-0 space-y-3 sm:space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onCreateNote();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 min-w-max group"
              >
                <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-200">
                  <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="font-bold text-sm sm:text-base lg:text-lg">Not Ekle</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, x: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onCreatePayment();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 min-w-max group"
              >
                <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-200">
                  <CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="font-bold text-sm sm:text-base lg:text-lg">Ödeme Ekle</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className={clsx(
          "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 animate-float",
          isOpen
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            : "bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
        )}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          {isOpen ? (
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
          ) : (
            <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}