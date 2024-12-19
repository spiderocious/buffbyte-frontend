import React from 'react';
import { motion } from 'framer-motion';
import { 
  BsTwitter, 
  BsInstagram, 
  BsTiktok, 
  BsLinkedin,
  BsYoutube,
  BsFacebook
} from 'react-icons/bs';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PlatformBadgeProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  size = 'md',
  variant = 'solid',
  showLabel = true,
  className = '',
  onClick,
  animated = true
}) => {
  // Platform configuration
  const platformConfig = {
    twitter: {
      icon: BsTwitter,
      label: 'Twitter',
      color: {
        solid: 'bg-blue-500 text-white border-blue-500',
        outline: 'bg-transparent text-blue-500 border-blue-500',
        subtle: 'bg-blue-50 text-blue-600 border-blue-200'
      }
    },
    instagram: {
      icon: BsInstagram,
      label: 'Instagram',
      color: {
        solid: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent',
        outline: 'bg-transparent text-pink-500 border-pink-500',
        subtle: 'bg-pink-50 text-pink-600 border-pink-200'
      }
    },
    tiktok: {
      icon: BsTiktok,
      label: 'TikTok',
      color: {
        solid: 'bg-black text-white border-black',
        outline: 'bg-transparent text-black border-black',
        subtle: 'bg-gray-50 text-gray-700 border-gray-200'
      }
    },
    linkedin: {
      icon: BsLinkedin,
      label: 'LinkedIn',
      color: {
        solid: 'bg-blue-700 text-white border-blue-700',
        outline: 'bg-transparent text-blue-700 border-blue-700',
        subtle: 'bg-blue-50 text-blue-700 border-blue-200'
      }
    },
    youtube: {
      icon: BsYoutube,
      label: 'YouTube',
      color: {
        solid: 'bg-red-600 text-white border-red-600',
        outline: 'bg-transparent text-red-600 border-red-600',
        subtle: 'bg-red-50 text-red-600 border-red-200'
      }
    },
    facebook: {
      icon: BsFacebook,
      label: 'Facebook',
      color: {
        solid: 'bg-blue-600 text-white border-blue-600',
        outline: 'bg-transparent text-blue-600 border-blue-600',
        subtle: 'bg-blue-50 text-blue-600 border-blue-200'
      }
    }
  };

  // Size configuration
  const sizeConfig = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      spacing: 'space-x-1',
      rounded: 'rounded'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      spacing: 'space-x-2',
      rounded: 'rounded-md'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      spacing: 'space-x-2',
      rounded: 'rounded-lg'
    }
  };

  const config = platformConfig[platform];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  // Animation variants
  const badgeVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" as const }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: platform === 'instagram' ? 15 : 0,
      transition: { duration: 0.2 }
    }
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      variants={animated ? badgeVariants : undefined}
      initial="initial"
      whileHover={animated && onClick ? "hover" : undefined}
      whileTap={animated && onClick ? "tap" : undefined}
      onClick={onClick}
      className={`
        inline-flex items-center font-medium border transition-all duration-200
        ${sizeStyles.container} ${sizeStyles.spacing} ${sizeStyles.rounded}
        ${config.color[variant]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500' : ''}
        ${className}
      `}
    >
      <motion.div
        variants={animated ? iconVariants : undefined}
        className="flex-shrink-0"
      >
        <Icon className={sizeStyles.icon} />
      </motion.div>
      
      {showLabel && (
        <span className="font-medium">
          {config.label}
        </span>
      )}
      
      {/* Special gradient overlay for Instagram */}
      {platform === 'instagram' && variant === 'solid' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md opacity-0 hover:opacity-10 transition-opacity duration-200" />
      )}
    </Component>
  );
};

export default PlatformBadge;