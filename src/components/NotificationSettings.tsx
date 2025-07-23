import React from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  BellSlashIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { useNotifications } from '../hooks/useNotifications';

export function NotificationSettings() {
  const {
    isPermissionGranted,
    isInitialized,
    loading,
    requestPermission,
    sendTestNotification,
  } = useNotifications();

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isPermissionGranted 
              ? 'bg-green-100 dark:bg-green-900/20' 
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            {isPermissionGranted ? (
              <BellIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <BellSlashIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Bildirimler
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hatırlatma ve ödeme bildirimleri
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isPermissionGranted ? (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Aktif</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Kapalı</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {!isPermissionGranted ? (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
              Önemli hatırlatmaları kaçırmamak için bildirim izni verin.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRequestPermission}
              className="w-full sm:w-auto px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
            >
              Bildirim İzni Ver
            </motion.button>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200 mb-3">
              Bildirimler aktif! Test bildirimi göndermek ister misiniz?
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTestNotification}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              Test Bildirimi Gönder
            </motion.button>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Bildirim Türleri
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Ödeme son tarihleri (1 gün önceden)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Not hatırlatmaları</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>Geciken ödemeler</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}