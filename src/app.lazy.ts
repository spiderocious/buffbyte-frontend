import { lazy } from 'react';

export const LoginScreen = lazy(() =>
  import('@features/auth/features/login/screen/login-screen').then((m) => ({ default: m.LoginScreen })),
);
export const RegisterScreen = lazy(() =>
  import('@features/auth/features/register/screen/register-screen').then((m) => ({ default: m.RegisterScreen })),
);
export const DashboardScreen = lazy(() =>
  import('@features/dashboard/screen/dashboard-screen').then((m) => ({ default: m.DashboardScreen })),
);
export const ContentAnalysisScreen = lazy(() =>
  import('@features/content-analysis/screen/content-analysis-screen').then((m) => ({ default: m.ContentAnalysisScreen })),
);
export const ContentAnalysisNewScreen = lazy(() =>
  import('@features/content-analysis/screen/content-analysis-new-screen').then((m) => ({ default: m.ContentAnalysisNewScreen })),
);
export const ContentAnalysisResultScreen = lazy(() =>
  import('@features/content-analysis/screen/content-analysis-result-screen').then((m) => ({ default: m.ContentAnalysisResultScreen })),
);
export const ScriptAnalysisScreen = lazy(() =>
  import('@features/script-analysis/screen/script-analysis-screen').then((m) => ({ default: m.ScriptAnalysisScreen })),
);
export const ScriptAnalysisNewScreen = lazy(() =>
  import('@features/script-analysis/screen/script-analysis-new-screen').then((m) => ({ default: m.ScriptAnalysisNewScreen })),
);
export const ScriptAnalysisResultScreen = lazy(() =>
  import('@features/script-analysis/screen/script-analysis-result-screen').then((m) => ({ default: m.ScriptAnalysisResultScreen })),
);
export const TeleprompterScreen = lazy(() =>
  import('@features/teleprompter/screen/teleprompter-screen').then((m) => ({ default: m.TeleprompterScreen })),
);
