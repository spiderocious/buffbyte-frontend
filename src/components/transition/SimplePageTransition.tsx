import { motion } from 'framer-motion';

interface SimplePageTransitionProps {
  children: React.ReactNode;
}

export default function SimplePageTransition({ children }: SimplePageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </motion.div>
  );
}
