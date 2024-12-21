import React from 'react';
import { 
  FiTwitter, 
  FiInstagram, 
  FiMusic, 
  FiLinkedin, 
  FiYoutube, 
  FiFacebook 
} from 'react-icons/fi';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PlatformIconProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  size = 'md', 
  className = '' 
}) => {
  const getPlatformConfig = (platform: Platform) => {
    const configs = {
      twitter: {
        icon: FiTwitter,
        color: 'text-blue-500',
        hoverColor: 'hover:text-blue-600'
      },
      instagram: {
        icon: FiInstagram,
        color: 'text-purple-500',
        hoverColor: 'hover:text-purple-600'
      },
      tiktok: {
        icon: FiMusic,
        color: 'text-slate-800',
        hoverColor: 'hover:text-slate-900'
      },
      linkedin: {
        icon: FiLinkedin,
        color: 'text-blue-600',
        hoverColor: 'hover:text-blue-700'
      },
      youtube: {
        icon: FiYoutube,
        color: 'text-red-500',
        hoverColor: 'hover:text-red-600'
      },
      facebook: {
        icon: FiFacebook,
        color: 'text-blue-700',
        hoverColor: 'hover:text-blue-800'
      }
    };
    return configs[platform];
  };

  const sizeConfig = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const config = getPlatformConfig(platform);
  const IconComponent = config.icon;

  return (
    <IconComponent 
      className={`
        ${sizeConfig[size]} 
        ${config.color} 
        ${config.hoverColor} 
        transition-colors duration-200
        ${className}
      `} 
    />
  );
};

export default PlatformIcon;