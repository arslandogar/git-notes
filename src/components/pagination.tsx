import { FC } from 'react';

interface Props {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
}
export const Pagination: FC<Props> = ({ handlePreviousPage, handleNextPage, page }) => {
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
