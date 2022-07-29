import { FC } from 'react';

import { useFilteredGists } from '../hooks';

import { GistRow } from './gistRow';

interface Props {
  page: number;
}

export const TableView: FC<Props> = ({ page }) => {
  const data = useFilteredGists(page);

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
