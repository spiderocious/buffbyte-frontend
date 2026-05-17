import { useState } from 'react';
import { Toggle } from '@shared/ui/toggle';
import { KitScene } from './kit-scene';

export function ToggleSection() {
  const [autoPaste, setAutoPaste] = useState(true);
  const [autoDraft, setAutoDraft] = useState(true);
  const [shareTeam, setShareTeam] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Settings toggles"
        description="The toggle is the only interactive element for boolean settings. Label + description left; switch right."
      >
        <div className="flex flex-col divide-y divide-hair">
          <div className="py-[14px]">
            <Toggle
              checked={autoPaste}
              onChange={setAutoPaste}
              label="Auto-analyse on paste"
              description="Run a quick scan the moment you paste content over 80 words."
            />
          </div>
          <div className="py-[14px]">
            <Toggle
              checked={autoDraft}
              onChange={setAutoDraft}
              label="Save drafts every 30 s"
              description="Drafts live in your library indefinitely."
            />
          </div>
          <div className="py-[14px]">
            <Toggle
              checked={shareTeam}
              onChange={setShareTeam}
              label="Share analysis with team"
              description="Off · only you can see your scores."
            />
          </div>
          <div className="py-[14px]">
            <Toggle
              checked={false}
              onChange={() => undefined}
              label="Disabled toggle"
              description="This option is unavailable on your plan."
              disabled
            />
          </div>
        </div>
      </KitScene>
    </div>
  );
}
