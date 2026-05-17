import { useState } from 'react';
import { Copy, Check } from '@ui/icons';
import { PillTabs } from '@ui/tabs';
import { Repeat, Show } from 'meemaw';
import type { CountryData, TwitterHashtag, InstagramHashtag, TikTokHashtag, LinkedInHashtag } from '@shared/types/api';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin';

interface ViralHashtagsProps {
  readonly hashtags: CountryData['hashtags'];
}

function HashtagRow({ tag, meta }: { readonly tag: string; readonly meta: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    void navigator.clipboard.writeText(`#${tag}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex items-center justify-between py-3 border-t border-hair first:border-t-0 group">
      <div className="min-w-0">
        <span className="text-[13.5px] font-medium text-accent">#{tag}</span>
        <span className="text-[12px] text-ink-3 ml-2">{meta}</span>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy #${tag}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-soft hover:bg-paper-deep text-ink-3 hover:text-ink"
      >
        <Show when={copied} fallback={<Copy size={13} />}>
          <Check size={13} className="text-accent" />
        </Show>
      </button>
    </div>
  );
}

const TABS = [
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'linkedin', label: 'LinkedIn' },
] as const;

export function ViralHashtags({ hashtags }: ViralHashtagsProps) {
  const [platform, setPlatform] = useState<Platform>('twitter');

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0">Viral hashtags</h2>
      </div>

      <div className="border border-hair rounded-card bg-sheet p-4">
        <PillTabs
          items={TABS as unknown as { value: string; label: React.ReactNode }[]}
          value={platform}
          onChange={(v) => setPlatform(v as Platform)}
          className="mb-4"
        />

        <Show when={platform === 'twitter'}>
          <Repeat each={hashtags.twitter as TwitterHashtag[]}>
            {(h) => (
              <HashtagRow
                key={h.tag}
                tag={h.tag}
                meta={`${h.volume.toLocaleString()} posts · ${(h.engagement_rate * 100).toFixed(1)}% eng`}
              />
            )}
          </Repeat>
        </Show>

        <Show when={platform === 'instagram'}>
          <Repeat each={hashtags.instagram as InstagramHashtag[]}>
            {(h) => (
              <HashtagRow
                key={h.tag}
                tag={h.tag}
                meta={`${h.posts_count.toLocaleString()} posts · ${h.content_type}`}
              />
            )}
          </Repeat>
        </Show>

        <Show when={platform === 'tiktok'}>
          <Repeat each={hashtags.tiktok as TikTokHashtag[]}>
            {(h) => (
              <HashtagRow
                key={h.tag}
                tag={h.tag}
                meta={`${(h.views / 1_000_000).toFixed(1)}M views · trend ${h.trend_score}`}
              />
            )}
          </Repeat>
        </Show>

        <Show when={platform === 'linkedin'}>
          <Repeat each={hashtags.linkedin as LinkedInHashtag[]}>
            {(h) => (
              <HashtagRow
                key={h.tag}
                tag={h.tag}
                meta={`${h.industry} · ${h.engagement_type}`}
              />
            )}
          </Repeat>
        </Show>
      </div>
    </div>
  );
}
