import React from 'react';

interface WordCountIndicatorProps {
  text: string;
  maxChars?: number;
  maxWords?: number;
  showWords?: boolean;
  className?: string;
}

const WordCountIndicator: React.FC<WordCountIndicatorProps> = ({
  text,
  maxChars = 2000,
  maxWords = 500,
  showWords = true,
  className = ''
}) => {
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  
  // Get color based on usage
  const getCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    if (percentage >= 50) return 'text-blue-600';
    return 'text-slate-400';
  };

  const charColor = getCountColor(charCount, maxChars);
  const wordColor = getCountColor(wordCount, maxWords);

  return (
    <div className={`flex items-center space-x-4 text-xs ${className}`}>
      <div className={`font-medium ${charColor}`}>
        {charCount.toLocaleString()}/{maxChars.toLocaleString()} characters
      </div>
      {showWords && (
        <div className={`font-medium ${wordColor}`}>
          {wordCount.toLocaleString()}/{maxWords.toLocaleString()} words
        </div>
      )}
    </div>
  );
};

export default WordCountIndicator;