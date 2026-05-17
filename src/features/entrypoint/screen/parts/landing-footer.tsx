import { Zap } from '@ui/icons';

const PRODUCT_LINKS = ['Features', 'How it works', 'Pricing', 'Changelog'] as const;
const COMPANY_LINKS = ['About', 'Blog', 'Careers', 'Contact'] as const;
const LEGAL_LINKS   = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] as const;

function FooterLinkGroup({ label, links }: { label: string; links: readonly string[] }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <a key={l} href="#" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(40px, 6vw, 60px) 20px clamp(32px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ maxWidth: 260, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="#fff" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                Buff<span style={{ color: 'var(--accent)' }}>Byte</span>
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, margin: 0 }}>
              AI-powered content optimization for creators who want to grow faster and ship smarter.
            </p>
          </div>

          {/* Links — wrap naturally on mobile */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <FooterLinkGroup label="Product" links={PRODUCT_LINKS} />
            <FooterLinkGroup label="Company" links={COMPANY_LINKS} />
            <FooterLinkGroup label="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} BuffByte. All rights reserved.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            Made for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
