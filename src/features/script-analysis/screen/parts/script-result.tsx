import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, Show } from 'meemaw';
import { RefreshCw, Video, Mic, Zap, Smartphone, MonitorPlay, Lightbulb } from '@ui/icons';
import { ScoreRing } from '@ui/score-ring';
import { ScoreLine } from '@ui/score-bar';
import { UnderlineTabs } from '@ui/tabs';
import { Pill } from '@ui/pill';
import { Button } from '@ui/button';
import { InlineNote } from '@ui/banner';
import { ROUTES } from '@shared/constants/routes';
import type { AnalysisChat, AnalyzeResult, ScriptAnalysisResult, AnalysisRecommendation } from '@shared/types/api';
import { useScriptAnalysis } from '../../providers/use-script-analysis';
import { scoreToColor } from '../../helpers/format-analysis-score';

type Tab = 'delivery' | 'engagement' | 'platform' | 'teleprompter' | 'tips';

const TABS: { value: Tab; label: string }[] = [
  { value: 'delivery',     label: 'Delivery' },
  { value: 'engagement',   label: 'Engagement' },
  { value: 'platform',     label: 'Platform' },
  { value: 'teleprompter', label: 'Prompter' },
  { value: 'tips',         label: 'AI Tips' },
];

const SECTION_ICONS: Record<Tab, React.ReactNode> = {
  delivery:     <Mic size={14} />,
  engagement:   <Zap size={14} />,
  platform:     <Smartphone size={14} />,
  teleprompter: <MonitorPlay size={14} />,
  tips:         <Lightbulb size={14} />,
};

function parseResult(a: AnalysisChat | AnalyzeResult): ScriptAnalysisResult | null {
  try {
    if ('data' in a && a.data !== undefined) return a.data as ScriptAnalysisResult;
    return JSON.parse(a.response) as ScriptAnalysisResult;
  } catch { return null; }
}

function priorityVariant(p: AnalysisRecommendation['priority']): 'crit' | 'warn' | 'accent' {
  if (p === 'high') return 'crit';
  if (p === 'medium') return 'warn';
  return 'accent';
}

