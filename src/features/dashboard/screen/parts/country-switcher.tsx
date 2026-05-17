import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '@ui/icons';
import { Dropdown } from '@ui/dropdown';
import { Show } from 'meemaw';
import { cn } from '@shared/ui/utils/cn';

const COUNTRY_LABELS: Record<string, string> = {
  ng: '🇳🇬 Nigeria',
  uk: '🇬🇧 United Kingdom',
  us: '🇺🇸 United States',
  gh: '🇬🇭 Ghana',
  za: '🇿🇦 South Africa',
  ke: '🇰🇪 Kenya',
  ca: '🇨🇦 Canada',
  au: '🇦🇺 Australia',
};

function countryLabel(code: string): string {
  return COUNTRY_LABELS[code] ?? code.toUpperCase();
}

interface CountrySwitcherProps {
  readonly countries: readonly string[];
  readonly value: string;
  readonly onChange: (country: string) => void;
}

export function CountrySwitcher({ countries, value, onChange }: CountrySwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const items = countries.map((c) => ({ value: c, label: countryLabel(c) }));

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-soft border border-hair bg-sheet',
          'text-[13px] font-medium text-ink hover:border-ink-4 transition-colors duration-150',
          'focus-visible:outline-none focus-visible:shadow-focus',
        )}
      >
        <span>{countryLabel(value)}</span>
        <ChevronDown size={13} className="text-ink-3" />
      </button>

      <Show when={open}>
        <div className="absolute top-full left-0 mt-1 z-30">
          <Dropdown
            items={items}
            value={value}
            onSelect={(v) => {
              onChange(v);
              setOpen(false);
            }}
          />
        </div>
      </Show>
    </div>
  );
}
