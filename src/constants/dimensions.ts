/**
 * ===============================================
 * 📐 CapNote v3.0 - DIMENSIONS CONSTANTS
 * ===============================================
 * 
 * Responsive ölçülendirme ve boyut sabitleri
 * Memory Ref: 2833109, 2833135 - Responsive scaling gereksinimi
 * 
 * 📋 İÇERİK:
 * - scale() - Horizontal measurements (width, padding, marginRight, borderRadius)
 * - verticalScale() - Vertical measurements (height, marginBottom, minHeight)  
 * - moderateScale() - Balanced scaling (fontSize, iconSize)
 * - Breakpoints (Mobile, Tablet, Desktop)
 * - Common Dimensions (Spacing, Sizes)
 * - Layout Constants
 * ===============================================
 */

// ===============================================
// 📱 DEVICE DIMENSIONS (Cihaz Boyutları)
// ===============================================
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = typeof window !== 'undefined' 
  ? { width: window.innerWidth, height: window.innerHeight }
  : { width: 375, height: 812 }; // Default iPhone X dimensions

// Referans boyutlar (iPhone X temel alınarak)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// ===============================================
// 🔧 RESPONSIVE SCALING FUNCTIONS
// ===============================================

/**
 * Horizontal ölçülendirme (genişlik, yatay padding, margin, border radius)
 * Memory Ref: 2833109 - "scale for horizontal measurements"
 * 
 * @param size - Ölçeklendirilecek boyut
 * @returns Ölçeklendirilmiş boyut
 */
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Vertical ölçülendirme (yükseklik, dikey margin, minimum yükseklik)
 * Memory Ref: 2833109 - "verticalScale for vertical measurements"
 * 
 * @param size - Ölçeklendirilecek boyut
 * @returns Ölçeklendirilmiş boyut
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Dengeli ölçülendirme (font boyutu, ikon boyutu, balanced elements)
 * Memory Ref: 2833109 - "moderateScale for balanced scaling"
 * 
 * @param size - Ölçeklendirilecek boyut
 * @param factor - Ölçeklendirme faktörü (0-1 arası, default: 0.5)
 * @returns Ölçeklendirilmiş boyut
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Ekran yoğunluğuna göre ölçeklendirme
 * @param size - Ölçeklendirilecek boyut
 * @returns Pixel ratio'ya göre ölçeklendirilmiş boyut
 */
export const pixelScale = (size: number): number => {
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 2;
  return size * pixelRatio;
};

// ===============================================
// 📏 BREAKPOINTS (Responsive Kırılım Noktaları)
// ===============================================
export const BREAKPOINTS = {
  MOBILE: {
    MIN: 0,
    MAX: 767,
  },
  TABLET: {
    MIN: 768,
    MAX: 1023,
  },
  DESKTOP: {
    MIN: 1024,
    MAX: Infinity,
  },
  // Additional breakpoints
  SMALL_MOBILE: {
    MIN: 0,
    MAX: 479,
  },
  LARGE_MOBILE: {
    MIN: 480,
    MAX: 767,
  },
  SMALL_TABLET: {
    MIN: 768,
    MAX: 991,
  },
  LARGE_TABLET: {
    MIN: 992,
    MAX: 1199,
  },
  SMALL_DESKTOP: {
    MIN: 1200,
    MAX: 1599,
  },
  LARGE_DESKTOP: {
    MIN: 1600,
    MAX: Infinity,
  },
};

// ===============================================
// 📦 SPACING (Boşluklar)
// ===============================================
export const SPACING = {
  // Base spacing units
  XS: scale(4),
  SM: scale(8),
  MD: scale(16),
  LG: scale(24),
  XL: scale(32),
  XXL: scale(48),
  XXXL: scale(64),
  
  // Semantic spacing
  PADDING: {
    XS: scale(4),
    SM: scale(8),
    MD: scale(16),
    LG: scale(24),
    XL: scale(32),
  },
  
  MARGIN: {
    XS: verticalScale(4),
    SM: verticalScale(8),
    MD: verticalScale(16),
    LG: verticalScale(24),
    XL: verticalScale(32),
  },
  
  GAP: {
    XS: scale(4),
    SM: scale(8),
    MD: scale(12),
    LG: scale(16),
    XL: scale(20),
  },
};

