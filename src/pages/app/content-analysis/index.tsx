import AppHeader from "@buffbyte/components/layout/header/app";
import ContentAnalysisLayout from "@buffbyte/components/widgets/content-analysis/layout";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AnalysisLoader from "../../../components/ui/analysis-loader";
import { bus } from "../../../events";
import { EASING } from "../../../types";

const mockAnalyses = [
  {
    id: "6897b7883a4c8bfc680d961e",
    content:
      "Hey everyone! Today I want to share something that completely changed how I approach morning routines. \\n\\nFor the longest time, I was that person hitting snooze five times, rushing through breakfast, and arriving at work already stressed. Sound familiar?\\n\\nThen I discovered this Japanese concept called \\ikigai\\ - your reason for being. But here's the thing - most people think ikigai is about finding your life purpose. That's actually a Western misinterpretation.\\n\\nThe real ikigai is much simpler. It's about finding small moments of meaning in your daily routine. Like savoring your coffee instead of chugging it. Taking three deep breaths before checking emails. \\n\\nI started with just one tiny change: setting my alarm 10 minutes earlier and using those 10 minutes to write down three things I'm grateful for. No phone, no distractions, just me and a notebook.\\n\\nAfter 30 days, something shifted. I wasn't just more productive - I was calmer, more focused, and honestly? Happier.\\n\\nThe best part? It takes literally 10 minutes. That's less time than you spend scrolling social media while drinking your coffee.\\n\\nSo here's my challenge for you: pick one tiny routine change you can make tomorrow morning. Just one. Try it for a week and let me know how it goes in the comments.\\n\\nWhat's your current morning routine like? I'd love to hear about it!",
    response:
      '{"sentiment":{"score":-0.75,"label":"negative","confidence":0.92,"emotions":[{"type":"anger","intensity":0.85},{"type":"sadness","intensity":0.65},{"type":"trust","intensity":0.15},{"type":"fear","intensity":0.25},{"type":"joy","intensity":0.05},{"type":"excitement","intensity":0.05},{"type":"anticipation","intensity":0.35},{"type":"surprise","intensity":0.1}]},"virality":{"score":0.78,"factors":[{"factor":"emotional_hook","impact":"high","reasoning":"Strong negative emotions about universal workplace frustration"},{"factor":"shareability","impact":"high","reasoning":"Highly relatable workplace experience many will want to share"},{"factor":"trending_topic","impact":"medium","reasoning":"Meeting culture criticism is ongoing workplace trend"},{"factor":"call_to_action","impact":"low","reasoning":"No explicit call to action present"},{"factor":"visual_appeal","impact":"low","reasoning":"Only one emoji, minimal visual elements"},{"factor":"timing_relevance","impact":"medium","reasoning":"Always relevant during business hours"}],"predicted_engagement":{"likes":{"min":150,"max":500},"shares":{"min":25,"max":100},"comments":{"min":30,"max":80}}},"brand":{"voice_consistency":0.35,"tone":"casual","formality_level":0.2,"brand_alignment":{"score":0.25,"deviations":["Negative workplace attitude","Unprofessional language","Complaining tone","Cynical perspective"]}},"quality":{"readability_score":0.85,"grammar_score":0.75,"clarity_score":0.9,"spelling_errors":[],"grammar_issues":[{"issue":"Missing apostrophe in contraction","correction":"could\'ve should be could\'ve","position":62},{"issue":"Lowercase sentence start","correction":"why should be Why","position":171}]},"platform_analysis":{"character_efficiency":0.82,"hashtag_optimization":{"current_hashtags":["#MeetingHell","#WasteOfTime","#OverIt"],"suggested_hashtags":["#WorkplaceFrustration","#ProductivityTips","#MeetingCulture","#WorkLifeBalance"],"hashtag_strategy":"mixed"},"optimal_length":{"current":280,"recommended":200,"reasoning":"Could be more concise while maintaining impact"},"formatting_suggestions":[{"type":"line_breaks","suggestion":"Break into shorter paragraphs for better readability"},{"type":"emojis","suggestion":"Add more relevant emojis to increase engagement"}]},"audience":{"target_demographic":{"age_group":"25-44","interests":["workplace culture","productivity","career development"],"professional_level":"mid"},"accessibility_score":0.85,"inclusivity_check":{"score":0.9,"flags":[]}},"timing":{"optimal_post_times":[{"time":"9:00 AM","day":"Monday","reasoning":"Peak meeting frustration time","engagement_boost":1.3},{"time":"1:00 PM","day":"Wednesday","reasoning":"Mid-week workplace stress peak","engagement_boost":1.2},{"time":"4:00 PM","day":"Friday","reasoning":"End of week exhaustion","engagement_boost":1.4}],"seasonality_relevance":0.7,"trending_alignment":[{"trend":"workplace wellness","relevance":0.75},{"trend":"meeting culture criticism","relevance":0.9}]},"risk":{"overall_risk":"medium","factors":[{"type":"brand_mismatch","severity":"medium","description":"Negative tone may not align with professional brand","mitigation":"Reframe as constructive feedback"},{"type":"controversial_topic","severity":"low","description":"Workplace criticism could be divisive","mitigation":"Add solution-oriented perspective"}],"compliance_check":{"gdpr_compliant":true,"accessibility_compliant":true,"industry_guidelines":true}},"recommendations":[{"type":"improvement","priority":"high","category":"content","title":"Add constructive element","description":"Balance complaint with solution or positive outlook","implementation":"End with suggestion for improvement","expected_impact":"Increased professional credibility","icon":"💡"},{"type":"optimization","priority":"medium","category":"engagement","title":"Include call-to-action","description":"Ask audience about their meeting experiences","implementation":"Add question at end","expected_impact":"Higher comment engagement","icon":"💬"},{"type":"improvement","priority":"medium","category":"formatting","title":"Improve visual appeal","description":"Add more emojis and line breaks","implementation":"Break into 2-3 shorter paragraphs with relevant emojis","expected_impact":"Better readability and engagement","icon":"✨"}],"competitive":{"uniqueness_score":0.45,"similar_content_detected":true,"differentiation_opportunities":["Add specific meeting improvement tips","Share personal productivity hacks","Create meeting efficiency framework"],"market_gap_analysis":"Opportunity to pivot from complaint to solution-focused content about meeting optimization"},"authenticity":{"score":0.92,"factors":[{"factor":"genuine_voice","impact":"positive","reasoning":"Natural, unfiltered expression of frustration"},{"factor":"personal_experience","impact":"positive","reasoning":"Clearly based on real workplace experience"},{"factor":"emotional_authenticity","impact":"positive","reasoning":"Raw, honest emotional expression"},{"factor":"manufactured_feel","impact":"negative","reasoning":"No signs of artificial or scripted content"}]},"controversy_potential":{"score":0.35,"triggers":["workplace criticism","productivity complaints"],"debate_likelihood":"medium","management_strategy":"Monitor comments for constructive discussion, avoid defensive responses"},"conversion_potential":{"score":0.25,"intent_signals":[{"signal":"cta_presence","strength":0.1},{"signal":"value_proposition","strength":0.2},{"signal":"urgency_markers","strength":0.4},{"signal":"social_proof","strength":0.3}],"optimization_suggestions":["Add link to productivity resources","Include meeting efficiency tips","Offer free meeting template"]},"context_intelligence":{"style_intention_score":0.85,"cultural_relevance":0.9,"industry_alignment":0.65},"analysis_metadata":{"analyzed_at":"2025-08-02T15:03:11.284Z","processing_time":1.2,"ai_confidence":0.88,"content_length":280,"platform":"general","analysis_version":"2.1.0"}}',
    createdAt: "2025-08-09T21:03:04.963Z",
    updatedAt: "2025-08-09T21:03:04.963Z",
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

const ContentAnalysisPage: React.FC = () => {
  // const navigate = useNavigate();
  // State management
  const [analyses, setAnalyses] = useState<AnalysisItem[]>(mockAnalyses);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(
    null
  );

  useEffect(() => {
    loadAnalyses();
    bus.emit("active:content", { contentType: "content" });
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
      {!selectedAnalysis && <AppHeader />}

      {/* Main Content Container */}
      <div className={`pt-2 pb-6 lg:pb-12 ${!selectedAnalysis && "lg:pt-32 "}`}>
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8">
          {/* Page Header */}
          {!selectedAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.smooth }}
              className="mb-8"
            >
              <div className="flex items-center justify-between flex-col-reverse md:flex-row p-4 md:p-0 gap-[20px]">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Content Analysis
                  </h1>
                  <p className="text-slate-600">
                    Analyze your content for engagement insights and
                    optimization recommendations
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
                    Content Analysis
                  </span>
                </nav>
              </div>
            </motion.div>
          )}

          {/* Main Content Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING.smooth }}
            className={selectedAnalysis ? "h-[calc(100vh-2rem)]" : "h-[calc(100vh-12rem)]"} // Full viewport for analysis
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

export default ContentAnalysisPage;
