export const ROUTES = {
  ROOT: '/',
  UI_KIT: '/ui-kit',
  APP: {
    DASHBOARD: '/app/dashboard',
    CONTENT_ANALYSIS: '/app/content-analysis',
    CONTENT_ANALYSIS_NEW: '/app/content-analysis/new',
    CONTENT_ANALYSIS_RESULT: '/app/content-analysis/result',
    SCRIPT_ANALYSIS: '/app/script-analysis',
    SCRIPT_ANALYSIS_NEW: '/app/script-analysis/new',
    SCRIPT_ANALYSIS_RESULT: '/app/script-analysis/result',
    TELEPROMPTER: '/app/teleprompter',
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
} as const;
