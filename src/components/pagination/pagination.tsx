import { FC } from 'react';

interface Props {
  /**
   * Current page
   */
  page: number;
  /**
   * Sets the current page to the given value
   */
  setPage: (page: number) => void;
}

/**
 * Pagination component, with a previous and next button
 */
export const Pagination: FC<Props> = ({ page, setPage }) => {
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex justify-center py-10 btn-group">
      <button className="btn btn-primary text-white" onClick={handlePreviousPage}>
        «
      </button>
      <button className="btn btn-primary text-white">{`Page ${page}`}</button>
      <button onClick={handleNextPage} className="btn btn-primary text-white">
        »
      </button>
    </div>
  );
};
