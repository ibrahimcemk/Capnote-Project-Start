/**
 * ===============================================
 * 🌓 CapNote v3.0 - MODERN THEME TOGGLE
 * ===============================================
 * 
 * Minimal ve modern tema değiştirme komponenti
 * Smooth animations ve accessibility desteği ile
 * 
 * 📋 FEATURES:
 * - Smooth dark/light mode switching
 * - Modern glassmorphism design
 * - Accessibility compliant
 * - Responsive scaling
 * - Icon animations
 * ===============================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../hooks/useTranslation';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, NEUTRAL, withOpacity } from '../constants/colors';

// ===============================================
// 🎯 TYPE DEFINITIONS
// ===============================================

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'minimal' | 'glass' | 'pill';
  showLabel?: boolean;
  className?: string;
}

// ===============================================
// 🌓 THEME TOGGLE COMPONENT
// ===============================================

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  variant = 'glass',
  showLabel = false,
  className = '',
}) => {
  
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  // ===============================================
  // 🎨 STYLE CONFIGURATIONS
  // ===============================================
  
  const sizeStyles = {
    sm: {
      button: {
        width: scale(32),
        height: verticalScale(32),
        borderRadius: scale(16),
      },
      icon: {
        width: moderateScale(14),
        height: moderateScale(14),
      },
      track: {
        width: scale(48),
        height: verticalScale(24),
        borderRadius: scale(12),
        padding: scale(2),
      },
      thumb: {
        width: scale(20),
        height: verticalScale(20),
        borderRadius: scale(10),
      },
    },
    md: {
      button: {
        width: scale(40),
        height: verticalScale(40),
        borderRadius: scale(20),
      },
      icon: {
        width: moderateScale(18),
        height: moderateScale(18),
      },
      track: {
        width: scale(60),
        height: verticalScale(30),
        borderRadius: scale(15),
        padding: scale(3),
      },
      thumb: {
        width: scale(24),
        height: verticalScale(24),
        borderRadius: scale(12),
      },
    },
    lg: {
      button: {
        width: scale(48),
        height: verticalScale(48),
        borderRadius: scale(24),
      },
      icon: {
        width: moderateScale(22),
        height: moderateScale(22),
      },
      track: {
        width: scale(72),
        height: verticalScale(36),
        borderRadius: scale(18),
        padding: scale(4),
      },
      thumb: {
        width: scale(28),
        height: verticalScale(28),
        borderRadius: scale(14),
      },
    },
  };
  
  const currentSize = sizeStyles[size];
  const isDark = theme === 'dark';
  
  // ===============================================
  // 🎭 ANIMATION VARIANTS
  // ===============================================
  
  const iconVariants = {
    sun: {
      rotate: isDark ? 180 : 0,
      scale: isDark ? 0 : 1,
      opacity: isDark ? 0 : 1,
    },
    moon: {
      rotate: isDark ? 0 : -180,
      scale: isDark ? 1 : 0,
      opacity: isDark ? 1 : 0,
    },
  };
  
  const thumbVariants = {
    light: {
      x: 0,
      backgroundColor: '#FFD700',
    },
    dark: {
      x: currentSize.track.width - currentSize.thumb.width - (currentSize.track.padding * 2),
      backgroundColor: '#6366F1',
    },
  };
  
  // ===============================================
  // 🎨 VARIANT STYLES
  // ===============================================
  
  const getVariantStyles = (): { button: React.CSSProperties; hover: React.CSSProperties } => {
    switch (variant) {
      case 'minimal':
        return {
          button: {
            backgroundColor: 'transparent',
            border: `1px solid ${NEUTRAL[300]}`,
            backdropFilter: 'none',
          },
          hover: {
            backgroundColor: withOpacity(PRIMARY.DEFAULT, 0.05),
            borderColor: PRIMARY.DEFAULT,
          },
        };
        
      case 'glass':
        return {
          button: {
            backgroundColor: withOpacity('#ffffff', 0.1),
            border: `1px solid ${withOpacity('#ffffff', 0.2)}`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 ${verticalScale(4)}px ${scale(16)}px ${withOpacity('#000000', 0.1)}`,
          },
          hover: {
            backgroundColor: withOpacity('#ffffff', 0.15),
            borderColor: withOpacity(PRIMARY.DEFAULT, 0.3),
            boxShadow: `0 ${verticalScale(8)}px ${scale(25)}px ${withOpacity('#000000', 0.15)}`,
          },
        };
        
      case 'pill':
        return {
          button: {
            backgroundColor: isDark ? NEUTRAL[800] : NEUTRAL[100],
            border: `1px solid ${isDark ? NEUTRAL[700] : NEUTRAL[200]}`,
            backdropFilter: 'none',
          },
                     hover: {
             backgroundColor: isDark ? NEUTRAL[700] : NEUTRAL[50],
             borderColor: isDark ? NEUTRAL[600] : NEUTRAL[300],
           },
        };
        
             default:
         return {
           button: {
             backgroundColor: withOpacity('#ffffff', 0.1),
             border: `1px solid ${withOpacity('#ffffff', 0.2)}`,
             backdropFilter: 'blur(10px)',
             boxShadow: `0 ${verticalScale(4)}px ${scale(16)}px ${withOpacity('#000000', 0.1)}`,
           },
           hover: {
             backgroundColor: withOpacity('#ffffff', 0.15),
             borderColor: withOpacity(PRIMARY.DEFAULT, 0.3),
             boxShadow: `0 ${verticalScale(8)}px ${scale(25)}px ${withOpacity('#000000', 0.15)}`,
           },
         };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  // ===============================================
  // 🎬 RENDER VARIANTS
  // ===============================================
  
  const renderMinimalToggle = () => (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: currentSize.button.width,
        height: currentSize.button.height,
        borderRadius: currentSize.button.borderRadius,
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...variantStyles.button,
      }}
      className={`dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      aria-label={t('SETTINGS.THEME')}
      title={isDark ? t('SETTINGS.LIGHT_THEME') : t('SETTINGS.DARK_THEME')}
    >
      <div style={{ position: 'relative', width: currentSize.icon.width, height: currentSize.icon.height }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={iconVariants}
          animate="sun"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <SunIcon style={{ width: '100%', height: '100%', color: '#FFA500' }} />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          variants={iconVariants}
          animate="moon"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <MoonIcon style={{ width: '100%', height: '100%', color: '#6366F1' }} />
        </motion.div>
      </div>
    </motion.button>
  );
  
  const renderPillToggle = () => (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: currentSize.track.width,
        height: currentSize.track.height,
        borderRadius: currentSize.track.borderRadius,
        padding: currentSize.track.padding,
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...variantStyles.button,
      }}
      className={`focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      aria-label={t('SETTINGS.THEME')}
      title={isDark ? t('SETTINGS.LIGHT_THEME') : t('SETTINGS.DARK_THEME')}
    >
      {/* Track Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: currentSize.track.borderRadius,
          background: isDark 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          transition: 'all 0.3s ease',
        }}
      />
      
      {/* Moving Thumb */}
      <motion.div
        variants={thumbVariants}
        animate={isDark ? 'dark' : 'light'}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'relative',
          width: currentSize.thumb.width,
          height: currentSize.thumb.height,
          borderRadius: currentSize.thumb.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 ${verticalScale(2)}px ${scale(8)}px ${withOpacity('#000000', 0.15)}`,
          zIndex: 1,
        }}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isDark ? (
            <MoonIcon style={{ 
              width: currentSize.icon.width * 0.6, 
              height: currentSize.icon.height * 0.6, 
              color: '#ffffff' 
            }} />
          ) : (
            <SunIcon style={{ 
              width: currentSize.icon.width * 0.6, 
              height: currentSize.icon.height * 0.6, 
              color: '#ffffff' 
            }} />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
  
  // ===============================================
  // 🔘 MAIN RENDER
  // ===============================================
  
  return (
    <div className={`flex items-center gap-2 ${showLabel ? 'space-x-2' : ''}`}>
      {variant === 'pill' ? renderPillToggle() : renderMinimalToggle()}
      
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isDark ? t('SETTINGS.DARK_THEME') : t('SETTINGS.LIGHT_THEME')}
        </span>
      )}
    </div>
  );
};

// ===============================================
// 🎯 PREDEFINED VARIANTS
// ===============================================

export const MinimalThemeToggle: React.FC<Omit<ThemeToggleProps, 'variant'>> = (props) => (
  <ThemeToggle variant="minimal" {...props} />
);

export const GlassThemeToggle: React.FC<Omit<ThemeToggleProps, 'variant'>> = (props) => (
  <ThemeToggle variant="glass" {...props} />
);

export const PillThemeToggle: React.FC<Omit<ThemeToggleProps, 'variant'>> = (props) => (
  <ThemeToggle variant="pill" {...props} />
);

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default ThemeToggle; 