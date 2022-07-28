import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CodeView } from '@/components';

import { useFilteredGists } from '../hooks';

dayjs.extend(relativeTime);
interface Props {
  page: number;
}

export const GridView: FC<Props> = ({ page }) => {
  const data = useFilteredGists(page);

  return (
    <div className="overflow-x-auto">
      <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {data?.map((gist) => {
          const file = gist.files[Object.keys(gist.files)[0]];
          return (
            <Link key={gist.id} to={`/gists/${gist.id}`}>
              <div className="card card-compact bg-base-100 shadow-xl border">
                <div className="card-body">
                  <CodeView url={file.raw_url} />
                  <div className="flex py-5 border-t">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12">
                        <img src={gist.owner?.avatar_url} alt="Gist Owner" />
                      </div>
                    </div>
                    <div className="flex flex-col ml-5">
                      <span className="text-blue-600">
                        <a className="link" href="/">
                          {gist.owner?.login}
                        </a>
                        {' / '}
                        <a className="link" href="/">
                          {file.filename}
                        </a>
                      </span>
                      <span className="text-gray-400">
                        {`Created ${dayjs(gist.created_at).fromNow()}`}
                      </span>
                      <span className="text-gray-400">{gist.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
