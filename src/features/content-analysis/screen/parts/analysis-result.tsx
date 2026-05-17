import { useState } from 'react';
import { Repeat, Show } from 'meemaw';
import { RefreshCw, BarChart2, MessageSquare, Zap, Tag, Hash, AlertTriangle, Lightbulb } from '@ui/icons';
import { ScoreRing } from '@ui/score-ring';
import { ScoreLine } from '@ui/score-bar';
import { UnderlineTabs } from '@ui/tabs';
import { Pill } from '@ui/pill';
import { Button } from '@ui/button';
import { InlineNote } from '@ui/banner';
import type { AnalysisChat, AnalyzeResult, ContentAnalysisResult, AnalysisRecommendation } from '@shared/types/api';
import { useContentAnalysis } from '../../providers/use-content-analysis';
import { scoreToColor } from '../../helpers/format-analysis-score';

type Tab = 'overview' | 'sentiment' | 'virality' | 'brand' | 'platform' | 'risk' | 'tips';

const TABS: { value: Tab; label: string }[] = [
  { value: 'overview',  label: 'Overview' },
  { value: 'sentiment', label: 'Sentiment' },
  { value: 'virality',  label: 'Virality' },
  { value: 'brand',     label: 'Brand' },
  { value: 'platform',  label: 'Platform' },
  { value: 'risk',      label: 'Risk' },
  { value: 'tips',      label: 'Tips' },
];

const SECTION_ICONS: Record<Tab, React.ReactNode> = {
  overview:  <BarChart2 size={14} />,
  sentiment: <MessageSquare size={14} />,
  virality:  <Zap size={14} />,
  brand:     <Tag size={14} />,
  platform:  <Hash size={14} />,
  risk:      <AlertTriangle size={14} />,
  tips:      <Lightbulb size={14} />,
};

function parseResult(a: AnalysisChat | AnalyzeResult): ContentAnalysisResult | null {
  try {
    if ('data' in a && a.data !== undefined) return a.data as ContentAnalysisResult;
    return JSON.parse(a.response) as ContentAnalysisResult;
  } catch { return null; }
}

function priorityVariant(p: AnalysisRecommendation['priority']): 'crit' | 'warn' | 'accent' {
  if (p === 'high') return 'crit';
  if (p === 'medium') return 'warn';
  return 'accent';
}

function riskColor(risk: string) {
  if (risk === 'low') return 'text-accent';
  if (risk === 'medium') return 'text-warn-deep';
  return 'text-crit';
}

interface AnalysisResultProps {
  readonly onAnalyzeAnother?: () => void;
}

