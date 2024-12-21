import ContentInsightsSection from "@buffbyte/components/widgets/dashboard/content-insights";
import QuickActionsSection from "@buffbyte/components/widgets/dashboard/quick-actions";
import TrendingTopicsSection from "@buffbyte/components/widgets/dashboard/trending-topics";
import ViralHashtagsSection from "@buffbyte/components/widgets/dashboard/viral-hashtags";
import WelcomeHero from "@buffbyte/components/widgets/dashboard/welcome";
import { AuthService } from "@buffbyte/services";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@buffbyte/components/layout/header/app";
import { dashboardMock } from "@buffbyte/constants/mocks";

import type {
  Country,
  CountryData,
  DashboardData,
  TrendingTopic,
  User
} from "@buffbyte/types/dashboard";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = AuthService.getUser() as User;

  // State management
  const [selectedCountry, setSelectedCountry] = useState<Country>("nigeria");
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardData] = useState<DashboardData>(dashboardMock);
  const currentCountryData: CountryData = dashboardData[selectedCountry];

  // Handle country change with loading simulation
  const handleCountryChange = async (country: string) => {
    if (country === selectedCountry) return;

    setLoading(true);
    // Simulate data fetching delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSelectedCountry(country as Country);
    setLoading(false);
  };

  // Handle various click events
  const handleTopicClick = (topic: TrendingTopic) => {
    console.log("Topic clicked:", topic);
    // Navigate to detailed topic analysis or show modal
  };
  // Animation variants for the page
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-50"
    >
      {/* App Header */}
      <AppHeader />

      {/* Main Content Container */}
      <div className="pt-2 lg:pt-24 pb-24 lg:pb-12">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8">
          {/* Welcome Hero - Full Width */}
          <motion.div variants={sectionVariants} className="mb-12">
            <WelcomeHero
              user={user}
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              loading={loading}
            />
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="space-y-12">
            {/* Right: Quick Actions */}
            <motion.div variants={sectionVariants}>
              <QuickActionsSection />
            </motion.div>

            {/* Row 1: Trending Topics (Full Width) */}
            <motion.div variants={sectionVariants}>
              <TrendingTopicsSection
                topics={currentCountryData?.trending_topics || []}
                selectedCountry={selectedCountry}
                loading={loading}
                onTopicClick={handleTopicClick}
              />
            </motion.div>

            {/* Row 2: Two Column Layout */}
            <div className="grid grid-cols-1 gap-8">
              {/* Left: Viral Hashtags */}
              <motion.div variants={sectionVariants}>
                <ViralHashtagsSection
                  hashtags={
                    currentCountryData?.hashtags || {
                      twitter: [],
                      instagram: [],
                      tiktok: [],
                      linkedin: [],
                    }
                  }
                  selectedCountry={selectedCountry}
                  loading={loading}
                />
              </motion.div>
            </div>

            {/* Row 3: Three Column Layout */}
            <div className="grid grid-cols-1 gap-8">
              {/* Left: Content Insights */}
              <motion.div variants={sectionVariants} className="lg:col-span-2">
                <ContentInsightsSection
                  insights={
                    currentCountryData?.content_insights || {
                      viral_formats: [],
                      peak_posting_times: [],
                      content_gaps: [],
                    }
                  }
                  selectedCountry={selectedCountry}
                  loading={loading}
                />
              </motion.div>
            </div>
            
          </div>

          {/* Dashboard Summary Footer */}
          <motion.div
            variants={sectionVariants}
            className="mt-12 bg-gradient-to-r from-primary-50 via-white to-success-50 rounded-2xl p-8 border border-primary-100 shadow-sm"
          >
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  📊 Dashboard Summary
                </h3>
                <p className="text-gray-600">
                  Your content optimization insights at a glance
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {currentCountryData?.trending_topics?.length || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Trending Topics
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-success-600 mb-1">
                    {Object.values(currentCountryData?.hashtags || {}).flat()
                      .length || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Viral Hashtags
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-warning-600 mb-1">
                    {currentCountryData?.creator_opportunities?.length || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Opportunities
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {Math.round(
                      (currentCountryData?.analysis_metadata
                        ?.confidence_level || 0) * 100
                    )}
                    %
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Data Confidence
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span>{" "}
                    {currentCountryData?.analysis_metadata?.analyzed_at
                      ? new Date(
                          currentCountryData.analysis_metadata.analyzed_at
                        ).toLocaleDateString()
                      : "Recently"}
                    {" • "}
                    <span className="font-medium">Sources:</span>{" "}
                    {currentCountryData?.analysis_metadata?.data_sources?.join(
                      ", "
                    ) || "Multiple platforms"}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-success-600">
                      Live Data
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Dashboard
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we fetch the latest insights for you.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardPage;
