import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { FiCpu, FiEye, FiTarget, FiZap } from "react-icons/fi";
import { HiLightningBolt } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import { EASING } from "../../../types";

interface AnalysisLoaderProps {
  isVisible: boolean;
  content?: string;
  totalDuration?: number;
  onComplete?: () => void;
  className?: string;
}

const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({
  isVisible,
  content = "",
  totalDuration = 8000, // 8 seconds default
  onComplete,
  className = "",
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [countdown, setCountdown] = useState(Math.ceil(totalDuration / 1000));
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Fun facts array
  const funFacts = [
    "Our AI processes over 10,000 linguistic patterns per second",
    "We analyze 127 different engagement factors in real-time",
    "The average viral post has 23 specific characteristics we can detect",
    "Our sentiment analysis recognizes 47 different emotional nuances",
    "Content optimized by AI sees 340% higher engagement rates",
    "We scan through 50 million successful posts for pattern matching",
    "Our neural networks contain over 2.7 billion parameters",
    "Processing speed: 500,000 words per minute with quantum precision",
    "Advanced algorithms predict viral potential with 89% accuracy",
    "Machine learning models trained on billions of successful posts",
    "Real-time optimization across 15+ social media platforms",
    "Semantic analysis powered by transformer neural networks",
  ];

  // Phase configuration
  const phases = useMemo(
    () => [
      {
        icon: FiZap,
        title: "Initializing Analysis",
        messages: [
          "Uploading your content...",
          "Establishing neural connections...",
          "Booting up the magic...",
          "Booting quantum processors...",
          "Initializing AI consciousness...",
          "Connecting to the content matrix...",
          "Calibrating sentiment analyzers...",
          "Loading linguistic databases...",
          "Establishing secure neural pathways",
          "Synchronizing with global data streams",
          "Activating pattern recognition engines",
          "Preparing advanced algorithms",
          "Optimizing processing pipelines",
        ],
        duration: 0.15, // 15% of total duration
      },
      {
        icon: FiEye,
        title: "Reading Content",
        messages: [
          "Reading your content...",
          "Scanning for patterns...",
          "Absorbing every word...",
        ],
        duration: 0.35, // 35% of total duration (content reading phase)
      },
      {
        icon: FiCpu,
        title: "Deep Analysis",
        messages: [
          "Performing magic on your words...",
          "Analyzing engagement patterns...",
          "Calculating viral potential...",
          "Absorbing your brilliant content...",
          "Mapping semantic structures...",
          "Identifying key themes and patterns...",
          "Analyzing emotional undertones...",
          "Extracting hidden insights...",
          "Processing linguistic nuances",
          "Detecting engagement triggers",
          "Analyzing readability metrics",
          "Mapping content flow patterns",
          "Identifying optimization opportunities",
          "Running advanced algorithms...",
          "Cross-referencing viral patterns...",
          "Calculating engagement probability...",
          "Optimizing for maximum impact...",
          "Generating strategic insights...",
        ],
        duration: 0.25, // 25% of total duration
      },
      {
        icon: FiTarget,
        title: "Optimization",
        messages: [
          "Preparing insights...",
          "Crafting recommendations...",
          "Finalizing your report...",
          "Synthesizing powerful insights...",
          "Creating personalized recommendations...",
          "Building your success roadmap...",
          "Preparing the final report...",
          "Ready to transform your content!",
          "Tailoring strategies to your audience",
          "Identifying growth opportunities",
          "Generating actionable improvements",
          "Creating performance predictions",
          "Finalizing optimization blueprint",
        ],
        duration: 0.25, // 25% of total duration
      },
    ],
    []
  );

  // Calculate timing for each phase
  const phaseDurations = useMemo(
    () => phases.map((phase) => phase.duration * totalDuration),
    [phases, totalDuration]
  );
  const messageInterval = 1200; // Switch messages every 2 seconds

  useEffect(() => {
    if (!isVisible) {
      // Reset state when hidden
      setCurrentPhase(0);
      setCurrentText("");
      setCurrentWordIndex(0);
      setCountdown(Math.ceil(totalDuration / 1000));
      setCurrentFactIndex(0);
      return;
    }

    let phaseTimer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;
    let contentTimer: NodeJS.Timeout;
    let totalTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;
    let factTimer: NodeJS.Timeout;

    // Countdown timer
    const startCountdown = () => {
      let timeLeft = Math.ceil(totalDuration / 1000);
      setCountdown(timeLeft);

      const countdown = () => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft > 0) {
          countdownTimer = setTimeout(countdown, 1000);
        }
      };

      countdownTimer = setTimeout(countdown, 1000);
    };

    // Fun facts rotation
    const startFactRotation = () => {
      let factIndex = 0;
      setCurrentFactIndex(factIndex);

      const rotateFacts = () => {
        factIndex = (factIndex + 1) % funFacts.length;
        setCurrentFactIndex(factIndex);
        factTimer = setTimeout(rotateFacts, 3000); // Change every 3 seconds
      };

      factTimer = setTimeout(rotateFacts, 3000);
    };

    const startAnalysis = () => {
      let accumulatedTime = 0;

      // Start countdown and fact rotation
      startCountdown();
      startFactRotation();

      // Set up phase transitions
      phases.forEach((phase, index) => {
        phaseTimer = setTimeout(() => {
          setCurrentPhase(index);
          setCurrentText(phase.messages[0]);

          // Start cycling through messages for this phase
          let messageIndex = 0;
          const cycleMessages = () => {
            messageTimer = setInterval(() => {
              messageIndex = (messageIndex + 1) % phase.messages.length;
              setCurrentText(phase.messages[messageIndex]);
            }, messageInterval);
          };

          if (phase.messages.length > 1) {
            cycleMessages();
          }

          // Clear message timer when phase ends
          setTimeout(() => {
            if (messageTimer) clearInterval(messageTimer);
          }, phaseDurations[index]);
        }, accumulatedTime);

        accumulatedTime += phaseDurations[index];
      });

      // Handle content reading animation (Phase 1)
      if (content) {
        const words = content.split(" ");
        const contentStartTime = phaseDurations[0]; // Start after initialization
        const contentDuration = phaseDurations[1]; // Duration of reading phase
        const wordInterval = contentDuration / words.length;

        setTimeout(() => {
          let wordIndex = 0;
          const revealWords = () => {
            if (wordIndex < words.length) {
              setCurrentWordIndex(wordIndex);
              wordIndex++;
              contentTimer = setTimeout(revealWords, wordInterval);
            }
          };
          revealWords();
        }, contentStartTime);
      }

      // Complete the analysis
      totalTimer = setTimeout(() => {
        onComplete?.();
      }, totalDuration);
    };

    startAnalysis();

    return () => {
      if (phaseTimer) clearTimeout(phaseTimer);
      if (messageTimer) clearInterval(messageTimer);
      if (contentTimer) clearTimeout(contentTimer);
      if (totalTimer) clearTimeout(totalTimer);
      if (countdownTimer) clearTimeout(countdownTimer);
      if (factTimer) clearTimeout(factTimer);
    };
  }, [
    isVisible,
    content,
    totalDuration,
    onComplete,
    phaseDurations,
    phases,
    funFacts.length,
  ]);

  const currentPhaseData = phases[currentPhase];
  const IconComponent = currentPhaseData?.icon || FiZap;

  // Progress calculation
  const progress = ((currentPhase + 1) / phases.length) * 100;

  const enhancedProcessingContents = [
    {
      icon: FiCpu,
      label: "Neural Processing",
      active: currentPhase >= 0,
      activeClasses:
        "border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg",
      pulseClasses: "bg-gradient-to-r from-blue-200/50 to-transparent",
      dotClasses: "bg-blue-500",
    },
    {
      icon: FiTarget,
      label: "Pattern Analysis",
      active: currentPhase >= 2,
      activeClasses:
        "border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 shadow-lg",
      pulseClasses: "bg-gradient-to-r from-emerald-200/50 to-transparent",
      dotClasses: "bg-emerald-500",
    },
    {
      icon: HiSparkles,
      label: "Insight Generation",
      active: currentPhase >= 3,
      activeClasses:
        "border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-lg",
      pulseClasses: "bg-gradient-to-r from-purple-200/50 to-transparent",
      dotClasses: "bg-purple-500",
    },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-4 ${className}`}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASING.smooth }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
      >
        {/* Countdown Timer */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-emerald-400 rounded-full"
              />
              <span className="text-white font-mono text-sm font-medium">
                {countdown}s
              </span>
            </div>
          </motion.div>
        </div>

        {/* Header with enhanced animated background */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 p-4 md:p-8 text-white overflow-hidden">
          {/* Enhanced geometric floating elements */}
          <div className="absolute inset-0 h-full w-full">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${
                  i % 4 === 0
                    ? "w-1 h-12 bg-blue-400/30 rounded-full"
                    : i % 4 === 1
                    ? "w-12 h-1 bg-emerald-400/30 rounded-full"
                    : i % 4 === 2
                    ? "w-3 h-3 bg-white/20 rounded-full"
                    : "w-2 h-8 bg-purple-400/25 rounded-full"
                }`}
                animate={{
                  x: [Math.random() * 500, Math.random() * 500],
                  y: [Math.random() * 140, Math.random() * 140],
                  rotate: [0, 360],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Enhanced scanning line effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            animate={{
              y: [0, 140],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulsing dots pattern */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 33}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main icon and title */}
          <div className="relative z-10 text-center">
            <motion.div
              key={currentPhase}
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, ease: EASING.smooth }}
              className="inline-flex items-center justify-center size-12 md:size-24 md:h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 mb-6 shadow-2xl"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconComponent className="size-6 md:size-12 text-blue-300" />
              </motion.div>
            </motion.div>

            <motion.h2
              key={currentPhaseData?.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-3xl font-black mb-4 tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            >
              {currentPhaseData?.title || "AI Processing"}
            </motion.h2>

            {/* Enhanced progress bar */}
            <div className="relative w-full bg-white/20 rounded-full h-3 overflow-hidden border border-white/30 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 relative rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: EASING.smooth }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60 rounded-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
            </div>

            {/* Progress percentage */}
            <motion.div
              className="mt-3 text-white/80 text-xs md:text-sm font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}% Complete
            </motion.div>
          </div>
        </div>

        {/* Main content area */}
        <div className="p-8 space-y-6 bg-gradient-to-b from-white to-slate-50">
          {/* Current status message with enhanced styling */}
          <motion.div
            key={currentText}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-blue-100 rounded-full"
              >
                <HiLightningBolt className="w-5 h-5 text-blue-600" />
              </motion.div>
              <h3 className="text-base md:text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                {currentText}
              </h3>
            </div>
          </motion.div>

          {/* Content reading section */}
          {content && currentPhase === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-inner"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-2 bg-blue-100 rounded-full"
                >
                  <FiEye className="w-4 h-4 text-blue-600" />
                </motion.div>
                <span className="text-sm font-bold text-slate-700">
                  AI Reading Progress
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="text-slate-600 leading-relaxed text-[10px] md:text-xs bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                {content.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className={`${
                      index < currentWordIndex
                        ? "text-blue-700 font-semibold bg-blue-50 px-1 rounded"
                        : index === currentWordIndex
                        ? "text-white font-bold bg-blue-500 px-1 rounded shadow-md"
                        : "text-slate-300"
                    }`}
                    animate={{
                      color: index <= currentWordIndex ? "#1d4ed8" : "#cbd5e1",
                      scale: index === currentWordIndex ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced processing indicators */}
          {content && currentPhase !== 1 && (
            <>
              <div className="grid grid-cols-3 gap-4">
                {enhancedProcessingContents.map((indicator, index) => (
                  <motion.div
                    key={index}
                    className={`text-center p-4 rounded-xl border-2 transition-all duration-500 relative overflow-hidden ${
                      indicator.active
                        ? indicator.activeClasses
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                    animate={{
                      scale: indicator.active ? [1, 1.05, 1] : 1,
                      rotateY: indicator.active ? [0, 5, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: indicator.active ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Animated background pulse for active indicators */}
                    {indicator.active && (
                      <motion.div
                        className={`absolute inset-0 ${indicator.pulseClasses}`}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <motion.div
                      animate={
                        indicator.active
                          ? {
                              rotate: [0, 360],
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3,
                        repeat: indicator.active ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <indicator.icon className="w-6 h-6 mx-auto mb-2" />
                    </motion.div>
                    <div className="text-xs font-bold relative z-10">
                      {indicator.label}
                    </div>

                    {/* Active indicator dot */}
                    {indicator.active && (
                      <motion.div
                        className={`absolute top-2 right-2 w-2 h-2 ${indicator.dotClasses} rounded-full`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Dynamic fun facts section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="relative"
              >
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl border border-blue-200 shadow-inner overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-5">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-blue-500 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <HiSparkles className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      <span className="text-xs md:text-sm font-bold text-blue-700 tracking-wide">
                        DID YOU KNOW?
                      </span>
                      <motion.div
                        animate={{
                          rotate: [360, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <HiSparkles className="w-5 h-5 text-emerald-600" />
                      </motion.div>
                    </div>

                    <motion.div
                      key={currentFactIndex}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="text-xs md:text-sm text-blue-700 font-medium leading-relaxed"
                    >
                      {funFacts[currentFactIndex]}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisLoader;
