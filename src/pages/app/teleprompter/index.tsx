import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiClock,
  FiMaximize,
  FiMinimize,
  FiPlay,
  FiRotateCw,
  FiSettings,
  FiType
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface TeleprompterSettings {
  speed: number; // words per minute
  fontSize: number; // rem units
  fontColor: string;
  backgroundColor: string;
  theme: 'dark' | 'light';
  fontFamily: string;
  lineHeight: number;
  mirrored: boolean;
  autoStart: boolean;
  countdown: number; // seconds before auto start
}

const defaultSettings: TeleprompterSettings = {
  speed: 180,
  fontSize: 2.5,
  fontColor: '#ffffff',
  backgroundColor: '#000000',
  theme: 'dark',
  fontFamily: 'Inter',
  lineHeight: 1.6,
  mirrored: false,
  autoStart: false,
  countdown: 3
};

const sampleScript = `Hey everyone! Today I want to share something that completely changed how I approach morning routines.

For the longest time, I was that person hitting snooze five times, rushing through breakfast, and arriving at work already stressed. Sound familiar?

Then I discovered this Japanese concept called "ikigai" - your reason for being. But here's the thing - most people think ikigai is about finding your life purpose. That's actually a Western misinterpretation.

The real ikigai is much simpler. It's about finding small moments of meaning in your daily routine. Like savoring your coffee instead of chugging it. Taking three deep breaths before checking emails.

I started with just one tiny change: setting my alarm 10 minutes earlier and using those 10 minutes to write down three things I'm grateful for. No phone, no distractions, just me and a notebook.

After 30 days, something shifted. I wasn't just more productive - I was calmer, more focused, and honestly? Happier.

The best part? It takes literally 10 minutes. That's less time than you spend scrolling social media while drinking your coffee.

So here's my challenge for you: pick one tiny routine change you can make tomorrow morning. Just one. Try it for a week and let me know how it goes in the comments.

What's your current morning routine like? I'd love to hear about it!`;

