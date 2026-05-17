/**
 * DrawerStore — plain pub-sub backing store.
 * No React dep. Subscribe / getState / mutations only.
 */

export type ToastVariant = 'info' | 'warn' | 'crit';

export interface ToastItem {
  readonly id: string;
  readonly variant: ToastVariant;
  readonly title: string;
  readonly body?: string;
  readonly action?: { readonly label: string; readonly onClick: () => void };
}

export interface ConfirmModalState {
  readonly open: true;
  readonly title: string;
  readonly body?: string;
  readonly destructive?: boolean;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly onConfirm: () => void;
  readonly onCancel?: () => void;
}

type ClosedModal = { readonly open: false };
export type ModalState = ConfirmModalState | ClosedModal;

export interface DrawerState {
  readonly toasts: ReadonlyArray<ToastItem>;
  readonly modal: ModalState;
}

type Listener = () => void;

function createStore() {
  let state: DrawerState = {
    toasts: [],
    modal: { open: false },
  };

  const listeners = new Set<Listener>();

  const notify = () => listeners.forEach((l) => l());

  const getState = () => state;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    state = { ...state, toasts: [...state.toasts, { ...toast, id }] };
    notify();
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    state = { ...state, toasts: state.toasts.filter((t) => t.id !== id) };
    notify();
  };

  const showModal = (config: ConfirmModalState) => {
    state = { ...state, modal: config };
    notify();
  };

  const closeModal = () => {
    state = { ...state, modal: { open: false } };
    notify();
  };

  return { getState, subscribe, addToast, removeToast, showModal, closeModal };
}

export const drawerStore = createStore();
