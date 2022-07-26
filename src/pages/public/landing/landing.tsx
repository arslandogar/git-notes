import { useState } from 'react';

import { usePublicGistsQuery } from '@/features/gist/gistAPI';
import { AppLayout } from '@/layouts';

import { TableView, GridView } from './components';

export const Landing = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { isLoading } = usePublicGistsQuery(page);

  console.log(setPage);

  const renderGists = () => {
    if (viewMode === 'list') return <TableView page={page} />;
    if (viewMode === 'grid') return <GridView />;
  };

  const renderViewModeButton = (type: 'list' | 'grid') => {
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
    <AppLayout>
      <div className="justify-end btn-group">
        {renderViewModeButton('grid')}
        {renderViewModeButton('list')}
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <progress className="progress progress-primary w-56"></progress>
        </div>
      ) : (
        renderGists()
      )}
      <div className="flex justify-center py-10 btn-group">
        <button
          className="btn btn-primary text-white"
          onClick={() => {
            if (page < 2) return;
            setPage(page - 1);
          }}
        >
          «
        </button>
        <button className="btn btn-primary text-white">{`Page ${page}`}</button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="btn btn-primary text-white"
        >
          »
        </button>
      </div>
    </AppLayout>
  );
};
