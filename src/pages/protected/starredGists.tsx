import { useState } from 'react';

import { GistListing } from '@/components';
import { useStarredGistsQuery } from '@/redux/apis';

export const StarredGists = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useStarredGistsQuery(page);

  return <GistListing isLoading={isLoading} data={data} page={page} setPage={setPage} />;
};
