import { useGetUserQuery } from '@/features/api/githubAPI';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { GistSearchInput } from './gistSearchInput';

export const Navbar = () => {
  const { data } = useGetUserQuery(undefined);
  console.log('user data', data);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="md:px-40 navbar bg-primary">
      <div className="flex-none md:hidden">
        <label htmlFor="drawer-checkbox" className="btn btn-square btn-ghost">
          <i className="text-white fa-solid fa-bars"></i>
        </label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-white text-xl">Emumba</a>
      </div>
      <div className="flex-none gap-2 hidden md:flex">
        <div className="form-control">
          <GistSearchInput />
        </div>

        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="" src={data?.avatar_url} />
              </div>
            </div>
            <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <a
            className="btn btn-secondary text-primary"
            href="https://github.com/login/oauth/authorize?client_id=5d79469f3db4e6023fc2"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};
