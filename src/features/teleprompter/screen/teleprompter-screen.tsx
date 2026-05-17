import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TeleprompterProvider } from '../providers/teleprompter-provider';
import { useTeleprompter } from '../providers/use-teleprompter';
import { ControlPanel } from './parts/control-panel';
import { DisplayArea } from './parts/display-area';
import { TransportDock } from './parts/transport-dock';

interface LocationState {
  readonly script?: string;
}

function TeleprompterInner() {
  const { setScript } = useTeleprompter();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.script) {
      setScript(state.script);
    }
  }, [location.state, setScript]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0A0A09',
        color: '#FAF7F2',
        overflow: 'hidden',
        zIndex: 100,
      }}
    >
      <ControlPanel />
      <DisplayArea />
      <TransportDock />
    </div>
  );
}

export function TeleprompterScreen() {
  return (
    <TeleprompterProvider>
      <TeleprompterInner />
    </TeleprompterProvider>
  );
}
