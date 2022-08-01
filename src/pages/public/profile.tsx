import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorFallback, GistView, Pagination } from '@/components';
import { useFilteredGists } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useUserGistsQuery, useUserQuery } from '@/redux/apis';

export const Profile = () => {
  const [page, setPage] = useState(1);

  const params = useParams<{ username: string }>();
  const { username } = params as { username: string };

  const { data: gists, isLoading: isGistsLoading } = useUserGistsQuery({ page, username });
  const { data: user, isLoading: isUserLoading, isError: isErrorUser } = useUserQuery(username);

  const filteredData = useFilteredGists(gists);

  if (isErrorUser) {
    return <ErrorFallback message="User not found" />;
  }

  const renderGists = () => {
    if (filteredData?.length === 0) {
      return <div className="text-center text-2xl text-error">No Gists Found</div>;
    }
    return filteredData?.map((gist) => <GistView key={gist.id} gist={gist} />);
  };

  return (
    <AppLayout isLoading={isGistsLoading || isUserLoading}>
      <div className="flex flex-col lg:flex-row w-full h-full justify-center place-items-center">
        <div className="w-full h-full lg:w-1/3 card rounded-box justify-center place-items-center">
          <img className="w-52 h-52 rounded-full" alt="" src={user?.avatar_url} />
          <h2 className="mt-8 text-2xl">{user?.login}</h2>
          <a
            className="lg:mt-8 btn btn-secondary border-1 border-gray-400 text-blue-600"
            href={`https://github.com/${user?.login}`}
            target="_blank"
            rel="noreferrer"
          >
            View Github profiile
          </a>
        </div>
        <div className="lg:divider lg:divider-horizontal" />
        <div className="h-3/4 lg:px-10 w-full lg:w-2/3 card rounded-box place-items-center overflow-y-auto">
          {renderGists()}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </AppLayout>
  );
};
