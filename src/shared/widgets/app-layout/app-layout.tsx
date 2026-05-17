import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from './parts/top-nav';
import { BottomNav } from './parts/bottom-nav';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <ScrollToTop />
      <TopNav />
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 pb-24 md:pb-6 max-w-[1280px] w-full mx-auto">
        <Outlet />
      </main>
      {/* Bottom nav visible on mobile only */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
