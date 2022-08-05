import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { GistView, ErrorFallback } from '@/components';
import { AppLayout } from '@/layouts';
import { useGistQuery } from '@/redux/apis';

export const GridDetails: FC = () => {
  const params = useParams<{ gistId: string }>();
  const { data: gist, isLoading, isError, error } = useGistQuery(params.gistId as string);

  if (isError) {
    return <ErrorFallback message={error?.message} />;
  }

  return (
    <AppLayout isLoading={isLoading}>
      {gist ? (
        <div className="py-20">
          <GistView showAllFiles fullCodeView gist={gist} />
        </div>
      ) : null}
    </AppLayout>
  );
};
