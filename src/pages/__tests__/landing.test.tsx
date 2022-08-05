import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/redux';

import { Landing } from '../public';

const ReduxProviderWithRouter = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

describe('Landing', () => {
  it('displays public gists', async () => {
    render(
      <ReduxProviderWithRouter>
        <Landing />
      </ReduxProviderWithRouter>
    );
    const rows = await screen.findAllByRole('row');
    expect(rows).not.toHaveLength(0);
  });
});
