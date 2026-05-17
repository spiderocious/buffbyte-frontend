// ── Envelope ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly statusCode: number;
  readonly message: string;
  readonly data: T;
  readonly timestamp: string;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

// ── Chats ─────────────────────────────────────────────────────────────────────
// GET /api/v1/app/content/chats → ApiResponse<AnalysisChat[]>  (flat array)
// GET /api/v1/app/video/chats  → ApiResponse<AnalysisChat[]>

export interface AnalysisChat {
  readonly _id: string;
  readonly id: string;
  readonly message: string;
  readonly sender: string;
  readonly response: string; // JSON string — parse to ContentAnalysisResult | ScriptAnalysisResult
  readonly status: 'completed' | 'pending' | 'failed';
  readonly type: 'content' | 'video';
  readonly modelName: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ── Analyze ───────────────────────────────────────────────────────────────────
// POST /api/v1/app/analyze

export type AnalysisType = 'content' | 'video';

export interface AnalyzePayload {
  readonly content: string;
  readonly type: AnalysisType;
}

export interface AnalyzeResult {
  readonly id: string;
  readonly message: string;
  readonly response: string;
  readonly sender: string;
  readonly type: AnalysisType;
  readonly status: 'completed' | 'pending' | 'failed';
  readonly modelName: string;
  readonly data: ContentAnalysisResult | ScriptAnalysisResult;
  readonly analysisId: string;
  readonly content: string;
  readonly metadata: {
    readonly remainingTrials: number;
    readonly trialLimit: number;
    readonly contentType: AnalysisType;
    readonly userId: string;
  };
}

// ── Content analysis result (type: "content") ────────────────────────────────

export interface ContentAnalysisResult {
  readonly sentiment: {
    readonly score: number;
    readonly label: 'positive' | 'negative' | 'neutral';
    readonly confidence: number;
    readonly emotions: readonly {
      readonly type: string;
      readonly intensity: number;
    }[];
  };
  readonly virality: {
    readonly score: number;
    readonly factors: readonly {
      readonly factor: string;
      readonly impact: 'high' | 'medium' | 'low';
      readonly reasoning: string;
    }[];
    readonly predicted_engagement: {
      readonly likes: { readonly min: number; readonly max: number };
      readonly shares: { readonly min: number; readonly max: number };
      readonly comments: { readonly min: number; readonly max: number };
    };
  };
  readonly brand: {
    readonly voice_consistency: number;
    readonly tone: string;
    readonly formality_level: number;
    readonly brand_alignment: {
      readonly score: number;
      readonly deviations: readonly string[];
    };
  };
  readonly quality: {
    readonly readability_score: number;
    readonly grammar_score: number;
    readonly clarity_score: number;
    readonly spelling_errors: readonly {
      readonly word: string;
      readonly suggestions: readonly string[];
      readonly position: number;
    }[];
    readonly grammar_issues: readonly {
      readonly issue: string;
      readonly correction: string;
      readonly position: number;
    }[];
  };
  readonly platform_analysis: {
    readonly character_efficiency: number;
    readonly hashtag_optimization: {
      readonly current_hashtags: readonly string[];
      readonly suggested_hashtags: readonly string[];
      readonly hashtag_strategy: string;
    };
    readonly optimal_length: {
      readonly current: number;
      readonly recommended: number;
      readonly reasoning: string;
    };
    readonly formatting_suggestions: readonly {
      readonly type: string;
      readonly suggestion: string;
    }[];
  };
  readonly audience: {
    readonly target_demographic: {
      readonly age_group: string;
      readonly interests: readonly string[];
      readonly professional_level: string;
    };
    readonly accessibility_score: number;
    readonly inclusivity_check: {
      readonly score: number;
      readonly flags: readonly string[];
    };
  };
  readonly timing: {
    readonly optimal_post_times: readonly {
      readonly time: string;
      readonly day: string;
      readonly reasoning: string;
      readonly engagement_boost: number;
    }[];
    readonly seasonality_relevance: number;
    readonly trending_alignment: readonly {
      readonly trend: string;
      readonly relevance: number;
    }[];
  };
  readonly risk: {
    readonly overall_risk: 'low' | 'medium' | 'high';
    readonly factors: readonly {
      readonly type: string;
      readonly severity: 'low' | 'medium' | 'high';
      readonly description: string;
      readonly mitigation: string;
    }[];
    readonly compliance_check: {
      readonly gdpr_compliant: boolean;
      readonly accessibility_compliant: boolean;
      readonly industry_guidelines: boolean;
    };
  };
  readonly recommendations: readonly AnalysisRecommendation[];
  readonly competitive: {
    readonly uniqueness_score: number;
    readonly similar_content_detected: boolean;
    readonly differentiation_opportunities: readonly string[];
    readonly market_gap_analysis: string;
  };
  readonly analysis_metadata: AnalysisMetadata;
}

// ── Script/video analysis result (type: "video") ─────────────────────────────

export interface ScriptAnalysisResult {
  readonly delivery: {
    readonly speaking_pace: {
      readonly estimated_duration: string;
      readonly word_count: number;
      readonly optimal_wpm: number;
      readonly current_pace_rating: number;
      readonly pace_variance: {
        readonly intro: number;
        readonly body: number;
        readonly conclusion: number;
      };
      readonly difficult_sections: readonly {
        readonly text: string;
        readonly position: number;
        readonly suggested_pace: number;
        readonly reason: string;
      }[];
    };
    readonly readability_for_speech: {
      readonly score: number;
      readonly sentence_complexity: number;
      readonly breath_points: number;
      readonly tongue_twisters: readonly {
        readonly phrase: string;
        readonly position: number;
        readonly difficulty: number;
        readonly suggestion: string;
      }[];
      readonly transitions: {
        readonly smooth_count: number;
        readonly awkward_count: number;
        readonly suggestions: readonly {
          readonly position: number;
          readonly current: string;
          readonly suggested: string;
          readonly reason: string;
        }[];
      };
    };
    readonly energy_flow: {
      readonly overall_score: number;
      readonly energy_curve: readonly {
        readonly timestamp: string;
        readonly energy: number;
        readonly note: string;
      }[];
      readonly monotone_risk_sections: readonly {
        readonly start: string;
        readonly end: string;
        readonly reason: string;
        readonly suggestion: string;
      }[];
    };
  };
  readonly engagement: {
    readonly hook_strength: {
      readonly score: number;
      readonly first_15_seconds: string;
      readonly attention_grabbers: readonly {
        readonly type: string;
        readonly text: string;
        readonly effectiveness: number;
      }[];
      readonly improvement_suggestions: readonly string[];
    };
    readonly retention_prediction: {
      readonly overall_score: number;
      readonly drop_off_risks: readonly {
        readonly timestamp: string;
        readonly risk_level: number;
        readonly reason: string;
        readonly suggestion: string;
      }[];
      readonly engagement_boosters: readonly {
        readonly timestamp: string;
        readonly element: string;
        readonly boost_factor: number;
      }[];
    };
    readonly call_to_action: {
      readonly presence: boolean;
      readonly strength: number;
      readonly placement: string;
      readonly clarity: number;
      readonly urgency: number;
      readonly suggestions: readonly string[];
    };
  };
  readonly platform_optimization: {
    readonly youtube: {
      readonly score: number;
      readonly title_hook_strength: number;
      readonly description_optimization: number;
      readonly watch_time_prediction: string;
      readonly thumbnail_opportunities: readonly string[];
      readonly seo_keywords: readonly string[];
      readonly engagement_optimization: {
        readonly subscribe_mention: boolean;
        readonly comment_encouragement: boolean;
        readonly like_reminder: boolean;
      };
    };
    readonly tiktok: {
      readonly score: number;
      readonly issues: readonly string[];
      readonly adaptation_suggestions: readonly string[];
      readonly viral_potential: number;
    };
    readonly linkedin: {
      readonly score: number;
      readonly professional_tone: number;
      readonly business_value: number;
      readonly thought_leadership: number;
      readonly networking_opportunities: readonly string[];
    };
    readonly instagram_reels: {
      readonly score: number;
      readonly visual_storytelling: number;
      readonly music_sync_opportunities: readonly string[];
      readonly text_overlay_suggestions: readonly string[];
    };
  };
  readonly structure: {
    readonly narrative_flow: {
      readonly score: number;
      readonly story_arc: string;
      readonly pacing: string;
      readonly logical_progression: number;
      readonly gaps: readonly {
        readonly section: string;
        readonly issue: string;
        readonly suggestion: string;
      }[];
    };
    readonly content_density: {
      readonly information_per_minute: number;
      readonly cognitive_load: string;
      readonly complexity_progression: string;
      readonly digestibility: number;
      readonly suggestions: readonly string[];
    };
    readonly memorability: {
      readonly score: number;
      readonly key_takeaways: number;
      readonly quotable_moments: readonly {
        readonly text: string;
        readonly timestamp: string;
        readonly shareability: number;
      }[];
      readonly story_elements: number;
      readonly emotional_moments: number;
    };
  };
  readonly teleprompter_readiness: {
    readonly overall_score: number;
    readonly difficulty_rating: string;
    readonly formatting_needs: {
      readonly pause_markers: number;
      readonly emphasis_points: number;
      readonly speed_changes: number;
      readonly suggested_markup: readonly {
        readonly position: number;
        readonly type: string;
        readonly reason: string;
        readonly duration?: number;
        readonly factor?: number;
      }[];
    };
    readonly practice_recommendations: {
      readonly estimated_rehearsals: number;
      readonly focus_areas: readonly string[];
      readonly common_stumble_points: readonly {
        readonly phrase: string;
        readonly alternative: string;
        readonly position: number;
      }[];
    };
  };
  readonly ai_recommendations: readonly AnalysisRecommendation[];
  readonly quality: {
    readonly authenticity_score: number;
    readonly voice_consistency: number;
    readonly message_clarity: number;
    readonly emotional_resonance: number;
    readonly technical_quality: {
      readonly grammar_score: number;
      readonly vocabulary_appropriateness: number;
      readonly tone_consistency: number;
      readonly filler_word_risk: number;
      readonly unclear_references: readonly string[];
    };
  };
  readonly predicted_performance: {
    readonly completion_rate: number;
    readonly engagement_rate: number;
    readonly share_probability: number;
    readonly audience_segments: readonly {
      readonly segment: string;
      readonly comprehension: number;
      readonly engagement: number;
      readonly retention: number;
    }[];
  };
  readonly analysis_metadata: AnalysisMetadata;
}

// ── Shared sub-types ─────────────────────────────────────────────────────────

export interface AnalysisRecommendation {
  readonly type: string;
  readonly priority: 'high' | 'medium' | 'low';
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly implementation?: string;
  readonly expected_impact?: string;
  readonly suggested_addition?: string;
  readonly position?: string;
  readonly icon: string;
}

export interface AnalysisMetadata {
  readonly analyzed_at: string;
  readonly processing_time: number;
  readonly ai_confidence: number;
  readonly content_length?: number;
  readonly script_length?: number;
  readonly estimated_video_length?: string;
  readonly platform?: string;
  readonly analysis_version: string;
  readonly focus_area?: string;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
// GET /api/v1/app/dashboard → ApiResponse<DashboardData>
// Keyed by lowercase 2-letter ISO country code ("ng", "uk", "us")
// Also contains non-country keys "cached" and "requestDate" — filter with k.length === 2

export type DashboardData = Record<string, CountryData | boolean | string>;

export interface CountryData {
  readonly trending_topics: readonly TrendingTopic[];
  readonly hashtags: {
    readonly twitter: readonly TwitterHashtag[];
    readonly instagram: readonly InstagramHashtag[];
    readonly tiktok: readonly TikTokHashtag[];
    readonly linkedin: readonly LinkedInHashtag[];
  };
  readonly content_insights: {
    readonly viral_formats: readonly ViralFormat[];
    readonly peak_posting_times: readonly PeakPostingTime[];
    readonly content_gaps: readonly ContentGap[];
  };
  readonly platform_updates: readonly PlatformUpdate[];
  readonly creator_opportunities: readonly CreatorOpportunity[];
  readonly regional_specifics: {
    readonly local_trends: readonly {
      readonly trend: string;
      readonly cultural_context: string;
      readonly local_relevance: number;
    }[];
    readonly language_preferences: readonly {
      readonly language: string;
      readonly platform_preference: string;
      readonly content_performance: number;
    }[];
    readonly time_zones: {
      readonly peak_activity: string;
      readonly weekend_patterns: string;
      readonly holiday_impact: string;
    };
  };
  readonly analysis_metadata: {
    readonly analyzed_at: string;
    readonly data_sources: readonly string[];
    readonly confidence_level: number;
    readonly next_update_recommended: string;
    readonly geographic_scope: string;
  };
  readonly forecasts: {
    readonly trends: readonly {
      readonly trend: string;
      readonly probability: number;
      readonly timeframe: string;
    }[];
    readonly events: readonly {
      readonly event: string;
      readonly predicted_date: string;
      readonly impact_score: number;
    }[];
    readonly tags: readonly {
      readonly tag: string;
      readonly growth_prediction: number;
      readonly platforms: readonly string[];
    }[];
  };
}

export interface TrendingTopic {
  readonly topic: string;
  readonly platforms: readonly string[];
  readonly engagement_score: number;
  readonly trend_velocity: 'rising' | 'stable' | 'cooling';
  readonly demographics: readonly string[];
  readonly content_types: readonly string[];
  readonly duration_prediction: 'hours' | 'days' | 'weeks';
}

export interface TwitterHashtag {
  readonly tag: string;
  readonly volume: number;
  readonly engagement_rate: number;
  readonly related_topics: readonly string[];
}

export interface InstagramHashtag {
  readonly tag: string;
  readonly posts_count: number;
  readonly engagement_rate: number;
  readonly content_type: string;
}

export interface TikTokHashtag {
  readonly tag: string;
  readonly views: number;
  readonly trend_score: number;
  readonly music_associated: boolean;
}

export interface LinkedInHashtag {
  readonly tag: string;
  readonly professional_relevance: number;
  readonly industry: string;
  readonly engagement_type: string;
}

export interface ViralFormat {
  readonly format: string;
  readonly platforms: readonly string[];
  readonly success_rate: number;
  readonly key_elements: readonly string[];
}

export interface PeakPostingTime {
  readonly platform: string;
  readonly time: string;
  readonly timezone: string;
  readonly engagement_boost: number;
}

export interface ContentGap {
  readonly topic: string;
  readonly opportunity_score: number;
  readonly suggested_angle: string;
}

export interface PlatformUpdate {
  readonly platform: string;
  readonly update_type: string;
  readonly impact_on_creators: string;
  readonly adaptation_strategy: string;
}

export interface CreatorOpportunity {
  readonly niche: string;
  readonly demand_level: number;
  readonly competition_level: number;
  readonly monetization_potential: number;
  readonly recommended_platforms: readonly string[];
}
