import React from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  Bars3Icon, 
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { MinimalLanguageSwitcher } from './MinimalLanguageSwitcher';
import { MinimalThemeToggle } from './ThemeToggle';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  onMenuToggle: () => void;
  user?: User | null;
  onSignOut?: () => void;
  onAIInsights?: () => void;
  onAnalytics?: () => void;
  onAdmin?: () => void;
}

export function Header({ onMenuToggle, user, onSignOut, onAIInsights, onAnalytics, onAdmin }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-display">C</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent font-display">
                {t('APP.NAME')}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <MinimalLanguageSwitcher />
            
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAnalytics}
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition-all duration-200"
                  title={t('ANALYTICS.TITLE')}
                >
                  <ChartBarIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAIInsights}
                  className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all duration-200"
                  title={t('AI.TITLE')}
                >
                  <SparklesIcon className="h-5 w-5" />
                </motion.button>
                {onAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAdmin}
                    className="p-2 rounded-lg bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-600 dark:text-red-400 hover:from-red-200 hover:to-orange-200 dark:hover:from-red-900/50 dark:hover:to-orange-900/50 transition-all duration-200"
                    title={t('ADMIN.TITLE')}
                  >
                    <ShieldCheckIcon className="h-5 w-5" />
                  </motion.button>
                )}
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {user.email}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignOut}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  title={t('AUTH.LOGOUT')}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </motion.button>
              </div>
            )}
            <MinimalThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}