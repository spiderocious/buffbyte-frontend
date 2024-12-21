import React from 'react';
import { motion } from 'framer-motion';
import PlatformIcon from '../platform-icon';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PlatformOption {
  platform: Platform;
  label: string;
  enabled?: boolean;
}

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  platforms?: PlatformOption[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onPlatformChange,
  platforms,
  size = 'md',
  className = ''
}) => {
  const defaultPlatforms: PlatformOption[] = [
    { platform: 'twitter', label: 'Twitter', enabled: true },
    { platform: 'instagram', label: 'Instagram', enabled: true },
    { platform: 'tiktok', label: 'TikTok', enabled: true },
    { platform: 'linkedin', label: 'LinkedIn', enabled: true },
    { platform: 'youtube', label: 'YouTube', enabled: true }
  ];

  const platformOptions = platforms || defaultPlatforms;

  const sizeConfig = {
    sm: {
      container: 'p-1',
      button: 'px-3 py-2 text-sm',
      icon: 'sm' as const
    },
    md: {
      container: 'p-1',
      button: 'px-4 py-2.5 text-sm',
      icon: 'md' as const
    },
    lg: {
      container: 'p-1.5',
      button: 'px-5 py-3 text-base',
      icon: 'lg' as const
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`bg-slate-100 rounded-xl ${config.container} ${className}`}>
      <div className="flex space-x-1">
        {platformOptions.map((option) => {
          const isActive = selectedPlatform === option.platform;
          const isEnabled = option.enabled !== false;
          
          return (
            <motion.button
              key={option.platform}
              onClick={() => isEnabled && onPlatformChange(option.platform)}
              whileHover={isEnabled ? { scale: 1.02 } : undefined}
              whileTap={isEnabled ? { scale: 0.98 } : undefined}
              disabled={!isEnabled}
              className={`
                flex items-center space-x-2 rounded-lg font-medium transition-all duration-200
                ${config.button}
                ${isActive 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : isEnabled
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    : 'text-slate-400 cursor-not-allowed opacity-50'
                }
              `}
            >
              <PlatformIcon 
                platform={option.platform} 
                size={config.icon}
                className={isActive ? 'text-white' : ''}
              />
              <span>{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;