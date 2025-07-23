import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CpuChipIcon,
  DocumentTextIcon,
  LightBulbIcon,
  TagIcon,
  BeakerIcon,
  UserIcon,
  CalendarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { AdminService } from '../services/admin.service';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminAIPanelProps {
  onBack: () => void;
}

interface AILog {
  id: string;
  user_id: string;
  input_text: string;
  output_text: string;
  type: 'summary' | 'insight' | 'tagging' | 'suggestion';
  model_version: string;
  success: boolean;
  created_at: string;
  user_profiles?: {
    email: string;
    full_name: string;
  };
}

export function AdminAIPanel({ onBack }: AdminAIPanelProps) {
  const [aiStats, setAiStats] = useState<any>(null);
  const [aiLogs, setAiLogs] = useState<AILog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'performance'>('overview');
  const [selectedLogType, setSelectedLogType] = useState<'all' | 'summary' | 'insight' | 'tagging' | 'suggestion'>('all');

  useEffect(() => {
    loadAIData();
  }, []);

  const loadAIData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsResult, logsResult] = await Promise.all([
        AdminService.getAIStats(),
        AdminService.getAILogs(50, 0),
      ]);

      if (statsResult.error) {
        setError(statsResult.error.message);
        return;
      }

      if (logsResult.error) {
        console.error('AI logs error:', logsResult.error);
      }

      setAiStats(statsResult.data);
      setAiLogs(logsResult.data || []);
    } catch (err) {
      setError('AI verileri yüklenirken hata oluştu');
      console.error('AI data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'insight':
        return <LightBulbIcon className="h-4 w-4" />;
      case 'tagging':
        return <TagIcon className="h-4 w-4" />;
      case 'suggestion':
        return <BeakerIcon className="h-4 w-4" />;
      default:
        return <SparklesIcon className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'summary':
        return 'Özet';
      case 'insight':
        return 'İçgörü';
      case 'tagging':
        return 'Etiketleme';
      case 'suggestion':
        return 'Öneri';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'summary':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'insight':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'tagging':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'suggestion':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredLogs = aiLogs.filter(log => 
    selectedLogType === 'all' || log.type === selectedLogType
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" text="AI verileri yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Geri Dön
          </button>
        </div>
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={loadAIData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Geri Dön
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI İzleme Paneli
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI kullanım istatistikleri ve performans analizi
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadAIData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Yenile</span>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
        {[
          { id: 'overview', label: 'Genel Bakış', icon: ChartBarIcon },
          { id: 'logs', label: 'Loglar', icon: DocumentTextIcon },
          { id: 'performance', label: 'Performans', icon: CpuChipIcon },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && aiStats && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-500">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Toplam İstek
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {aiStats.totalRequests.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-500">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Başarı Oranı
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    %{aiStats.successRate}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-500">
                  <ClockIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Bugün
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {aiStats.todayRequests}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-yellow-500">
                  <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Başarısız
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {aiStats.failedRequests}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Type Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              İstek Türleri
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(aiStats.typeBreakdown).map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(type).split(' ')[0]} bg-opacity-20`}>
                      {getTypeIcon(type)}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {count as number}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getTypeLabel(type)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Model Versions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Model Versiyonları
            </h3>
            <div className="space-y-3">
              {Object.entries(aiStats.modelVersions).map(([version, count]) => (
                <div key={version} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CpuChipIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {version}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {count as number} istek
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Filtrele:
              </span>
              <select
                value={selectedLogType}
                onChange={(e) => setSelectedLogType(e.target.value as any)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Türler</option>
                <option value="summary">Özet</option>
                <option value="insight">İçgörü</option>
                <option value="tagging">Etiketleme</option>
                <option value="suggestion">Öneri</option>
              </select>
            </div>
          </div>

          {/* Logs List */}
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                      {getTypeIcon(log.type)}
                      <span className="ml-1">{getTypeLabel(log.type)}</span>
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <UserIcon className="h-4 w-4" />
                      <span>{log.user_profiles?.full_name || log.user_profiles?.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {log.success ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(log.created_at).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Giriş:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 line-clamp-3">
                      {log.input_text}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Çıkış:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 line-clamp-3">
                      {log.output_text}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Model: {log.model_version}</span>
                  <span>ID: {log.id.slice(0, 8)}...</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Log Bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seçilen kriterlere uygun AI log kaydı bulunamadı.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && aiStats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Success Rate */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Başarı Oranı Trendi
              </h3>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  aiStats.successRate >= 95 ? 'text-green-600' :
                  aiStats.successRate >= 85 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  %{aiStats.successRate}
                </div>
                <p className={`text-sm ${
                  aiStats.successRate >= 95 ? 'text-green-600' :
                  aiStats.successRate >= 85 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {aiStats.successRate >= 95 ? 'Mükemmel' :
                   aiStats.successRate >= 85 ? 'İyi' : 'Geliştirilmeli'}
                </p>
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Haftalık Aktivite
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {aiStats.weekRequests}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Son 7 gün içinde işlenen istek
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performans Metrikleri
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ortalama Yanıt Süresi</span>
                <span className="font-medium text-gray-900 dark:text-white">~2.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Günlük İstek Limiti</span>
                <span className="font-medium text-gray-900 dark:text-white">10,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Kullanılan Token</span>
                <span className="font-medium text-gray-900 dark:text-white">~1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sistem Sağlığı</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium text-green-600">Sağlıklı</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 