export function AnalysisResult({ onAnalyzeAnother }: AnalysisResultProps = {}) {
  const { selectedAnalysis, setSelectedAnalysis } = useContentAnalysis();
  const [tab, setTab] = useState<Tab>('overview');
  const [openSections, setOpenSections] = useState<Set<Tab>>(new Set<Tab>(['overview']));

  if (selectedAnalysis === null) return null;

  const result = parseResult(selectedAnalysis);
  if (result === null) {
    return <div className="p-5 text-[13px] text-ink-3">Could not parse analysis result.</div>;
  }

  const viralScore   = Math.round(result.virality.score * 100);
  const sentScore    = Math.round(result.sentiment.score * 100);
  const brandScore   = Math.round(result.brand.voice_consistency * 100);
  const qualityScore = Math.round(result.quality.readability_score * 100);
  const overallScore = Math.round((viralScore + sentScore + brandScore + qualityScore) / 4);

  function toggleSection(id: Tab) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  const analyzedText = 'message' in selectedAnalysis ? (selectedAnalysis as AnalysisChat).message : '';

  // ── Section content rendered for both mobile accordion and desktop tab ──

  const overviewContent = (
    <div className="flex flex-col gap-2">
      <ScoreLine label="Virality"        value={viralScore}   color={scoreToColor(viralScore)} />
      <ScoreLine label="Sentiment"       value={sentScore}    color={scoreToColor(sentScore)} />
      <ScoreLine label="Brand alignment" value={brandScore}   color={scoreToColor(brandScore)} />
      <ScoreLine label="Readability"     value={qualityScore} color={scoreToColor(qualityScore)} />
      <ScoreLine label="Clarity"    value={Math.round(result.quality.clarity_score * 100)}        color={scoreToColor(Math.round(result.quality.clarity_score * 100))} />
      <ScoreLine label="Uniqueness" value={Math.round(result.competitive.uniqueness_score * 100)} color={scoreToColor(Math.round(result.competitive.uniqueness_score * 100))} />
    </div>
  );

  const sentimentContent = (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sheet border border-hair rounded-soft p-3">
          <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Sentiment</p>
          <p className="text-[18px] font-semibold capitalize m-0 text-accent">{result.sentiment.label}</p>
        </div>
        <div className="bg-sheet border border-hair rounded-soft p-3">
          <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Confidence</p>
          <p className="text-[18px] font-semibold tabular-nums m-0">{(result.sentiment.confidence * 100).toFixed(0)}%</p>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Emotions detected</p>
        <div className="flex flex-col gap-1.5">
          <Repeat each={result.sentiment.emotions as { type: string; intensity: number }[]}>
            {(e) => <ScoreLine key={e.type} label={e.type} value={Math.round(e.intensity * 100)} color={scoreToColor(Math.round(e.intensity * 100))} />}
          </Repeat>
        </div>
      </div>
    </div>
  );

  const viralityContent = (
    <div className="flex flex-col gap-4">
      <ScoreLine label="Virality score" value={viralScore} color={scoreToColor(viralScore)} />
      <div>
        <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Virality factors</p>
        <div className="flex flex-col gap-2">
          <Repeat each={result.virality.factors as { factor: string; impact: string; reasoning: string }[]}>
            {(f) => (
              <InlineNote key={f.factor} coach>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-[12.5px]">{f.factor}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${f.impact === 'high' ? 'text-accent' : f.impact === 'medium' ? 'text-warn-deep' : 'text-ink-3'}`}>{f.impact}</span>
                </div>
                <p className="text-[12px] text-ink-3 m-0">{f.reasoning}</p>
              </InlineNote>
            )}
          </Repeat>
        </div>
      </div>
    </div>
  );

  const brandContent = (
    <div className="flex flex-col gap-2">
      <ScoreLine label="Voice consistency" value={Math.round(result.brand.voice_consistency * 100)}      color={scoreToColor(Math.round(result.brand.voice_consistency * 100))} />
      <ScoreLine label="Brand alignment"   value={Math.round(result.brand.brand_alignment.score * 100)} color={scoreToColor(Math.round(result.brand.brand_alignment.score * 100))} />
      <ScoreLine label="Formality"         value={Math.round(result.brand.formality_level * 100)}       color="ink" />
      <Show when={result.brand.brand_alignment.deviations.length > 0}>
        <div className="mt-2">
          <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Deviations</p>
          <div className="flex flex-col gap-2">
            <Repeat each={result.brand.brand_alignment.deviations as string[]}>
              {(d) => <InlineNote key={d}><span className="text-[12.5px]">{d}</span></InlineNote>}
            </Repeat>
          </div>
        </div>
      </Show>
    </div>
  );

  const platformContent = (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sheet border border-hair rounded-soft p-3">
          <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Current length</p>
          <p className="text-[18px] font-semibold tabular-nums m-0">{result.platform_analysis.optimal_length.current}</p>
        </div>
        <div className="bg-sheet border border-hair rounded-soft p-3">
          <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Recommended</p>
          <p className="text-[18px] font-semibold tabular-nums m-0">{result.platform_analysis.optimal_length.recommended}</p>
        </div>
      </div>
      <ScoreLine label="Character efficiency" value={Math.round(result.platform_analysis.character_efficiency * 100)} color={scoreToColor(Math.round(result.platform_analysis.character_efficiency * 100))} />
      <Show when={result.platform_analysis.hashtag_optimization.suggested_hashtags.length > 0}>
        <div>
          <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Suggested hashtags</p>
          <div className="flex gap-1.5 flex-wrap">
            <Repeat each={result.platform_analysis.hashtag_optimization.suggested_hashtags as string[]}>
              {(h) => <Pill key={h} variant="accent">#{h}</Pill>}
            </Repeat>
          </div>
        </div>
      </Show>
      <Show when={result.platform_analysis.hashtag_optimization.hashtag_strategy !== ''}>
        <p className="text-[12px] text-ink-3 m-0">{result.platform_analysis.hashtag_optimization.hashtag_strategy}</p>
      </Show>
    </div>
  );

  const riskContent = (
    <div className="flex flex-col gap-3">
      <div className="bg-sheet border border-hair rounded-soft p-3">
        <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Overall risk</p>
        <p className={`text-[18px] font-semibold capitalize m-0 ${riskColor(result.risk.overall_risk)}`}>{result.risk.overall_risk}</p>
      </div>
      <Repeat each={result.risk.factors as { type: string; severity: string; description: string; mitigation: string }[]}>
        {(f) => (
          <InlineNote key={f.type}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[12.5px]">{f.type}</span>
              <Pill variant={f.severity === 'high' ? 'crit' : f.severity === 'medium' ? 'warn' : 'default'}>{f.severity}</Pill>
            </div>
            <p className="text-[12px] text-ink-3 m-0">{f.description}</p>
            <p className="text-[12px] text-accent m-0 mt-1">{f.mitigation}</p>
          </InlineNote>
        )}
      </Repeat>
    </div>
  );

  const tipsContent = (
    <div className="flex flex-col gap-3">
      <Repeat each={result.recommendations as AnalysisRecommendation[]}>
        {(rec) => (
          <InlineNote key={rec.title} coach>
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-semibold text-[12.5px]">{rec.title}</span>
              <Pill variant={priorityVariant(rec.priority)}>{rec.priority}</Pill>
            </div>
            <p className="text-[12px] text-ink-2 m-0">{rec.description}</p>
            <Show when={rec.implementation !== undefined}>
              <p className="text-[11.5px] text-accent m-0 mt-1">{rec.implementation}</p>
            </Show>
          </InlineNote>
        )}
      </Repeat>
    </div>
  );

  const sectionContent: Record<Tab, React.ReactNode> = {
    overview: overviewContent,
    sentiment: sentimentContent,
    virality: viralityContent,
    brand: brandContent,
    platform: platformContent,
    risk: riskContent,
    tips: tipsContent,
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* ── Hero ── */}
      <div className="p-4 md:p-5 border-b border-hair">
        <div className="flex items-center gap-4 mb-3">
          <ScoreRing value={overallScore} size="card" color={scoreToColor(overallScore)} label="Overall" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-2">Content analysis result</p>
            <div className="flex flex-wrap gap-1.5">
              <Pill variant={result.sentiment.label === 'positive' ? 'accent' : result.sentiment.label === 'negative' ? 'crit' : 'default'}>
                {result.sentiment.label}
              </Pill>
              <Pill variant="default">{result.quality.readability_score >= 0.7 ? 'Readable' : 'Complex'}</Pill>
              <Pill variant={result.risk.overall_risk === 'low' ? 'accent' : result.risk.overall_risk === 'medium' ? 'warn' : 'crit'}>
                {result.risk.overall_risk === 'low' ? 'Low risk' : result.risk.overall_risk === 'medium' ? 'Medium risk' : 'High risk'}
              </Pill>
            </div>
          </div>
        </div>

        <Show when={analyzedText !== ''}>
          <details className="mb-3 group">
            <summary className="text-[11px] uppercase tracking-[var(--track-overline)] text-ink-3 cursor-pointer select-none hover:text-ink transition-colors list-none flex items-center gap-1">
              <span className="inline-block transition-transform group-open:rotate-90">›</span>
              Analyzed text
            </summary>
            <div className="mt-2 rounded-soft bg-paper-deep border border-hair px-3 py-2.5 max-h-[100px] overflow-y-auto">
              <p className="text-[12px] text-ink-2 m-0 leading-[1.6] whitespace-pre-wrap">{analyzedText}</p>
            </div>
          </details>
        </Show>

        <Show when={result.recommendations.length > 0}>
          <blockquote className="border-l-2 border-accent pl-3 m-0 text-[12.5px] text-ink-2 leading-[1.55]">
            {(result.recommendations[0] as AnalysisRecommendation | undefined)?.description ?? ''}
          </blockquote>
        </Show>
      </div>

      {/* ── Mobile: accordion ── */}
      <div className="md:hidden flex flex-col gap-2 p-4">
        {TABS.map(({ value: id, label }) => (
          <div key={id} className="border border-hair rounded-card overflow-hidden">
            <button
              onClick={() => toggleSection(id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-sheet hover:bg-paper-deep transition-colors"
            >
              <div className="flex items-center gap-2.5 text-ink">
                {SECTION_ICONS[id]}
                <span className="text-[13px] font-semibold">{label}</span>
              </div>
              <span
                className="text-ink-3 text-[18px] leading-none transition-transform duration-200"
                style={{ transform: openSections.has(id) ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                ›
              </span>
            </button>
            {openSections.has(id) && (
              <div className="px-4 py-4 border-t border-hair bg-paper">
                {sectionContent[id]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop: tabs ── */}
      <div className="hidden md:flex md:flex-col md:flex-1">
        <div className="px-5 pt-4 border-b border-hair">
          <UnderlineTabs items={TABS} value={tab} onChange={(v) => setTab(v as Tab)} />
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          {sectionContent[tab]}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 md:px-5 py-3 border-t border-hair">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => { setSelectedAnalysis(null); onAnalyzeAnother?.(); }}
          className="gap-2"
        >
          <RefreshCw size={13} />
          Analyze another
        </Button>
      </div>
    </div>
  );
}
