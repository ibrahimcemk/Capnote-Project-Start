import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AdminService } from '../services/admin.service';
import { AdminDashboard } from './AdminDashboard';
import { AdminUsersPanel } from './AdminUsersPanel';
import { AdminAIPanel } from './AdminAIPanel';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminSection = 'dashboard' | 'users' | 'ai' | 'system' | 'feedbacks' | 'logs';

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkAdminAccess();
    }
  }, [isOpen]);

  const checkAdminAccess = async () => {
    setLoading(true);
    setError(null);

    try {
      const { isAdmin: adminStatus } = await AdminService.checkAdminRole();
      setIsAdmin(adminStatus);
      
      if (!adminStatus) {
        setError('Bu panele erişim yetkiniz bulunmamaktadır.');
      }
    } catch (err) {
      setError('Admin yetki kontrolü yapılamadı');
      console.error('Admin access check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
  };

  const handleBackToDashboard = () => {
    setActiveSection('dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                CapNote Admin
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Sistem Yönetim Paneli
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner size="lg" text="Admin paneli yükleniyor..." />
            </div>
          ) : error || !isAdmin ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XMarkIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Erişim Reddedildi
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {error || 'Bu panele erişim yetkiniz bulunmamaktadır.'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kapat
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              {activeSection === 'dashboard' && (
                <AdminDashboard onNavigate={handleSectionChange} />
              )}
              {activeSection === 'users' && (
                <AdminUsersPanel onBack={handleBackToDashboard} />
              )}
              {activeSection === 'ai' && (
                <AdminAIPanel onBack={handleBackToDashboard} />
              )}
              {activeSection === 'system' && (
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Sistem Ayarları
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu panel henüz geliştirilme aşamasındadır.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToDashboard}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dashboard'a Dön
                  </motion.button>
                </div>
              )}
              {activeSection === 'feedbacks' && (
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Geri Bildirimler
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu panel henüz geliştirilme aşamasındadır.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToDashboard}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dashboard'a Dön
                  </motion.button>
                </div>
              )}
              {activeSection === 'logs' && (
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Admin Logları
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu panel henüz geliştirilme aşamasındadır.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToDashboard}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dashboard'a Dön
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 