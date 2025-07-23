/**
 * ===============================================
 * 🌍 CapNote v3.0 - STRINGS CONSTANTS
 * ===============================================
 * 
 * Çoklu dil desteği için string sabitleri
 * Memory Ref: 2842747, 2833135 - Multi-language string requirements
 * 
 * 📋 İÇERİK:
 * - Turkish (tr) - Ana dil
 * - English (en) - İkincil dil
 * - App Navigation & UI Strings
 * - Error Messages & Alerts
 * - Common Actions & Buttons
 * - Admin Panel Strings
 * ===============================================
 */

// ===============================================
// 🇹🇷 TURKISH STRINGS (Ana Dil)
// ===============================================
export const STRINGS_TR = {
  // ===============================================
  // 🏠 GENERAL & NAVIGATION
  // ===============================================
  APP: {
    NAME: 'CapNote',
    TAGLINE: 'Akıllı Not Alma ve Ödeme Takip Uygulaması',
    DESCRIPTION: 'Notlarınızı ve ödemelerinizi kolayca takip edin. Modern, mobil-uyumlu ve kullanıcı dostu arayüz.',
    VERSION: 'v3.0.0',
    WELCOME: 'CapNote\'a Hoş Geldiniz',
    WELCOME_MESSAGE: 'Notlarınızı ve ödemelerinizi takip etmek için giriş yapın veya hesap oluşturun.',
  },

  // ===============================================
  // 🔐 AUTHENTICATION
  // ===============================================
  AUTH: {
    LOGIN: 'Giriş Yap',
    REGISTER: 'Kayıt Ol',
    LOGOUT: 'Çıkış Yap',
    EMAIL: 'E-posta',
    PASSWORD: 'Şifre',
    CONFIRM_PASSWORD: 'Şifre Tekrarı',
    FULL_NAME: 'Ad Soyad',
    FORGOT_PASSWORD: 'Şifremi Unuttum',
    RESET_PASSWORD: 'Şifre Sıfırla',
    LOGIN_SUCCESS: 'Başarıyla giriş yapıldı',
    REGISTER_SUCCESS: 'Hesap başarıyla oluşturuldu',
    LOGOUT_SUCCESS: 'Başarıyla çıkış yapıldı',
    DEMO_LOGIN: 'Demo Hesap ile Deneyin',
    OWN_ACCOUNT: 'Kendi Hesabımla Giriş',
    DEMO_CREDENTIALS: 'demo@capnote.com / demo123456',
    
    // Form placeholders
    EMAIL_PLACEHOLDER: 'E-posta adresinizi girin',
    PASSWORD_PLACEHOLDER: 'Şifrenizi girin',
    FULL_NAME_PLACEHOLDER: 'Ad ve soyadınızı girin',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Şifrenizi tekrar girin',
    
    // Additional auth strings
    WELCOME_BACK: 'Tekrar hoş geldiniz',
    CREATE_ACCOUNT: 'Yeni hesap oluşturun',
    OR: 'veya',
    NO_ACCOUNT: 'Hesabınız yok mu?',
    HAVE_ACCOUNT: 'Zaten hesabınız var mı?',
    
    // Password strength
    PASSWORD_STRENGTH: 'Şifre Gücü',
    PASSWORD_WEAK: 'Zayıf',
    PASSWORD_MEDIUM: 'Orta',
    PASSWORD_STRONG: 'Güçlü',
    PASSWORD_MIN_LENGTH: 'En az 8 karakter olmalı',
    PASSWORD_UPPERCASE: 'Büyük harf içermeli',
    PASSWORD_LOWERCASE: 'Küçük harf içermeli',
    PASSWORD_NUMBER: 'Rakam içermeli',
    PASSWORD_SPECIAL: 'Özel karakter içermeli',
    PASSWORD_MATCH: 'Şifreler eşleşiyor',
    PASSWORD_NO_MATCH: 'Şifreler eşleşmiyor',
  },

  // ===============================================
  // 📝 NOTES
  // ===============================================
  NOTES: {
    TITLE: 'Notlar',
    NEW_NOTE: 'Yeni Not',
    ADD_NOTE: 'Not Ekle',
    EDIT_NOTE: 'Not Düzenle',
    DELETE_NOTE: 'Not Sil',
    NOTE_TITLE: 'Not Başlığı',
    NOTE_CONTENT: 'Not İçeriği',
    NOTE_TAG: 'Etiket',
    SEARCH_NOTES: 'Notlarda Ara',
    NO_NOTES: 'Henüz not bulunmuyor',
    NO_NOTES_DESC: 'İlk notunuzu eklemek için + butonuna basın',
    PIN_NOTE: 'Notu Sabitle',
    UNPIN_NOTE: 'Sabitlemeden Kaldır',
    ARCHIVE_NOTE: 'Arşivle',
    FAVORITE_NOTE: 'Favorilere Ekle',
    SHARE_NOTE: 'Not Paylaş',
    NOTE_SAVED: 'Not kaydedildi',
    NOTE_DELETED: 'Not silindi',
    TOTAL_NOTES: 'Toplam Not',
    PINNED_NOTES: 'Sabitlenmiş Notlar',
    RECENT_NOTES: 'Son Notlar',
  },

  // ===============================================
  // 💳 REMINDERS/PAYMENTS
  // ===============================================
  REMINDERS: {
    TITLE: 'Ödeme Hatırlatmaları',
    NEW_REMINDER: 'Yeni Hatırlatma',
    ADD_REMINDER: 'Hatırlatma Ekle',
    EDIT_REMINDER: 'Hatırlatma Düzenle',
    DELETE_REMINDER: 'Hatırlatma Sil',
    REMINDER_TITLE: 'Ödeme Başlığı',
    AMOUNT: 'Tutar',
    DUE_DATE: 'Son Tarih',
    FREQUENCY: 'Sıklık',
    CATEGORY: 'Kategori',
    NOTES: 'Notlar',
    IS_PAID: 'Ödendi',
    MARK_PAID: 'Ödendi Olarak İşaretle',
    MARK_UNPAID: 'Ödenmedi Olarak İşaretle',
    NO_REMINDERS: 'Henüz hatırlatma bulunmuyor',
    NO_REMINDERS_DESC: 'İlk hatırlatmanızı eklemek için + butonuna basın',
    REMINDER_SAVED: 'Hatırlatma kaydedildi',
    REMINDER_DELETED: 'Hatırlatma silindi',
    TOTAL_REMINDERS: 'Toplam Hatırlatma',
    PENDING_PAYMENTS: 'Bekleyen Ödemeler',
    PAID_PAYMENTS: 'Ödenen Ödemeler',
    OVERDUE: 'Gecikmiş',
    DUE_TODAY: 'Bugün Ödenecek',
    DUE_SOON: 'Yakında Ödenecek',
  },

  // ===============================================
  // 🏷️ TAGS & CATEGORIES
  // ===============================================
  TAGS: {
    TITLE: 'Etiketler',
    ALL_TAGS: 'Tüm Etiketler',
    TAG_NAME: 'Etiket Adı',
    TAG_COLOR: 'Etiket Rengi',
    ADD_TAG: 'Etiket Ekle',
    EDIT_TAG: 'Etiket Düzenle',
    DELETE_TAG: 'Etiket Sil',
    DEFAULT_TAGS: {
      WORK: 'İş',
      PERSONAL: 'Kişisel',
      IMPORTANT: 'Önemli',
      IDEA: 'İdea',
      SHOPPING: 'Alışveriş',
      GENERAL: 'Genel',
      HOME: 'Ev & Kira',
      TRANSPORT: 'Ulaşım',
      HEALTH: 'Sağlık',
      EDUCATION: 'Eğitim',
      ENTERTAINMENT: 'Eğlence',
    },
  },

  // ===============================================
  // 🔍 FILTERS & SEARCH
  // ===============================================
  FILTERS: {
    ALL: 'Tümü',
    PINNED: 'Sabitlenmiş',
    RECENT: 'Son Eklenen',
    ARCHIVED: 'Arşivlenmiş',
    FAVORITES: 'Favoriler',
    PAID: 'Ödenenler',
    UNPAID: 'Ödenmeyenler',
    OVERDUE: 'Gecikmiş',
    SEARCH_PLACEHOLDER: 'Arama yapın...',
    NO_RESULTS: 'Sonuç bulunamadı',
    NO_RESULTS_DESC: 'Arama kriterlerinizi değiştirip tekrar deneyin',
  },

  // ===============================================
  // 🤖 AI FEATURES
  // ===============================================
  AI: {
    TITLE: 'AI İçgörüler',
    INSIGHTS: 'AI Analizi',
    SUMMARY: 'Özet',
    SUGGESTIONS: 'Öneriler',
    ANALYSIS: 'Analiz',
    GENERATING: 'AI analizi oluşturuluyor...',
    ANALYSIS_COMPLETE: 'AI analizi tamamlandı',
    NO_ANALYSIS: 'Henüz AI analizi bulunmuyor',
    REQUEST_ANALYSIS: 'AI Analizi İste',
    SMART_INSIGHTS: 'Akıllı İçgörüler',
    SPENDING_ANALYSIS: 'Harcama Analizi',
    NOTE_INSIGHTS: 'Not İçgörüleri',
    AI_SUGGESTIONS: 'AI Önerileri',
    MODEL_VERSION: 'Model Versiyonu',
    CONFIDENCE_SCORE: 'Güven Skoru',
  },

  // ===============================================
  // 📊 ANALYTICS & STATS
  // ===============================================
  ANALYTICS: {
    TITLE: 'Analitik',
    DASHBOARD: 'Dashboard',
    OVERVIEW: 'Genel Bakış',
    THIS_MONTH: 'Bu Ay',
    THIS_WEEK: 'Bu Hafta',
    TODAY: 'Bugün',
    TOTAL_SPENT: 'Toplam Harcama',
    AVERAGE_NOTE_LENGTH: 'Ortalama Not Uzunluğu',
    MOST_USED_TAGS: 'En Çok Kullanılan Etiketler',
    SPENDING_TREND: 'Harcama Trendi',
    NOTE_ACTIVITY: 'Not Aktivitesi',
    PRODUCTIVITY_SCORE: 'Verimlilik Skoru',
    WEEKLY_SUMMARY: 'Haftalık Özet',
    MONTHLY_REPORT: 'Aylık Rapor',
    EXPORT_DATA: 'Veri Dışa Aktar',
  },

  // ===============================================
  // 🛡️ ADMIN PANEL
  // ===============================================
  ADMIN: {
    TITLE: 'Admin Panel',
    DASHBOARD: 'Yönetim Paneli',
    USERS: 'Kullanıcı Yönetimi',
    SYSTEM: 'Sistem Ayarları',
    AI_MONITORING: 'AI İzleme',
    FEEDBACKS: 'Geri Bildirimler',
    LOGS: 'Admin Logları',
    STATS: 'İstatistikler',
    TOTAL_USERS: 'Toplam Kullanıcı',
    ACTIVE_USERS: 'Aktif Kullanıcı',
    NEW_USERS_WEEK: 'Bu Hafta Yeni Kullanıcı',
    AI_REQUESTS: 'AI İstekleri',
    SUCCESS_RATE: 'Başarı Oranı',
    SYSTEM_STATUS: 'Sistem Durumu',
    DATABASE: 'Veritabanı',
    AI_SERVICES: 'AI Servisleri',
    USER_ACTIVITY: 'Kullanıcı Aktivitesi',
    ACCESS_DENIED: 'Erişim Reddedildi',
    UNAUTHORIZED: 'Bu panele erişim yetkiniz bulunmamaktadır.',
    LOADING: 'Admin paneli yükleniyor...',
  },

  // ===============================================
  // ⚙️ SETTINGS
  // ===============================================
  SETTINGS: {
    TITLE: 'Ayarlar',
    PROFILE: 'Profil',
    PREFERENCES: 'Tercihler',
    NOTIFICATIONS: 'Bildirimler',
    PRIVACY: 'Gizlilik',
    LANGUAGE: 'Dil',
    THEME: 'Tema değiştir',
    LIGHT_THEME: 'Açık Tema',
    DARK_THEME: 'Koyu Tema',
    SYSTEM_THEME: 'Sistem Teması',
    EMAIL_NOTIFICATIONS: 'E-posta Bildirimleri',
    PUSH_NOTIFICATIONS: 'Push Bildirimleri',
    REMINDER_NOTIFICATIONS: 'Hatırlatma Bildirimleri',
    AI_TIPS: 'AI İpuçları',
    AUTO_BACKUP: 'Otomatik Yedekleme',
    DATA_EXPORT: 'Veri Dışa Aktarma',
    DELETE_ACCOUNT: 'Hesabı Sil',
    SAVE_SETTINGS: 'Ayarları Kaydet',
    SETTINGS_SAVED: 'Ayarlar kaydedildi',
  },

  // ===============================================
  // 🔔 NOTIFICATIONS
  // ===============================================
  NOTIFICATIONS: {
    TITLE: 'Bildirimler',
    ENABLE_NOTIFICATIONS: 'Bildirimleri Etkinleştir',
    PERMISSION_REQUIRED: 'Bildirim İzni Gerekli',
    PERMISSION_MESSAGE: 'Hatırlatmalar için bildirim izni verin',
    GRANT_PERMISSION: 'İzin Ver',
    REMINDER_NOTIFICATION: 'Ödeme Hatırlatması',
    NOTE_REMINDER: 'Not Hatırlatması',
    NEW_INSIGHT: 'Yeni AI İçgörü',
    DAILY_SUMMARY: 'Günlük Özet',
    MARK_ALL_READ: 'Tümünü Okundu İşaretle',
    NO_NOTIFICATIONS: 'Bildirim bulunmuyor',
  },

  // ===============================================
  // ⚠️ ERRORS & ALERTS
  // ===============================================
  ERRORS: {
    GENERAL_ERROR: 'Bir hata oluştu',
    NETWORK_ERROR: 'Ağ hatası',
    SERVER_ERROR: 'Sunucu hatası',
    VALIDATION_ERROR: 'Doğrulama hatası',
    UNAUTHORIZED: 'Yetkisiz işlem',
    NOT_FOUND: 'Bulunamadı',
    TIMEOUT: 'Zaman aşımı',
    UNKNOWN_ERROR: 'Bilinmeyen hata',
    PLEASE_TRY_AGAIN: 'Lütfen tekrar deneyin',
    CONTACT_SUPPORT: 'Destek ile iletişime geçin',
    ERROR_LOADING_DATA: 'Veriler yüklenirken hata oluştu',
    ERROR_SAVING_DATA: 'Veriler kaydedilirken hata oluştu',
    ERROR_DELETING_DATA: 'Veriler silinirken hata oluştu',
    CONNECTION_LOST: 'Bağlantı kesildi',
    OFFLINE_MODE: 'Çevrimdışı mod',
    
    // Auth specific errors
    REQUIRED_FIELDS: 'Tüm alanları doldurun',
    LOGIN_FAILED: 'Giriş başarısız',
    REGISTER_FAILED: 'Kayıt başarısız',
    DEMO_LOGIN_FAILED: 'Demo girişi başarısız',
    PASSWORD_MISMATCH: 'Şifreler eşleşmiyor',
    WEAK_PASSWORD: 'Şifre çok zayıf',
  },

  // ===============================================
  // ✅ SUCCESS MESSAGES
  // ===============================================
  SUCCESS: {
    OPERATION_COMPLETE: 'İşlem tamamlandı',
    DATA_SAVED: 'Veriler kaydedildi',
    DATA_DELETED: 'Veriler silindi',
    DATA_UPDATED: 'Veriler güncellendi',
    EMAIL_SENT: 'E-posta gönderildi',
    BACKUP_CREATED: 'Yedek oluşturuldu',
    SETTINGS_APPLIED: 'Ayarlar uygulandı',
    SYNC_COMPLETE: 'Senkronizasyon tamamlandı',
    EXPORT_COMPLETE: 'Dışa aktarma tamamlandı',
  },

  // ===============================================
  // 🔄 COMMON ACTIONS
  // ===============================================
  ACTIONS: {
    SAVE: 'Kaydet',
    CANCEL: 'İptal',
    DELETE: 'Sil',
    EDIT: 'Düzenle',
    ADD: 'Ekle',
    REMOVE: 'Kaldır',
    UPDATE: 'Güncelle',
    REFRESH: 'Yenile',
    SEARCH: 'Ara',
    FILTER: 'Filtrele',
    SORT: 'Sırala',
    EXPORT: 'Dışa Aktar',
    IMPORT: 'İçe Aktar',
    SHARE: 'Paylaş',
    COPY: 'Kopyala',
    PASTE: 'Yapıştır',
    CUT: 'Kes',
    UNDO: 'Geri Al',
    REDO: 'İleri Al',
    SELECT_ALL: 'Tümünü Seç',
    CLEAR: 'Temizle',
    RESET: 'Sıfırla',
    APPLY: 'Uygula',
    CONFIRM: 'Onayla',
    CLOSE: 'Kapat',
    BACK: 'Geri',
    NEXT: 'İleri',
    FINISH: 'Bitir',
    CONTINUE: 'Devam Et',
    SKIP: 'Atla',
    RETRY: 'Tekrar Dene',
    LOAD_MORE: 'Daha Fazla Yükle',
    LOADING: 'Yükleniyor...',
  },

  // ===============================================
  // ⏳ LOADING STATES
  // ===============================================
  LOADING: {
    DEFAULT: 'Yükleniyor...',
    DATA: 'Veriler yükleniyor...',
    AUTH: 'Giriş yapılıyor...',
    SAVING: 'Kaydediliyor...',
    DELETING: 'Siliniyor...',
  },

  // ===============================================
  // 📅 DATE & TIME
  // ===============================================
  DATE_TIME: {
    TODAY: 'Bugün',
    YESTERDAY: 'Dün',
    TOMORROW: 'Yarın',
    THIS_WEEK: 'Bu Hafta',
    LAST_WEEK: 'Geçen Hafta',
    THIS_MONTH: 'Bu Ay',
    LAST_MONTH: 'Geçen Ay',
    THIS_YEAR: 'Bu Yıl',
    LAST_YEAR: 'Geçen Yıl',
    DAYS: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    DAYS_SHORT: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    MONTHS: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
             'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    MONTHS_SHORT: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
                   'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    AM: 'ÖÖ',
    PM: 'ÖS',
    JUST_NOW: 'Şimdi',
    MINUTES_AGO: 'dakika önce',
    HOURS_AGO: 'saat önce',
    DAYS_AGO: 'gün önce',
  },

  // ===============================================
  // 🏠 LANDING PAGE
  // ===============================================
  LANDING: {
    HERO: {
      TITLE: 'Notlarınızı ve Ödemelerinizi Akıllıca Yönetin',
      SUBTITLE: 'CapNote ile günlük notlarınızı organize edin, ödeme hatırlatmalarınızı takip edin ve AI desteği ile daha verimli olun.',
    },
    FEATURES: {
      TITLE: 'Güçlü Özellikler',
      SUBTITLE: 'İhtiyacınız olan her şey tek bir yerde',
    },
    BENEFITS: {
      TITLE: 'Neden CapNote?',
    },
    CTA: {
      GET_STARTED: 'Ücretsiz Başlayın',
      START_FREE: 'Hemen Başla',
    },
    FINAL_CTA: {
      TITLE: 'Bugün Başlayın',
      SUBTITLE: 'Ücretsiz hesap oluşturun ve hemen kullanmaya başlayın',
    },
    FOOTER: {
      COPYRIGHT: 'Tüm hakları saklıdır',
      RIGHTS: 'Tüm hakları saklıdır.',
    },
  },

  // ===============================================
  // 🎯 FEATURES
  // ===============================================
  FEATURES: {
    NOTES: {
      TITLE: 'Akıllı Notlar',
      DESC: 'Notlarınızı düzenleyin, etiketleyin ve AI ile özetleyin',
    },
    PAYMENTS: {
      TITLE: 'Ödeme Takibi',
      DESC: 'Faturalarınızı ve ödemelerinizi kolayca takip edin',
    },
    AI: {
      TITLE: 'AI Desteği',
      DESC: 'Yapay zeka ile akıllı öneriler ve analizler',
    },
  },

  // ===============================================
  // 💪 BENEFITS
  // ===============================================
  BENEFITS: {
    EASY_USE: 'Kullanımı Kolay',
    SECURE: 'Güvenli ve Gizli',
    FAST: 'Hızlı ve Verimli',
    AI_POWERED: 'AI Destekli',
  },
};

