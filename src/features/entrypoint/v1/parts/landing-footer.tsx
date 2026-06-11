import { Zap } from '@ui/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';


const PRODUCT_LINKS = ['Features', 'How it works'] as const;

function FooterLinkGroup({ label, links }: { label: string; links: readonly string[] }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 16 }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <a
            key={l}
            href="#"
            style={{ fontSize: 13.5, color: 'var(--ink-3)', textDecoration: 'none', transition: 'color 150ms' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-3)'; }}
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer
      style={{
        background: 'var(--paper-deep)',
        borderTop: '1px solid var(--hair)',
        padding: 'clamp(40px, 6vw, 60px) 20px clamp(32px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ maxWidth: 260, minWidth: 200 }}>
            <Link to={ROUTES.ROOT} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, textDecoration: 'none' }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={15} color="#fff" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                Buff<span style={{ color: 'var(--accent)' }}>Byte</span>
              </span>
            </Link>
            <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
              AI-powered content optimization for creators who want to grow faster and ship smarter.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <FooterLinkGroup label="Product" links={PRODUCT_LINKS} />
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--hair)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12.5, color: 'var(--ink-4)', margin: 0 }}>
            © {new Date().getFullYear()} BuffByte. All rights reserved.
          </p>
          <p style={{ fontSize: 12.5, color: 'var(--ink-5)', margin: 0 }}>
            Made for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
