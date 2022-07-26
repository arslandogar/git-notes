import { Navigate, useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const isLoggedIn = false;

  const appRoutes = isLoggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...appRoutes,
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <>{element}</>;
};
