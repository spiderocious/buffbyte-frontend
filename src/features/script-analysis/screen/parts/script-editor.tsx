import { useState, useCallback } from 'react';
import { Show } from 'meemaw';
import { Textarea, Helper, Label } from '@ui/input';
import { Button } from '@ui/button';
import { AnalysisLoader } from '@ui/empty-state';
import { StatusPill } from '@ui/pill';
import { useScriptAnalysis } from '../../providers/use-script-analysis';
import { useAnalyzeScript } from '../../api/use-analyze-script';
import { estimateDuration } from '../../helpers/estimate-duration';

function wordCount(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export function ScriptEditor() {
  const { setSelectedAnalysis } = useScriptAnalysis();
  const mutation = useAnalyzeScript();

  const [script, setScript] = useState('');
  const [error, setError] = useState('');

  const words = wordCount(script);
  const chars = script.length;
  const duration = estimateDuration(words);

  const handleSubmit = useCallback(
    (e: React.FormEvent | KeyboardEvent) => {
      e.preventDefault();
      setError('');

      if (script.trim() === '') {
        setError('Paste your script above before running analysis.');
        return;
      }

      mutation.mutate(script.trim(), {
        onSuccess: (result) => {
          setSelectedAnalysis(result);
          setScript('');
        },
        onError: () => { /* toast shown by api-client interceptor */ },
      });
    },
    [script, mutation, setSelectedAnalysis],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e as unknown as KeyboardEvent);
    }
  }

  return (
    <>
      <AnalysisLoader open={mutation.isPending} type="script" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[12px] text-ink-3 tabular-nums">
            <span><span className="font-semibold text-ink">{words}</span> words</span>
            <span><span className="font-semibold text-ink">{chars}</span> chars</span>
            <span><span className="font-semibold text-ink">{duration}</span> read</span>
          </div>
          <Show when={words > 10}>
            <StatusPill status="live">Draft</StatusPill>
          </Show>
        </div>

        <div>
          <Label>Your script</Label>
          <Textarea
            placeholder="Paste your video script here… (Cmd/Ctrl + Enter to analyze)"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            onKeyDown={handleKeyDown}
            status={error !== '' ? 'error' : 'default'}
            className="min-h-[400px] font-mono text-[13.5px]"
          />
          <Show when={error !== ''}>
            <Helper status="error">{error}</Helper>
          </Show>
        </div>

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={mutation.isPending}>
          Analyze script
        </Button>
      </form>
    </>
  );
}
