import { FC } from 'react';

import { Gist } from '@/redux/apis/githubAPI/types';

import { GistRow } from './gistRow';

interface Props {
  data?: Gist[];
}

export const TableView: FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Keyword</th>
            <th>Notebook Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.map((gist) => (
            <GistRow key={gist.id} gist={gist} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
