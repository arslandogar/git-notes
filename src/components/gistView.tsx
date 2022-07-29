import dayjs from 'dayjs';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useUserQuery } from '@/features/api/githubAPI';
import { Gist } from '@/features/api/types';
import { useAppSelector } from '@/store';

import { CodeView } from './codeView';
import { DeleteButton } from './deleteButton';
import { ForkButton } from './forkButton';
import { StarButton } from './starButton';

interface Props {
  gist: Gist;
  fullCodeView?: boolean;
  infoPosition?: 'top' | 'bottom';
}

export const GistView: FC<Props> = ({ fullCodeView, gist, infoPosition = 'top' }) => {
  const file = gist?.files[Object.keys(gist?.files)[0]];

  const renderGistInfo = () => {
    return (
      <GistInfo
        id={gist.id}
        owner={gist.owner}
        files={gist.files}
        description={gist.description}
        created_at={gist.created_at}
        actionsButtonsDirection={infoPosition === 'top' ? 'row' : 'col'}
      />
    );
  };

  return (
    <div key={gist.id} className="my-10 w-full">
      {infoPosition === 'top' && renderGistInfo()}
      <div className="card card-compact bg-base-100 shadow-xl border">
        <div className="card-body">
          <CodeView fullView={fullCodeView} url={file?.raw_url} />
          {infoPosition === 'bottom' ? renderGistInfo() : null}
        </div>
      </div>
    </div>
  );
};

interface GistInfoProps
  extends Pick<Gist, 'id' | 'owner' | 'files' | 'description' | 'created_at'> {
  actionsButtonsDirection?: 'row' | 'col';
}

const GistInfo: FC<GistInfoProps> = ({
  id,
  owner,
  files,
  description,
  created_at,
  actionsButtonsDirection = 'row',
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: currentUser } = useUserQuery(undefined);

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

  const file = files[Object.keys(files)[0]];
  return (
    <div className="flex flex-col lg:flex-row justify-center place-items-center h-32 py-5">
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
          <span>{' / '}</span>
          <Link to={`gists/${id}`}>
            <span className="link">{file.filename}</span>
          </Link>
        </div>
        <span className="text-gray-400">{`Created ${dayjs(created_at).fromNow()}`}</span>
        <span className="text-gray-400">{description}</span>
      </div>
      {isAuthenticated ? (
        <div className={`flex flex-${actionsButtonsDirection} ml-auto`}>
          {renderCurrentUserOptions(id)}
          <StarButton gistId={id} color="blue" showText />
          <ForkButton gistId={id} color="blue" showText />
        </div>
      ) : null}
    </div>
  );
};
