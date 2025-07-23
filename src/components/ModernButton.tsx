/**
 * ===============================================
 * 🔘 CapNote v3.0 - MODERN BUTTON COMPONENT
 * ===============================================
 * 
 * Memory Ref: 2604231, 2833135 - "ModernButton for buttons"
 * Responsive, accessible ve modern tasarımlı button komponenti
 * 
 * 📋 ÖZELLİKLER:
 * - Responsive scaling (scale, verticalScale, moderateScale)
 * - Accessibility props (accessibilityLabel, role)
 * - Multiple variants (primary, secondary, ghost, danger)
 * - Size variants (sm, md, lg, xl)
 * - Loading states
 * - Icon support
 * - Touch feedback animations
 * ===============================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { scale, verticalScale, moderateScale } from '../constants/dimensions';
import { PRIMARY, SECONDARY, SUCCESS, ERROR, NEUTRAL, withOpacity } from '../constants/colors';
import { LoadingSpinner } from './LoadingSpinner';

// ===============================================
// 🎨 TYPE DEFINITIONS
// ===============================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ModernButtonProps {
  // ===============================================
  // 📝 Basic Props
  // ===============================================
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  
  // ===============================================
  // 🎨 Styling Props
  // ===============================================
  className?: string;
  style?: React.CSSProperties;
  
  // ===============================================
  // 🖱️ Event Props
  // ===============================================
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPress?: () => void; // Mobile-style event
  
  // ===============================================
  // ♿ Accessibility Props (Memory Requirement)
  // ===============================================
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // ===============================================
  // 🎯 Icon Props
  // ===============================================
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  
  // ===============================================
  // 🔄 Animation Props
  // ===============================================
  disableAnimation?: boolean;
  animationScale?: number;
  animationDuration?: number;
  
  // ===============================================
  // 📱 Touch Props
  // ===============================================
  activeOpacity?: number;
  pressRetentionOffset?: number;
  hitSlop?: number;
}

// ===============================================
// 🎨 STYLE CONFIGURATIONS
// ===============================================

const VARIANT_STYLES = {
  primary: {
    backgroundColor: PRIMARY.DEFAULT,
    color: '#ffffff',
    border: `2px solid ${PRIMARY.DEFAULT}`,
    hover: {
      backgroundColor: PRIMARY[600],
      borderColor: PRIMARY[600],
      transform: 'translateY(-1px)',
      boxShadow: `0 ${verticalScale(8)}px ${scale(25)}px ${withOpacity(PRIMARY.DEFAULT, 0.25)}`,
    },
    active: {
      backgroundColor: PRIMARY[700],
      transform: 'translateY(0px)',
    },
    focus: {
      boxShadow: `0 0 0 ${scale(3)}px ${withOpacity(PRIMARY.DEFAULT, 0.3)}`,
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    color: PRIMARY.DEFAULT,
    border: `2px solid ${PRIMARY.DEFAULT}`,
    hover: {
      backgroundColor: withOpacity(PRIMARY.DEFAULT, 0.1),
      borderColor: PRIMARY[600],
      color: PRIMARY[600],
    },
    active: {
      backgroundColor: withOpacity(PRIMARY.DEFAULT, 0.2),
    },
    focus: {
      boxShadow: `0 0 0 ${scale(3)}px ${withOpacity(PRIMARY.DEFAULT, 0.3)}`,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: NEUTRAL[700],
    border: '2px solid transparent',
    hover: {
      backgroundColor: withOpacity(NEUTRAL[500], 0.1),
      color: NEUTRAL[900],
    },
    active: {
      backgroundColor: withOpacity(NEUTRAL[500], 0.2),
    },
    focus: {
      boxShadow: `0 0 0 ${scale(3)}px ${withOpacity(NEUTRAL[500], 0.3)}`,
    },
  },
  danger: {
    backgroundColor: ERROR.DEFAULT,
    color: '#ffffff',
    border: `2px solid ${ERROR.DEFAULT}`,
    hover: {
      backgroundColor: ERROR[600],
      borderColor: ERROR[600],
      transform: 'translateY(-1px)',
      boxShadow: `0 ${verticalScale(8)}px ${scale(25)}px ${withOpacity(ERROR.DEFAULT, 0.25)}`,
    },
    active: {
      backgroundColor: ERROR[700],
      transform: 'translateY(0px)',
    },
    focus: {
      boxShadow: `0 0 0 ${scale(3)}px ${withOpacity(ERROR.DEFAULT, 0.3)}`,
    },
  },
  success: {
    backgroundColor: SUCCESS.DEFAULT,
    color: '#ffffff',
    border: `2px solid ${SUCCESS.DEFAULT}`,
    hover: {
      backgroundColor: SUCCESS[600],
      borderColor: SUCCESS[600],
      transform: 'translateY(-1px)',
      boxShadow: `0 ${verticalScale(8)}px ${scale(25)}px ${withOpacity(SUCCESS.DEFAULT, 0.25)}`,
    },
    active: {
      backgroundColor: SUCCESS[700],
      transform: 'translateY(0px)',
    },
    focus: {
      boxShadow: `0 0 0 ${scale(3)}px ${withOpacity(SUCCESS.DEFAULT, 0.3)}`,
    },
  },
};

const SIZE_STYLES = {
  xs: {
    height: verticalScale(28),
    paddingHorizontal: scale(8),
    fontSize: moderateScale(11),
    borderRadius: scale(5),
    minWidth: scale(60),
    iconSize: moderateScale(12),
    gap: scale(4),
  },
  sm: {
    height: verticalScale(32),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(12),
    borderRadius: scale(6),
    minWidth: scale(80),
    iconSize: moderateScale(14),
    gap: scale(6),
  },
  md: {
    height: verticalScale(40),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(14),
    borderRadius: scale(8),
    minWidth: scale(120),
    iconSize: moderateScale(16),
    gap: scale(8),
  },
  lg: {
    height: verticalScale(48),
    paddingHorizontal: scale(20),
    fontSize: moderateScale(16),
    borderRadius: scale(10),
    minWidth: scale(160),
    iconSize: moderateScale(18),
    gap: scale(10),
  },
  xl: {
    height: verticalScale(56),
    paddingHorizontal: scale(24),
    fontSize: moderateScale(18),
    borderRadius: scale(12),
    minWidth: scale(200),
    iconSize: moderateScale(20),
    gap: scale(12),
  },
};

// ===============================================
// 🔘 MODERN BUTTON COMPONENT
// ===============================================

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  style = {},
  onClick,
  onPress,
  
  // Accessibility props (Memory requirement)
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  role = 'button',
  ariaLabel,
  ariaDescribedBy,
  
  // Icon props
  leftIcon,
  rightIcon,
  iconOnly = false,
  
  // Animation props
  disableAnimation = false,
  animationScale = 0.95,
  animationDuration = 0.1,
  
  // Touch props  
  activeOpacity = 0.8,
  pressRetentionOffset = 10,
  hitSlop = 0,
}) => {
  
  // ===============================================
  // 🎨 STYLE CALCULATION
  // ===============================================
  
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  
  const baseStyles: React.CSSProperties = {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeStyle.gap,
    
    // Sizing
    height: sizeStyle.height,
    paddingLeft: iconOnly ? sizeStyle.height / 4 : sizeStyle.paddingHorizontal,
    paddingRight: iconOnly ? sizeStyle.height / 4 : sizeStyle.paddingHorizontal,
    minWidth: iconOnly ? sizeStyle.height : (fullWidth ? '100%' : sizeStyle.minWidth),
    width: fullWidth ? '100%' : 'auto',
    
    // Appearance
    backgroundColor: variantStyle.backgroundColor,
    color: variantStyle.color,
    border: variantStyle.border,
    borderRadius: sizeStyle.borderRadius,
    fontSize: sizeStyle.fontSize,
    fontWeight: 600,
    fontFamily: 'Inter, system-ui, sans-serif',
    
    // Interaction
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    
    // Transition
    transition: disableAnimation ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Touch target (44px minimum for accessibility)
    minHeight: Math.max(verticalScale(44), sizeStyle.height),
    
    // Hit slop simulation
    padding: hitSlop > 0 ? `${hitSlop}px` : undefined,
    margin: hitSlop > 0 ? `-${hitSlop}px` : undefined,
    
    ...style,
  };
  
  // ===============================================
  // 🎭 EVENT HANDLERS
  // ===============================================
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    onClick?.(event);
    onPress?.();
  };
  
  // ===============================================
  // 🎬 ANIMATION VARIANTS
  // ===============================================
  
  const animationVariants = {
    initial: { scale: 1 },
    hover: !disableAnimation && !disabled && !loading ? {
      scale: 1.02,
      transition: { duration: 0.1 },
    } : {},
    tap: !disableAnimation && !disabled && !loading ? {
      scale: animationScale,
      transition: { duration: animationDuration },
    } : {},
  };
  
  // ===============================================
  // 🧩 CONTENT RENDERING
  // ===============================================
  
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner 
            size="sm"
            text=""
          />
          {!iconOnly && (
            <span style={{ marginLeft: scale(4) }}>
              {typeof children === 'string' ? children : 'Loading...'}
            </span>
          )}
        </>
      );
    }
    
    return (
      <>
        {leftIcon && (
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: sizeStyle.iconSize,
            }}
          >
            {leftIcon}
          </span>
        )}
        
        {!iconOnly && children && (
          <span>{children}</span>
        )}
        
        {rightIcon && (
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: sizeStyle.iconSize,
            }}
          >
            {rightIcon}
          </span>
        )}
        
        {iconOnly && (leftIcon || rightIcon) && (
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: sizeStyle.iconSize,
            }}
          >
            {leftIcon || rightIcon}
          </span>
        )}
      </>
    );
  };
  
  // ===============================================
  // 🔘 COMPONENT RENDER
  // ===============================================
  
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={className}
      style={baseStyles}
      onClick={handleClick}
      
      // Animation
      variants={animationVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      
      // Accessibility props (Memory requirement)
      aria-label={ariaLabel || accessibilityLabel}
      aria-describedby={ariaDescribedBy}
      role={accessibilityRole || role}
      title={accessibilityHint}
      
      // Focus handling
      onFocus={(e) => {
        if (!disabled && !loading) {
          e.target.style.boxShadow = variantStyle.focus.boxShadow || '';
        }
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = '';
      }}
      
      // Hover handling  
      onMouseEnter={(e) => {
        if (!disabled && !loading && !disableAnimation) {
          Object.assign(e.currentTarget.style, variantStyle.hover);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading && !disableAnimation) {
          e.currentTarget.style.backgroundColor = variantStyle.backgroundColor;
          e.currentTarget.style.borderColor = variantStyle.border.split(' ')[2];
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.color = variantStyle.color;
        }
      }}
      
      // Active handling
      onMouseDown={(e) => {
        if (!disabled && !loading && !disableAnimation) {
          Object.assign(e.currentTarget.style, variantStyle.active);
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !loading && !disableAnimation) {
          e.currentTarget.style.backgroundColor = variantStyle.backgroundColor;
          e.currentTarget.style.transform = 'none';
        }
      }}
    >
      {renderContent()}
    </motion.button>
  );
};

// ===============================================
// 🎯 PREDEFINED BUTTON VARIANTS
// ===============================================

export const PrimaryButton: React.FC<Omit<ModernButtonProps, 'variant'>> = (props) => (
  <ModernButton variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ModernButtonProps, 'variant'>> = (props) => (
  <ModernButton variant="secondary" {...props} />
);

export const GhostButton: React.FC<Omit<ModernButtonProps, 'variant'>> = (props) => (
  <ModernButton variant="ghost" {...props} />
);

export const DangerButton: React.FC<Omit<ModernButtonProps, 'variant'>> = (props) => (
  <ModernButton variant="danger" {...props} />
);

export const SuccessButton: React.FC<Omit<ModernButtonProps, 'variant'>> = (props) => (
  <ModernButton variant="success" {...props} />
);

// ===============================================
// 🔧 UTILITY COMPONENTS
// ===============================================

export const IconButton: React.FC<Omit<ModernButtonProps, 'iconOnly'>> = (props) => (
  <ModernButton iconOnly {...props} />
);

export const LoadingButton: React.FC<Omit<ModernButtonProps, 'loading'>> = (props) => (
  <ModernButton loading {...props} />
);

export const FullWidthButton: React.FC<Omit<ModernButtonProps, 'fullWidth'>> = (props) => (
  <ModernButton fullWidth {...props} />
);

// ===============================================
// 📱 DEFAULT EXPORT
// ===============================================
export default ModernButton;

// ===============================================
// ✅ MODERN BUTTON COMPLETE!
// ===============================================

/*
  🎉 CapNote ModernButton v3.0 Hazır!
  
  🔘 BUTTON VARIANTS:
  ├── 🔵 Primary - Ana eylem butonu
  ├── ⚪ Secondary - İkincil eylem butonu
  ├── 👻 Ghost - Minimal görünüm butonu
  ├── ❌ Danger - Tehlikeli işlem butonu
  └── ✅ Success - Başarı bildirimi butonu
  
  📐 SIZE VARIANTS:
  ├── SM - 32px height, 12px font
  ├── MD - 40px height, 14px font
  ├── LG - 48px height, 16px font
  └── XL - 56px height, 18px font
  
  ♿ ACCESSIBILITY:
  ├── accessibilityLabel, role props
  ├── 44px minimum touch target
  ├── Keyboard navigation support
  ├── Screen reader compatibility
  └── ARIA attributes
  
  📱 RESPONSIVE:
  ├── scale() - horizontal measurements
  ├── verticalScale() - vertical measurements
  ├── moderateScale() - balanced scaling
  └── Touch-friendly sizing
  
  🎭 ANIMATIONS:
  ├── Hover effects
  ├── Touch feedback
  ├── Loading states
  ├── Focus indicators
  └── Press animations
  
  🔧 PREDEFINED VARIANTS:
  ├── PrimaryButton, SecondaryButton
  ├── GhostButton, DangerButton, SuccessButton
  ├── IconButton, LoadingButton
  └── FullWidthButton
  
  ✨ Memory Requirements COMPLETED!
  🚀 Modern, responsive, accessible button ready!
  
  Usage:
  import { ModernButton, PrimaryButton } from '@/components/ModernButton';
  
  <ModernButton variant="primary" size="lg" accessibilityLabel="Save note">
    Save Note
  </ModernButton>
  
  Happy Buttoning! 🔘
*/ 