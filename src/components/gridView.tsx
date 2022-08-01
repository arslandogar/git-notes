import { FC } from 'react';

import { GistView } from '@/components';
import { Gist } from '@/redux/apis/githubAPI/types';

interface Props {
  data?: Gist[];
}

export const GridView: FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((gist) => {
          return <GistView key={gist.id} gist={gist} infoPosition="bottom" />;
        })}
      </div>
    </div>
  );
};
