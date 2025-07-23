/**
 * ===============================================
 * 🔐 CapNote v3.0 - LOGIN PAGE
 * ===============================================
 * 
 * Modern ve minimal giriş sayfası
 * Auth hook entegrasyonlu
 * 
 * 📋 FEATURES:
 * - Modern form design
 * - Validation
 * - Demo login option
 * - Loading states
 * - Error handling
 * ===============================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { PrimaryButton, SecondaryButton } from '../components/ModernButton';
import { MinimalLanguageSwitcher } from '../components/MinimalLanguageSwitcher';
import { MinimalThemeToggle } from '../components/ThemeToggle';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, ERROR, withOpacity } from '../constants/colors';

// ===============================================
// 🔐 LOGIN PAGE COMPONENT
// ===============================================

export const LoginPage: React.FC = () => {
  
  const { t } = useTranslation();
  const { signIn, signInWithDemo, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // ===============================================
  // 🎯 STATE MANAGEMENT
  // ===============================================
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // ===============================================
  // 🔄 EFFECTS
  // ===============================================
  
  // Kullanıcı zaten giriş yaptıysa dashboard'a yönlendir
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  // ===============================================
  // 🎛️ EVENT HANDLERS
  // ===============================================
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError(t('ERRORS.REQUIRED_FIELDS', 'Tüm alanları doldurun'));
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.error) {
        setError(result.error.message || t('ERRORS.LOGIN_FAILED', 'Giriş başarısız'));
      } else {
        // Success - useEffect will handle navigation
      }
    } catch (err) {
      setError(t('ERRORS.GENERAL_ERROR', 'Bir hata oluştu'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await signInWithDemo();
      
      if (result.error) {
        setError(result.error.message || t('ERRORS.DEMO_LOGIN_FAILED', 'Demo girişi başarısız'));
      }
    } catch (err) {
      setError(t('ERRORS.GENERAL_ERROR', 'Bir hata oluştu'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text={t('LOADING.AUTH')} />
      </div>
    );
  }
  
  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Header */}
      <header className="relative z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-display">C</span>
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">
                  {t('APP.NAME')}
                </h1>
              </div>
            </div>
            
            {/* Utils */}
            <div className="flex items-center space-x-3">
              <MinimalLanguageSwitcher />
              <MinimalThemeToggle size="sm" />
            </div>
            
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          
          {/* Form Card */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('AUTH.LOGIN')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('AUTH.WELCOME_BACK', 'Tekrar hoş geldiniz')}
              </p>
            </div>
            
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('AUTH.EMAIL')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 dark:text-white"
                  placeholder={t('AUTH.EMAIL_PLACEHOLDER', 'E-posta adresinizi girin')}
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('AUTH.PASSWORD')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 dark:text-white"
                    placeholder={t('AUTH.PASSWORD_PLACEHOLDER', 'Şifrenizi girin')}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('AUTH.FORGOT_PASSWORD')}
                </Link>
              </div>
              
              {/* Submit Button */}
              <PrimaryButton
                type="submit"
                fullWidth
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('LOADING.AUTH') : t('AUTH.LOGIN')}
              </PrimaryButton>
              
            </form>
            
            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
                {t('AUTH.OR', 'veya')}
              </span>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            
            {/* Demo Login */}
            <SecondaryButton
              fullWidth
              size="md"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              🚀 {t('AUTH.DEMO_LOGIN')}
            </SecondaryButton>
            
            {/* Register Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t('AUTH.NO_ACCOUNT', 'Hesabınız yok mu?')} 
              </span>
              <Link 
                to="/register"
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {t('AUTH.REGISTER')}
              </Link>
            </div>
            
          </div>
          
        </motion.div>
      </main>
      
    </div>
  );
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default LoginPage; 