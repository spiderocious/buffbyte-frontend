import { useState } from 'react';
import { PlatformPicker } from '@shared/ui/platform-picker';
import { Dropdown } from '@shared/ui/dropdown';
import { KitScene } from './kit-scene';

const PLATFORMS = [
  { value: 'twitter', label: 'Twitter', glyph: '𝕏' },
  { value: 'instagram', label: 'Instagram', glyph: 'In' },
  { value: 'tiktok', label: 'TikTok', glyph: 'Tk' },
  { value: 'youtube', label: 'YouTube', glyph: 'Yt' },
  { value: 'linkedin', label: 'LinkedIn', glyph: 'Li' },
  { value: 'facebook', label: 'Facebook', glyph: 'Fb' },
  { value: 'threads', label: 'Threads', glyph: 'Th' },
] as const;

const REGIONS = [
  { value: 'ng', label: '🇳🇬 Nigeria', meta: 'Current', dividerAfter: false },
  { value: 'za', label: '🇿🇦 South Africa' },
  { value: 'ke', label: '🇰🇪 Kenya' },
  { value: 'gh', label: '🇬🇭 Ghana', dividerAfter: true },
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'gb', label: '🇬🇧 United Kingdom' },
  { value: 'ca', label: '🇨🇦 Canada' },
] as const;

export function PickerSection() {
  const [selected, setSelected] = useState<string[]>(['twitter', 'instagram']);
  const [region, setRegion] = useState('ng');

  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Platform picker · multi-select"
        description="Creator picks one or more target platforms before an analysis runs. Selected tiles light the violet tint."
      >
        <PlatformPicker
          items={[...PLATFORMS]}
          value={selected}
          onChange={setSelected}
        />
        <p className="text-[12px] text-ink-3 mt-3">
          Selected: {selected.length === 0 ? 'none' : selected.join(', ')}
        </p>
      </KitScene>

      <KitScene
        label="Dropdown · region picker (rendered open)"
        description="Headless panel — consumer controls positioning and open state."
      >
        <Dropdown
          items={[...REGIONS]}
          value={region}
          onSelect={setRegion}
        />
      </KitScene>
    </div>
  );
}
