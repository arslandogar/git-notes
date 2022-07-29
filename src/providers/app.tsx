import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorFallback } from '@/components';
import { store } from '@/store';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={() => <ErrorFallback />}>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
      <Toaster />
    </ErrorBoundary>
  );
};
