import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { GistView, ErrorFallback } from '@/components';
import { AppLayout } from '@/layouts';
import { useGistQuery } from '@/redux/apis';

dayjs.extend(relativeTime);

export const GridDetails: FC = () => {
  const params = useParams<{ gistId: string }>();
  const { data: gist, isLoading, isError, error } = useGistQuery(params.gistId as string);

  if (isError) {
    return <ErrorFallback message={error?.message} />;
  }

  return (
    <AppLayout isLoading={isLoading}>
      {gist ? <GistView fullCodeView gist={gist} /> : null}
    </AppLayout>
  );
};
