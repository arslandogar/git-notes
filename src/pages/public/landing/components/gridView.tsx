import dayjs from 'dayjs';

import { usePublicGistsQuery } from '@/features/gist/gistAPI';

export const GridView = () => {
  const { data } = usePublicGistsQuery(10);

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
          {/* row 1 */}
          {data?.map((gist) => (
            <tr key={gist.id}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
