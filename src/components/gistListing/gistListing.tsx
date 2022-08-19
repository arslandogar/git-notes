import { FC, useState } from 'react';

import { Pagination } from '@/components';
import { useFilteredGists } from '@/hooks';
import { AppLayout } from '@/layouts';
import { Gist } from '@/redux/apis/githubAPI/types';

import { TableView, GridView } from './components';

interface Props {
  isLoading?: boolean;
  /**
   * Data to display
   */
  data?: Gist[];
  page: number;
  setPage: (page: number) => void;
}

/**
 * Lists gists in a table or grid
 */
export const GistListing: FC<Props> = ({ isLoading, data, page, setPage }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredData = useFilteredGists(data);

  /**
   * Renders the table or grid view
   */
  const renderGists = () => {
    if (filteredData?.length === 0) {
      return <div className="text-center text-2xl text-error">No Gists Found</div>;
    }
    if (viewMode === 'list') return <TableView data={filteredData} />;
    if (viewMode === 'grid') return <GridView data={filteredData} />;
  };

  /**
   * Renders a button to change the view mode
   * @param type The view mode to change to
   */
  const renderViewModeButton = (type: typeof viewMode) => {
    const icons = {
      list: 'list',
      grid: 'border-all',
    };
    return (
      <button
        data-testid={`view-mode-button-${type}`}
        className="btn btn-secondary"
        onClick={() => setViewMode(type)}
      >
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
      <Pagination page={page} setPage={setPage} />
    </AppLayout>
  );
};
