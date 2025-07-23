/**
 * ===============================================
 * 🏠 CapNote v3.0 - LANDING PAGE
 * ===============================================
 * 
 * Modern ve minimal ana sayfa
 * Uygulama tanıtımı ve CTA'lar
 * 
 * 📋 FEATURES:
 * - Hero section
 * - Feature highlights
 * - Modern CTA buttons
 * - Responsive design
 * - i18n support
 * ===============================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  CreditCardIcon, 
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { ModernButton, PrimaryButton, SecondaryButton } from '../components/ModernButton';
import { MinimalLanguageSwitcher } from '../components/MinimalLanguageSwitcher';
import { MinimalThemeToggle } from '../components/ThemeToggle';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, SECONDARY, NEUTRAL, withOpacity } from '../constants/colors';

// ===============================================
// 🏠 LANDING PAGE COMPONENT
// ===============================================

export const LandingPage: React.FC = () => {
  
  const { t } = useTranslation();
  
  // ===============================================
  // 🎯 FEATURE DATA
  // ===============================================
  
  const features = [
    {
      icon: DocumentTextIcon,
      titleKey: 'FEATURES.NOTES.TITLE',
      descKey: 'FEATURES.NOTES.DESC',
      color: PRIMARY.DEFAULT,
    },
    {
      icon: CreditCardIcon,
      titleKey: 'FEATURES.PAYMENTS.TITLE', 
      descKey: 'FEATURES.PAYMENTS.DESC',
      color: SECONDARY.DEFAULT,
    },
    {
      icon: SparklesIcon,
      titleKey: 'FEATURES.AI.TITLE',
      descKey: 'FEATURES.AI.DESC', 
      color: '#8B5CF6',
    },
  ];
  
  const benefits = [
    'BENEFITS.EASY_USE',
    'BENEFITS.SECURE',
    'BENEFITS.FAST',
    'BENEFITS.AI_POWERED',
  ];
  
  // ===============================================
  // 🎬 ANIMATION VARIANTS
  // ===============================================
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Header */}
      <header className="relative z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-display">C</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">
                {t('APP.NAME')}
              </h1>
            </motion.div>
            
            {/* Navigation */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MinimalLanguageSwitcher />
              <MinimalThemeToggle size="sm" />
              
              <div className="hidden sm:flex items-center space-x-3">
                <Link to="/login">
                  <SecondaryButton size="sm">
                    {t('AUTH.LOGIN')}
                  </SecondaryButton>
                </Link>
                <Link to="/register">
                  <PrimaryButton size="sm">
                    {t('AUTH.REGISTER')}
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>
            
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative">
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              
              {/* Hero Title */}
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t('LANDING.HERO.TITLE')}
                </span>
              </motion.h1>
              
              {/* Hero Subtitle */}
              <motion.p 
                variants={fadeInUp}
                className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                {t('LANDING.HERO.SUBTITLE')}
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
              >
                <Link to="/register">
                  <PrimaryButton 
                    size="md" 
                    rightIcon={<ArrowRightIcon style={{ width: 16, height: 16 }} />}
                  >
                    {t('LANDING.CTA.GET_STARTED')}
                  </PrimaryButton>
                </Link>
                
                <Link to="/login">
                  <SecondaryButton size="md">
                    {t('AUTH.DEMO_LOGIN')}
                  </SecondaryButton>
                </Link>
              </motion.div>
              
              {/* Demo Preview */}
              <motion.div
                variants={fadeInUp}
                className="relative max-w-4xl mx-auto"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                                             {/* Notes Preview */}
                       <div className="space-y-3">
                         <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                           <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                           {t('NOTES.TITLE')}
                         </h3>
                         <div className="space-y-2">
                           <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg border-l-3 border-blue-500">
                             <div className="text-xs font-medium text-gray-900 dark:text-white">Meeting Notes</div>
                             <div className="text-xs text-gray-600 dark:text-gray-400">Project planning...</div>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg">
                             <div className="text-xs font-medium text-gray-900 dark:text-white">Shopping List</div>
                             <div className="text-xs text-gray-600 dark:text-gray-400">Groceries for this week</div>
                           </div>
                         </div>
                       </div>
                      
                                             {/* Payments Preview */}
                       <div className="space-y-3">
                         <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                           <CreditCardIcon className="w-4 h-4 text-purple-500" />
                           {t('REMINDERS.TITLE')}
                         </h3>
                         <div className="space-y-2">
                           <div className="bg-red-50 dark:bg-red-900/20 p-2.5 rounded-lg border-l-3 border-red-500">
                             <div className="text-xs font-medium text-gray-900 dark:text-white">Electricity Bill</div>
                             <div className="text-xs text-gray-600 dark:text-gray-400">₺450 • Due in 3 days</div>
                           </div>
                           <div className="bg-green-50 dark:bg-green-900/20 p-2.5 rounded-lg border-l-3 border-green-500">
                             <div className="text-xs font-medium text-gray-900 dark:text-white">Internet Bill</div>
                             <div className="text-xs text-gray-600 dark:text-gray-400">₺99 • Paid ✓</div>
                           </div>
                         </div>
                       </div>
                      
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </motion.div>
            
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('LANDING.FEATURES.TITLE')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('LANDING.FEATURES.SUBTITLE')}
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: withOpacity(feature.color, 0.1) }}
                  >
                    <feature.icon 
                      className="w-8 h-8"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {t('LANDING.BENEFITS.TITLE')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {t(benefit)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {t('LANDING.FINAL_CTA.TITLE')}
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                {t('LANDING.FINAL_CTA.SUBTITLE')}
              </p>
              <Link to="/register">
                <ModernButton
                  variant="secondary"
                  size="lg"
                  style={{ 
                    backgroundColor: 'white',
                    color: PRIMARY.DEFAULT,
                    border: 'none'
                  }}
                  rightIcon={<ArrowRightIcon style={{ width: 20, height: 20 }} />}
                >
                  {t('LANDING.CTA.START_FREE')}
                </ModernButton>
              </Link>
            </motion.div>
            
          </div>
        </section>
        
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">C</span>
            </div>
            <span className="text-xl font-bold font-display">{t('APP.NAME')}</span>
          </div>
          <p className="text-gray-400 text-sm">
            {t('LANDING.FOOTER.COPYRIGHT')} © 2025 {t('APP.NAME')}. {t('LANDING.FOOTER.RIGHTS')}
          </p>
        </div>
      </footer>
      
    </div>
  );
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default LandingPage; 