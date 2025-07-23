import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  CreditCardIcon, 
  CalendarIcon, 
  MapPinIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Note, Payment, FilterType } from '../types';
import { NoteCard } from './NoteCard';
import { PaymentCard } from './PaymentCard';
import { aiService } from '../lib/aiService';
import { isDateToday, isDateThisWeek } from '../utils/dateUtils';
import clsx from 'clsx';

interface DashboardProps {
  notes: Note[];
  payments: Payment[];
  activeFilter: FilterType;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onEditNote: (note: Note) => void;
  onEditPayment: (payment: Payment) => void;
  onTogglePin: (id: string) => void;
  onTogglePaid: (id: string) => void;
  onAIInsights?: () => void;
}

export function Dashboard({
  notes,
  payments,
  activeFilter,
  searchTerm,
  onSearchChange,
  onEditNote,
  onEditPayment,
  onTogglePin,
  onTogglePaid,
  onAIInsights,
}: DashboardProps) {
  const filteredData = useMemo(() => {
    let filteredNotes = notes;
    let filteredPayments = payments;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredNotes = notes.filter(
        note =>
          note.title.toLowerCase().includes(searchLower) ||
          note.description.toLowerCase().includes(searchLower) ||
          note.tag.toLowerCase().includes(searchLower)
      );
      filteredPayments = payments.filter(
        payment =>
          payment.title.toLowerCase().includes(searchLower) ||
          payment.notes.toLowerCase().includes(searchLower)
      );
    }

    // Apply time filter
    switch (activeFilter) {
      case 'today':
        filteredNotes = filteredNotes.filter(note =>
          (note.reminderTime && isDateToday(note.reminderTime)) ||
          isDateToday(note.createdAt)
        );
        filteredPayments = filteredPayments.filter(payment =>
          isDateToday(payment.dueDate) ||
          (payment.reminderTime && isDateToday(payment.reminderTime))
        );
        break;
      case 'week':
        filteredNotes = filteredNotes.filter(note =>
          (note.reminderTime && isDateThisWeek(note.reminderTime)) ||
          isDateThisWeek(note.createdAt)
        );
        filteredPayments = filteredPayments.filter(payment =>
          isDateThisWeek(payment.dueDate) ||
          (payment.reminderTime && isDateThisWeek(payment.reminderTime))
        );
        break;
      case 'notes':
        filteredPayments = [];
        break;
      case 'payments':
        filteredNotes = [];
        break;
    }

    // Sort: pinned notes first, then by date
    filteredNotes.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    // Sort payments: unpaid first, then by due date
    filteredPayments.sort((a, b) => {
      if (!a.isPaid && b.isPaid) return -1;
      if (a.isPaid && !b.isPaid) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    return { filteredNotes, filteredPayments };
  }, [notes, payments, activeFilter, searchTerm]);

  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'today':
        return 'Bugün';
      case 'week':
        return 'Bu Hafta';
      case 'notes':
        return 'Tüm Notlar';
      case 'payments':
        return 'Ödemeler';
      default:
        return 'Dashboard';
    }
  };

  const getFilterDescription = () => {
    switch (activeFilter) {
      case 'today':
        return 'Bugün için planlanan notlar ve ödemeler';
      case 'week':
        return 'Bu hafta için planlanan notlar ve ödemeler';
      case 'notes':
        return 'Tüm notlarınız';
      case 'payments':
        return 'Tüm ödemeleriniz';
      default:
        return 'Genel bakış ve yaklaşan görevler';
    }
  };

  const getFilterIcon = () => {
    switch (activeFilter) {
      case 'today':
        return '📅';
      case 'week':
        return '📆';
      case 'notes':
        return '📝';
      case 'payments':
        return '💳';
      default:
        return '🏠';
    }
  };
  const { filteredNotes, filteredPayments } = filteredData;
  const hasData = filteredNotes.length > 0 || filteredPayments.length > 0;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {getFilterTitle()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getFilterDescription()}
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
              placeholder="Not veya ödeme ara..."
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        {activeFilter === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAIInsights}
              className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">
                  AI
                </div>
              </div>
              <div className="text-sm font-medium text-white/90">AI Öngörüleri</div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.button>

            <motion.div 
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {notes.length}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Not</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CreditCardIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {payments.filter(p => !p.isPaid).length}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Bekleyen Ödeme</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {notes.filter(n => n.reminderTime && isDateToday(n.reminderTime)).length +
                 payments.filter(p => isDateToday(p.dueDate)).length}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Bugün</div>
            </motion.div>
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {!hasData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {searchTerm ? 'Sonuç bulunamadı' : 'Henüz veri yok'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm
                  ? 'Arama kriterlerinize uygun sonuç bulunamadı.'
                  : 'İlk notunuzu veya ödemenizi eklemek için + butonuna tıklayın.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Notes Section */}
              {filteredNotes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {activeFilter !== 'payments' && (
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Notlar ({filteredNotes.length})
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                      {filteredNotes.map((note, index) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <NoteCard
                            note={note}
                            onEdit={onEditNote}
                            onTogglePin={onTogglePin}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* Payments Section */}
              {filteredPayments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {activeFilter !== 'notes' && (
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Ödemeler ({filteredPayments.length})
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                      {filteredPayments.map((payment, index) => (
                        <motion.div
                          key={payment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <PaymentCard
                            payment={payment}
                            onEdit={onEditPayment}
                            onTogglePaid={onTogglePaid}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}