import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: ComponentType;
  requiresAuth?: boolean;
  exact?: boolean;
  title?: string;
}

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  requiresAuth?: boolean;
  title?: string;
}
