import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { RootLayout } from '@shared/providers/root-layout';
import { AuthGuard } from '@shared/guards/auth-guard';
import { GuestGuard } from '@shared/guards/guest-guard';
import { AppLayout } from '@shared/widgets/app-layout/app-layout';
import { EntrypointScreen } from '@features/entrypoint/screen/entrypoint-screen';
import { UiKitScreen } from '@features/ui-kit/screen/ui-kit-screen';
import {
  LoginScreen,
  RegisterScreen,
  DashboardScreen,
  ContentAnalysisScreen,
  ContentAnalysisNewScreen,
  ContentAnalysisResultScreen,
  ScriptAnalysisScreen,
  ScriptAnalysisNewScreen,
  ScriptAnalysisResultScreen,
  TeleprompterScreen,
} from '@app/app.lazy';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: ROUTES.ROOT, Component: EntrypointScreen },
      { path: ROUTES.UI_KIT, Component: UiKitScreen },
      {
        Component: GuestGuard,
        children: [
          { path: ROUTES.AUTH.LOGIN, Component: LoginScreen },
          { path: ROUTES.AUTH.REGISTER, Component: RegisterScreen },
        ],
      },
      {
        Component: AuthGuard,
        children: [
          // Full-screen mobile pages (no AppLayout chrome)
          { path: ROUTES.APP.CONTENT_ANALYSIS_NEW,    Component: ContentAnalysisNewScreen },
          { path: ROUTES.APP.CONTENT_ANALYSIS_RESULT, Component: ContentAnalysisResultScreen },
          { path: ROUTES.APP.SCRIPT_ANALYSIS_NEW,     Component: ScriptAnalysisNewScreen },
          { path: ROUTES.APP.SCRIPT_ANALYSIS_RESULT,  Component: ScriptAnalysisResultScreen },
          {
            Component: AppLayout,
            children: [
              { path: ROUTES.APP.DASHBOARD,          Component: DashboardScreen },
              { path: ROUTES.APP.CONTENT_ANALYSIS,   Component: ContentAnalysisScreen },
              { path: ROUTES.APP.SCRIPT_ANALYSIS,    Component: ScriptAnalysisScreen },
              { path: ROUTES.APP.TELEPROMPTER,       Component: TeleprompterScreen },
            ],
          },
        ],
      },
    ],
  },
]);
