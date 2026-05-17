import type { DashboardData, CountryData } from '@shared/types/api';

export function getCountryKeys(data: DashboardData): string[] {
  return Object.keys(data).filter((k) => k.length === 2);
}

export function getCountryData(data: DashboardData, country: string): CountryData | null {
  const value = data[country];
  if (
    typeof value === 'boolean' ||
    typeof value === 'string' ||
    value === undefined ||
    value === null
  ) {
    return null;
  }
  return value as CountryData;
}
