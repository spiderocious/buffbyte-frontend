/**
 * ModalHost — mount once at the app root. Renders confirm modals via createPortal.
 * Subscribes to drawerStore via useSyncExternalStore.
 */
import { useSyncExternalStore } from 'react';
import { drawerStore } from './drawer-store';
import { DrawerService } from './drawer-service';
import { Modal, ModalBody, ModalFooter, ModalSpacer, ModalGlyph, CritBadge } from '@shared/ui/modal';

export function ModalHost() {
  const modal = useSyncExternalStore(
    drawerStore.subscribe,
    () => drawerStore.getState().modal,
  );

  if (!modal.open) return null;

  const handleConfirm = () => {
    modal.onConfirm();
    drawerStore.closeModal();
  };

  const handleCancel = () => {
    modal.onCancel?.();
    drawerStore.closeModal();
  };

  return (
    <Modal open onClose={handleCancel}>
      {modal.destructive === true && <CritBadge />}
      <ModalBody className={modal.destructive === true ? 'pt-6' : undefined}>
        <ModalGlyph variant={modal.destructive === true ? 'crit' : 'info'}>
          {modal.destructive === true ? (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18v.01" />
            </svg>
          ) : (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={12} cy={12} r={9} /><path d="M12 8v4l3 2" />
            </svg>
          )}
        </ModalGlyph>
        <h2
          className="text-[20px] font-semibold tracking-[-0.014em] m-0 mb-2"
          style={modal.destructive === true ? { color: 'var(--crit-deep)' } : undefined}
        >
          {modal.title}
        </h2>
        {modal.body !== undefined && (
          <p className="text-[14px] text-ink-2 leading-[1.55] m-0">{modal.body}</p>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="h-8 px-4 text-[12.5px] text-ink-2 bg-transparent border-0 cursor-pointer hover:text-ink"
          onClick={handleCancel}
        >
          {modal.cancelLabel ?? 'Cancel'}
        </button>
        <ModalSpacer />
        <button
          className={
            modal.destructive === true
              ? 'h-8 px-4 text-[12.5px] font-medium bg-crit text-white rounded-soft hover:bg-crit-deep transition-colors cursor-pointer border-0'
              : 'h-8 px-4 text-[12.5px] font-medium bg-accent text-white rounded-soft hover:bg-accent-deep transition-colors cursor-pointer border-0'
          }
          onClick={handleConfirm}
        >
          {modal.confirmLabel ?? (modal.destructive === true ? 'Delete' : 'Confirm')}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export { DrawerService };
