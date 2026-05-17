import { ScoreLine, StackedBar } from '@shared/ui/score-bar';
import { KitScene } from './kit-scene';

export function ScoreBarSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Emotion breakdown"
        description="When the AI maps sentiment into emotions, each row is one bar. Colour encodes meaning."
      >
        <ScoreLine label="Excitement" value={82} />
        <ScoreLine label="Trust" value={68} />
        <ScoreLine label="Anticipation" value={75} />
        <ScoreLine label="Joy" value={65} />
        <ScoreLine label="Anger" value={18} color="warn" />
        <ScoreLine label="Fear" value={8} color="crit" />
      </KitScene>

      <KitScene label="Trending alignment">
        <ScoreLine label="AI Tools Revolution" value={95} />
        <ScoreLine label="Content Analytics" value={89} />
        <ScoreLine label="Creator Economy" value={82} />
        <ScoreLine label="Productivity SaaS" value={61} color="muted" />
      </KitScene>

      <KitScene
        label="Risk composition · stacked bar"
        description="A single stacked bar splits where the risk score comes from."
      >
        <StackedBar
          segments={[
            { label: 'Brand-fit', value: 62, color: 'accent' },
            { label: 'Tone drift', value: 24, color: 'warn' },
            { label: 'Unverified claim', value: 14, color: 'crit' },
          ]}
        />
      </KitScene>
    </div>
  );
}
