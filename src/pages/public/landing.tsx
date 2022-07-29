import { useState } from 'react';

import { GistListing } from '@/components';
import { usePublicGistsQuery } from '@/features/api/githubAPI';

export const Landing = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePublicGistsQuery(page);

  return <GistListing isLoading={isLoading} data={data} page={page} setPage={setPage} />;
};
