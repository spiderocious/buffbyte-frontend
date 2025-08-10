import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@buffbyte/components/ui/button';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden snap-y snap-mandatory">
      {/* Floating Header */}
      <motion.header 
        style={{ y: headerY, opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center shadow-lg"
              >
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-white font-bold text-lg"
                >
                  B
                </motion.span>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent"
              >
                BufByte
              </motion.span>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/" 
                  className="text-gray-900 hover:text-black font-medium transition-colors duration-200 relative group"
                >
                  Home
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-black font-medium transition-colors duration-200 relative group"
                >
                  About
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            </motion.nav>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/auth/login">
                <Button 
                  variant="primary" 
                  className="px-6 py-3 font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-2xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white snap-start">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.div variants={staggerItem} transition={{ duration: 0.6 }} className="mb-8">
              {/* Animated subtitle with icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.5,
                  duration: 0.8 
                }}
                className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6 backdrop-blur-sm border border-gray-200/50"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-green-500 rounded-full mr-3 flex items-center justify-center"
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </motion.div>
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-yellow-500"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  AI-Powered Content Analysis
                </span>
              </motion.div>

              <motion.h1 
                variants={staggerItem}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-none"
              >
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="block"
                >
                  Analyze Content That
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
                  className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent"
                >
                  Actually Converts
                </motion.span>
              </motion.h1>
              
              <motion.p 
                variants={staggerItem}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
              >
                Stop guessing. Get instant AI analysis of your content to discover what resonates with your audience and drives 
                <motion.span
                  animate={{ color: ["#6b7280", "#000", "#6b7280"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-semibold"
                > real engagement
                </motion.span> before you publish.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link to="/auth/signup">
                  <Button variant="primary" className="px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black transition-all duration-500 relative overflow-hidden group">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">Analyze My Content</span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link to="/about">
                  <Button variant="secondary" className="px-10 py-5 text-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Enhanced Demo Card with Real Features */}
            <motion.div
              variants={staggerItem}
              transition={{ duration: 0.8 }}
              className="relative max-w-6xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/60 relative overflow-hidden group"
              >
                {/* Animated border gradient */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <motion.div className="flex items-center space-x-3">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 bg-red-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        className="w-4 h-4 bg-yellow-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                        className="w-4 h-4 bg-green-400 rounded-full"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-lg text-gray-500 font-mono"
                    >
                      buffbyte.ai/analysis
                    </motion.div>
                  </div>
                  
                  {/* Real Feature Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Script Analysis */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8, duration: 0.6 }}
                      className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Script Analysis</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hook Strength</span>
                          <span className="font-bold text-purple-600">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Retention Score</span>
                          <span className="font-bold text-purple-600">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Speaking Pace</span>
                          <span className="font-bold text-purple-600">Perfect</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Energy Flow</span>
                          <span className="font-bold text-purple-600">Optimized</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Performance */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.0, duration: 0.6 }}
                      className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Performance Metrics</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engagement Rate</span>
                          <span className="font-bold text-emerald-600">+147%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Viral Potential</span>
                          <span className="font-bold text-emerald-600">High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Platform Score</span>
                          <span className="font-bold text-emerald-600">9.2/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Time</span>
                          <span className="font-bold text-emerald-600">3:30 PM</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2, duration: 0.6 }}
                      className="bg-white rounded-xl p-4 border border-gray-200/50 text-center"
                    >
                      <div className="text-2xl mb-2 text-orange-500">
                        <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="font-bold text-gray-900 mb-1">Trending Topics</div>
                      <div className="text-xs text-gray-500">Real-time trend analysis</div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4, duration: 0.6 }}
                      className="bg-white rounded-xl p-4 border border-gray-200/50 text-center"
                    >
                      <div className="text-2xl mb-2 text-blue-500">
                        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </div>
                      <div className="font-bold text-gray-900 mb-1">Viral Hashtags</div>
                      <div className="text-xs text-gray-500">Platform-specific tags</div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6, duration: 0.6 }}
                      className="bg-white rounded-xl p-4 border border-gray-200/50 text-center"
                    >
                      <div className="text-2xl mb-2 text-green-500">
                        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div className="font-bold text-gray-900 mb-1">Smart Targeting</div>
                      <div className="text-xs text-gray-500">Audience optimization</div>
                    </motion.div>
                  </div>

                  {/* Live Analysis Simulation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8, duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                      />
                      <span className="font-mono text-blue-700 font-medium">
                        AI Analysis Complete: Your content has viral potential!
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced floating particles */}
                <motion.div
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [-15, -25, -15],
                    x: [0, 10, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 left-10 w-3 h-3 bg-green-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [-5, -15, -5],
                    x: [0, -8, 0],
                    opacity: [0.4, 0.9, 0.4]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Creators Choose BufByte
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI analysis that reveals what makes your content perform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered content analysis that identifies what makes your audience engage, share, and convert.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get real-time analysis and suggestions to improve your content before you publish. No more guesswork.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Performance Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your content's performance and learn what resonates with your specific audience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Features Showcase */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Everything You Need to Create
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Viral Content
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From script analysis to performance tracking, BufByte gives you the complete toolkit for content success.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Script Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Script Analysis</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Hook strength scoring (0-100%)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Energy flow optimization
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Speaking pace analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Retention prediction
                </li>
              </ul>
            </motion.div>

            {/* Content Performance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Performance Metrics</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Engagement rate prediction
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Viral potential scoring
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Platform-specific insights
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Optimal posting times
                </li>
              </ul>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C10.5 2 9.26 2.84 8.67 4.07C7.87 3.41 6.88 3 5.77 3C3.15 3 1 5.15 1 7.77C1 9.44 1.87 10.9 3.15 11.85C3.15 11.9 3.15 11.95 3.15 12C3.15 14.76 5.39 17 8.15 17C9.44 17 10.61 16.46 11.5 15.58C12.39 16.46 13.56 17 14.85 17C17.61 17 19.85 14.76 19.85 12C19.85 11.95 19.85 11.9 19.85 11.85C21.13 10.9 22 9.44 22 7.77C22 5.15 19.85 3 17.23 3C16.12 3 15.13 3.41 14.33 4.07C13.74 2.84 12.5 2 12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Trending Analysis</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time trend detection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Country-specific insights
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Topic velocity tracking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Content gap identification
                </li>
              </ul>
            </motion.div>

            {/* Viral Hashtags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Viral Hashtags</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Platform-specific hashtags
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Engagement rate tracking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Trend score analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Professional relevance
                </li>
              </ul>
            </motion.div>

            {/* Content Insights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Smart Insights</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Viral format detection
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Peak posting windows
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Content gap opportunities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Audience targeting
                </li>
              </ul>
            </motion.div>

            {/* Multi-Platform Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Multi-Platform</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  YouTube optimization
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  TikTok analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Instagram insights
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  LinkedIn & Twitter
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden snap-start">
        {/* Animated background elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-gray-100/30 to-gray-200/20 rounded-full blur-2xl"
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 bg-black/10 rounded-full mb-8 backdrop-blur-sm border border-gray-200/50"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"
              />
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                </svg>
                Ready to Transform Your Content?
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight"
            >
              Analyze Content That
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent"
              >
                Actually Converts
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of creators who've transformed their content strategy with BufByte. 
              Start your free trial today—no credit card required.
            </motion.p>
          </motion.div>
            
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link to="/auth/signup">
                <Button 
                  variant="primary" 
                  className="px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-black hover:via-gray-900 hover:to-black transition-all duration-500 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Get Started</span>
                </Button>
              </Link>
            </motion.div>
            
            
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/60 shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 mb-2"
              >
                10,000+
              </motion.div>
              <div className="text-gray-600 font-medium">Content pieces analyzed</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="w-16 h-1 bg-gradient-to-r from-gray-900 to-black rounded-full mx-auto mt-4"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/60 shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 mb-2"
              >
                2.5x
              </motion.div>
              <div className="text-gray-600 font-medium">Average engagement boost</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.7 }}
                className="w-16 h-1 bg-gradient-to-r from-gray-900 to-black rounded-full mx-auto mt-4"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/60 shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="text-5xl font-black text-gray-900 mb-2"
              >
                24/7
              </motion.div>
              <div className="text-gray-600 font-medium">AI-powered insights</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.9 }}
                className="w-16 h-1 bg-gradient-to-r from-gray-900 to-black rounded-full mx-auto mt-4"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
