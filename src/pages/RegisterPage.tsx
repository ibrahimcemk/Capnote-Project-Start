/**
 * ===============================================
 * 📝 CapNote v3.0 - REGISTER PAGE
 * ===============================================
 * 
 * Modern ve minimal kayıt sayfası
 * Auth hook entegrasyonlu
 * 
 * 📋 FEATURES:
 * - Modern form design
 * - Form validation
 * - Password strength indicator
 * - Loading states
 * - Error handling
 * ===============================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { PrimaryButton, SecondaryButton } from '../components/ModernButton';
import { MinimalLanguageSwitcher } from '../components/MinimalLanguageSwitcher';
import { MinimalThemeToggle } from '../components/ThemeToggle';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, ERROR, SUCCESS, withOpacity } from '../constants/colors';

// ===============================================
// 📝 REGISTER PAGE COMPONENT
// ===============================================

export const RegisterPage: React.FC = () => {
  
  const { t } = useTranslation();
  const { signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // ===============================================
  // 🎯 STATE MANAGEMENT
  // ===============================================
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
  }>({
    score: 0,
    feedback: [],
  });
  
  // ===============================================
  // 🔄 EFFECTS
  // ===============================================
  
  // Kullanıcı zaten giriş yaptıysa dashboard'a yönlendir
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  // Password strength checker
  useEffect(() => {
    const checkPasswordStrength = (password: string) => {
      let score = 0;
      const feedback = [];
      
      if (password.length >= 8) {
        score += 1;
      } else {
        feedback.push(t('AUTH.PASSWORD_MIN_LENGTH', 'En az 8 karakter olmalı'));
      }
      
      if (/[A-Z]/.test(password)) {
        score += 1;
      } else {
        feedback.push(t('AUTH.PASSWORD_UPPERCASE', 'Büyük harf içermeli'));
      }
      
      if (/[a-z]/.test(password)) {
        score += 1;
      } else {
        feedback.push(t('AUTH.PASSWORD_LOWERCASE', 'Küçük harf içermeli'));
      }
      
      if (/[0-9]/.test(password)) {
        score += 1;
      } else {
        feedback.push(t('AUTH.PASSWORD_NUMBER', 'Rakam içermeli'));
      }
      
      if (/[^A-Za-z0-9]/.test(password)) {
        score += 1;
      } else {
        feedback.push(t('AUTH.PASSWORD_SPECIAL', 'Özel karakter içermeli'));
      }
      
      setPasswordStrength({ score, feedback });
    };
    
    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  }, [formData.password, t]);
  
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
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('ERRORS.REQUIRED_FIELDS', 'Tüm alanları doldurun'));
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(t('ERRORS.PASSWORD_MISMATCH', 'Şifreler eşleşmiyor'));
      return;
    }
    
    if (passwordStrength.score < 3) {
      setError(t('ERRORS.WEAK_PASSWORD', 'Şifre çok zayıf'));
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const result = await signUp(formData.email, formData.password, formData.fullName);
      
      if (result.error) {
        setError(result.error.message || t('ERRORS.REGISTER_FAILED', 'Kayıt başarısız'));
      } else {
        // Success - useEffect will handle navigation
      }
    } catch (err) {
      setError(t('ERRORS.GENERAL_ERROR', 'Bir hata oluştu'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength.score < 2) return ERROR.DEFAULT;
    if (passwordStrength.score < 4) return '#F59E0B';
    return SUCCESS.DEFAULT;
  };
  
  const getPasswordStrengthText = () => {
    if (passwordStrength.score < 2) return t('AUTH.PASSWORD_WEAK', 'Zayıf');
    if (passwordStrength.score < 4) return t('AUTH.PASSWORD_MEDIUM', 'Orta');
    return t('AUTH.PASSWORD_STRONG', 'Güçlü');
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
                {t('AUTH.REGISTER')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('AUTH.CREATE_ACCOUNT', 'Yeni hesap oluşturun')}
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
            
            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('AUTH.FULL_NAME')}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 dark:text-white"
                  placeholder={t('AUTH.FULL_NAME_PLACEHOLDER', 'Ad ve soyadınızı girin')}
                  disabled={isSubmitting}
                />
              </div>
              
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
                    placeholder={t('AUTH.PASSWORD_PLACEHOLDER', 'Güçlü bir şifre girin')}
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t('AUTH.PASSWORD_STRENGTH', 'Şifre Gücü')}
                      </span>
                      <span 
                        className="text-xs font-medium"
                        style={{ color: getPasswordStrengthColor() }}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      />
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {passwordStrength.feedback.map((feedback, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <XCircleIcon className="w-3 h-3 text-red-500 flex-shrink-0" />
                            <span className="text-xs text-red-600 dark:text-red-400">{feedback}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('AUTH.CONFIRM_PASSWORD')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 dark:text-white"
                    placeholder={t('AUTH.CONFIRM_PASSWORD_PLACEHOLDER', 'Şifrenizi tekrar girin')}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center space-x-2">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400">
                          {t('AUTH.PASSWORD_MATCH', 'Şifreler eşleşiyor')}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-600 dark:text-red-400">
                          {t('AUTH.PASSWORD_NO_MATCH', 'Şifreler eşleşmiyor')}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <PrimaryButton
                type="submit"
                fullWidth
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting || passwordStrength.score < 3 || formData.password !== formData.confirmPassword}
                className="mt-6"
              >
                {isSubmitting ? t('LOADING.SAVING') : t('AUTH.REGISTER')}
              </PrimaryButton>
              
            </form>
            
            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t('AUTH.HAVE_ACCOUNT', 'Zaten hesabınız var mı?')} 
              </span>
              <Link 
                to="/login"
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {t('AUTH.LOGIN')}
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

export default RegisterPage; 