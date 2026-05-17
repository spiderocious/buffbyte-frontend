import { AnalysisCard, QuickCard } from '@shared/ui/card';
import { ScoreRing } from '@shared/ui/score-ring';
import { Button } from '@shared/ui/button';
import { Sparkles, FileText, TrendingUp, Mic } from '@ui/icons';
import { KitScene } from './kit-scene';

export function CardsSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Analysis card · the signature result card"
        description="Ring slot left, coach summary right, footer with actions."
      >
        <AnalysisCard
          ringSlot={<ScoreRing value={80} size="hero" color="accent" />}
          title="Ready to publish"
          meta="TikTok · Instagram · Nigeria · 12 May 2026"
          coachNote={"Cut \"for those who don't know\" in line 12. The middle drags — without it, you're at 89%."}
          footerLeft="Analyzed 2 min ago · 231 words"
          footerActions={
            <>
              <Button variant="secondary" size="sm">Export</Button>
              <Button variant="primary" size="sm">
                <Sparkles size={12} />
                Publish
              </Button>
            </>
          }
        />
      </KitScene>

      <KitScene label="Quick cards · dashboard action tiles">
        <div className="grid grid-cols-3 gap-4">
          <QuickCard
            icon={<Sparkles size={18} />}
            title="Analyze content"
            description="Paste a post, script, or thread and get a full AI score."
            meta="Primary"
          />
          <QuickCard
            icon={<FileText size={18} />}
            title="Script analysis"
            description="Upload or paste a video script for structure and pacing feedback."
          />
          <QuickCard
            icon={<TrendingUp size={18} />}
            title="Trending now"
            description="See what's moving in your niche before you write."
          />
          <QuickCard
            icon={<Mic size={18} />}
            title="Teleprompter"
            description="Record your script in focus mode — no distractions."
          />
        </div>
      </KitScene>
    </div>
  );
}
