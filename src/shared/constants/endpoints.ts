export const EP = {
  AUTH: {
    LOGIN:    '/v1/auth/login',
    REGISTER: '/v1/auth/register',
  },
  APP: {
    DASHBOARD:     '/v1/app/dashboard',
    CONTENT_CHATS: '/v1/app/content/chats',
    VIDEO_CHATS:   '/v1/app/video/chats',
    ANALYZE:       '/v1/app/analyze',
  },
} as const;
