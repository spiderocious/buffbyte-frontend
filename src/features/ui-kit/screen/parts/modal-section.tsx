import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalSpacer, ModalGlyph, CritBadge } from '@shared/ui/modal';
import { KitScene } from './kit-scene';

export function ModalSection() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [critOpen, setCritOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const critConfirmPhrase = 'DELETE account';

  return (
    <div className="flex flex-col gap-6">
      <KitScene title="Confirm modal" description="The everyday confirm — glyph, title, meta list, cancel + primary action.">
        <button
          className="h-9 px-4 bg-accent text-white text-[13px] font-medium rounded-soft hover:bg-accent-deep transition-colors"
          onClick={() => setConfirmOpen(true)}
        >
          Open confirm modal
        </button>

        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <ModalBody>
            <ModalGlyph variant="info">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h13" /><path d="M12 7l5 5-5 5" />
              </svg>
            </ModalGlyph>
            <h2 className="text-[20px] font-semibold tracking-[-0.014em] m-0 mb-2">Publish this analysis to Twitter?</h2>
            <p className="text-[14px] text-ink-2 leading-[1.55] m-0 mb-[14px]">
              This will post the optimised version of your draft to <strong>@adewale</strong>. The analysis report stays in your library either way.
            </p>
            <ul className="m-0 mb-[14px] p-0 list-none text-[13px] text-ink-2">
              {[
                { label: 'Optimised draft', value: '231 chars · 37 words' },
                { label: 'Predicted engagement', value: '+62%' },
                { label: 'Scheduled for', value: 'In 5 min · 9:00 AM' },
              ].map(({ label, value }) => (
                <li key={label} className="flex justify-between py-2 border-t border-hair first:border-0">
                  <span>{label}</span>
                  <span className="font-medium tabular-nums">{value}</span>
                </li>
              ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <button className="h-8 px-4 text-[12.5px] text-ink-2 bg-transparent border-0 cursor-pointer hover:text-ink" onClick={() => setConfirmOpen(false)}>Cancel</button>
            <ModalSpacer />
            <button className="h-8 px-4 text-[12.5px] font-medium border border-hair rounded-soft bg-sheet hover:bg-paper-deep transition-colors cursor-pointer">Schedule later</button>
            <button className="h-8 px-4 text-[12.5px] font-medium bg-accent text-white rounded-soft hover:bg-accent-deep transition-colors cursor-pointer border-0" onClick={() => setConfirmOpen(false)}>Publish now</button>
          </ModalFooter>
        </Modal>
      </KitScene>

      <KitScene title="Data-input modal" description="Collection save — wide variant, inputs embedded in the modal body.">
        <button
          className="h-9 px-4 bg-accent text-white text-[13px] font-medium rounded-soft hover:bg-accent-deep transition-colors"
          onClick={() => setInputOpen(true)}
        >
          Open data-input modal
        </button>

        <Modal open={inputOpen} onClose={() => setInputOpen(false)} wide>
          <ModalBody>
            <h2 className="text-[20px] font-semibold tracking-[-0.014em] m-0 mb-2">Save to a collection</h2>
            <p className="text-[14px] text-ink-2 leading-[1.55] m-0 mb-4">
              Organise this analysis with others — collections live in your library and can be shared with your team.
            </p>
            <label className="block text-[11.5px] text-ink-3 uppercase tracking-[var(--track-overline)] font-medium mb-1">Collection name</label>
            <input
              className="w-full h-9 px-3 border border-hair rounded-soft bg-paper text-[13.5px] text-ink focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-tint"
              defaultValue="Build-in-public · week 12"
            />
            <div className="grid grid-cols-2 gap-[14px] mt-[14px]">
              {(['Visibility', 'Default platform'] as const).map((lbl) => (
                <div key={lbl}>
                  <label className="block text-[11.5px] text-ink-3 uppercase tracking-[var(--track-overline)] font-medium mb-1">{lbl}</label>
                  <div className="flex items-center justify-between h-9 px-3 border border-hair rounded-soft bg-paper text-[13.5px] text-ink cursor-pointer">
                    <span>{lbl === 'Visibility' ? 'Just me' : 'Twitter / X'}</span>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="h-8 px-4 text-[12.5px] text-ink-2 bg-transparent border-0 cursor-pointer hover:text-ink" onClick={() => setInputOpen(false)}>Cancel</button>
            <ModalSpacer />
            <button className="h-8 px-4 text-[12.5px] font-medium bg-accent text-white rounded-soft hover:bg-accent-deep transition-colors cursor-pointer border-0" onClick={() => setInputOpen(false)}>Save collection</button>
          </ModalFooter>
        </Modal>
      </KitScene>

      <KitScene title="Critical · irreversible" description="Crit header strip, destructive glyph, confirmation input pattern.">
        <button
          className="h-9 px-4 bg-crit text-white text-[13px] font-medium rounded-soft hover:bg-crit-deep transition-colors"
          onClick={() => { setCritOpen(true); setConfirmText(''); }}
        >
          Open critical modal
        </button>

        <Modal open={critOpen} onClose={() => setCritOpen(false)}>
          <CritBadge />
          <ModalBody className="pt-6">
            <ModalGlyph variant="crit">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18v.01" />
              </svg>
            </ModalGlyph>
            <h2 className="text-[20px] font-semibold tracking-[-0.014em] m-0 mb-2 text-crit-deep">Delete your account?</h2>
            <p className="text-[14px] text-ink-2 leading-[1.55] m-0 mb-3">
              <strong>This action cannot be undone.</strong> All 231 analyses, 12 drafts, 3 shared collections, and your API keys will be permanently removed.
            </p>
            <p className="text-[13px] text-ink-2 m-0 mb-2">
              To confirm, type <code className="bg-paper-deep px-1.5 py-0.5 rounded text-crit-deep font-medium text-[12px]">{critConfirmPhrase}</code> below.
            </p>
            <input
              className="w-full h-9 px-3 mt-[14px] border border-hair rounded-soft bg-paper text-[13.5px] text-ink focus:outline-none focus:border-crit"
              placeholder={`Type ${critConfirmPhrase} to confirm`}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <button className="h-8 px-4 text-[12.5px] text-ink-2 bg-transparent border-0 cursor-pointer hover:text-ink" onClick={() => setCritOpen(false)}>Cancel · keep my account</button>
            <ModalSpacer />
            <button
              className="h-8 px-4 text-[12.5px] font-medium bg-crit text-white rounded-soft hover:bg-crit-deep transition-colors cursor-pointer border-0 disabled:opacity-40 disabled:pointer-events-none"
              disabled={confirmText !== critConfirmPhrase}
              onClick={() => setCritOpen(false)}
            >
              Permanently delete account
            </button>
          </ModalFooter>
        </Modal>
      </KitScene>
    </div>
  );
}
