import { useState } from 'react';
import { Loadable, Show } from 'meemaw';
import { ThinkingState, EmptyState } from '@ui/empty-state';
import { LayoutDashboard } from '@ui/icons';
import type { TrendingTopic } from '@shared/types/api';
import { useDashboard } from '../api/use-dashboard';
import { getCountryKeys, getCountryData } from '../helpers/get-country-data';
import { WelcomeBanner } from './parts/welcome-banner';
import { CountrySwitcher } from './parts/country-switcher';
import { TrendingTopics } from './parts/trending-topics';
import { ViralHashtags } from './parts/viral-hashtags';
import { QuickActions } from './parts/quick-actions';
import { FormatInsights } from './parts/format-insights';
import { CreatorOpportunities } from './parts/creator-opportunities';
import { ContentGaps } from './parts/content-gaps';
import { PlatformUpdates } from './parts/platform-updates';

export function DashboardScreen() {
  const { data, isLoading, error } = useDashboard();
  const [selectedCountry, setSelectedCountry] = useState('');

  const countryKeys  = data ? getCountryKeys(data) : [];
  const country      = selectedCountry !== '' ? selectedCountry : (countryKeys[0] ?? '');
  const countryData  = data && country !== '' ? getCountryData(data, country) : null;

  return (
    <Loadable
      loading={isLoading}
      error={error ?? undefined}
      loadingComponent={
        <div className="flex items-center justify-center py-24">
          <ThinkingState title="Loading your dashboard…" liveLabel="Fetching regional trends" />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <WelcomeBanner />

        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] m-0">Regional trends</h2>
          <Show when={countryKeys.length > 0}>
            <CountrySwitcher countries={countryKeys} value={country} onChange={setSelectedCountry} />
          </Show>
        </div>

        <Show
          when={countryData !== null}
          fallback={
            <EmptyState
              icon={<LayoutDashboard size={20} />}
              title="No data for this region"
              description="Try selecting a different country from the switcher above."
            />
          }
        >
          <div className="flex flex-col gap-6">
            <TrendingTopics   topics={(countryData?.trending_topics ?? []) as TrendingTopic[]} />
            <ViralHashtags    hashtags={countryData?.hashtags ?? { twitter: [], instagram: [], tiktok: [], linkedin: [] }} />
            <FormatInsights   insights={countryData?.content_insights ?? { viral_formats: [], peak_posting_times: [], content_gaps: [] }} country={country} />
            <ContentGaps      gaps={countryData?.content_insights?.content_gaps ?? []} />
            <CreatorOpportunities opportunities={countryData?.creator_opportunities ?? []} />
            <PlatformUpdates  updates={countryData?.platform_updates ?? []} />
          </div>
        </Show>

        <QuickActions />
      </div>
    </Loadable>
  );
}
