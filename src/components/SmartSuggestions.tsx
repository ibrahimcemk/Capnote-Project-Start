import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  TagIcon,
  ClockIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { aiService } from '../lib/aiService';

interface SmartSuggestionsProps {
  title: string;
  description: string;
  onCategorySelect: (category: string, color: string) => void;
  onReminderSelect: (date: Date) => void;
  dueDate?: Date;
}

export function SmartSuggestions({
  title,
  description,
  onCategorySelect,
  onReminderSelect,
  dueDate
}: SmartSuggestionsProps) {
  const [suggestedCategory, setSuggestedCategory] = useState<string>('');
  const [suggestedColor, setSuggestedColor] = useState<string>('');
  const [suggestedReminder, setSuggestedReminder] = useState<Date | null>(null);

  useEffect(() => {
    if (title || description) {
      // Kategori önerisi
      const category = aiService.suggestCategory(title, description);
      const color = aiService.suggestTagColor(category);
      setSuggestedCategory(category);
      setSuggestedColor(color);

      // Hatırlatma önerisi
      if (dueDate) {
        const reminder = aiService.suggestReminderTime(title, dueDate);
        setSuggestedReminder(reminder);
      }
    }
  }, [title, description, dueDate]);

  if (!suggestedCategory && !suggestedReminder) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
    >
      <div className="flex items-center space-x-2 mb-3">
        <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
          AI Önerileri
        </span>
      </div>

      <div className="space-y-3">
        {/* Kategori önerisi */}
        {suggestedCategory && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(suggestedCategory, suggestedColor)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TagIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Önerilen Kategori
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: suggestedColor }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestedCategory}
                  </span>
                </div>
              </div>
            </div>
            <LightBulbIcon className="h-4 w-4 text-gray-400" />
          </motion.button>
        )}

        {/* Hatırlatma önerisi */}
        {suggestedReminder && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onReminderSelect(suggestedReminder)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ClockIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Önerilen Hatırlatma
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {suggestedReminder.toLocaleDateString('tr-TR')} {suggestedReminder.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <LightBulbIcon className="h-4 w-4 text-gray-400" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}