import { FC, ReactNode, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/redux';
import { login } from '@/redux/slices';

import { Navbar, Sidebar } from './components';

interface Props {
  children: ReactNode;
  isLoading?: boolean;
}

export const AppLayout: FC<Props> = ({ children, isLoading }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        {window.history.state.idx > 0 ? (
          <button
            className="btn btn-ghost absolute top-20"
            onClick={() => navigate(-1)}
            disabled={window.history.length === 1}
          >
            <i className="fa-solid fa-arrow-left-long" />
          </button>
        ) : null}
        <main className="flex-1 overflow-y-auto px-5 md:px-10 lg:px-20">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <progress className="progress progress-primary w-56"></progress>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      <Sidebar />
    </div>
  );
};
