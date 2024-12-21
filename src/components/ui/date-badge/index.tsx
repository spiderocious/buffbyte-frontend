import React from 'react';

interface DateBadgeProps {
  date: string | Date;
  format?: 'short' | 'long' | 'relative';
  className?: string;
}

const DateBadge: React.FC<DateBadgeProps> = ({ 
  date, 
  format = 'short', 
  className = '' 
}) => {
  const formatDate = (date: string | Date, format: string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'relative': {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - dateObj.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }); }
      default: // 'short'
        return dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
    }
  };

  return (
    <span className={`text-slate-500 text-sm font-medium ${className}`}>
      {formatDate(date, format)}
    </span>
  );
};

export default DateBadge;