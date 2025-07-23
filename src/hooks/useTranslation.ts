/**
 * ===============================================
 * 🌍 CapNote v3.0 - ENHANCED useTranslation HOOK
 * ===============================================
 * 
 * Memory Ref: 2842747, 2833135 - Enhanced translation hook
 * react-i18next'ın genişletilmiş versiyonu
 * 
 * 📋 FEATURES:
 * - Standard useTranslation wrapper
 * - Language switching utilities
 * - Format helpers (currency, date, etc.)
 * - Loading states
 * - Error handling
 * ===============================================
 */

import { useTranslation as useReactI18next, UseTranslationOptions } from 'react-i18next';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { changeLanguage, getCurrentLanguage, getLanguageOptions, isLanguageReady } from '../lib/i18n';

// ===============================================
// 🎯 TYPE DEFINITIONS
// ===============================================

export interface TranslationOptions extends UseTranslationOptions<any> {
  // Özel seçenekler buraya eklenebilir
}

export interface TranslationHelpers {
  // Temel çeviri fonksiyonları
  t: (key: string, options?: any) => string;
  
  // Dil yönetimi
  currentLanguage: 'tr' | 'en';
  availableLanguages: Array<{
    code: 'tr' | 'en';
    name: string;
    flag: string;
    nativeName: string;
  }>;
  
  // Dil değiştirme
  changeLanguage: (language: 'tr' | 'en') => Promise<boolean>;
  
  // Format helpers
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (date: Date, format?: 'short' | 'medium' | 'long') => string;
  formatNumber: (number: number) => string;
  formatPercent: (value: number) => string;
  
  // Utility helpers
  isReady: boolean;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
  
  // Pluralization helper
  tPlural: (key: string, count: number, options?: any) => string;
  
  // Safe translation (fallback korumalı)
  tSafe: (key: string, fallback?: string, options?: any) => string;
}

// ===============================================
// 🪝 ENHANCED useTranslation HOOK
// ===============================================

export function useTranslation(
  namespace?: string | string[],
  options?: TranslationOptions
): TranslationHelpers {
  
  // React i18next hook'u
  const { t, i18n, ready } = useReactI18next(namespace, options);
  
  // Force re-render için state
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Language change event listener
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);
  
  // Mevcut dil
  const currentLanguage = useMemo(() => getCurrentLanguage(), [i18n.language, forceUpdate]);
  
  // Mevcut diller
  const availableLanguages = useMemo(() => getLanguageOptions() as Array<{
    code: 'tr' | 'en';
    name: string;
    flag: string;
    nativeName: string;
  }>, []);
  
  // Dil değiştirme fonksiyonu
  const handleChangeLanguage = useCallback(async (language: 'tr' | 'en') => {
    return await changeLanguage(language);
  }, []);
  
  // Format helpers
  const formatCurrency = useCallback((amount: number, currency: string = 'TRY') => {
    try {
      return new Intl.NumberFormat(currentLanguage === 'tr' ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (error) {
      // Fallback format
      const symbol = currency === 'TRY' ? '₺' : 
                    currency === 'USD' ? '$' : 
                    currency === 'EUR' ? '€' : currency;
      return `${amount.toFixed(2)} ${symbol}`;
    }
  }, [currentLanguage]);
  
  const formatDate = useCallback((date: Date, format: 'short' | 'medium' | 'long' = 'medium') => {
    try {
      const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
        short: { 
          year: '2-digit', 
          month: 'short', 
          day: 'numeric' 
        },
        medium: { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        },
        long: { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        },
      };
      
      return new Intl.DateTimeFormat(
        currentLanguage === 'tr' ? 'tr-TR' : 'en-US',
        formatOptions[format]
      ).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  }, [currentLanguage]);
  
  const formatNumber = useCallback((number: number) => {
    try {
      return new Intl.NumberFormat(currentLanguage === 'tr' ? 'tr-TR' : 'en-US').format(number);
    } catch (error) {
      return number.toString();
    }
  }, [currentLanguage]);
  
  const formatPercent = useCallback((value: number) => {
    try {
      return new Intl.NumberFormat(currentLanguage === 'tr' ? 'tr-TR' : 'en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 100);
    } catch (error) {
      return `${value}%`;
    }
  }, [currentLanguage]);
  
  // Pluralization helper
  const tPlural = useCallback((key: string, count: number, options: any = {}): string => {
    const result = t(key, { count, ...options });
    return typeof result === 'string' ? result : String(result);
  }, [t]);
  
  // Safe translation helper
  const tSafe = useCallback((key: string, fallback?: string, options: any = {}): string => {
    const translated = t(key, { ...options, defaultValue: fallback || key });
    const result = typeof translated === 'string' ? translated : String(translated);
    
    // Eğer çeviri anahtar ile aynıysa ve fallback varsa, fallback'i kullan
    if (result === key && fallback && fallback !== key) {
      return fallback;
    }
    
    return result;
  }, [t]);
  
  // RTL dil kontrolü (şu an için Türkçe ve İngilizce LTR)
  const isRTL = useMemo(() => false, []);
  const direction = useMemo(() => 'ltr' as const, []);
  
  // Return object
  return {
    // Temel çeviri
    t,
    
    // Dil yönetimi
    currentLanguage,
    availableLanguages,
    changeLanguage: handleChangeLanguage,
    
    // Format helpers
    formatCurrency,
    formatDate,
    formatNumber,
    formatPercent,
    
    // Utility helpers
    isReady: ready && isLanguageReady(),
    isRTL,
    direction,
    
    // Advanced helpers
    tPlural,
    tSafe,
  };
}

// ===============================================
// 🎯 SPECIALIZED HOOKS
// ===============================================

/**
 * Form'lar için özel çeviri hook'u
 */
export function useFormTranslation() {
  const { t, tSafe, ...rest } = useTranslation();
  
  const getFieldLabel = useCallback((fieldName: string) => {
    return tSafe(`FORM.${fieldName.toUpperCase()}`, fieldName);
  }, [tSafe]);
  
  const getFieldError = useCallback((fieldName: string, errorType: string) => {
    return tSafe(`ERRORS.FIELD_${errorType.toUpperCase()}`, `${fieldName} ${errorType}`);
  }, [tSafe]);
  
  const getFieldPlaceholder = useCallback((fieldName: string) => {
    return tSafe(`PLACEHOLDERS.${fieldName.toUpperCase()}`, `Enter ${fieldName}`);
  }, [tSafe]);
  
  return {
    t,
    tSafe,
    getFieldLabel,
    getFieldError,
    getFieldPlaceholder,
    ...rest,
  };
}

/**
 * Error mesajları için özel hook
 */
export function useErrorTranslation() {
  const { t, tSafe } = useTranslation();
  
  const getErrorMessage = useCallback((errorCode: string, fallback?: string) => {
    return tSafe(`ERRORS.${errorCode.toUpperCase()}`, fallback || 'An error occurred');
  }, [tSafe]);
  
  const getSuccessMessage = useCallback((successCode: string, fallback?: string) => {
    return tSafe(`SUCCESS.${successCode.toUpperCase()}`, fallback || 'Operation successful');
  }, [tSafe]);
  
  return {
    t,
    tSafe,
    getErrorMessage,
    getSuccessMessage,
  };
}

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default useTranslation; 