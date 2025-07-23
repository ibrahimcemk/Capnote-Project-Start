import React from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { Payment } from '../types';
import { formatDate, isDateToday } from '../utils/dateUtils';
import clsx from 'clsx';

interface PaymentCardProps {
  payment: Payment;
  onEdit: (payment: Payment) => void;
  onTogglePaid: (id: string) => void;
}

export function PaymentCard({ payment, onEdit, onTogglePaid }: PaymentCardProps) {
  const isOverdue = new Date(payment.dueDate) < new Date() && !payment.isPaid;
  const isDueToday = isDateToday(payment.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={clsx(
        "rounded-lg sm:rounded-xl border p-4 sm:p-6 cursor-pointer transition-all duration-300 group",
        payment.isPaid
          ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
          : isOverdue
          ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
          : isDueToday
          ? "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      )}
      onClick={() => onEdit(payment)}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <CurrencyDollarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:inline">
            {payment.recurrence === 'once' ? 'Tek Seferlik' : 
             payment.recurrence === 'monthly' ? 'Aylık' : 'Yıllık'}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {isOverdue && !payment.isPaid && (
            <div className="p-1 rounded-lg bg-red-100 dark:bg-red-900/30 hidden sm:block">
              <ExclamationTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePaid(payment.id);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {payment.isPaid ? (
              <CheckCircleIconSolid className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-green-600" />
            )}
          </motion.button>
        </div>
      </div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
        {payment.title}
      </h3>

      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
          ₺{payment.amount.toLocaleString('tr-TR')}
        </span>
        <div className={clsx(
          "px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-bold",
          payment.isPaid
            ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
            : isOverdue
            ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
            : isDueToday
            ? "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
        )}>
          {payment.isPaid ? 'Ödendi' : isOverdue ? 'Gecikmiş' : isDueToday ? 'Bugün' : 'Bekliyor'}
        </div>
      </div>

      {payment.notes && (
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {payment.notes}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{formatDate(payment.dueDate)}</span>
        </div>
      </div>
    </motion.div>
  );
}