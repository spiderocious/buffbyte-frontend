interface KitSectionProps {
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
}

export function KitSection({ title, description, children }: KitSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-end justify-between gap-6 pb-[18px] border-b border-ink mb-9">
        <h2 className="text-[28px] font-semibold tracking-[var(--track-h)] text-ink m-0">
          {title}
        </h2>
        {description !== undefined && description !== '' && (
          <p className="text-[13.5px] text-ink-3 max-w-[520px] leading-[1.55] m-0">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}
