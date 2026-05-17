import { useState } from 'react';
import { Checkbox } from '@shared/ui/checkbox';
import { Radio, RadioGroup } from '@shared/ui/radio';
import { KitScene } from './kit-scene';

export function SelectionSection() {
  const [notifications, setNotifications] = useState({
    analysisFinishes: true,
    lowScore: true,
    trending: false,
  });
  const [depth, setDepth] = useState<'quick' | 'full' | 'deep'>('full');

  return (
    <div className="flex flex-col gap-6">
      <KitScene label="Checkboxes — notification preferences">
        <div className="flex flex-col gap-2">
          <Checkbox
            id="notif-analysis"
            label="An analysis finishes"
            checked={notifications.analysisFinishes}
            onChange={(e) => setNotifications((n) => ({ ...n, analysisFinishes: e.target.checked }))}
          />
          <Checkbox
            id="notif-low"
            label="A draft scores below 60"
            checked={notifications.lowScore}
            onChange={(e) => setNotifications((n) => ({ ...n, lowScore: e.target.checked }))}
          />
          <Checkbox
            id="notif-trending"
            label="A trending topic matches my niche"
            checked={notifications.trending}
            onChange={(e) => setNotifications((n) => ({ ...n, trending: e.target.checked }))}
          />
          <Checkbox id="notif-disabled" label="Disabled option" disabled />
        </div>
      </KitScene>

      <KitScene label="Radio group — analysis depth">
        <RadioGroup>
          <Radio
            id="depth-quick"
            name="depth"
            label="Quick · 7 dimensions"
            checked={depth === 'quick'}
            onChange={() => setDepth('quick')}
          />
          <Radio
            id="depth-full"
            name="depth"
            label={
              <span>
                Full · 14 dimensions{' '}
                <span className="text-[12px] text-ink-3">(recommended)</span>
              </span>
            }
            checked={depth === 'full'}
            onChange={() => setDepth('full')}
          />
          <Radio
            id="depth-deep"
            name="depth"
            label="Deep · 14 dimensions + competitor scan"
            checked={depth === 'deep'}
            onChange={() => setDepth('deep')}
          />
        </RadioGroup>
      </KitScene>
    </div>
  );
}
