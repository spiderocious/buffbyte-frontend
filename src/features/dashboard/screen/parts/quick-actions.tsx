import { useNavigate } from 'react-router-dom';
import { FileText, ScrollText, Video } from '@ui/icons';
import { QuickCard } from '@ui/card';
import { ROUTES } from '@shared/constants/routes';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0 mb-3">Quick actions</h2>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <QuickCard
          icon={<FileText size={18} />}
          title="Analyze content"
          description="Run AI analysis on social captions, posts, or copy."
          onClick={() => void navigate(ROUTES.APP.CONTENT_ANALYSIS)}
        />
        <QuickCard
          icon={<ScrollText size={18} />}
          title="Optimise script"
          description="Get delivery, pace, and engagement feedback on video scripts."
          onClick={() => void navigate(ROUTES.APP.SCRIPT_ANALYSIS)}
        />
        <QuickCard
          icon={<Video size={18} />}
          title="Teleprompter"
          description="Read your script smoothly with the full-screen teleprompter."
          onClick={() => void navigate(ROUTES.APP.TELEPROMPTER)}
        />
      </div>
    </div>
  );
}