// ===============================================
// 📐 SIZES (Boyutlar)
// ===============================================
export const SIZES = {
  // Icon sizes
  ICON: {
    XS: moderateScale(12),
    SM: moderateScale(16),
    MD: moderateScale(20),
    LG: moderateScale(24),
    XL: moderateScale(32),
    XXL: moderateScale(48),
  },
  
  // Avatar sizes
  AVATAR: {
    XS: scale(24),
    SM: scale(32),
    MD: scale(40),
    LG: scale(48),
    XL: scale(64),
    XXL: scale(96),
  },
  
  // Button sizes
  BUTTON: {
    HEIGHT: {
      SM: verticalScale(32),
      MD: verticalScale(40),
      LG: verticalScale(48),
      XL: verticalScale(56),
    },
    MIN_WIDTH: {
      SM: scale(80),
      MD: scale(120),
      LG: scale(160),
      XL: scale(200),
    },
  },
  
  // Input sizes
  INPUT: {
    HEIGHT: {
      SM: verticalScale(36),
      MD: verticalScale(44),
      LG: verticalScale(52),
    },
    MIN_WIDTH: scale(200),
  },
  
  // Card sizes
  CARD: {
    MIN_HEIGHT: verticalScale(120),
    MAX_WIDTH: scale(400),
    BORDER_RADIUS: scale(12),
  },
  
  // Modal sizes
  MODAL: {
    MAX_WIDTH: scale(500),
    MAX_HEIGHT: verticalScale(600),
    BORDER_RADIUS: scale(16),
  },
};

// ===============================================
// 📱 LAYOUT CONSTANTS
// ===============================================
export const LAYOUT = {
  // Header
  HEADER: {
    HEIGHT: verticalScale(60),
    PADDING: scale(16),
  },
  
  // Sidebar
  SIDEBAR: {
    WIDTH: scale(280),
    COLLAPSED_WIDTH: scale(60),
  },
  
  // Navigation
  NAV: {
    HEIGHT: verticalScale(56),
    ITEM_HEIGHT: verticalScale(48),
    ITEM_PADDING: scale(16),
  },
  
  // Content
  CONTENT: {
    MAX_WIDTH: scale(1200),
    PADDING: scale(20),
    MARGIN: scale(16),
  },
  
  // Footer
  FOOTER: {
    HEIGHT: verticalScale(48),
    PADDING: scale(16),
  },
  
  // FAB (Floating Action Button)
  FAB: {
    SIZE: scale(56),
    MINI_SIZE: scale(40),
    BOTTOM_OFFSET: verticalScale(24),
    RIGHT_OFFSET: scale(24),
  },
};

// ===============================================
// 🔄 ANIMATION DIMENSIONS
// ===============================================
export const ANIMATION = {
  // Slide distances
  SLIDE: {
    SM: scale(20),
    MD: scale(40),
    LG: scale(60),
  },
  
  // Scale factors
  SCALE: {
    PRESS: 0.95,
    HOVER: 1.05,
    FOCUS: 1.02,
  },
  
  // Transform origins
  TRANSFORM: {
    CENTER: '50% 50%',
    TOP: '50% 0%',
    BOTTOM: '50% 100%',
    LEFT: '0% 50%',
    RIGHT: '100% 50%',
  },
};

// ===============================================
// 📊 RESPONSIVE UTILITIES
// ===============================================

/**
 * Ekran boyutuna göre değer döndür
 * @param values - { mobile, tablet, desktop } değerleri
 * @returns Ekran boyutuna uygun değer
 */
export const responsive = (values: { mobile: any; tablet?: any; desktop?: any }): any => {
  const { mobile, tablet, desktop } = values;
  
  if (SCREEN_WIDTH <= BREAKPOINTS.MOBILE.MAX) {
    return mobile;
  } else if (SCREEN_WIDTH <= BREAKPOINTS.TABLET.MAX) {
    return tablet || mobile;
  } else {
    return desktop || tablet || mobile;
  }
};

/**
 * Minimum ve maksimum değer arasında sınırla
 * @param value - Sınırlanacak değer
 * @param min - Minimum değer
 * @param max - Maksimum değer
 * @returns Sınırlanmış değer
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Aspect ratio'ya göre yükseklik hesapla
 * @param width - Genişlik
 * @param aspectRatio - En boy oranı (örn: 16/9)
 * @returns Hesaplanmış yükseklik
 */
