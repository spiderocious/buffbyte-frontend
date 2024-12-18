import { HomePage, AboutPage, LoginPage, SignupPage, DashboardPage } from '@buffbyte/pages';
import type { RouteConfig } from '@buffbyte/types';

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    requiresAuth: false,
    exact: true,
    title: 'Home - BuffByte'
  },
  {
    path: '/about',
    component: AboutPage,
    requiresAuth: false,
    exact: true,
    title: 'About - BuffByte'
  },
  {
    path: '/auth/login',
    component: LoginPage,
    requiresAuth: false,
    exact: false,
    title: 'Login - BuffByte'
    },
  {
    path: '/auth/signup',
    component: SignupPage,
    requiresAuth: false,
    exact: false,
    title: 'Sign Up - BuffByte'
  },
  {
    path: '/app/dashboard',
    component: DashboardPage,
    requiresAuth: true,
    exact: true,
    title: 'Dashboard - BuffByte'
  },
//   {
//     path: '*',
//     component: NotFoundPage,
//     requiresAuth: false,
//     exact: false,
//     title: '404 - Page Not Found'
//   }
];