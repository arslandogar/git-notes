import { useState } from 'react';

import { usePublicGistsQuery } from '@/features/api/githubAPI';
import { AppLayout } from '@/layouts';

import { TableView, GridView } from './components';

export const Landing = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { isLoading } = usePublicGistsQuery(page);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderGists = () => {
    if (viewMode === 'list') return <TableView page={page} />;
    if (viewMode === 'grid') return <GridView page={page} />;
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
