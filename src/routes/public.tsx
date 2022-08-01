import { Landing, GridDetails, Profile } from '@/pages/public';

export const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/users/:username',
    element: <Profile />,
  },
  {
    path: '/gists/:gistId',
    element: <GridDetails />,
  },
];
