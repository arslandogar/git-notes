import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { ForkButton, StarButton, DeleteButton, IconButton } from '@/components';
import { useAppSelector } from '@/redux';
import { useCurrentUserQuery } from '@/redux/apis';
import { Gist } from '@/redux/apis/githubAPI/types';

dayjs.extend(relativeTime);

interface Props extends Pick<Gist, 'id' | 'owner' | 'description' | 'created_at'> {
  actionsButtonsDirection?: 'row' | 'col';
}

export const GistInfo: FC<Props> = ({
  id,
  owner,
  description,
  created_at,
  actionsButtonsDirection = 'row',
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: currentUser } = useCurrentUserQuery(undefined);
  const navigate = useNavigate();

  const renderCurrentUserOptions = (gistId: string) => {
    const isOwner = owner?.login === currentUser?.login;
    if (isOwner) {
      return (
        <>
          <DeleteButton gistId={gistId} />
          <Link className="btn btn-ghost btn-sm text-blue-600" to={`/gists/edit/${gistId}`}>
            <i className="fa-solid fa-edit"></i>
            <span className="ml-2">Edit</span>
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between place-items-center p-5 overflow-auto border-t">
      <div className="flex overflow-auto w-3/5 flex-row">
        <div className="avatar">
          <div className="mask mask-squircle w-12">
            <img src={owner?.avatar_url} alt="Gist Owner" />
          </div>
        </div>
        <div className="flex flex-col ml-5">
          <div className="text-blue-600">
            <Link to={`/users/${owner?.login}`}>
              <span className="link">{`${owner?.login}`}</span>
            </Link>
          </div>
          <span className="text-gray-400">{`Created ${dayjs(created_at).fromNow()}`}</span>
          <span className="text-gray-400">{description}</span>
        </div>
      </div>
      {isAuthenticated ? (
        <div className={`flex flex-${actionsButtonsDirection}`}>
          {renderCurrentUserOptions(id)}
          {window.location.pathname.includes(`/gists/${id}`) ? null : (
            <IconButton
              color="blue"
              icon="fa-solid fa-eye"
              text="View"
              onClick={() => navigate(`/gists/${id}`)}
            />
          )}
          <StarButton gistId={id} color="blue" showText />
          <ForkButton gistId={id} color="blue" showText />
        </div>
      ) : null}
    </div>
  );
};
