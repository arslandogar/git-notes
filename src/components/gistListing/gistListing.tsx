import { FC, useState } from 'react';

import { TableView, GridView } from '@/components';
import { Gist } from '@/features/api/types';
import { useFilteredGists } from '@/hooks';
import { AppLayout } from '@/layouts';

interface Props {
  isLoading?: boolean;
  data?: Gist[];
  page: number;
  setPage: (page: number) => void;
}

export const GistListing: FC<Props> = ({ isLoading, data, page, setPage }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredData = useFilteredGists(data);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderGists = () => {
    if (viewMode === 'list') return <TableView data={filteredData} />;
    if (viewMode === 'grid') return <GridView data={filteredData} />;
  };

  const renderViewModeButton = (type: typeof viewMode) => {
    const icons = {
      list: 'list',
      grid: 'border-all',
    };
    return (
      <button className="btn btn-secondary" onClick={() => setViewMode(type)}>
        <i className={`fa-solid fa-${icons[type]} ${type === viewMode ? 'text-primary' : ''}`}></i>
      </button>
    );
  };

  return (
    <AppLayout isLoading={isLoading}>
      <div className="justify-end btn-group">
        {renderViewModeButton('grid')}
        {renderViewModeButton('list')}
      </div>
      {renderGists()}
      <div className="flex justify-center py-10 btn-group">
        <button className="btn btn-primary text-white" onClick={handlePreviousPage}>
          «
        </button>
        <button className="btn btn-primary text-white">{`Page ${page}`}</button>
        <button onClick={handleNextPage} className="btn btn-primary text-white">
          »
        </button>
      </div>
    </AppLayout>
  );
};
