import { Navigate } from 'react-router-dom';

import { Landing, GridDetails } from '@/pages/public';

export const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/gists/:gistId',
    element: <GridDetails />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
