import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon as MapPinIconSolid } from '@heroicons/react/24/solid';
import { Note } from '../types';
import { formatDate, formatTime, isDateToday } from '../utils/dateUtils';
import clsx from 'clsx';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onTogglePin: (id: string) => void;
}

export function NoteCard({ note, onEdit, onTogglePin }: NoteCardProps) {
  const completedCount = note.checklist.filter(item => item.isDone).length;
  const totalCount = note.checklist.length;
  const hasReminder = note.reminderTime && new Date(note.reminderTime) > new Date();
  const isReminderToday = note.reminderTime && isDateToday(note.reminderTime);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 cursor-pointer transition-all duration-300 group"
      onClick={() => onEdit(note)}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full shadow-lg animate-pulse"
            style={{ backgroundColor: note.tagColor }}
          />
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:inline">
            {note.tag}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {hasReminder && (
            <div className={clsx(
              "p-2 rounded-lg",
              isReminderToday ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            )}>
              <ClockIcon className="h-4 w-4" />
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {note.isPinned ? (
              <MapPinIconSolid className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            ) : (
              <MapPinIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
        {note.title}
      </h3>

      {note.description && (
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {note.description}
        </p>
      )}

      {totalCount > 0 && (
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 min-w-max">
            {completedCount}/{totalCount}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{formatDate(note.createdAt)}</span>
        {hasReminder && (
          <div className="flex items-center space-x-1 hidden sm:flex">
            <ClockIcon className="h-4 w-4" />
            <span>
              {formatTime(note.reminderTime!)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}