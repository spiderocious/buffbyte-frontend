import { lazy } from 'react';
import type { RouteConfig } from "@buffbyte/types";

// Lazy load all page components for code splitting
const HomePage = lazy(() => import("../pages/landing/HomePage"));
const AboutPage = lazy(() => import("../pages/landing/AboutPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("../pages/app/dashboard"));
const ContentAnalysisPage = lazy(() => import("../pages/app/content-analysis"));
const ScriptAnalysisPage = lazy(() => import("../pages/app/script-analysis"));
const TeleprompterPage = lazy(() => import("../pages/app/teleprompter"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: HomePage,
    requiresAuth: false,
    exact: true,
    title: "Home - BuffByte",
  },
  {
    path: "/about",
    component: AboutPage,
    requiresAuth: false,
    exact: true,
    title: "About - BuffByte",
  },
  {
    path: "/auth/login",
    component: LoginPage,
    requiresAuth: false,
    exact: false,
    title: "Login - BuffByte",
  },
  {
    path: "/auth/signup",
    component: SignupPage,
    requiresAuth: false,
    exact: false,
    title: "Sign Up - BuffByte",
  },
  {
    path: "/app/dashboard",
    component: DashboardPage,
    requiresAuth: true,
    exact: true,
    title: "Dashboard - BuffByte",
  },

  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    requiresAuth: false,
    exact: true,
    title: "Privacy Policy - BuffByte",
  },
  {
    path: "/terms-of-service",
    component: TermsOfService,
    requiresAuth: false,
    exact: true,
    title: "Terms of Service - BuffByte",
  },
  {
    path: "/app/content-analysis",
    component: ContentAnalysisPage,
    requiresAuth: true,
    exact: true,
    title: "Content Analysis - BuffByte",
  },
  {
    path: "/app/script-analysis",
    component: ScriptAnalysisPage,
    requiresAuth: true,
    exact: true,
    title: "Script Analysis - BuffByte",
  },
  {
    path: "/app/teleprompter",
    component: TeleprompterPage,
    requiresAuth: true,
    exact: true,
    title: "Teleprompter - BuffByte",
  },
  {
    path: "*",
    component: NotFoundPage,
    requiresAuth: false,
    exact: false,
    title: "404 - Page Not Found",
  }
];
