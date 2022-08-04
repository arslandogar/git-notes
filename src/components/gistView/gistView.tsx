import { FC } from 'react';

import { Gist } from '@/redux/apis/githubAPI/types';

import { CodeView } from '../codeView';

import { GistInfo } from './components';

interface Props {
  gist: Gist;
  showAllFiles?: boolean;
  fullCodeView?: boolean;
  infoPosition?: 'top' | 'bottom';
}

export const GistView: FC<Props> = ({ showAllFiles, fullCodeView, gist, infoPosition = 'top' }) => {
  const filesArray = Object.values(gist.files);

  const renderGistInfo = () => {
    return (
      <GistInfo
        id={gist.id}
        owner={gist.owner}
        description={gist.description}
        created_at={gist.created_at}
        actionsButtonsDirection={infoPosition === 'top' ? 'row' : 'col'}
      />
    );
  };

  const files = showAllFiles ? filesArray : filesArray.slice(0, 1);

  return (
    <div key={gist.id} className="w-full">
      {infoPosition === 'top' && renderGistInfo()}

      {files.map((file) => (
        <div key={file.filename} className="card card-compact bg-base-100 shadow-xl border my-10">
          <div className="card-body">
            <CodeView fileName={file.filename} fullView={fullCodeView} url={file?.raw_url} />
            {infoPosition === 'bottom' ? renderGistInfo() : null}
          </div>
        </div>
      ))}
    </div>
  );
};
