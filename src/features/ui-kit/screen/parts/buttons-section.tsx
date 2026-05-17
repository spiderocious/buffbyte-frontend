import { Button, IconButton } from '@shared/ui/button';
import { Filter, MoreHorizontal, Sparkles, Save, Download, Copy, Trash2 } from '@ui/icons';
import { KitScene } from './kit-scene';

export function ButtonsSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="The composer toolbar"
        description="After pasting a draft, the creator chooses an action. Primary is to analyse; secondary saves; ghost cancels."
      >
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">
            <Sparkles size={14} />
            Analyze content
          </Button>
          <Button variant="secondary">
            <Save size={14} />
            Save as draft
          </Button>
          <Button variant="ghost">Cancel</Button>
          <div className="flex-1" />
          <span className="text-[12.5px] text-ink-3">251 / 5,000 characters</span>
        </div>
      </KitScene>

      <KitScene
        label="After the analysis"
        description="Result page actions: publish, schedule, copy, export, delete. Delete is oxblood — never bright red."
      >
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">
            <Sparkles size={14} />
            Publish to Twitter
          </Button>
          <Button variant="secondary">Schedule</Button>
          <Button variant="secondary">
            <Download size={14} />
            Export report
          </Button>
          <Button variant="ghost">
            <Copy size={14} />
            Copy share link
          </Button>
          <div className="flex-1" />
          <Button variant="danger">
            <Trash2 size={14} />
            Delete analysis
          </Button>
        </div>
      </KitScene>

      <KitScene
        label="In flight"
        description="Loading is in-button. Disabled is a flat 40% alpha — never a different colour."
      >
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" loading>Analyzing…</Button>
          <Button variant="primary" disabled>Save changes</Button>
          <Button variant="secondary" disabled>Add platform</Button>
          <IconButton label="Filter"><Filter size={14} /></IconButton>
          <IconButton label="More"><MoreHorizontal size={14} /></IconButton>
        </div>
      </KitScene>

      {/* Reference grid */}
      <div className="pt-6 border-t border-ink">
        <p className="text-[11px] text-ink-3 tracking-[var(--track-overline)] uppercase font-medium mb-4">
          Reference grid
        </p>
        <div className="flex flex-wrap gap-3">
          {(['primary', 'ink', 'secondary', 'ghost', 'danger'] as const).map((v) => (
            <div key={v} className="flex flex-col gap-2 items-start">
              <span className="text-[10.5px] text-ink-3 uppercase tracking-[var(--track-overline)]">{v}</span>
              <div className="flex gap-2">
                <Button variant={v} size="sm">Sm</Button>
                <Button variant={v} size="md">Md</Button>
                <Button variant={v} size="lg">Lg</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
