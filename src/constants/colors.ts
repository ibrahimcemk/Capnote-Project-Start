/**
 * ===============================================
 * 🎨 CapNote v3.0 - COLOR CONSTANTS
 * ===============================================
 * 
 * Merkezi renk paleti - tüm uygulama genelinde kullanılır
 * Memory Ref: 2833135 - Constants yapısı gereksinimi
 * 
 * 📋 İÇERİK:
 * - Primary Colors (Ana renkler)
 * - Secondary Colors (İkincil renkler)  
 * - Neutral Colors (Nötr renkler)
 * - Semantic Colors (Anlamsal renkler)
 * - Tag Colors (Etiket renkleri)
 * - Theme Colors (Tema renkleri)
 * ===============================================
 */

// ===============================================
// 🎨 TYPE DEFINITIONS
// ===============================================
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  DEFAULT: string;
}

export interface TagColorsType {
  BLUE: string;
  GREEN: string;
  YELLOW: string;
  PURPLE: string;
  RED: string;
  PINK: string;
  INDIGO: string;
  TEAL: string;
  ORANGE: string;
  LIME: string;
  CYAN: string;
  ROSE: string;
}

export interface ThemeColors {
  BACKGROUND: string;
  SURFACE: string;
  CARD: string;
  TEXT_PRIMARY: string;
  TEXT_SECONDARY: string;
  TEXT_MUTED: string;
  BORDER: string;
  BORDER_LIGHT: string;
  SHADOW: string;
  OVERLAY: string;
}

// ===============================================
// 🔵 PRIMARY COLORS (Ana Renkler)
// ===============================================
export const PRIMARY: ColorPalette = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',  // Ana mavi
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  DEFAULT: '#0ea5e9',
};

// ===============================================
// 🟣 SECONDARY COLORS (İkincil Renkler)
// ===============================================
export const SECONDARY: ColorPalette = {
  50: '#fdf4ff',
  100: '#fae8ff',
  200: '#f5d0fe',
  300: '#f0abfc',
  400: '#e879f9',
  500: '#d946ef',  // Ana mor
  600: '#c026d3',
  700: '#a21caf',
  800: '#86198f',
  900: '#701a75',
  DEFAULT: '#d946ef',
};

// ===============================================
// ⚫ NEUTRAL COLORS (Nötr Renkler)
// ===============================================
export const NEUTRAL: ColorPalette = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  DEFAULT: '#64748b',
};

// ===============================================
// ✅ SEMANTIC COLORS (Anlamsal Renkler)
// ===============================================
export const SUCCESS: ColorPalette = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',  // Ana yeşil
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  DEFAULT: '#22c55e',
};

export const WARNING: ColorPalette = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',  // Ana sarı
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  DEFAULT: '#f59e0b',
};

export const ERROR: ColorPalette = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',  // Ana kırmızı
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  DEFAULT: '#ef4444',
};

export const INFO: ColorPalette = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // Ana bilgi mavisi
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  DEFAULT: '#3b82f6',
};

// ===============================================
// 🏷️ TAG COLORS (Etiket Renkleri)
// ===============================================
export const TAG_COLORS: TagColorsType = {
  BLUE: '#3b82f6',
  GREEN: '#10b981',
  YELLOW: '#f59e0b',
  PURPLE: '#8b5cf6',
  RED: '#ef4444',
  PINK: '#ec4899',
  INDIGO: '#6366f1',
  TEAL: '#14b8a6',
  ORANGE: '#f97316',
  LIME: '#84cc16',
  CYAN: '#06b6d4',
  ROSE: '#f43f5e',
};

// ===============================================
// 🌓 THEME COLORS (Tema Renkleri)
// ===============================================
export const LIGHT_THEME: ThemeColors = {
  BACKGROUND: '#ffffff',
  SURFACE: '#f8fafc',
  CARD: '#ffffff',
  TEXT_PRIMARY: '#1e293b',
  TEXT_SECONDARY: '#64748b',
  TEXT_MUTED: '#94a3b8',
  BORDER: '#e2e8f0',
  BORDER_LIGHT: '#f1f5f9',
  SHADOW: 'rgba(0, 0, 0, 0.1)',
  OVERLAY: 'rgba(0, 0, 0, 0.5)',
};

export const DARK_THEME: ThemeColors = {
  BACKGROUND: '#0f172a',
  SURFACE: '#1e293b',
  CARD: '#334155',
  TEXT_PRIMARY: '#f8fafc',
  TEXT_SECONDARY: '#cbd5e1',
  TEXT_MUTED: '#94a3b8',
  BORDER: '#475569',
  BORDER_LIGHT: '#334155',
  SHADOW: 'rgba(0, 0, 0, 0.3)',
  OVERLAY: 'rgba(0, 0, 0, 0.7)',
};

// ===============================================
// 🎯 SPECIFIC USE COLORS (Özel Kullanım)
// ===============================================
export const GRADIENT = {
  PRIMARY: 'linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%)',
  SUCCESS: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  WARNING: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  ERROR: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  CARD: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  CARD_DARK: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
};

export const STATUS = {
  PAID: SUCCESS[500],
  UNPAID: ERROR[500],
  PENDING: WARNING[500],
  CANCELLED: NEUTRAL[500],
  ACTIVE: SUCCESS[500],
  INACTIVE: NEUTRAL[400],
  PINNED: WARNING[500],
  ARCHIVED: NEUTRAL[400],
};

// ===============================================
// 🔧 UTILITY FUNCTIONS
// ===============================================

/**
 * Renk opaklığını ayarla
 * @param color - Hex renk kodu
 * @param opacity - Opaklık (0-1)
 * @returns RGBA renk
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Hex'i RGB'ye çevir
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Temaya göre renk al
 * @param theme - 'light' veya 'dark'
 * @param colorKey - Renk anahtarı
 * @returns Renk değeri
 */
export const getThemeColor = (theme: 'light' | 'dark', colorKey: keyof ThemeColors): string => {
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  return colors[colorKey] || colors.TEXT_PRIMARY;
};

/**
 * Random etiket rengi al
 * @returns Random etiket rengi
 */
export const getRandomTagColor = (): string => {
  const colors = Object.values(TAG_COLORS);
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Renk kontrastını hesapla (accessibility için)
 * @param color - Hex renk kodu
 * @returns 'light' veya 'dark'
 */
export const getColorContrast = (color: string): 'light' | 'dark' => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Luminance hesapla
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? 'dark' : 'light';
};

// ===============================================
// 📱 RESPONSIVE BREAKPOINT COLORS
// ===============================================
export const RESPONSIVE = {
  MOBILE_ACCENT: PRIMARY[500],
  TABLET_ACCENT: SECONDARY[500],
  DESKTOP_ACCENT: INFO[500],
};

// ===============================================
// 🎨 DEFAULT EXPORT (Ana Renk Paleti)
// ===============================================
export default {
  PRIMARY,
  SECONDARY,
  NEUTRAL,
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
  TAG_COLORS,
  LIGHT_THEME,
  DARK_THEME,
  GRADIENT,
  STATUS,
  withOpacity,
  getThemeColor,
  getRandomTagColor,
  getColorContrast,
  RESPONSIVE,
};

// ===============================================
// ✅ COLOR CONSTANTS COMPLETE!
// =============================================== 