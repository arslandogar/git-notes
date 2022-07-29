import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { GistView } from '@/components';
import { useUserGistsQuery } from '@/features/api/githubAPI';
import { AppLayout } from '@/layouts';

export const Profile = () => {
  const params = useParams<{ username: string }>();
  const [page] = useState(1);
  const { data, isLoading } = useUserGistsQuery({ page, username: params.username as string });

  const owner = data?.[0].owner;
  return (
    <AppLayout isLoading={isLoading}>
      <div className="flex flex-col lg:flex-row w-full h-full justify-center place-items-center">
        <div className="h-full w-full lg:w-1/3 card rounded-box justify-center place-items-center">
          <img className="rounded-full" alt="" src={owner?.avatar_url} />
          <h2 className="mt-8 text-2xl">{owner?.login}</h2>
        </div>
        <div className="divider  divider-vertical lg:divider-horizontal" />
        <div className="h-3/4 lg:px-10 w-full lg:w-2/3 card rounded-box place-items-center overflow-y-scroll">
          {data?.map((gist) => (
            <GistView key={gist.id} gist={gist} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
