/**
 * DrawerService — imperative singleton. Call from anywhere, no props needed.
 *
 * DrawerService.toast('Saved.', { variant: 'info' });
 * DrawerService.confirm('Delete this?', { destructive: true, onConfirm: () => {} });
 */
import { drawerStore, type ToastVariant, type ConfirmModalState } from './drawer-store';

export interface ToastOptions {
  readonly variant?: ToastVariant;
  readonly body?: string;
  readonly action?: { readonly label: string; readonly onClick: () => void };
}

export interface ConfirmOptions {
  readonly body?: string;
  readonly destructive?: boolean;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly onConfirm: () => void;
  readonly onCancel?: () => void;
}

const toast = (title: string, options: ToastOptions = {}) => {
  drawerStore.addToast({
    title,
    variant: options.variant ?? 'info',
    body: options.body,
    action: options.action,
  });
};

const confirm = (title: string, options: ConfirmOptions) => {
  const modal: ConfirmModalState = {
    open: true,
    title,
    body: options.body,
    destructive: options.destructive,
    confirmLabel: options.confirmLabel,
    cancelLabel: options.cancelLabel,
    onConfirm: options.onConfirm,
    onCancel: options.onCancel,
  };
  drawerStore.showModal(modal);
};

export const DrawerService = { toast, confirm };
