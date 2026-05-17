import { useState } from 'react';
import { PillTabs, UnderlineTabs } from '@shared/ui/tabs';
import { LayoutDashboard, FileText, AlignLeft, Video } from '@ui/icons';
import { KitScene } from './kit-scene';

const NAV_TABS = [
  { value: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
  { value: 'content', label: 'Content analysis', icon: <FileText size={14} /> },
  { value: 'script', label: 'Script analysis', icon: <AlignLeft size={14} /> },
  { value: 'teleprompter', label: 'Teleprompter', icon: <Video size={14} /> },
] as const;

const DIMENSION_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'sentiment', label: 'Sentiment', badge: '87%' },
  { value: 'virality', label: 'Virality', badge: '72%' },
  { value: 'brand', label: 'Brand', badge: '74%' },
  { value: 'platform', label: 'Platform' },
  { value: 'timing', label: 'Timing', badge: '3' },
  { value: 'risk', label: 'Risk', badge: 'Low' },
  { value: 'tips', label: 'Tips', badge: '6' },
] as const;

export function TabsSection() {
  const [navTab, setNavTab] = useState('content');
  const [dimTab, setDimTab] = useState('sentiment');

  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Pill tabs · top-level navigation"
        description="The main app nav floats as a pill — Dashboard, Content, Script, Teleprompter."
      >
        <PillTabs
          items={[...NAV_TABS]}
          value={navTab}
          onChange={setNavTab}
        />
      </KitScene>

      <KitScene
        label="Underline tabs · analysis result dimensions"
        description="The seven analysis dimensions. Active tab carries the accent in both colour and the underline."
      >
        <UnderlineTabs
          items={[...DIMENSION_TABS]}
          value={dimTab}
          onChange={setDimTab}
        />
        <p className="text-[12.5px] text-ink-3 mt-4">
          Active tab: <span className="text-accent font-medium">{dimTab}</span>
        </p>
      </KitScene>
    </div>
  );
}