export const calculateHeight = (width: number, aspectRatio: number): number => {
  return width / aspectRatio;
};

/**
 * Aspect ratio'ya göre genişlik hesapla
 * @param height - Yükseklik
 * @param aspectRatio - En boy oranı (örn: 16/9)
 * @returns Hesaplanmış genişlik
 */
export const calculateWidth = (height: number, aspectRatio: number): number => {
  return height * aspectRatio;
};

// ===============================================
// 📏 COMMON RATIOS
// ===============================================
export const ASPECT_RATIOS = {
  SQUARE: 1,
  GOLDEN: 1.618,
  CARD: 3/2,
  WIDESCREEN: 16/9,
  ULTRAWIDE: 21/9,
  PORTRAIT: 3/4,
  LANDSCAPE: 4/3,
};

// ===============================================
// 🎯 DEVICE SPECIFIC
// ===============================================
export const DEVICE = {
  IS_MOBILE: SCREEN_WIDTH <= BREAKPOINTS.MOBILE.MAX,
  IS_TABLET: SCREEN_WIDTH > BREAKPOINTS.MOBILE.MAX && SCREEN_WIDTH <= BREAKPOINTS.TABLET.MAX,
  IS_DESKTOP: SCREEN_WIDTH > BREAKPOINTS.TABLET.MAX,
  
  // Screen info
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BASE_WIDTH,
  BASE_HEIGHT,
  
  // Ratios
  WIDTH_RATIO: SCREEN_WIDTH / BASE_WIDTH,
  HEIGHT_RATIO: SCREEN_HEIGHT / BASE_HEIGHT,
};

// ===============================================
// 🔧 UTILITY MIXINS
// ===============================================
export const MIXINS = {
  // Center content
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Full size
  fullSize: {
    width: '100%',
    height: '100%',
  },
  
  // Absolute center
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  
  // Shadow
  shadow: (elevation = 1) => ({
    boxShadow: `0 ${verticalScale(elevation * 2)}px ${scale(elevation * 4)}px rgba(0, 0, 0, 0.1)`,
  }),
  
  // Border radius
  rounded: (size: string | number = 'MD') => ({
    borderRadius: scale(typeof size === 'string' ? (SPACING as any)[size] || 16 : size),
  }),
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================
export default {
  // Core functions
  scale,
  verticalScale,
  moderateScale,
  pixelScale,
  
  // Constants
  BREAKPOINTS,
  SPACING,
  SIZES,
  LAYOUT,
  ANIMATION,
  ASPECT_RATIOS,
  DEVICE,
  
  // Utilities
  responsive,
  clamp,
  calculateHeight,
  calculateWidth,
  MIXINS,
};

// ===============================================
// ✅ DIMENSIONS CONSTANTS COMPLETE!
// ===============================================

/*
  🎉 CapNote Dimensions v3.0 Hazır!
  
  📐 RESPONSIVE SCALING:
  ├── 📏 scale() - Horizontal measurements
  ├── 📐 verticalScale() - Vertical measurements  
  ├── ⚖️ moderateScale() - Balanced scaling
  └── 🔍 pixelScale() - Pixel density scaling
  
  📊 SABITLER:
  ├── 📱 Breakpoints: 6 responsive breakpoint
  ├── 📦 Spacing: XS to XXXL spacing units
  ├── 📐 Sizes: Icon, Avatar, Button, Input, Card, Modal
  ├── 📱 Layout: Header, Sidebar, Nav, Content, Footer
  ├── 🔄 Animation: Slide, Scale, Transform dimensions
  └── 🎯 Device: Screen info ve ratios
  
  🔧 UTILITIES:
  ├── responsive() - Screen size based values
  ├── clamp() - Min/max value constraint
  ├── calculateHeight/Width() - Aspect ratio calculations
  └── MIXINS - Common style patterns
  
  ✨ Memory Requirements COMPLETED!
  🚀 Responsive scaling functions ready!
  
  Usage:
  import { scale, verticalScale, moderateScale } from '@/constants/dimensions';
  
  Happy Scaling! 📐
*/ 