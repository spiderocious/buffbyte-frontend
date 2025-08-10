import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@buffbyte/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              About
              <span className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                BufByte
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to eliminate the guesswork from content creation. Every creator deserves to know 
              what makes their audience truly engage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Problem We Solve
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Content creators spend countless hours crafting posts, videos, and campaigns, only to see 
                  inconsistent engagement. The traditional approach of posting and hoping simply isn't sustainable.
                </p>
                <p>
                  Without data-driven insights, creators are left wondering: What time should I post? 
                  What tone resonates with my audience? Which topics drive real engagement?
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Traditional Content Strategy</span>
                    <span className="text-red-500 font-semibold">23% Engagement</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-gray-700">BufByte-Optimized Content</span>
                    <span className="text-green-600 font-semibold">87% Engagement</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              How We're Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              BufByte doesn't just analyze your content—it learns from your specific audience 
              and provides actionable insights that actually move the needle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Analysis</h3>
                    <p className="text-gray-600">
                      Get instant feedback on your content before you publish. Our AI analyzes tone, 
                      timing, structure, and engagement potential in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Audience-Specific Insights</h3>
                    <p className="text-gray-600">
                      Unlike generic tools, BufByte learns what makes YOUR specific audience engage, 
                      share, and convert based on your unique content history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Recommendations</h3>
                    <p className="text-gray-600">
                      No more vague suggestions. Get specific, actionable recommendations on 
                      everything from word choice to posting times that actually work.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900">Live Content Analysis</h4>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800">Engagement Score</span>
                    <span className="font-bold text-green-800">92/100</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800">Optimal Post Time</span>
                    <span className="font-bold text-blue-800">3:30 PM EST</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800">Trending Topic Match</span>
                    <span className="font-bold text-purple-800">85%</span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-700 font-medium mb-2">Recommendations:</div>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Add question to boost engagement</li>
                      <li>• Include trending hashtag #ContentStrategy</li>
                      <li>• Consider posting 30 min earlier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Ready to Transform Your Content Strategy?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Stop leaving your content's success to chance. Join the creators who've discovered 
              what actually works for their audience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/auth/signup" className="w-full sm:w-auto">
                <Button variant="primary" className="px-10 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl">
                  Get Started Free
                </Button>
              </Link>
              
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="secondary" className="px-8 py-4 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
                <div className="text-gray-600">14-day trial</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">5 min</div>
                <div className="text-gray-600">Setup time</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">AI insights</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
