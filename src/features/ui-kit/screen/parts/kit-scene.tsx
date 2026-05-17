interface KitSceneProps {
  readonly label?: string;
  readonly title?: string;
  readonly description?: string;
  readonly children: React.ReactNode;
}

export function KitScene({ label, title, description, children }: KitSceneProps) {
  const heading = label ?? title ?? '';
  return (
    <div className="border border-hair rounded-card bg-sheet p-7">
      <div className="flex items-baseline gap-[10px] mb-[18px]">
        <span className="text-[11px] text-ink-3 tracking-[var(--track-overline)] uppercase font-medium">
          Scene
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.01em]">{heading}</span>
      </div>
      {description !== undefined && description !== '' && (
        <p className="text-[12.5px] text-ink-3 leading-[1.5] m-0 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
