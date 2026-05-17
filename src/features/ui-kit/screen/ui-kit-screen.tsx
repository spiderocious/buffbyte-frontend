import { KitSection } from './parts/kit-section';
import { ButtonsSection } from './parts/buttons-section';
import { InputsSection } from './parts/inputs-section';
import { SelectionSection } from './parts/selection-section';
import { ToggleSection } from './parts/toggle-section';
import { TabsSection } from './parts/tabs-section';
import { PickerSection } from './parts/picker-section';
import { PillsSection } from './parts/pills-section';
import { ScoreRingSection } from './parts/score-ring-section';
import { ScoreBarSection } from './parts/score-bar-section';
import { TableSection } from './parts/table-section';
import { CardsSection } from './parts/cards-section';
import { SkeletonSection } from './parts/skeleton-section';
import { BannerSection } from './parts/banner-section';
import { ModalSection } from './parts/modal-section';
import { TooltipSection } from './parts/tooltip-section';
import { DrawerSection } from './parts/drawer-section';

export function UiKitScreen() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-[1200px] mx-auto px-16 py-14">
        {/* Header */}
        <div className="mb-16 pb-[18px] border-b border-ink">
          <p className="text-[11px] text-ink-3 tracking-[var(--track-overline)] uppercase font-medium mb-2">
            BuffByte · Design System
          </p>
          <h1 className="text-[44px] font-semibold tracking-[var(--track-display)] text-ink m-0 mb-2">
            UI Kit
          </h1>
          <p className="text-[14px] text-ink-2 leading-[1.55] m-0 max-w-[560px]">
            Every component in the BuffByte design system — tokens, primitives, data
            display, overlays, and feedback.
          </p>
        </div>

        <KitSection
          title="Buttons"
          description="Five intents — primary, ink, secondary, ghost, danger. One radius (6 px). Hierarchy comes from background, not size."
        >
          <ButtonsSection />
        </KitSection>

        <KitSection
          title="Inputs"
          description="Inputs are typed-on paper. Hairline thickens to ink on hover; focus turns the border violet plus a 3 px tinted ring."
        >
          <InputsSection />
        </KitSection>

        <KitSection
          title="Checkbox & Radio"
          description="Checked state uses the accent. Disabled is opacity-45. Group wrapper for radio sets."
        >
          <SelectionSection />
        </KitSection>

        <KitSection
          title="Toggle"
          description="On/off switch. On = accent. Label + description left, knob right. role=switch for accessibility."
        >
          <ToggleSection />
        </KitSection>

        <KitSection
          title="Tabs"
          description="Two variants: pill (top-level nav) and underline (analysis result dimensions). Both fully controlled."
        >
          <TabsSection />
        </KitSection>

        <KitSection
          title="Platform Picker & Dropdown"
          description="Multi-select grid for platforms; headless dropdown panel for region/option lists."
        >
          <PickerSection />
        </KitSection>

        <KitSection
          title="Pills & Status"
          description="Three real pills: status (with pip dot), chip (AI value), tag (neutral label). Colour by meaning."
        >
          <PillsSection />
        </KitSection>

        <KitSection
          title="Score Ring"
          description="The signature data device. One number, large and tabular, ringed by an arc. Three sizes: hero (220px), card (88px), inline (32px)."
        >
          <ScoreRingSection />
        </KitSection>

        <KitSection
          title="Score Bar"
          description="4px pill bars. Single, score-line (label + value + bar), and stacked variants. Colour is meaningful."
        >
          <ScoreBarSection />
        </KitSection>

        <KitSection
          title="Table"
          description="Hairline-bordered. No zebra. Numbers right-aligned tabular. Hover = paper-deep only."
        >
          <TableSection />
        </KitSection>

        <KitSection
          title="Cards"
          description="AnalysisCard (ring + coach note + footer actions) and QuickCard (dashboard action tile with hover lift)."
        >
          <CardsSection />
        </KitSection>

        <KitSection
          title="Tooltips & Hovercards"
          description="Three sizes: tooltip (single line, ink), hovercard (paper, multi-line). Show on hover with 80ms/180ms delays. No external dep."
        >
          <TooltipSection />
        </KitSection>

        <KitSection
          title="Modals"
          description="Three modals every system needs: confirm, data input, and the critical irreversible one. Always centred, always with an obvious dismiss."
        >
          <ModalSection />
        </KitSection>

        <KitSection
          title="Banners & Inline Notes"
          description="Three feedback strengths — inline note in-flow, banner across a surface. Colour signals impact: accent for info, amber for warn, oxblood for critical, ink for announcements."
        >
          <BannerSection />
        </KitSection>

        <KitSection
          title="DrawerService · Toasts & Confirm Modals"
          description="Imperative singleton — DrawerService.toast() and DrawerService.confirm() work from anywhere. ModalHost + ToastHost are mounted at app root."
        >
          <DrawerSection />
        </KitSection>

        <KitSection
          title="Skeletons & Empty States"
          description="Loading skeletons (paper-deep pulse), ThinkingState (AI in progress ring), and EmptyState (icon + heading + optional CTA)."
        >
          <SkeletonSection />
        </KitSection>
      </div>
    </div>
  );
}
