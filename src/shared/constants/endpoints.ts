export const EP = {
  AUTH: {
    LOGIN:    '/auth/login',
    REGISTER: '/auth/register',
  },
  APP: {
    DASHBOARD:     '/app/dashboard',
    CONTENT_CHATS: '/app/content/chats',
    VIDEO_CHATS:   '/app/video/chats',
    ANALYZE:       '/app/analyze',
  },
} as const;
