import dayjs from 'dayjs';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ForkButton, StarButton } from '@/components';
import { Gist } from '@/features/api/types';
import { useAppSelector } from '@/store';

interface Props {
  gist: Gist;
}

export const GistRow: FC<Props> = ({ gist }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
          <Link to={`/users/${gist.owner?.login}`}>
            <div className="link text-md">
              <span className="text-gray-600">{gist.owner?.login}</span>
            </div>
          </Link>
        </div>
      </td>
      <td>{dayjs(gist.created_at).format('DD MMM YYYY')}</td>
      <td>{dayjs(gist.created_at).format('HH:MM A')}</td>
      <td>{gist.description}</td>
      <td>{gist.files[Object.keys(gist.files)[0]]?.filename}</td>
      <td>
        <div className="flex items-center space-x-3">
          <Link className="btn btn-ghost btn-sm text-primary" to={`/gists/${gist.id}`}>
            <i className="fa-solid fa-eye"></i>
          </Link>
          {isAuthenticated ? (
            <>
              <ForkButton gistId={gist.id} />
              <StarButton gistId={gist.id} />
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );
};