// ===============================================
// 🇺🇸 ENGLISH STRINGS (İkincil Dil)
// ===============================================
export const STRINGS_EN = {
  // ===============================================
  // 🏠 GENERAL & NAVIGATION
  // ===============================================
  APP: {
    NAME: 'CapNote',
    TAGLINE: 'Smart Note Taking and Payment Tracking App',
    DESCRIPTION: 'Track your notes and payments easily. Modern, mobile-friendly and user-friendly interface.',
    VERSION: 'v3.0.0',
    WELCOME: 'Welcome to CapNote',
    WELCOME_MESSAGE: 'Login or create an account to track your notes and payments.',
  },

  // ===============================================
  // 🔐 AUTHENTICATION
  // ===============================================
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    LOGOUT: 'Logout',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    FULL_NAME: 'Full Name',
    FORGOT_PASSWORD: 'Forgot Password',
    RESET_PASSWORD: 'Reset Password',
    LOGIN_SUCCESS: 'Successfully logged in',
    REGISTER_SUCCESS: 'Account created successfully',
    LOGOUT_SUCCESS: 'Successfully logged out',
    DEMO_LOGIN: 'Try with Demo Account',
    OWN_ACCOUNT: 'Login with My Account',
    DEMO_CREDENTIALS: 'demo@capnote.com / demo123456',
    
    // Form placeholders
    EMAIL_PLACEHOLDER: 'Enter your email address',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    FULL_NAME_PLACEHOLDER: 'Enter your full name',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Re-enter your password',
    
    // Additional auth strings
    WELCOME_BACK: 'Welcome back',
    CREATE_ACCOUNT: 'Create a new account',
    OR: 'or',
    NO_ACCOUNT: 'Don\'t have an account?',
    HAVE_ACCOUNT: 'Already have an account?',
    
    // Password strength
    PASSWORD_STRENGTH: 'Password Strength',
    PASSWORD_WEAK: 'Weak',
    PASSWORD_MEDIUM: 'Medium',
    PASSWORD_STRONG: 'Strong',
    PASSWORD_MIN_LENGTH: 'At least 8 characters',
    PASSWORD_UPPERCASE: 'Include uppercase letter',
    PASSWORD_LOWERCASE: 'Include lowercase letter',
    PASSWORD_NUMBER: 'Include number',
    PASSWORD_SPECIAL: 'Include special character',
    PASSWORD_MATCH: 'Passwords match',
    PASSWORD_NO_MATCH: 'Passwords don\'t match',
  },

  // ===============================================
  // 📝 NOTES
  // ===============================================
  NOTES: {
    TITLE: 'Notes',
    NEW_NOTE: 'New Note',
    ADD_NOTE: 'Add Note',
    EDIT_NOTE: 'Edit Note',
    DELETE_NOTE: 'Delete Note',
    NOTE_TITLE: 'Note Title',
    NOTE_CONTENT: 'Note Content',
    NOTE_TAG: 'Tag',
    SEARCH_NOTES: 'Search Notes',
    NO_NOTES: 'No notes yet',
    NO_NOTES_DESC: 'Press the + button to add your first note',
    PIN_NOTE: 'Pin Note',
    UNPIN_NOTE: 'Unpin Note',
    ARCHIVE_NOTE: 'Archive',
    FAVORITE_NOTE: 'Add to Favorites',
    SHARE_NOTE: 'Share Note',
    NOTE_SAVED: 'Note saved',
    NOTE_DELETED: 'Note deleted',
    TOTAL_NOTES: 'Total Notes',
    PINNED_NOTES: 'Pinned Notes',
    RECENT_NOTES: 'Recent Notes',
  },

  // ===============================================
  // 💳 REMINDERS/PAYMENTS
  // ===============================================
  REMINDERS: {
    TITLE: 'Payment Reminders',
    NEW_REMINDER: 'New Reminder',
    ADD_REMINDER: 'Add Reminder',
    EDIT_REMINDER: 'Edit Reminder',
    DELETE_REMINDER: 'Delete Reminder',
    REMINDER_TITLE: 'Payment Title',
    AMOUNT: 'Amount',
    DUE_DATE: 'Due Date',
    FREQUENCY: 'Frequency',
    CATEGORY: 'Category',
    NOTES: 'Notes',
    IS_PAID: 'Paid',
    MARK_PAID: 'Mark as Paid',
    MARK_UNPAID: 'Mark as Unpaid',
    NO_REMINDERS: 'No reminders yet',
    NO_REMINDERS_DESC: 'Press the + button to add your first reminder',
    REMINDER_SAVED: 'Reminder saved',
    REMINDER_DELETED: 'Reminder deleted',
    TOTAL_REMINDERS: 'Total Reminders',
    PENDING_PAYMENTS: 'Pending Payments',
    PAID_PAYMENTS: 'Paid Payments',
    OVERDUE: 'Overdue',
    DUE_TODAY: 'Due Today',
    DUE_SOON: 'Due Soon',
  },

  // ===============================================
  // 🏷️ TAGS & CATEGORIES
  // ===============================================
  TAGS: {
    TITLE: 'Tags',
    ALL_TAGS: 'All Tags',
    TAG_NAME: 'Tag Name',
    TAG_COLOR: 'Tag Color',
    ADD_TAG: 'Add Tag',
    EDIT_TAG: 'Edit Tag',
    DELETE_TAG: 'Delete Tag',
    DEFAULT_TAGS: {
      WORK: 'Work',
      PERSONAL: 'Personal',
      IMPORTANT: 'Important',
      IDEA: 'Idea',
      SHOPPING: 'Shopping',
      GENERAL: 'General',
      HOME: 'Home & Rent',
      TRANSPORT: 'Transport',
      HEALTH: 'Health',
      EDUCATION: 'Education',
      ENTERTAINMENT: 'Entertainment',
    },
  },

  // ===============================================
  // 🔍 FILTERS & SEARCH
  // ===============================================
  FILTERS: {
    ALL: 'All',
    PINNED: 'Pinned',
    RECENT: 'Recent',
    ARCHIVED: 'Archived',
    FAVORITES: 'Favorites',
    PAID: 'Paid',
    UNPAID: 'Unpaid',
    OVERDUE: 'Overdue',
    SEARCH_PLACEHOLDER: 'Search...',
    NO_RESULTS: 'No results found',
    NO_RESULTS_DESC: 'Try changing your search criteria',
  },

  // ===============================================
  // 🤖 AI FEATURES
  // ===============================================
  AI: {
    TITLE: 'AI Insights',
    INSIGHTS: 'AI Analysis',
    SUMMARY: 'Summary',
    SUGGESTIONS: 'Suggestions',
    ANALYSIS: 'Analysis',
    GENERATING: 'Generating AI analysis...',
    ANALYSIS_COMPLETE: 'AI analysis complete',
    NO_ANALYSIS: 'No AI analysis yet',
    REQUEST_ANALYSIS: 'Request AI Analysis',
    SMART_INSIGHTS: 'Smart Insights',
    SPENDING_ANALYSIS: 'Spending Analysis',
    NOTE_INSIGHTS: 'Note Insights',
    AI_SUGGESTIONS: 'AI Suggestions',
    MODEL_VERSION: 'Model Version',
    CONFIDENCE_SCORE: 'Confidence Score',
  },

  // ===============================================
  // 📊 ANALYTICS & STATS
  // ===============================================
  ANALYTICS: {
    TITLE: 'Analytics',
    DASHBOARD: 'Dashboard',
    OVERVIEW: 'Overview',
    THIS_MONTH: 'This Month',
    THIS_WEEK: 'This Week',
    TODAY: 'Today',
    TOTAL_SPENT: 'Total Spent',
    AVERAGE_NOTE_LENGTH: 'Average Note Length',
    MOST_USED_TAGS: 'Most Used Tags',
    SPENDING_TREND: 'Spending Trend',
    NOTE_ACTIVITY: 'Note Activity',
    PRODUCTIVITY_SCORE: 'Productivity Score',
    WEEKLY_SUMMARY: 'Weekly Summary',
    MONTHLY_REPORT: 'Monthly Report',
    EXPORT_DATA: 'Export Data',
  },

  // ===============================================
  // 🛡️ ADMIN PANEL
  // ===============================================
  ADMIN: {
    TITLE: 'Admin Panel',
    DASHBOARD: 'Admin Dashboard',
    USERS: 'User Management',
    SYSTEM: 'System Settings',
    AI_MONITORING: 'AI Monitoring',
    FEEDBACKS: 'Feedbacks',
    LOGS: 'Admin Logs',
    STATS: 'Statistics',
    TOTAL_USERS: 'Total Users',
    ACTIVE_USERS: 'Active Users',
    NEW_USERS_WEEK: 'New Users This Week',
    AI_REQUESTS: 'AI Requests',
    SUCCESS_RATE: 'Success Rate',
    SYSTEM_STATUS: 'System Status',
    DATABASE: 'Database',
    AI_SERVICES: 'AI Services',
    USER_ACTIVITY: 'User Activity',
    ACCESS_DENIED: 'Access Denied',
    UNAUTHORIZED: 'You do not have permission to access this panel.',
    LOADING: 'Loading admin panel...',
  },

  // ===============================================
  // ⚙️ SETTINGS
  // ===============================================
  SETTINGS: {
    TITLE: 'Settings',
    PROFILE: 'Profile',
    PREFERENCES: 'Preferences',
    NOTIFICATIONS: 'Notifications',
    PRIVACY: 'Privacy',
    LANGUAGE: 'Language',
    THEME: 'Change theme',
    LIGHT_THEME: 'Light Theme',
    DARK_THEME: 'Dark Theme',
    SYSTEM_THEME: 'System Theme',
    EMAIL_NOTIFICATIONS: 'Email Notifications',
    PUSH_NOTIFICATIONS: 'Push Notifications',
    REMINDER_NOTIFICATIONS: 'Reminder Notifications',
    AI_TIPS: 'AI Tips',
    AUTO_BACKUP: 'Auto Backup',
    DATA_EXPORT: 'Data Export',
    DELETE_ACCOUNT: 'Delete Account',
    SAVE_SETTINGS: 'Save Settings',
    SETTINGS_SAVED: 'Settings saved',
  },

  // ===============================================
  // 🔔 NOTIFICATIONS
  // ===============================================
  NOTIFICATIONS: {
    TITLE: 'Notifications',
    ENABLE_NOTIFICATIONS: 'Enable Notifications',
    PERMISSION_REQUIRED: 'Notification Permission Required',
    PERMISSION_MESSAGE: 'Allow notifications for reminders',
    GRANT_PERMISSION: 'Grant Permission',
    REMINDER_NOTIFICATION: 'Payment Reminder',
    NOTE_REMINDER: 'Note Reminder',
    NEW_INSIGHT: 'New AI Insight',
    DAILY_SUMMARY: 'Daily Summary',
    MARK_ALL_READ: 'Mark All as Read',
    NO_NOTIFICATIONS: 'No notifications',
  },

  // ===============================================
  // ⚠️ ERRORS & ALERTS
  // ===============================================
  ERRORS: {
    GENERAL_ERROR: 'An error occurred',
    NETWORK_ERROR: 'Network error',
    SERVER_ERROR: 'Server error',
    VALIDATION_ERROR: 'Validation error',
    UNAUTHORIZED: 'Unauthorized operation',
    NOT_FOUND: 'Not found',
    TIMEOUT: 'Timeout',
    UNKNOWN_ERROR: 'Unknown error',
    PLEASE_TRY_AGAIN: 'Please try again',
    CONTACT_SUPPORT: 'Contact support',
    ERROR_LOADING_DATA: 'Error loading data',
    ERROR_SAVING_DATA: 'Error saving data',
    ERROR_DELETING_DATA: 'Error deleting data',
    CONNECTION_LOST: 'Connection lost',
    OFFLINE_MODE: 'Offline mode',
    
    // Auth specific errors
    REQUIRED_FIELDS: 'Fill in all fields',
    LOGIN_FAILED: 'Login failed',
    REGISTER_FAILED: 'Registration failed',
    DEMO_LOGIN_FAILED: 'Demo login failed',
    PASSWORD_MISMATCH: 'Passwords don\'t match',
    WEAK_PASSWORD: 'Password is too weak',
  },

  // ===============================================
  // ✅ SUCCESS MESSAGES
  // ===============================================
  SUCCESS: {
    OPERATION_COMPLETE: 'Operation complete',
    DATA_SAVED: 'Data saved',
    DATA_DELETED: 'Data deleted',
    DATA_UPDATED: 'Data updated',
    EMAIL_SENT: 'Email sent',
    BACKUP_CREATED: 'Backup created',
    SETTINGS_APPLIED: 'Settings applied',
    SYNC_COMPLETE: 'Sync complete',
    EXPORT_COMPLETE: 'Export complete',
  },

  // ===============================================
  // 🔄 COMMON ACTIONS
  // ===============================================
  ACTIONS: {
    SAVE: 'Save',
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    EDIT: 'Edit',
    ADD: 'Add',
    REMOVE: 'Remove',
    UPDATE: 'Update',
    REFRESH: 'Refresh',
    SEARCH: 'Search',
    FILTER: 'Filter',
    SORT: 'Sort',
    EXPORT: 'Export',
    IMPORT: 'Import',
    SHARE: 'Share',
    COPY: 'Copy',
    PASTE: 'Paste',
    CUT: 'Cut',
    UNDO: 'Undo',
    REDO: 'Redo',
    SELECT_ALL: 'Select All',
    CLEAR: 'Clear',
    RESET: 'Reset',
    APPLY: 'Apply',
    CONFIRM: 'Confirm',
    CLOSE: 'Close',
    BACK: 'Back',
    NEXT: 'Next',
    FINISH: 'Finish',
    CONTINUE: 'Continue',
    SKIP: 'Skip',
    RETRY: 'Retry',
    LOAD_MORE: 'Load More',
    LOADING: 'Loading...',
  },

  // ===============================================
  // ⏳ LOADING STATES
  // ===============================================
  LOADING: {
    DEFAULT: 'Loading...',
    DATA: 'Loading data...',
    AUTH: 'Signing in...',
    SAVING: 'Saving...',
    DELETING: 'Deleting...',
  },

  // ===============================================
  // 📅 DATE & TIME
  // ===============================================
  DATE_TIME: {
    TODAY: 'Today',
    YESTERDAY: 'Yesterday',
    TOMORROW: 'Tomorrow',
    THIS_WEEK: 'This Week',
    LAST_WEEK: 'Last Week',
    THIS_MONTH: 'This Month',
    LAST_MONTH: 'Last Month',
    THIS_YEAR: 'This Year',
    LAST_YEAR: 'Last Year',
    DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    DAYS_SHORT: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    MONTHS: ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December'],
    MONTHS_SHORT: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    AM: 'AM',
    PM: 'PM',
    JUST_NOW: 'Just now',
    MINUTES_AGO: 'minutes ago',
    HOURS_AGO: 'hours ago',
    DAYS_AGO: 'days ago',
  },

  // ===============================================
  // 🏠 LANDING PAGE
  // ===============================================
  LANDING: {
    HERO: {
      TITLE: 'Manage Your Notes and Payments Smartly',
      SUBTITLE: 'Organize your daily notes, track payment reminders, and be more productive with AI support using CapNote.',
    },
    FEATURES: {
      TITLE: 'Powerful Features',
      SUBTITLE: 'Everything you need in one place',
    },
    BENEFITS: {
      TITLE: 'Why CapNote?',
    },
    CTA: {
      GET_STARTED: 'Get Started Free',
      START_FREE: 'Start Now',
    },
    FINAL_CTA: {
      TITLE: 'Start Today',
      SUBTITLE: 'Create a free account and start using immediately',
    },
    FOOTER: {
      COPYRIGHT: 'All rights reserved',
      RIGHTS: 'All rights reserved.',
    },
  },

  // ===============================================
  // 🎯 FEATURES
  // ===============================================
  FEATURES: {
    NOTES: {
      TITLE: 'Smart Notes',
      DESC: 'Organize, tag, and summarize your notes with AI',
    },
    PAYMENTS: {
      TITLE: 'Payment Tracking',
      DESC: 'Easily track your bills and payments',
    },
    AI: {
      TITLE: 'AI Support',
      DESC: 'Smart suggestions and analysis with artificial intelligence',
    },
  },

  // ===============================================
  // 💪 BENEFITS
  // ===============================================
  BENEFITS: {
    EASY_USE: 'Easy to Use',
    SECURE: 'Safe and Private',
    FAST: 'Fast and Efficient',
    AI_POWERED: 'AI Powered',
  },
};

