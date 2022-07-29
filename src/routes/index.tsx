import { Navigate, useRoutes } from 'react-router-dom';

import { useAppSelector } from '@/store';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const appRoutes = isAuthenticated ? protectedRoutes : [];

  const element = useRoutes([
    ...appRoutes,
    ...publicRoutes,
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <>{element}</>;
};
