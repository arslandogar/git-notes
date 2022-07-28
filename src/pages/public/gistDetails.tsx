import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { CodeView, ForkButton, StarButton } from '@/components';
import { useGistQuery } from '@/features/api/githubAPI';
import { AppLayout } from '@/layouts';

dayjs.extend(relativeTime);

export const GridDetails: FC = () => {
  const params = useParams<{ gistId: string }>();
  const { data: gist, isLoading } = useGistQuery(params.gistId as string);

  const file = gist?.files[Object.keys(gist?.files)[0]];
  return (
    <AppLayout isLoading={isLoading}>
      <div className="py-10">
        <div className="flex py-5">
          <div className="avatar">
            <div className="mask mask-squircle w-24">
              <img src={gist?.owner?.avatar_url} alt="Gist Owner" />
            </div>
          </div>
          <div className="flex flex-col ml-5">
            <span className="text-blue-600">
              <a className="link" href="/">
                {gist?.owner?.login}
              </a>
              {' / '}
              <a className="link" href="/">
                {file?.filename}
              </a>
            </span>
            <span className="text-gray-400">{`Created ${dayjs(gist?.created_at).fromNow()}`}</span>
            <span className="text-gray-400">{gist?.description}</span>
          </div>
          {gist ? (
            <div className="flex flex-row ml-auto align-middle justify-evenly">
              <StarButton gistId={gist.id} color="blue" showText />
              <ForkButton gistId={gist.id} color="blue" showText />
            </div>
          ) : null}
        </div>
        <div className="card card-compact bg-base-100 shadow-xl border">
          <div className="card-body">
            <CodeView fullView url={file?.raw_url} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};