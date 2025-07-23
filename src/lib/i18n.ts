/**
 * ===============================================
 * 🌍 CapNote v3.0 - i18next CONFIGURATION
 * ===============================================
 * 
 * Memory Ref: 2842747, 2833135 - Multi-language support
 * React i18next entegrasyonu ve dil yönetimi
 * 
 * 📋 FEATURES:
 * - Turkish/English support
 * - Auto language detection
 * - LocalStorage persistence
 * - Dynamic language switching
 * - Namespace organization
 * ===============================================
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { STRINGS_TR, STRINGS_EN, getDefaultLanguage } from '../constants/strings';

// ===============================================
// 🎯 TRANSLATION RESOURCES
// ===============================================

const resources = {
  tr: {
    translation: STRINGS_TR,
  },
  en: {
    translation: STRINGS_EN,
  },
};

// ===============================================
// 🔧 i18next CONFIGURATION
// ===============================================

// ===============================================
// 🔍 CUSTOM LANGUAGE DETECTION
// ===============================================

const detectLanguage = (): 'tr' | 'en' => {
  // 1. localStorage'dan kontrol et
  const storedLang = localStorage.getItem('capnote_language') || localStorage.getItem('i18nextLng');
  if (storedLang === 'tr' || storedLang === 'en') {
    return storedLang;
  }
  
  // 2. Browser dilini kontrol et
  return getDefaultLanguage();
};

i18n
  .use(initReactI18next) // React entegrasyonu
  .init({
    // Resource'lar
    resources,
    
    // Varsayılan dil (custom detection)
    lng: detectLanguage(),
    fallbackLng: 'tr',
    
    // Debug mode (development'ta aktif)
    debug: process.env.NODE_ENV === 'development',
    
    // Namespace ayarları
    defaultNS: 'translation',
    ns: ['translation'],
    
    // Key separator (nested object access için)
    keySeparator: '.',
    
    // Nesting (string interpolation için)
    nsSeparator: false,
    
    // Interpolation ayarları
    interpolation: {
      escapeValue: false, // React zaten XSS koruması yapıyor
      formatSeparator: ',',
    },
    
    // Manual detection (yukarıda yaptık)
    
    // React ayarları
    react: {
      // Suspense kullanma
      useSuspense: false,
      
      // Bind i18n instance
      bindI18n: 'languageChanged',
      
      // Trans component için
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'p'],
    },
  });

// ===============================================
// 🔄 LANGUAGE CHANGE HANDLER
// ===============================================

/**
 * Dil değiştirme fonksiyonu
 * @param language - 'tr' | 'en'
 * @param persist - localStorage'a kaydet (default: true)
 */
export const changeLanguage = async (language: 'tr' | 'en', persist: boolean = true) => {
  try {
    console.log(`🌍 Changing language to: ${language}`);
    
    await i18n.changeLanguage(language);
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = language;
    
    // Sayfa title'ını güncelle
    const appName = i18n.t('APP.NAME');
    const appTagline = i18n.t('APP.TAGLINE');
    document.title = `${appName} - ${appTagline}`;
    
    // localStorage'a kaydet (LanguageDetector bunu otomatik yapar ama kesinlik için)
    if (persist) {
      localStorage.setItem('capnote_language', language);
      localStorage.setItem('i18nextLng', language); // i18next'in kendi key'i
    }
    
    // Force re-render için event dispatch
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language } 
    }));
    
    console.log(`✅ Language successfully changed to: ${language}`);
    return true;
  } catch (error) {
    console.error('❌ Error changing language:', error);
    return false;
  }
};

// ===============================================
// 🎯 UTILITY FUNCTIONS
// ===============================================

/**
 * Mevcut dili al
 */
export const getCurrentLanguage = (): 'tr' | 'en' => {
  const currentLang = i18n.language || 'tr';
  return currentLang.startsWith('tr') ? 'tr' : 'en';
};

/**
 * Dil seçeneklerini al
 */
export const getLanguageOptions = () => [
  { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸', nativeName: 'English' },
];

/**
 * Dil hazır mı kontrol et
 */
export const isLanguageReady = (): boolean => {
  return i18n.isInitialized;
};

/**
 * i18n instance'ı başlat (manuel init için)
 */
export const initializeI18n = async (): Promise<boolean> => {
  try {
    if (!i18n.isInitialized) {
      await i18n.init();
    }
    
    // İlk yüklemede title'ı güncelle
    setTimeout(() => {
      const appName = i18n.t('APP.NAME');
      const appTagline = i18n.t('APP.TAGLINE');
      document.title = `${appName} - ${appTagline}`;
      document.documentElement.lang = getCurrentLanguage();
    }, 100);
    
    return true;
  } catch (error) {
    console.error('❌ Error initializing i18n:', error);
    return false;
  }
};

/**
 * Namespace yüklenmiş mi kontrol et
 */
export const isNamespaceLoaded = (namespace: string): boolean => {
  return i18n.hasResourceBundle(getCurrentLanguage(), namespace);
};

// ===============================================
// 🚀 AUTO INITIALIZATION
// ===============================================

// i18n'i otomatik başlat
if (typeof window !== 'undefined') {
  initializeI18n();
  
  // Sayfa yüklendiğinde dil kontrolü
  window.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    console.log(`🌍 Current language detected: ${currentLang}`);
  });
}

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default i18n; 