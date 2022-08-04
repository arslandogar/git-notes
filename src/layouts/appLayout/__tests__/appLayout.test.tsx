import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/redux';

import { AppLayout } from '../appLayout';

const ReduxProviderWithRouter = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

describe('AppLayout', () => {
  it('renders loading indicator', () => {
    render(
      <ReduxProviderWithRouter>
        <AppLayout isLoading>null</AppLayout>
      </ReduxProviderWithRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
