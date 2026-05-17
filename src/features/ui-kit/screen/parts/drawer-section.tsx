import { DrawerService } from '@shared/ui/drawer';
import { KitScene } from './kit-scene';

export function DrawerSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        title="Toast notifications"
        description="Imperative — call DrawerService.toast() from anywhere. No props, no context. Toasts render in the bottom-right corner."
      >
        <div className="flex flex-wrap gap-3">
          <button
            className="h-9 px-4 bg-accent text-white text-[13px] font-medium rounded-soft hover:bg-accent-deep transition-colors border-0 cursor-pointer"
            onClick={() =>
              DrawerService.toast('Analysis complete', {
                variant: 'info',
                body: '"Spent some time last month…" scored 87. Three coach notes are waiting.',
                action: { label: 'Open', onClick: () => undefined },
              })
            }
          >
            Toast · info
          </button>

          <button
            className="h-9 px-4 border border-warn-edge bg-warn-bg text-warn-deep text-[13px] font-medium rounded-soft hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() =>
              DrawerService.toast('Compliance flag', {
                variant: 'warn',
                body: '"the only AI" reads as unverified. We\'re saving a flagged copy.',
                action: { label: 'Review', onClick: () => undefined },
              })
            }
          >
            Toast · warn
          </button>

          <button
            className="h-9 px-4 bg-crit text-white text-[13px] font-medium rounded-soft hover:bg-crit-deep transition-colors border-0 cursor-pointer"
            onClick={() =>
              DrawerService.toast('Could not reach the analysis service', {
                variant: 'crit',
                body: 'Your draft is safe locally. We\'ll retry every 30 seconds.',
                action: { label: 'Retry now', onClick: () => undefined },
              })
            }
          >
            Toast · crit
          </button>
        </div>
      </KitScene>

      <KitScene
        title="Confirm modal"
        description="Call DrawerService.confirm() to trigger the ModalHost. No component tree state needed."
      >
        <div className="flex flex-wrap gap-3">
          <button
            className="h-9 px-4 bg-accent text-white text-[13px] font-medium rounded-soft hover:bg-accent-deep transition-colors border-0 cursor-pointer"
            onClick={() =>
              DrawerService.confirm('Archive this analysis?', {
                body: 'It will move to your archive and won\'t appear in the main library.',
                confirmLabel: 'Archive',
                onConfirm: () =>
                  DrawerService.toast('Archived', { variant: 'info' }),
              })
            }
          >
            Confirm (safe)
          </button>

          <button
            className="h-9 px-4 bg-crit text-white text-[13px] font-medium rounded-soft hover:bg-crit-deep transition-colors border-0 cursor-pointer"
            onClick={() =>
              DrawerService.confirm('Delete this draft permanently?', {
                body: 'This cannot be undone. The draft and all its analysis data will be removed.',
                destructive: true,
                confirmLabel: 'Delete draft',
                onConfirm: () =>
                  DrawerService.toast('Draft deleted', { variant: 'warn' }),
              })
            }
          >
            Confirm (destructive)
          </button>
        </div>
      </KitScene>
    </div>
  );
}
