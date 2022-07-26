import { Navigate } from 'react-router-dom';

import { Profile } from '@/pages/protected';

export const protectedRoutes = [
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
