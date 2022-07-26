import { Navigate } from 'react-router-dom';

import { Landing } from '@/pages/public';

export const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
