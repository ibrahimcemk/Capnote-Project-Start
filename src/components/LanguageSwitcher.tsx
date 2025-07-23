/**
 * ===============================================
 * 🌍 CapNote v3.0 - LANGUAGE SWITCHER COMPONENT
 * ===============================================
 * 
 * Memory Ref: 2842747, 2833135 - Multi-language switching UI
 * Dil değiştirme component'i - modern ve kullanıcı dostu
 * 
 * 📋 FEATURES:
 * - Dropdown ile dil seçimi
 * - Bayrak gösterimleri
 * - Smooth transitions
 * - Keyboard navigation
 * - Accessibility compliant
 * ===============================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, NEUTRAL, withOpacity } from '../constants/colors';
import clsx from 'clsx';

// ===============================================
// 🎯 TYPE DEFINITIONS
// ===============================================

export interface LanguageSwitcherProps {
  // Appearance
  variant?: 'default' | 'compact' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right';
  
  // Behavior
  showLabel?: boolean;
  showFlag?: boolean;
  disabled?: boolean;
  
  // Style
  className?: string;
  dropdownClassName?: string;
  
  // Events
  onLanguageChange?: (language: 'tr' | 'en') => void;
}

// ===============================================
// 🌍 LANGUAGE SWITCHER COMPONENT
// ===============================================

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'default',
  size = 'md',
  position = 'right',
  showLabel = true,
  showFlag = true,
  disabled = false,
  className = '',
  dropdownClassName = '',
  onLanguageChange,
}) => {
  
  const { currentLanguage, availableLanguages, changeLanguage, isReady } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // ===============================================
  // 🎨 STYLE CONFIGURATIONS
  // ===============================================
  
  const sizeStyles = {
    sm: {
      button: {
        height: verticalScale(32),
        padding: `0 ${scale(8)}px`,
        fontSize: moderateScale(12),
        gap: scale(4),
      },
      dropdown: {
        fontSize: moderateScale(12),
        padding: scale(4),
      },
    },
    md: {
      button: {
        height: verticalScale(40),
        padding: `0 ${scale(12)}px`,
        fontSize: moderateScale(14),
        gap: scale(6),
      },
      dropdown: {
        fontSize: moderateScale(14),
        padding: scale(6),
      },
    },
    lg: {
      button: {
        height: verticalScale(48),
        padding: `0 ${scale(16)}px`,
        fontSize: moderateScale(16),
        gap: scale(8),
      },
      dropdown: {
        fontSize: moderateScale(16),
        padding: scale(8),
      },
    },
  };
  
  const currentStyle = sizeStyles[size];
  const currentLanguageData = availableLanguages.find(lang => lang.code === currentLanguage);
  
  // ===============================================
  // 🎛️ EVENT HANDLERS
  // ===============================================
  
  const handleLanguageSelect = async (languageCode: 'tr' | 'en') => {
    if (disabled || languageCode === currentLanguage) return;
    
    try {
      const success = await changeLanguage(languageCode);
      if (success) {
        onLanguageChange?.(languageCode);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };
  
  const handleToggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleToggleDropdown();
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };
  
  // ===============================================
  // 🔄 EFFECTS
  // ===============================================
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // ===============================================
  // 🧩 RENDER CONTENT
  // ===============================================
  
  const renderButtonContent = () => {
    if (variant === 'icon-only') {
      return (
        <>
          <GlobeAltIcon style={{ width: moderateScale(16), height: moderateScale(16) }} />
          <ChevronDownIcon 
            style={{ 
              width: moderateScale(12), 
              height: moderateScale(12),
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }} 
          />
        </>
      );
    }
    
    return (
      <>
        {showFlag && currentLanguageData && (
          <span style={{ fontSize: moderateScale(16) }}>
            {currentLanguageData.flag}
          </span>
        )}
        
        {showLabel && currentLanguageData && variant !== 'compact' && (
          <span>{currentLanguageData.nativeName}</span>
        )}
        
        {variant === 'compact' && currentLanguageData && (
          <span style={{ fontWeight: 600 }}>
            {currentLanguageData.code.toUpperCase()}
          </span>
        )}
        
        <ChevronDownIcon 
          style={{ 
            width: moderateScale(14), 
            height: moderateScale(14),
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }} 
        />
      </>
    );
  };
  
  const renderDropdownItem = (language: typeof availableLanguages[0]) => {
    const isSelected = language.code === currentLanguage;
    
    return (
      <motion.button
        key={language.code}
        type="button"
        onClick={() => handleLanguageSelect(language.code)}
        disabled={disabled || isSelected}
        whileHover={{ backgroundColor: withOpacity(PRIMARY.DEFAULT, 0.05) }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: scale(8),
          width: '100%',
          padding: `${verticalScale(8)}px ${scale(12)}px`,
          fontSize: currentStyle.dropdown.fontSize,
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? PRIMARY.DEFAULT : NEUTRAL[700],
          backgroundColor: isSelected ? withOpacity(PRIMARY.DEFAULT, 0.1) : 'transparent',
          border: 'none',
          borderRadius: scale(6),
          cursor: disabled || isSelected ? 'default' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.5 : 1,
        }}
        className="dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <span style={{ fontSize: moderateScale(16) }}>
          {language.flag}
        </span>
        <span style={{ flex: 1, textAlign: 'left' }}>
          {language.nativeName}
        </span>
        {isSelected && (
          <span style={{ 
            fontSize: moderateScale(12), 
            color: PRIMARY.DEFAULT,
            fontWeight: 600 
          }}>
            ✓
          </span>
        )}
      </motion.button>
    );
  };
  
  // Loading state
  if (!isReady) {
    return (
      <div 
        style={{
          height: currentStyle.button.height,
          width: variant === 'icon-only' ? currentStyle.button.height : scale(120),
          backgroundColor: withOpacity(NEUTRAL[300], 0.3),
          borderRadius: scale(8),
        }}
        className="animate-pulse"
      />
    );
  }
  
  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <div className={clsx('relative', className)} style={{ zIndex: 50 }}>
      {/* Main Button */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: currentStyle.button.gap,
          height: currentStyle.button.height,
          padding: currentStyle.button.padding,
          fontSize: currentStyle.button.fontSize,
          fontWeight: 500,
          color: NEUTRAL[700],
          backgroundColor: 'white',
          border: `1px solid ${NEUTRAL[300]}`,
          borderRadius: scale(8),
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          boxShadow: `0 ${verticalScale(1)}px ${scale(3)}px ${withOpacity(NEUTRAL[900], 0.1)}`,
        }}
        className="dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {renderButtonContent()}
      </motion.button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: `calc(100% + ${verticalScale(4)}px)`,
              [position]: 0,
              minWidth: scale(160),
              padding: currentStyle.dropdown.padding,
              backgroundColor: 'white',
              border: `1px solid ${NEUTRAL[200]}`,
              borderRadius: scale(8),
              boxShadow: `0 ${verticalScale(10)}px ${scale(25)}px ${withOpacity(NEUTRAL[900], 0.15)}`,
              zIndex: 1000,
            }}
            className={clsx(
              'dark:bg-gray-800 dark:border-gray-600',
              dropdownClassName
            )}
            role="listbox"
            aria-label="Language options"
          >
            {availableLanguages.map(renderDropdownItem)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===============================================
// 🎯 PREDEFINED VARIANTS
// ===============================================

export const CompactLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'variant'>> = (props) => (
  <LanguageSwitcher variant="compact" {...props} />
);

export const IconOnlyLanguageSwitcher: React.FC<Omit<LanguageSwitcherProps, 'variant'>> = (props) => (
  <LanguageSwitcher variant="icon-only" {...props} />
);

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default LanguageSwitcher; 