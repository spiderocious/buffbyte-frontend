import { useState } from 'react';
import { Show } from 'meemaw';
import { Textarea, Helper, Label } from '@ui/input';
import { Button } from '@ui/button';
import { PlatformPicker } from '@ui/platform-picker';
import { AnalysisLoader } from '@ui/empty-state';
import { useContentAnalysis } from '../../providers/use-content-analysis';
import { useAnalyzeContent } from '../../api/use-analyze-content';

const PLATFORMS = [
  { value: 'twitter', label: 'Twitter', glyph: 'X' },
  { value: 'instagram', label: 'Instagram', glyph: 'IG' },
  { value: 'tiktok', label: 'TikTok', glyph: 'TT' },
  { value: 'linkedin', label: 'LinkedIn', glyph: 'LI' },
] as const;

import type { AnalyzeResult } from '@shared/types/api';

interface ContentInputProps {
  readonly onSuccess?: (result: AnalyzeResult) => void;
}

export function ContentInput({ onSuccess }: ContentInputProps = {}) {
  const { setSelectedAnalysis } = useContentAnalysis();
  const mutation = useAnalyzeContent();

  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (content.trim() === '') {
      setError('Paste your content above before running analysis.');
      return;
    }

    mutation.mutate(content.trim(), {
      onSuccess: (result) => {
        setSelectedAnalysis(result);
        setContent('');
        setPlatforms([]);
        onSuccess?.(result);
      },
      onError: () => { /* toast shown by api-client interceptor */ },
    });
  }

  return (
    <>
      <AnalysisLoader open={mutation.isPending} type="content" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <Label>Your content</Label>
            <span className="text-[11px] text-ink-3 tabular-nums">{content.length} chars</span>
          </div>
          <Textarea
            placeholder="Paste your caption, post, ad copy, or any social content here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            status={error !== '' ? 'error' : 'default'}
            className="min-h-[220px]"
          />
          <Show when={error !== ''}>
            <Helper status="error">{error}</Helper>
          </Show>
        </div>

        <div>
          <Label>Target platforms (optional)</Label>
          <PlatformPicker
            items={PLATFORMS as unknown as { value: string; label: string; glyph: string }[]}
            value={platforms}
            onChange={setPlatforms}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={mutation.isPending}>
          Analyze content
        </Button>
      </form>
    </>
  );
}
