import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  DocumentTextIcon,
  CreditCardIcon,
  SparklesIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { AdminService, AdminStats } from '../services/admin.service';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminDashboardProps {
  onNavigate: (section: 'users' | 'ai' | 'system' | 'feedbacks' | 'logs') => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [aiStats, setAiStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsResult, aiStatsResult] = await Promise.all([
        AdminService.getDashboardStats(),
        AdminService.getAIStats(),
      ]);

      if (statsResult.error) {
        setError(statsResult.error.message);
        return;
      }

      if (aiStatsResult.error) {
        console.error('AI stats error:', aiStatsResult.error);
      }

      setStats(statsResult.data);
      setAiStats(aiStatsResult.data);
    } catch (err) {
      setError('Dashboard verileri yüklenirken hata oluştu');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="Admin dashboard yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Hata Oluştu
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </motion.button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Dashboard verileri yüklenemedi
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Toplam Kullanıcı',
      value: stats.totalUsers.toLocaleString(),
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      change: `+${stats.newUsersThisWeek} bu hafta`,
      changeType: 'positive' as const,
      onClick: () => onNavigate('users'),
    },
    {
      title: 'Toplam Not',
      value: stats.totalNotes.toLocaleString(),
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      change: `${stats.averageNotesPerUser} not/kullanıcı`,
      changeType: 'neutral' as const,
      onClick: () => onNavigate('users'),
    },
    {
      title: 'Ödeme Hatırlatmaları',
      value: stats.totalReminders.toLocaleString(),
      icon: CreditCardIcon,
      color: 'bg-purple-500',
      change: 'Aktif takip',
      changeType: 'neutral' as const,
      onClick: () => onNavigate('users'),
    },
    {
      title: 'AI İstekleri',
      value: stats.totalAIRequests.toLocaleString(),
      icon: SparklesIcon,
      color: 'bg-pink-500',
      change: `${aiStats?.successRate || 0}% başarı oranı`,
      changeType: aiStats?.successRate > 90 ? 'positive' : 'warning' as const,
      onClick: () => onNavigate('ai'),
    },
  ];

  const quickActions = [
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları görüntüle, rolleri düzenle ve hesap durumlarını yönet',
      icon: UserGroupIcon,
      color: 'bg-blue-600',
      onClick: () => onNavigate('users'),
    },
    {
      title: 'AI İzleme',
      description: 'AI kullanım logları, istatistikler ve performans analizleri',
      icon: SparklesIcon,
      color: 'bg-purple-600',
      onClick: () => onNavigate('ai'),
    },
    {
      title: 'Sistem Ayarları',
      description: 'Uygulama konfigürasyonu ve sistem parametreleri',
      icon: CogIcon,
      color: 'bg-gray-600',
      onClick: () => onNavigate('system'),
    },
    {
      title: 'Geri Bildirimler',
      description: 'Kullanıcı geri bildirimleri ve destek talepleri',
      icon: ChartBarIcon,
      color: 'bg-green-600',
      onClick: () => onNavigate('feedbacks'),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            CapNote sistem yönetim paneli
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <ClockIcon className="h-4 w-4" />
          <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={card.onClick}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className={`flex items-center text-sm ${
                card.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400'
                  : card.changeType === 'warning'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {card.changeType === 'positive' && (
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                )}
                {card.changeType === 'warning' && (
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                )}
                <span>{card.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sistem Durumu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Database
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Çevrimiçi ve sağlıklı
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                AI Servisleri
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {aiStats?.successRate > 90 ? 'Optimum performans' : 'İzlenmeli'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Kullanıcı Aktivitesi
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {stats.activeUsers} aktif kullanıcı
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={action.onClick}
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className={`p-3 rounded-lg ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Son Aktiviteler
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('logs')}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Tümünü Gör
          </motion.button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {stats.newUsersThisWeek} yeni kullanıcı bu hafta katıldı
            </span>
            <span className="text-xs text-gray-500">2 saat önce</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {aiStats?.todayRequests || 0} AI isteği bugün işlendi
            </span>
            <span className="text-xs text-gray-500">1 saat önce</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Sistem performansı optimum seviyede
            </span>
            <span className="text-xs text-gray-500">30 dakika önce</span>
          </div>
        </div>
      </div>
    </div>
  );
} 