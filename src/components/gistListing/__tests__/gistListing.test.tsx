import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MOCK_GISTS } from '@/__mocks__/responses';
import { store } from '@/redux';

import { GistListing } from '../gistListing';

const ReduxProviderWithRouter = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

describe('GistListing', () => {
  it('displays gists in a table', async () => {
    render(
      <ReduxProviderWithRouter>
        <GistListing data={MOCK_GISTS} isLoading={false} page={1} setPage={jest.fn()} />
      </ReduxProviderWithRouter>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays gists in a grid', async () => {
    render(
      <ReduxProviderWithRouter>
        <GistListing data={MOCK_GISTS} isLoading={false} page={1} setPage={jest.fn()} />
      </ReduxProviderWithRouter>
    );
    fireEvent.click(screen.getByTestId(/view-mode-button-grid/i));
    expect(screen.getByTestId('gists-grid-view')).toBeInTheDocument();
  });

  it("displays 'No gists found' when no gists are found", async () => {
    render(
      <ReduxProviderWithRouter>
        <GistListing data={[]} isLoading={false} page={1} setPage={jest.fn()} />
      </ReduxProviderWithRouter>
    );
    expect(screen.getByText(/No gists found/i)).toBeInTheDocument();
  });
});
