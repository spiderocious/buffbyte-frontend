export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';
export type TrendVelocity = 'rising' | 'stable' | 'declining';
export type UpdateType = 'algorithm' | 'feature' | 'policy' | 'monetization' | 'analytics';
export type Impact = 'positive' | 'negative' | 'neutral';
export type Country = 'nigeria' | 'uk' | 'us' | 'ca' | 'au';

// Trending Topics
export interface TrendingTopic {
  topic: string;
  platforms: Platform[];
  engagement_score: number;
  trend_velocity: TrendVelocity;
  demographics: string[];
  content_types: string[];
  duration_prediction: string;
}

// Hashtag data structures by platform
export interface TwitterHashtag {
  tag: string;
  volume: number;
  engagement_rate: number;
  related_topics: string[];
}

export interface InstagramHashtag {
  tag: string;
  posts_count: number;
  engagement_rate: number;
  content_type: string;
}

export interface TikTokHashtag {
  tag: string;
  views: number;
  trend_score: number;
  music_associated: boolean;
}

export interface LinkedInHashtag {
  tag: string;
  professional_relevance: number;
  industry: string;
  engagement_type: string;
}

export interface HashtagData {
  twitter: TwitterHashtag[];
  instagram: InstagramHashtag[];
  tiktok: TikTokHashtag[];
  linkedin: LinkedInHashtag[];
}

// Content Insights
export interface ViralFormat {
  format: string;
  platforms: Platform[];
  success_rate: number;
  key_elements: string[];
}

export interface PeakPostingTime {
  platform: Platform;
  time: string;
  timezone: string;
  engagement_boost: number;
}

export interface ContentGap {
  topic: string;
  opportunity_score: number;
  suggested_angle: string;
}

export interface ContentInsights {
  viral_formats: ViralFormat[];
  peak_posting_times: PeakPostingTime[];
  content_gaps: ContentGap[];
}

// Platform Updates
export interface PlatformUpdate {
  platform: Platform;
  update_type: UpdateType;
  impact_on_creators: Impact;
  adaptation_strategy: string;
  date?: string;
  urgency?: 'low' | 'medium' | 'high';
}

// Creator Opportunities
export interface CreatorOpportunity {
  niche: string;
  demand_level: number;
  competition_level: number;
  monetization_potential: number;
  recommended_platforms: Platform[];
}

// Regional Specifics
export interface LocalTrend {
  trend: string;
  cultural_context: string;
  local_relevance: number;
}

export interface LanguagePreference {
  language: string;
  platform_preference: string;
  content_performance: number;
}

export interface TimeZoneInfo {
  peak_activity: string;
  weekend_patterns: string;
  holiday_impact: string;
}

export interface RegionalSpecifics {
  local_trends: LocalTrend[];
  language_preferences: LanguagePreference[];
  time_zones: TimeZoneInfo;
}

// Analysis Metadata
export interface AnalysisMetadata {
  analyzed_at: string;
  data_sources: string[];
  confidence_level: number;
  next_update_recommended: string;
  geographic_scope: string;
}

// Country Data Structure
export interface CountryData {
  trending_topics: TrendingTopic[];
  hashtags: HashtagData;
  content_insights: ContentInsights;
  platform_updates: PlatformUpdate[];
  creator_opportunities: CreatorOpportunity[];
  regional_specifics: RegionalSpecifics;
  analysis_metadata: AnalysisMetadata;
}

// Main Dashboard Data
export interface DashboardData {
  nigeria: CountryData;
  uk: CountryData;
  us: CountryData;
  [key: string]: CountryData; // Allow for additional countries
}

// User Interface
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

// Quick Stats Interface
export interface QuickStats {
  totalAnalyses: number;
  avgEngagement: number;
  topPlatform: string;
  streakDays: number;
}