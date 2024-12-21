import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WordCountIndicator from '../word-count-indicator';

interface ContentTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  maxChars?: number;
  maxWords?: number;
  showWordCount?: boolean;
  disabled?: boolean;
  className?: string;
}

const ContentTextArea: React.FC<ContentTextAreaProps> = ({
  value,
  onChange,
  placeholder = "Paste your content here to analyze engagement potential, optimize for your target platform, and get actionable insights...",
  minRows = 8,
  maxRows = 20,
  maxChars = 5000,
  maxWords = 0,
  showWordCount = true,
  disabled = false,
  className = ''
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height based on content
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = 24; // Approximate line height
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    
    const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
    textarea.style.height = `${newHeight}px`;
  }, [value, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Check character limit
    if (newValue.length <= maxChars) {
      onChange(newValue);
    }
  };

  const isAtCharLimit = value.length >= maxChars;
  const isNearCharLimit = value.length >= maxChars * 0.9;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Textarea Container */}
      <div className="relative">
        <motion.textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full p-4 rounded-2xl border resize-none transition-all duration-200
            text-slate-900 placeholder-slate-400 leading-relaxed
            ${isFocused
              ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
              : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }
            ${disabled 
              ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
              : 'bg-white'
            }
            ${isAtCharLimit 
              ? 'border-red-300 ring-2 ring-red-500/20' 
              : isNearCharLimit 
                ? 'border-orange-300 ring-2 ring-orange-500/20'
                : ''
            }
            focus:outline-none scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100
          `}
          style={{
            minHeight: `${minRows * 24}px`,
            maxHeight: `${maxRows * 24}px`
          }}
        />

      </div>

      {/* Word Count and Stats */}
      {showWordCount && (
        <div className="flex items-center justify-between">
          <WordCountIndicator
            text={value}
            maxChars={maxChars}
            maxWords={maxWords}
            showWords={true}
          />
          
          {/* Content Quality Indicator */}
          {value.length > 50 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className={`
                w-2 h-2 rounded-full
                ${value.length >= 100 
                  ? 'bg-emerald-500' 
                  : value.length >= 50 
                    ? 'bg-blue-500' 
                    : 'bg-orange-500'
                }
              `} />
              <span className="text-xs font-medium text-slate-500">
                {value.length >= 100 
                  ? 'Good length for analysis' 
                  : 'Add more content for better insights'
                }
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentTextArea;