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
];
