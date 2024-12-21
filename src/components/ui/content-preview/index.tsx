import React from 'react';

interface ContentPreviewProps {
  content: string;
  maxLength?: number;
  showWordCount?: boolean;
  className?: string;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  maxLength = 120,
  showWordCount = false,
  className = ''
}) => {
  // Smart truncation at word boundaries
  const truncateContent = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    // If we can find a space near the end, cut there for better readability
    if (lastSpace > maxLength * 0.8) {
      return truncated.substr(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  };

  const getWordCount = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const previewText = truncateContent(content, maxLength);
  const wordCount = getWordCount(content);

  return (
    <div className={className}>
      <p className="text-slate-600 text-sm leading-relaxed">
        {previewText}
      </p>
      {showWordCount && (
        <div className="mt-2 text-xs text-slate-400">
          {wordCount} words
        </div>
      )}
    </div>
  );
};

export default ContentPreview;