import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to BuffByte
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        This is the home page with smooth page transitions!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <p>Navigate to other pages to see the smooth left-to-right transitions:</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <Link 
            to="/about"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            About Page
          </Link>
          <Link 
            to="/login"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Login Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
