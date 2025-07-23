import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SparklesIcon,
  LightBulbIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { aiService, AIInsight } from '../lib/aiService';
import clsx from 'clsx';

interface AIInsightsPanelProps {
  notes: any[];
  payments: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function AIInsightsPanel({ notes, payments, isOpen, onClose }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && (notes.length > 0 || payments.length > 0)) {
      generateInsights();
    }
  }, [isOpen, notes, payments]);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // AI öngörüleri oluştur
      const aiInsights = aiService.generateInsights(notes, payments);
      setInsights(aiInsights);

      // Akıllı görev önerileri
      const taskSuggestions = aiService.suggestTasks(notes, new Date());
      setSuggestions(taskSuggestions);
    } catch (error) {
      console.error('AI insights generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return LightBulbIcon;
      case 'reminder':
        return ClockIcon;
      case 'optimization':
        return ChartBarIcon;
      case 'pattern':
        return SparklesIcon;
      default:
        return SparklesIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
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
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Öngörüleri
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kişiselleştirilmiş öneriler ve analizler
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">AI analiz ediyor...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Öngörüler */}
            {insights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Akıllı Öngörüler
                </h3>
                <div className="space-y-3">
                  {insights.map((insight) => {
                    const Icon = getInsightIcon(insight.type);
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={clsx(
                            "p-2 rounded-lg",
                            getPriorityColor(insight.priority)
                          )}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {insight.title}
                              </h4>
                              <span className={clsx(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                getPriorityColor(insight.priority)
                              )}>
                                {insight.priority === 'high' ? 'Yüksek' : 
                                 insight.priority === 'medium' ? 'Orta' : 'Düşük'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {insight.description}
                            </p>
                            {insight.action && (
                              <button className="flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                                <span>{insight.action}</span>
                                <ChevronRightIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Öneriler */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Bugün İçin Öneriler
                </h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {suggestion}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Boş durum */}
            {insights.length === 0 && suggestions.length === 0 && !loading && (
              <div className="text-center py-12">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Henüz Yeterli Veri Yok
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Daha fazla not ve ödeme ekledikçe AI öngörüleri gelişecek
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}