const TeleprompterPage: React.FC = () => {
  const [settings, setSettings] = useState<TeleprompterSettings>(defaultSettings);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [script, setScript] = useState(sampleScript);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate scroll speed based on WPM
  const getScrollSpeed = useCallback(() => {
    // More responsive calculation
    const baseSpeed = settings.speed / 60; // words per second
    const speedMultiplier = settings.fontSize * 8; // adjust for font size
    const lineMultiplier = settings.lineHeight;
    
    // Final speed in pixels per second
    return baseSpeed * speedMultiplier * lineMultiplier;
  }, [settings.speed, settings.fontSize, settings.lineHeight]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying) {
      const scrollSpeed = getScrollSpeed();
      // Use requestAnimationFrame for smooth scrolling
      const animate = () => {
        setScrollPosition(prev => {
          const container = containerRef.current;
          const content = contentRef.current;
          if (container && content) {
            const maxScroll = content.scrollHeight - container.clientHeight;
            const newPosition = prev + scrollSpeed / 60; // 60fps smooth scrolling
            
            if (newPosition >= maxScroll) {
              setIsPlaying(false);
              setShowControls(true);
              return maxScroll;
            }
            return newPosition;
          }
          return prev;
        });
        
        if (isPlaying) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, getScrollSpeed]);

  // Update scroll position with smooth behavior
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Ensure container can scroll to the very end
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Add extra scroll capability
      container.style.scrollBehavior = 'auto';
      container.style.overflowY = 'auto';
    }
  }, [script, settings.fontSize, settings.lineHeight]);

  // Countdown functionality
  const startCountdown = useCallback(() => {
    if (settings.autoStart && settings.countdown > 0) {
      setCountdown(settings.countdown);
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsPlaying(true);
            setShowControls(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsPlaying(true);
      setShowControls(false);
    }
  }, [settings.autoStart, settings.countdown]);

  // Stop countdown
  useEffect(() => {
    if (countdown === 0 && countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [countdown]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Fullscreen toggle function
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        try {
          await containerRef.current.requestFullscreen();
        } catch {
          console.log('Fullscreen not supported');
        }
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch {
        console.log('Exit fullscreen failed');
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setIsPlaying(false);
          setShowControls(true);
          break;
        case 'S':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setShowSettings(!showSettings);
          }
          break;
        case 'e':
        case 'E':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setIsEditing(!isEditing);
          }
          break;
        case 'f':
        case 'F':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, showSettings, isEditing, startCountdown, toggleFullscreen]);

  // Reset teleprompter
  const resetTeleprompter = () => {
    setIsPlaying(false);
    setShowControls(true);
    setScrollPosition(0);
    setCountdown(0);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  // Update settings
  const updateSetting = <K extends keyof TeleprompterSettings>(
    key: K,
    value: TeleprompterSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Theme presets
  const themePresets = {
    dark: { backgroundColor: '#000000', fontColor: '#ffffff' },
    light: { backgroundColor: '#ffffff', fontColor: '#000000' },
    sepia: { backgroundColor: '#f4f3e8', fontColor: '#5c4a3a' },
    blue: { backgroundColor: '#0f172a', fontColor: '#e2e8f0' },
    green: { backgroundColor: '#064e3b', fontColor: '#d1fae5' }
  };

  const fontFamilies = [
    'Inter',
    'Arial',
    'Georgia',
    'Times New Roman',
    'Courier New',
    'Helvetica',
    'Roboto',
    'Open Sans'
  ];

  const currentTheme = settings.theme === 'dark' 
    ? { backgroundColor: settings.backgroundColor, fontColor: settings.fontColor }
    : { backgroundColor: '#ffffff', fontColor: '#000000' };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
      style={{ 
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.fontColor
      }}
    >
      {/* Countdown Overlay */}
      <AnimatePresence>
        {countdown > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: currentTheme.backgroundColor }}
          >
            <div className="text-center">
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl font-bold mb-4"
                style={{ color: currentTheme.fontColor }}
              >
                {countdown}
              </motion.div>
              <div 
                className="text-2xl opacity-75"
                style={{ color: currentTheme.fontColor }}
              >
                Starting teleprompter...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button - Always Visible */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.history.back()}
        className="fixed top-2 left-2 md:top-4 md:left-4 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border border-opacity-20 flex items-center justify-center hover:scale-110 transition-all duration-200 touch-manipulation"
        style={{ 
          backgroundColor: `${currentTheme.fontColor}10`,
          borderColor: currentTheme.fontColor,
          color: currentTheme.fontColor
        }}
      >
        <FiArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      </motion.button>

      {/* Controls - Semi-transparent during playback */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: showControls ? 1 : 0.3, 
          y: 0 
        }}
        whileHover={{ opacity: 1 }}
        whileTap={{ opacity: 1 }}
        className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      >
            <div 
              className="flex items-center space-x-2 md:space-x-4 px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl backdrop-blur-lg border border-opacity-20 shadow-2xl"
              style={{ 
                backgroundColor: `${currentTheme.fontColor}10`,
                borderColor: `${currentTheme.fontColor}20`
              }}
            >
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startCountdown}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg hover:shadow-lg transition-all duration-200 touch-manipulation"
                style={{ 
                  backgroundColor: currentTheme.fontColor,
                  color: currentTheme.backgroundColor
                }}
              >
                <FiPlay className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              </motion.button>

              {/* Reset */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetTeleprompter}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 touch-manipulation"
                style={{ 
                  backgroundColor: `${currentTheme.fontColor}20`,
                  color: currentTheme.fontColor
                }}
              >
                <FiRotateCw className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>

              {/* Fullscreen Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 touch-manipulation"
                style={{ 
                  backgroundColor: isFullscreen ? currentTheme.fontColor : `${currentTheme.fontColor}20`,
                  color: isFullscreen ? currentTheme.backgroundColor : currentTheme.fontColor
                }}
              >
                {isFullscreen ? <FiMinimize className="w-4 h-4 md:w-5 md:h-5" /> : <FiMaximize className="w-4 h-4 md:w-5 md:h-5" />}
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(!showSettings)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 touch-manipulation"
                style={{ 
                  backgroundColor: showSettings ? currentTheme.fontColor : `${currentTheme.fontColor}20`,
                  color: showSettings ? currentTheme.backgroundColor : currentTheme.fontColor
                }}
              >
                <FiSettings className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
      </motion.div>

      {/* Click overlay for pause during playback */}
      {isPlaying && (
        <div 
          className="fixed inset-0 z-20 cursor-pointer"
          onClick={() => {
            setIsPlaying(false);
            setShowControls(true);
          }}
        />
      )}

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && showControls && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-96 z-50 overflow-y-auto"
            style={{ backgroundColor: `${currentTheme.backgroundColor}f0` }}
          >
            <div className="backdrop-blur-xl border-l border-opacity-20 h-full p-4 md:p-6"
              style={{ borderColor: `${currentTheme.fontColor}20` }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
                  <HiSparkles className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Settings</span>
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center touch-manipulation"
                  style={{ 
                    backgroundColor: `${currentTheme.fontColor}20`,
                    color: currentTheme.fontColor
                  }}
                >
                  ×
                </motion.button>
              </div>

              <div className="space-y-6 md:space-y-8">
                {/* Speed Settings */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-4">
                    <FiClock className="w-4 h-4" />
                    <span>Speed: {settings.speed} WPM</span>
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="300"
                    step="10"
                    value={settings.speed}
                    onChange={(e) => updateSetting('speed', parseInt(e.target.value))}
                    className="w-full accent-current"
                  />
                  <div className="flex justify-between text-xs opacity-60 mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>

                {/* Font Settings */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-4">
                    <FiType className="w-4 h-4" />
                    <span>Font Size: {settings.fontSize}rem</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', parseFloat(e.target.value))}
                    className="w-full accent-current"
                  />
                </div>

                {/* Font Family */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSetting('fontFamily', e.target.value)}
                    className="w-full p-3 rounded-xl border border-opacity-20 focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-30"
                    style={{ 
                      backgroundColor: `${currentTheme.fontColor}05`,
                      borderColor: `${currentTheme.fontColor}20`,
                      color: currentTheme.fontColor
                    }}
                  >
                    {fontFamilies.map(font => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Line Height */}
                <div>
                  <label className="text-sm font-semibold mb-4 block">
                    Line Height: {settings.lineHeight}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                    className="w-full accent-current"
                  />
                </div>

                {/* Theme Presets */}
                <div>
                  <label className="text-sm font-semibold mb-4 block">Theme Presets</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(themePresets).map(([name, theme]) => (
                      <motion.button
                        key={name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateSetting('backgroundColor', theme.backgroundColor);
                          updateSetting('fontColor', theme.fontColor);
                          updateSetting('theme', name === 'light' ? 'light' : 'dark');
                        }}
                        className="p-4 rounded-xl border border-opacity-20 text-sm font-medium capitalize transition-all duration-200"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.fontColor,
                          borderColor: `${theme.fontColor}30`
                        }}
                      >
                        {name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Background</label>
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                      className="w-full h-12 rounded-xl border-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Text Color</label>
                    <input
                      type="color"
                      value={settings.fontColor}
                      onChange={(e) => updateSetting('fontColor', e.target.value)}
                      className="w-full h-12 rounded-xl border-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Advanced</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mirror Text</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSetting('mirrored', !settings.mirrored)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                        settings.mirrored ? 'bg-current' : ''
                      }`}
                      style={{ 
                        backgroundColor: settings.mirrored ? currentTheme.fontColor : `${currentTheme.fontColor}20`
                      }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                          settings.mirrored ? 'translate-x-6' : 'translate-x-0'
                        }`}
                        style={{ 
                          backgroundColor: settings.mirrored ? currentTheme.backgroundColor : currentTheme.fontColor
                        }}
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto Start with Countdown</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSetting('autoStart', !settings.autoStart)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200`}
                      style={{ 
                        backgroundColor: settings.autoStart ? currentTheme.fontColor : `${currentTheme.fontColor}20`
                      }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                          settings.autoStart ? 'translate-x-6' : 'translate-x-0'
                        }`}
                        style={{ 
                          backgroundColor: settings.autoStart ? currentTheme.backgroundColor : currentTheme.fontColor
                        }}
                      />
                    </motion.button>
                  </div>

                  {settings.autoStart && (
                    <div>
                      <label className="text-sm mb-3 block">
                        Countdown: {settings.countdown}s
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={settings.countdown}
                        onChange={(e) => updateSetting('countdown', parseInt(e.target.value))}
                        className="w-full accent-current"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Toggle */}
      <AnimatePresence>
        {showControls && !showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(!isEditing)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg hover:shadow-lg transition-all duration-200 touch-manipulation"
              style={{ 
                backgroundColor: isEditing ? currentTheme.fontColor : `${currentTheme.fontColor}20`,
                color: isEditing ? currentTheme.backgroundColor : currentTheme.fontColor
              }}
            >
              <FiType className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className={`h-full w-full p-4 md:p-8 ${settings.mirrored ? 'scale-x-[-1]' : ''} ${isEditing ? 'cursor-text' : 'cursor-default'}`}
        style={{
          fontSize: `${settings.fontSize}rem`,
          fontFamily: settings.fontFamily,
          lineHeight: settings.lineHeight,
          paddingTop: '5vh',
          paddingBottom: '150vh' // Extra padding for excellent scroll-up capability
        }}
      >
        <div className="max-w-full md:max-w-4xl mx-auto">
          {isEditing ? (
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="w-full h-[150vh] bg-transparent border-none outline-none resize-none"
              style={{
                fontSize: `${settings.fontSize}rem`,
                fontFamily: settings.fontFamily,
                lineHeight: settings.lineHeight,
                color: currentTheme.fontColor
              }}
              placeholder="Click here to edit your script..."
            />
          ) : (
            <div
              onClick={() => !isPlaying && setIsEditing(true)}
              className={`${!isPlaying ? 'cursor-text hover:opacity-80 pb-[500px]' : ''} transition-opacity duration-200`}
            >
              {script.split('\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={`mb-8 ${paragraph.trim() === '' ? 'h-8' : ''}`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                >
                  {paragraph || '\u00A0'}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Keyboard Shortcuts Help */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="fixed top-16 left-2 md:top-20 md:left-4 text-xs space-y-1 max-w-36 md:max-w-48 hidden md:block"
          style={{ color: currentTheme.fontColor }}
        >
          <div>SPACE - Play/Pause</div>
          <div>ESC - Stop</div>
          <div>Ctrl+S - Settings</div>
          <div>Ctrl+E - Edit Mode</div>
          <div>Ctrl+F - Fullscreen</div>
          <div>Click text to edit</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeleprompterPage;