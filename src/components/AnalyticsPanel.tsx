import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { aiService, SpendingPattern, ProductivityInsight } from '../lib/aiService';
import clsx from 'clsx';

interface AnalyticsPanelProps {
  notes: any[];
  payments: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsPanel({ notes, payments, isOpen, onClose }: AnalyticsPanelProps) {
  const [spendingPatterns, setSpendingPatterns] = useState<SpendingPattern[]>([]);
  const [productivity, setProductivity] = useState<ProductivityInsight | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && (notes.length > 0 || payments.length > 0)) {
      analyzeData();
    }
  }, [isOpen, notes, payments]);

  const analyzeData = async () => {
    setLoading(true);
    try {
      // Harcama analizi
      if (payments.length > 0) {
        const patterns = aiService.analyzeSpendingPatterns(payments);
        setSpendingPatterns(patterns);
      }

      // Verimlilik analizi
      if (notes.length > 0) {
        const productivityData = aiService.analyzeProductivity(notes);
        setProductivity(productivityData);
      }
    } catch (error) {
      console.error('Analytics generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return ArrowTrendingUpIcon;
      case 'decreasing':
        return ArrowTrendingDownIcon;
      default:
        return ClockIcon;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'decreasing':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Analitik Raporu
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detaylı performans ve harcama analizi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Analiz ediliyor...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Verimlilik Analizi */}
            {productivity && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Verimlilik Analizi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        Tamamlama Oranı
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      %{Math.round(productivity.completionRate)}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        En Verimli Saat
                      </span>
                    </div>
                    <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                      {productivity.mostProductiveTime}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        Popüler Etiketler
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {productivity.commonTags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verimlilik Önerileri */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Verimlilik Önerileri
                  </h4>
                  <div className="space-y-2">
                    {productivity.suggestions.slice(0, 3).map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {suggestion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Harcama Analizi */}
            {spendingPatterns.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Harcama Analizi
                </h3>
                <div className="space-y-4">
                  {spendingPatterns.map((pattern, index) => {
                    const TrendIcon = getTrendIcon(pattern.trend);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <CurrencyDollarIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {pattern.category}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {pattern.frequency}
                              </p>
                            </div>
                          </div>
                          <div className={clsx(
                            "flex items-center space-x-1 px-2 py-1 rounded-full",
                            getTrendColor(pattern.trend)
                          )}>
                            <TrendIcon className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              {pattern.trend === 'increasing' ? 'Artıyor' :
                               pattern.trend === 'decreasing' ? 'Azalıyor' : 'Stabil'}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Ortalama Tutar
                            </span>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              ₺{pattern.averageAmount.toLocaleString('tr-TR')}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Tahmini Sonraki
                            </span>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              ₺{Math.round(pattern.prediction).toLocaleString('tr-TR')}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Boş durum */}
            {!productivity && spendingPatterns.length === 0 && !loading && (
              <div className="text-center py-12">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Henüz Yeterli Veri Yok
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Daha fazla not ve ödeme ekledikçe detaylı analizler görünecek
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}