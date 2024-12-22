import AppHeader from "@buffbyte/components/layout/header/app";
import ContentAnalysisLayout from "@buffbyte/components/widgets/content-analysis/layout";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AnalysisLoader from "../../../components/ui/analysis-loader";
import { EASING } from "../../../types";
import { bus } from "../../../events";

const mockAnalyses = [
  {
    id: "6897b8b95df10c3125198b7a",
    content:
      "Hey everyone! Today I want to share something that completely changed how I approach morning routines. \\n\\nFor the longest time, I was that person hitting snooze five times, rushing through breakfast, and arriving at work already stressed. Sound familiar?\\n\\nThen I discovered this Japanese concept called \\ikigai\\ - your reason for being. But here's the thing - most people think ikigai is about finding your life purpose. That's actually a Western misinterpretation.\\n\\nThe real ikigai is much simpler. It's about finding small moments of meaning in your daily routine. Like savoring your coffee instead of chugging it. Taking three deep breaths before checking emails. \\n\\nI started with just one tiny change: setting my alarm 10 minutes earlier and using those 10 minutes to write down three things I'm grateful for. No phone, no distractions, just me and a notebook.\\n\\nAfter 30 days, something shifted. I wasn't just more productive - I was calmer, more focused, and honestly? Happier.\\n\\nThe best part? It takes literally 10 minutes. That's less time than you spend scrolling social media while drinking your coffee.\\n\\nSo here's my challenge for you: pick one tiny routine change you can make tomorrow morning. Just one. Try it for a week and let me know how it goes in the comments.\\n\\nWhat's your current morning routine like? I'd love to hear about it!",
    response:
      '{"delivery":{"speaking_pace":{"estimated_duration":"4:30-5:00 minutes","word_count":267,"optimal_wpm":150,"current_pace_rating":0.85,"pace_variance":{"intro":0.8,"body":0.9,"conclusion":0.7},"difficult_sections":[{"text":"That\'s actually a Western misinterpretation","position":85,"suggested_pace":120,"reason":"Complex terminology requires slower delivery"},{"text":"ikigai","position":65,"suggested_pace":100,"reason":"Foreign word needs emphasis and clear pronunciation"}]},"readability_for_speech":{"score":0.92,"sentence_complexity":0.3,"breath_points":18,"tongue_twisters":[{"phrase":"rushing through breakfast","position":45,"difficulty":0.4,"suggestion":"Practice the \'r\' and \'th\' combination"}],"transitions":{"smooth_count":8,"awkward_count":2,"suggestions":[{"position":120,"current":"But here\'s the thing","suggested":"However, here\'s what I discovered","reason":"More natural flow for video content"}]}},"energy_flow":{"overall_score":0.88,"energy_curve":[{"timestamp":"0:00-0:15","energy":0.9,"note":"Strong opening hook"},{"timestamp":"0:15-1:30","energy":0.7,"note":"Story setup phase"},{"timestamp":"1:30-3:00","energy":0.8,"note":"Educational content with personal examples"},{"timestamp":"3:00-4:30","energy":0.9,"note":"Strong call to action"}],"monotone_risk_sections":[{"start":"1:15","end":"1:45","reason":"Educational explanation about ikigai","suggestion":"Add vocal variety when explaining the concept"}]}},"engagement":{"hook_strength":{"score":0.85,"first_15_seconds":"Strong relatable opening with personal struggle that many viewers will identify with","attention_grabbers":[{"type":"relatable_problem","text":"hitting snooze five times, rushing through breakfast","effectiveness":0.9},{"type":"direct_address","text":"Sound familiar?","effectiveness":0.8}],"improvement_suggestions":["Consider adding a specific statistic about morning routine struggles","Could include a teaser about the transformation results"]},"retention_prediction":{"overall_score":0.82,"drop_off_risks":[{"timestamp":"1:30","risk_level":0.4,"reason":"Educational content about ikigai concept","suggestion":"Add visual elements or personal anecdote"},{"timestamp":"3:30","risk_level":0.3,"reason":"Results section might feel too promotional","suggestion":"Include specific metrics or examples"}],"engagement_boosters":[{"timestamp":"0:30","element":"Direct question engagement","boost_factor":0.8},{"timestamp":"4:00","element":"Challenge and call to action","boost_factor":0.9}]},"call_to_action":{"presence":true,"strength":0.88,"placement":"end","clarity":0.9,"urgency":0.7,"suggestions":["Add a specific deadline for the challenge","Include a follow-up promise for viewers who participate"]}},"platform_optimization":{"youtube":{"score":0.85,"title_hook_strength":0.8,"description_optimization":0.7,"watch_time_prediction":"4-5 minutes","thumbnail_opportunities":["Before/after morning routine visualization","Japanese ikigai symbol with morning coffee","Clock showing early morning time"],"seo_keywords":["morning routine","ikigai","productivity","self-improvement","japanese philosophy","gratitude practice"],"engagement_optimization":{"subscribe_mention":false,"comment_encouragement":true,"like_reminder":false}},"tiktok":{"score":0.65,"issues":["Too long for typical TikTok attention span","Educational content needs more visual elements","Missing trending audio or music sync opportunities"],"adaptation_suggestions":["Break into 3 separate videos: Problem, Solution, Results","Add text overlays for key points","Include trending morning routine hashtags"],"viral_potential":0.7},"linkedin":{"score":0.78,"professional_tone":0.8,"business_value":0.75,"thought_leadership":0.8,"networking_opportunities":["Share productivity insights with professional network","Connect with others interested in Japanese business philosophy","Engage with wellness and productivity communities"]},"instagram_reels":{"score":0.72,"visual_storytelling":0.7,"music_sync_opportunities":["Calm morning music during gratitude section","Upbeat music during transformation results","Trending audio with morning routine hashtags"],"text_overlay_suggestions":["Key ikigai definition","10-minute challenge details","Before/after comparison stats"]}},"structure":{"narrative_flow":{"score":0.88,"story_arc":"problem-solution-transformation","pacing":"well_balanced","logical_progression":0.9,"gaps":[{"section":"concept_explanation","issue":"Could use more concrete examples of ikigai in practice","suggestion":"Add 2-3 specific daily examples beyond coffee and breathing"}]},"content_density":{"information_per_minute":0.75,"cognitive_load":"medium","complexity_progression":"simple_to_complex","digestibility":0.85,"suggestions":["Break down ikigai concept into smaller chunks","Add more transition phrases between concepts"]},"memorability":{"score":0.82,"key_takeaways":4,"quotable_moments":[{"text":"The real ikigai is much simpler. It\'s about finding small moments of meaning in your daily routine.","timestamp":"1:45","shareability":0.9},{"text":"That\'s less time than you spend scrolling social media while drinking your coffee.","timestamp":"3:45","shareability":0.8}],"story_elements":3,"emotional_moments":2}},"teleprompter_readiness":{"overall_score":0.88,"difficulty_rating":"intermediate","formatting_needs":{"pause_markers":12,"emphasis_points":8,"speed_changes":5,"suggested_markup":[{"position":65,"type":"emphasis","reason":"Foreign word pronunciation"},{"position":45,"type":"pause","duration":1,"reason":"Question engagement moment"},{"position":180,"type":"speed_slow","factor":0.8,"reason":"Key concept explanation"}]},"practice_recommendations":{"estimated_rehearsals":3,"focus_areas":["Japanese pronunciation of ikigai","Natural delivery of personal story","Energy maintenance during educational sections"],"common_stumble_points":[{"phrase":"Western misinterpretation","alternative":"Western misunderstanding","position":85}]}},"ai_recommendations":[{"type":"hook_improvement","priority":"medium","category":"engagement","title":"Strengthen Opening Hook","description":"Add specific statistic about morning routine struggles to increase relatability","implementation":"Start with \'73% of people hit snooze at least once every morning\'","expected_impact":"15-20% improvement in first 15-second retention","icon":"🎯"},{"type":"platform_adaptation","priority":"high","category":"optimization","title":"TikTok Version Creation","description":"Break content into digestible TikTok-sized segments","platforms":["tiktok"],"expected_impact":"Expand reach to younger demographics","icon":"📱"},{"type":"engagement_boost","priority":"high","category":"retention","title":"Add Visual Cues","description":"Include timestamps and visual elements during educational sections","position":"1:30-2:30","expected_impact":"Reduce drop-off risk by 25%","icon":"👁️"},{"type":"pacing_optimization","priority":"medium","category":"delivery","title":"Emphasize Key Concepts","description":"Slow down delivery during ikigai explanation for better comprehension","current":"Normal pace throughout","suggested":"80% speed during concept explanation","expected_impact":"Improved message retention","icon":"⏱️"}],"quality":{"authenticity_score":0.92,"voice_consistency":0.88,"message_clarity":0.85,"emotional_resonance":0.8,"technical_quality":{"grammar_score":0.95,"vocabulary_appropriateness":0.9,"tone_consistency":0.88,"filler_word_risk":0.15,"unclear_references":["this Japanese concept"]}},"predicted_performance":{"completion_rate":0.78,"engagement_rate":0.72,"share_probability":0.68,"audience_segments":[{"segment":"productivity_enthusiasts","comprehension":0.9,"engagement":0.85,"retention":0.8},{"segment":"self_improvement_seekers","comprehension":0.85,"engagement":0.9,"retention":0.82},{"segment":"general_lifestyle","comprehension":0.75,"engagement":0.7,"retention":0.65}]},"analysis_metadata":{"analyzed_at":"2025-08-02T16:18:08.070Z","processing_time":2.4,"ai_confidence":0.88,"script_length":267,"estimated_video_length":"4:30-5:00 minutes","analysis_version":"2.1.0","focus_area":"comprehensive_video_optimization"},"analysisId":"V4VHMPA3M1"}',
    createdAt: "2025-08-09T21:08:09.324Z",
    updatedAt: "2025-08-09T21:08:09.324Z",
  },
];

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook";

