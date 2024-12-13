import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        About BuffByte
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Learn more about our application with smooth page transitions powered by Framer Motion.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <h3>Features:</h3>
        <ul>
          <li>✨ Smooth page transitions</li>
          <li>🔐 Authentication with route protection</li>
          <li>🚀 React Router v6</li>
          <li>📁 Clean path aliases</li>
          <li>⚡ Vite for fast development</li>
        </ul>

        <Link 
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
