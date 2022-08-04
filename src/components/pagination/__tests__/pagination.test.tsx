import { render, screen, fireEvent } from '@testing-library/react';

import { Pagination } from '../pagination';

const mockedSetPage = jest.fn();

const getNextPageButton = () => screen.getByText(/»/i);
const getPreviousPageButton = () => screen.getByText(/«/i);

test('renders page number', () => {
  render(<Pagination page={4} setPage={mockedSetPage} />);
  expect(screen.getByText(/4/i)).toBeInTheDocument();
});

test('goes to next page', () => {
  render(<Pagination page={4} setPage={mockedSetPage} />);
  fireEvent.click(getNextPageButton());
  expect(mockedSetPage).toHaveBeenCalledWith(5);
});

test('goes to previous page', () => {
  render(<Pagination page={4} setPage={mockedSetPage} />);
  fireEvent.click(getPreviousPageButton());
  expect(mockedSetPage).toHaveBeenCalledWith(3);
});

test("doesn't go to previous page if on first page", () => {
  render(<Pagination page={1} setPage={mockedSetPage} />);
  fireEvent.click(getPreviousPageButton());
  expect(mockedSetPage).not.toHaveBeenCalled();
});
