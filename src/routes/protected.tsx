import { Navigate } from 'react-router-dom';

import { CreateGist, EditGist } from '@/pages/protected';

export const protectedRoutes = [
  {
    path: '/gists/create',
    element: <CreateGist />,
  },
  {
    path: '/gists/edit/:gistId',
    element: <EditGist />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