interface AnalysisItem {
  id: string;
  content: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

const ScriptAnalysisPage: React.FC = () => {
  // const navigate = useNavigate();

  // State management
  const [analyses, setAnalyses] = useState<AnalysisItem[]>(mockAnalyses);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(
    null
  );

  // Load analyses on mount
  useEffect(() => {
    loadAnalyses();
    bus.emit("active:content", { contentType: "script" });
  }, []);

  // Mock function to load analyses - replace with your API call
  const loadAnalyses = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real app: const data = await AnalysisService.getAnalyses();
      setAnalyses(mockAnalyses);
    } catch (error) {
      console.error("Failed to load analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new content analysis
  const handleAnalyze = async (content: string, platform: Platform) => {
    setAnalyzing(true);

    try {
      // Simulate API call for analysis
      await new Promise((resolve) => setTimeout(resolve, 15000));

      // Mock analysis result - replace with your API call
      const newAnalysis: AnalysisItem = {
        id: Date.now().toString(),
        content,
        createdAt: new Date().toISOString(),
        score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
        platform,
        wordCount: content.trim().split(/\s+/).length,
      };

      // Add to analyses list
      setAnalyses((prev) => [newAnalysis, ...prev]);

      // Select the new analysis to show results
      setSelectedAnalysis(newAnalysis);

      // In real app, you might navigate to a results page:
      // navigate(`/content-analysis/${newAnalysis.id}`);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Handle error (show toast, etc.)
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle analysis selection
  const handleAnalysisSelect = (analysis: AnalysisItem | null) => {
    setSelectedAnalysis(analysis);
    // In real app, you might navigate to show full results:
    // navigate(`/content-analysis/${analysis.id}`);
  };

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASING.smooth,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-50"
    >
      {/* App Header - Commented out for demo */}
      <AppHeader />

      {/* Main Content Container */}
      <div className="pt-2 lg:pt-32 pb-6 lg:pb-12">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASING.smooth }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-col-reverse md:flex-row p-4 md:p-0 gap-[20px]">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Script Analysis
                </h1>
                <p className="text-slate-600">
                  Get AI-driven insights to improve your content strategy.
                </p>
              </div>

              {/* Breadcrumb navigation */}
              <nav className="flex w-full md:w-fit items-start space-x-2 text-sm">
                <button
                  onClick={() => {
                    /* navigate('/dashboard') */
                  }}
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Dashboard
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-medium">
                  Script Analysis
                </span>
              </nav>
            </div>
          </motion.div>

          {/* Main Content Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING.smooth }}
            className="h-[calc(100vh-12rem)]" // Full height minus header and padding
          >
            <ContentAnalysisLayout
              analyses={analyses}
              onAnalyze={handleAnalyze}
              onAnalysisSelect={handleAnalysisSelect}
              loading={loading}
              analyzing={analyzing}
            />
          </motion.div>
        </div>
      </div>

      <AnalysisLoader
        isVisible={analyzing}
        content={selectedAnalysis?.content}
        totalDuration={45000}
      />
    </motion.div>
  );
};

export default ScriptAnalysisPage;
