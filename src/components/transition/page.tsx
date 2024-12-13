import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Different animation variants for variety
const slideVariants = {
  initial: {
    opacity: 0,
    x: 300, // Start from right
    scale: 0.95
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: -300, // Exit to left
    scale: 1.05
  }
};

// Alternative variant for certain routes
const fadeSlideVariants = {
  initial: {
    opacity: 0,
    x: 100,
    y: 20
  },
  in: {
    opacity: 1,
    x: 0,
    y: 0
  },
  out: {
    opacity: 0,
    x: -100,
    y: -20
  }
};

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  
  // Use different animations for different route types
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  const variants = isAuthRoute ? fadeSlideVariants : slideVariants;

  return (
    <div style={{ 
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      minHeight: 'calc(100vh - 200px)' // Account for nav and padding
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={variants}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.4,
            // Stagger different properties for smoother effect
            opacity: { duration: 0.3 },
            x: { duration: 0.4, ease: 'easeOut' },
            scale: { duration: 0.3 }
          }}
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100%'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