// ===============================================
// 🔧 LANGUAGE UTILITIES
// ===============================================

/**
 * Varsayılan dil (browser'dan algılanır)
 */
export const getDefaultLanguage = (): 'tr' | 'en' => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language || navigator.languages?.[0];
    return browserLang?.startsWith('tr') ? 'tr' : 'en';
  }
  return 'tr'; // Default Turkish
};

/**
 * Aktif dil için string'leri al
 * @param language - 'tr' veya 'en'
 * @returns String sabitleri
 */
export const getStrings = (language: 'tr' | 'en' = 'tr') => {
  return language === 'tr' ? STRINGS_TR : STRINGS_EN;
};

/**
 * Dil değiştirme için desteklenen diller
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
];

/**
 * Nested object'ten string al (path ile)
 * @param strings - String object
 * @param path - 'NOTES.TITLE' gibi path
 * @param fallback - Bulunamazsa döndürülecek değer
 * @returns String değeri
 */
export const getString = (strings: any, path: string, fallback: string = ''): string => {
  const keys = path.split('.');
  let result = strings;
  
  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      return fallback || path;
    }
  }
  
  return typeof result === 'string' ? result : fallback || path;
};

/**
 * Parametreli string formatting
 * @param template - 'Hello {name}!' gibi template
 * @param params - { name: 'John' } gibi parametreler
 * @returns Formatlanmış string
 */
