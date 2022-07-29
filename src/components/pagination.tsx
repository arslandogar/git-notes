import { FC } from 'react';

interface Props {
  page: number;
  setPage: (page: number) => void;
}
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