export function ScriptResult() {
  const { selectedAnalysis, setSelectedAnalysis } = useScriptAnalysis();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('delivery');
  const [openSections, setOpenSections] = useState<Set<Tab>>(new Set<Tab>(['delivery']));

  if (selectedAnalysis === null) return null;

  const result = parseResult(selectedAnalysis);
  if (result === null) {
    return <div className="p-5 text-[13px] text-ink-3">Could not parse script analysis result.</div>;
  }

  const hookScore      = result.engagement.hook_strength.score;
  const retentionScore = result.engagement.retention_prediction.overall_score;
  const tpScore        = result.teleprompter_readiness.overall_score;
  const deliveryScore  = result.delivery.readability_for_speech.score;
  const overallScore   = Math.round(((hookScore + retentionScore + tpScore + deliveryScore) / 4) * 100);

  const scriptText =
    'message' in selectedAnalysis
      ? (selectedAnalysis as AnalysisChat).message
      : (selectedAnalysis as AnalyzeResult).content;

  const stats = [
    { label: 'WPM',        value: String(result.delivery.speaking_pace.optimal_wpm) },
    { label: 'Duration',   value: result.delivery.speaking_pace.estimated_duration },
    { label: 'Breath pts', value: String(result.delivery.readability_for_speech.breath_points) },
    { label: 'Hook',       value: `${Math.round(hookScore * 100)}%` },
  ];

  function toggleSection(id: Tab) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  // ── Section content ──

  const deliveryContent = (
    <div className="flex flex-col gap-2">
      <ScoreLine label="Readability for speech" value={Math.round(deliveryScore * 100)} color={scoreToColor(Math.round(deliveryScore * 100))} />
      <ScoreLine label="Energy flow"            value={Math.round(result.delivery.energy_flow.overall_score * 100)} color={scoreToColor(Math.round(result.delivery.energy_flow.overall_score * 100))} />
      <ScoreLine label="Sentence complexity"    value={Math.round((1 - result.delivery.readability_for_speech.sentence_complexity) * 100)} color={scoreToColor(Math.round((1 - result.delivery.readability_for_speech.sentence_complexity) * 100))} sublabel="lower is simpler" />
      <Show when={result.delivery.readability_for_speech.tongue_twisters.length > 0}>
        <div className="mt-3">
          <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Tricky phrases</p>
          <div className="flex flex-col gap-2">
            <Repeat each={result.delivery.readability_for_speech.tongue_twisters as unknown as { phrase: string; suggestion: string }[]}>
              {(t) => (
                <InlineNote key={t.phrase}>
                  <p className="font-semibold text-[12.5px] m-0">&ldquo;{t.phrase}&rdquo;</p>
                  <p className="text-[12px] text-ink-3 m-0 mt-0.5">Try: {t.suggestion}</p>
                </InlineNote>
              )}
            </Repeat>
          </div>
        </div>
      </Show>
    </div>
  );

  const engagementContent = (
    <div className="flex flex-col gap-2">
      <ScoreLine label="Hook strength"        value={Math.round(hookScore * 100)}      color={scoreToColor(Math.round(hookScore * 100))} />
      <ScoreLine label="Retention prediction" value={Math.round(retentionScore * 100)} color={scoreToColor(Math.round(retentionScore * 100))} />
      <ScoreLine label="CTA strength"         value={Math.round(result.engagement.call_to_action.strength * 100)} color={scoreToColor(Math.round(result.engagement.call_to_action.strength * 100))} />
      <Show when={result.engagement.hook_strength.improvement_suggestions.length > 0}>
        <div className="mt-3">
          <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Hook improvements</p>
          <div className="flex flex-col gap-2">
            <Repeat each={result.engagement.hook_strength.improvement_suggestions as string[]}>
              {(s) => <InlineNote key={s} coach><p className="text-[12.5px] m-0">{s}</p></InlineNote>}
            </Repeat>
          </div>
        </div>
      </Show>
    </div>
  );

  const platformContent = (
    <div className="flex flex-col gap-2">
      {[
        { label: 'YouTube',         score: result.platform_optimization.youtube.score },
        { label: 'TikTok',          score: result.platform_optimization.tiktok.score },
        { label: 'LinkedIn',        score: result.platform_optimization.linkedin.score },
        { label: 'Instagram Reels', score: result.platform_optimization.instagram_reels.score },
      ].map((p) => (
        <ScoreLine key={p.label} label={p.label} value={Math.round(p.score * 100)} color={scoreToColor(Math.round(p.score * 100))} />
      ))}
    </div>
  );

  const teleprompterContent = (
    <div className="flex flex-col gap-4">
      <ScoreLine label="Teleprompter readiness" value={Math.round(tpScore * 100)} color={scoreToColor(Math.round(tpScore * 100))} />
      <div className="bg-sheet border border-hair rounded-soft p-3">
        <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1">Difficulty</p>
        <p className="text-[16px] font-semibold m-0 capitalize">{result.teleprompter_readiness.difficulty_rating}</p>
      </div>
      <Show when={result.teleprompter_readiness.practice_recommendations.focus_areas.length > 0}>
        <div>
          <p className="text-[11px] font-medium text-ink-3 uppercase tracking-[var(--track-overline)] mb-2">Focus areas</p>
          <div className="flex flex-col gap-2">
            <Repeat each={result.teleprompter_readiness.practice_recommendations.focus_areas as string[]}>
              {(area) => <InlineNote key={area} coach><p className="text-[12.5px] m-0">{area}</p></InlineNote>}
            </Repeat>
          </div>
        </div>
      </Show>
    </div>
  );

  const tipsContent = (
    <div className="flex flex-col gap-3">
      <Repeat each={result.ai_recommendations as AnalysisRecommendation[]}>
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
    delivery: deliveryContent,
    engagement: engagementContent,
    platform: platformContent,
    teleprompter: teleprompterContent,
    tips: tipsContent,
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* ── Hero ── */}
      <div className="p-4 md:p-5 border-b border-hair">
        <div className="flex items-center gap-4 mb-3">
          <ScoreRing value={overallScore} size="card" color={scoreToColor(overallScore)} label="Overall" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-2">Script analysis result</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="bg-paper border border-hair rounded-soft p-2 text-center">
                  <p className="text-[9px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0">{s.label}</p>
                  <p className="text-[13px] font-semibold tabular-nums m-0 leading-tight">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Show when={scriptText !== '' && scriptText !== undefined}>
          <details className="mb-3 group">
            <summary className="text-[11px] uppercase tracking-[var(--track-overline)] text-ink-3 cursor-pointer select-none hover:text-ink transition-colors list-none flex items-center gap-1">
              <span className="inline-block transition-transform group-open:rotate-90">›</span>
              Analyzed script
            </summary>
            <div className="mt-2 rounded-soft bg-paper-deep border border-hair px-3 py-2.5 max-h-[100px] overflow-y-auto">
              <p className="text-[12px] text-ink-2 m-0 leading-[1.6] whitespace-pre-wrap font-mono">{scriptText}</p>
            </div>
          </details>
        </Show>

        <Show when={(result.ai_recommendations as AnalysisRecommendation[]).length > 0}>
          <blockquote className="border-l-2 border-accent pl-3 m-0 text-[12.5px] text-ink-2 leading-[1.55]">
            {(result.ai_recommendations[0] as AnalysisRecommendation | undefined)?.description ?? ''}
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
      <div className="px-4 md:px-5 py-3 border-t border-hair flex items-center gap-2 flex-wrap">
        <Button variant="secondary" size="sm" onClick={() => setSelectedAnalysis(null)} className="gap-2">
          <RefreshCw size={13} />
          Analyze another
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="gap-2"
          onClick={() => void navigate(ROUTES.APP.TELEPROMPTER, { state: { script: scriptText } })}
        >
          <Video size={13} />
          Open in Teleprompter
        </Button>
      </div>
    </div>
  );
}