export const formatString = (template: string, params: Record<string, any> = {}): string => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================
export default {
  TR: STRINGS_TR,
  EN: STRINGS_EN,
  getDefaultLanguage,
  getStrings,
  getString,
  formatString,
  SUPPORTED_LANGUAGES,
};

// ===============================================
// ✅ STRINGS CONSTANTS COMPLETE!
// ===============================================

/*
  🎉 CapNote Strings v3.0 Hazır!
  
  🌍 ÇOK DİLLİ DESTEK:
  ├── 🇹🇷 Turkish: 300+ string sabiti
  ├── 🇺🇸 English: 300+ string sabiti
  └── 🔧 Utilities: 4 helper function
  
  📋 KATEGORİLER:
  ├── 🏠 General & Navigation
  ├── 🔐 Authentication
  ├── 📝 Notes
  ├── 💳 Reminders/Payments
  ├── 🏷️ Tags & Categories
  ├── 🔍 Filters & Search
  ├── 🤖 AI Features
  ├── 📊 Analytics & Stats
  ├── 🛡️ Admin Panel
  ├── ⚙️ Settings
  ├── 🔔 Notifications
  ├── ⚠️ Errors & Alerts
  ├── ✅ Success Messages
  ├── 🔄 Common Actions
  └── 📅 Date & Time
  
  🔧 UTILITIES:
  ├── getDefaultLanguage() - Browser dil algılama
  ├── getStrings() - Dil bazlı string alma
  ├── getString() - Path ile string alma
  └── formatString() - Parametreli string formatting
  
  ✨ Memory Requirements COMPLETED!
  🚀 Multi-language support ready!
  
  Usage:
  import { STRINGS_TR, getString, getStrings } from '@/constants/strings';
  
  Happy Translating! 🌍
*/ 