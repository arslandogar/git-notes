import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import {
  useForkGistMutation,
  useStarGistMutation,
  useIsStarredGistQuery,
} from '@/features/api/githubAPI';
import { GistItem } from '@/features/api/types';
import { useAppSelector } from '@/store';

interface Props {
  gist: GistItem;
}

export const GistRow: FC<Props> = ({ gist }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [forkGist, forkGistResult] = useForkGistMutation();
  const [starGist, starGistResult] = useStarGistMutation();

  const { data } = useIsStarredGistQuery(gist.id);

  useEffect(() => {
    if (forkGistResult.isSuccess) {
      toast.success('Gist forked successfully');
    }
    if (forkGistResult.isError) {
      toast.error('Failed to fork gist');
    }
  }, [forkGistResult]);

  useEffect(() => {
    console.log(starGistResult);
    if (starGistResult.isSuccess) {
      toast.success('Gist starred successfully');
    }
    if (starGistResult.isError) {
      toast.error('Failed to star gist');
    }
  }, [starGistResult]);

  return (
    <tr>
      <td>
        <label>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </label>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={gist.owner?.avatar_url} alt="Gist Owner" />
            </div>
          </div>
          <div className="text-md">
            <span className="text-gray-600">{gist.owner?.login}</span>
          </div>
        </div>
      </td>
      <td>{dayjs(gist.created_at).format('DD MMM YYYY')}</td>
      <td>{dayjs(gist.created_at).format('HH:MM A')}</td>
      <td>{gist.description}</td>
      <td>{gist.files[Object.keys(gist.files)[0]]?.filename}</td>
      {isAuthenticated ? (
        <td>
          <div className="flex items-center space-x-3">
            <button
              className={`btn btn-ghost btn-sm text-primary ${
                forkGistResult.isLoading ? 'loading' : ''
              }`}
              onClick={() => {
                forkGist(gist.id);
              }}
            >
              <i className="fas fa-code-fork text-primary"></i>
            </button>
            <button
              className={`btn btn-ghost btn-sm text-primary ${
                starGistResult.isLoading ? 'loading' : ''
              }`}
              onClick={() => {
                starGist(gist.id);
              }}
            >
              <i className={`fa-${data ? 'solid' : 'regular'} fa-star text-primary`} />
            </button>
          </div>
        </td>
      ) : null}
    </tr>
  );
};
