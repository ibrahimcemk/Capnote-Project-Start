/**
 * ===============================================
 * 🌍 CapNote v3.0 - MINIMAL LANGUAGE SWITCHER
 * ===============================================
 * 
 * Ultra minimal dil değiştirme komponenti
 * Sade tasarım ve küçük boyut
 * 
 * 📋 FEATURES:
 * - Ultra minimal design
 * - Small footprint
 * - Smooth transitions
 * - Clean dropdown
 * ===============================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../hooks/useTranslation';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';

// ===============================================
// 🎯 TYPE DEFINITIONS
// ===============================================

export interface MinimalLanguageSwitcherProps {
  className?: string;
  onLanguageChange?: (language: 'tr' | 'en') => void;
}

// ===============================================
// 🌍 MINIMAL LANGUAGE SWITCHER
// ===============================================

export const MinimalLanguageSwitcher: React.FC<MinimalLanguageSwitcherProps> = ({
  className = '',
  onLanguageChange,
}) => {
  
  const { currentLanguage, availableLanguages, changeLanguage, isReady } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // ===============================================
  // 🎛️ EVENT HANDLERS
  // ===============================================
  
  const handleLanguageSelect = async (languageCode: 'tr' | 'en') => {
    if (languageCode === currentLanguage) return;
    
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
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // ===============================================
  // 🧩 CURRENT LANGUAGE DATA
  // ===============================================
  
  const currentLanguageData = availableLanguages.find(lang => lang.code === currentLanguage);
  
  // Loading state
  if (!isReady || !currentLanguageData) {
    return (
      <div 
        style={{
          width: scale(44),
          height: verticalScale(28),
          backgroundColor: '#f1f5f9',
          borderRadius: scale(6),
        }}
        className="animate-pulse"
      />
    );
  }
  
  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <div className={`relative ${className}`} style={{ zIndex: 50 }}>
      {/* Main Button */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleToggleDropdown}
        whileHover={{ backgroundColor: '#f8fafc' }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: scale(4),
          height: verticalScale(28),
          padding: `0 ${scale(8)}px`,
          fontSize: moderateScale(12),
          fontWeight: 500,
          color: '#64748b',
          backgroundColor: 'transparent',
          border: '1px solid #e2e8f0',
          borderRadius: scale(6),
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          outline: 'none',
        }}
        className="dark:bg-gray-800/30 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span style={{ fontSize: moderateScale(11) }}>
          {currentLanguageData.flag}
        </span>
        <span style={{ 
          fontSize: moderateScale(11),
          fontWeight: 600,
          letterSpacing: '0.025em'
        }}>
          {currentLanguageData.code.toUpperCase()}
        </span>
        <ChevronDownIcon 
          style={{ 
            width: moderateScale(12), 
            height: moderateScale(12),
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease',
            opacity: 0.6,
          }} 
        />
      </motion.button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: `calc(100% + ${verticalScale(4)}px)`,
              right: 0,
              minWidth: scale(100),
              padding: scale(4),
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: scale(8),
              boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              zIndex: 1000,
            }}
            className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg dark:shadow-black/20"
          >
            {availableLanguages.map((language) => {
              const isSelected = language.code === currentLanguage;
              
              return (
                <motion.button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageSelect(language.code)}
                  disabled={isSelected}
                  whileHover={!isSelected ? { backgroundColor: '#f8fafc' } : {}}
                  whileTap={!isSelected ? { scale: 0.98 } : {}}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: scale(6),
                    width: '100%',
                    padding: `${verticalScale(6)}px ${scale(8)}px`,
                    fontSize: moderateScale(12),
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? '#3b82f6' : '#64748b',
                    backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                    border: 'none',
                    borderRadius: scale(4),
                    cursor: isSelected ? 'default' : 'pointer',
                    transition: 'all 0.12s ease',
                    opacity: isSelected ? 1 : 0.9,
                  }}
                  className="dark:text-gray-300 dark:hover:bg-gray-700/50 data-[selected]:dark:bg-blue-900/30 data-[selected]:dark:text-blue-400"
                  data-selected={isSelected}
                >
                  <span style={{ fontSize: moderateScale(11) }}>
                    {language.flag}
                  </span>
                  <span style={{ 
                    flex: 1, 
                    textAlign: 'left',
                    fontSize: moderateScale(11),
                    letterSpacing: '0.025em'
                  }}>
                    {language.nativeName}
                  </span>
                  {isSelected && (
                    <span style={{ 
                      fontSize: moderateScale(10), 
                      color: '#3b82f6',
                      fontWeight: 700,
                    }}>
                      ✓
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================

export default MinimalLanguageSwitcher; 