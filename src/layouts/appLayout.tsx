import { FC, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { login } from '@/features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '@/store';

import { Navbar, Sidebar } from './components';

interface Props {
  children: ReactNode;
}

export const AppLayout: FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();

  useEffect(() => {
    const code = search.get('code');
    if (code && !isAuthenticated) {
      dispatch(login(code));
    }
  }, [dispatch, isAuthenticated, search]);

  return (
    <div className="drawer">
      <input id="drawer-checkbox" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-5 md:px-10 lg:px-20">{children}</main>
      </div>
      <Sidebar />
    </div>
  );
};
