import { Navigate } from 'react-router-dom';

import { CreateGist, EditGist, StarredGists } from '@/pages/protected';

export const protectedRoutes = [
  {
    path: '/gists/starred',
    element: <StarredGists />,
  },
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
