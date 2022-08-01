import { FC } from 'react';

import { Gist } from '@/redux/apis/githubAPI/types';

import { CodeView } from '../codeView';

import { GistInfo } from './components';

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
