import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  TagIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { FilterType } from '../types';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const menuItems = [
  { id: 'all' as FilterType, label: 'Dashboard', icon: HomeIcon },
  { id: 'today' as FilterType, label: 'Bugün', icon: DocumentTextIcon },
  { id: 'week' as FilterType, label: 'Bu Hafta', icon: DocumentTextIcon },
  { id: 'notes' as FilterType, label: 'Tüm Notlar', icon: DocumentTextIcon },
  { id: 'payments' as FilterType, label: 'Ödemeler', icon: CreditCardIcon },
];

export function Sidebar({ isOpen, onClose, activeFilter, onFilterChange }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-4 sm:p-6 relative">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 sm:px-6 pb-6 space-y-2 sm:space-y-3 relative">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onFilterChange(item.id);
                    onClose();
                  }}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg text-left transition-colors duration-200 group',
                    activeFilter === item.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className={clsx(
                    "h-5 w-5 transition-colors duration-200",
                    activeFilter === item.id ? "text-primary-600 dark:text-primary-400" : "group-hover:text-primary-500"
                  )} />
                  <span className="text-sm sm:text-base font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 relative">
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
            >
              <Cog6ToothIcon className="h-5 w-5 group-hover:text-primary-500 transition-colors duration-200" />
              <span className="text-sm sm:text-base font-medium">Ayarlar</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}