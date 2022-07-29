import { Link } from 'react-router-dom';

import { useUserQuery, githubAPI } from '@/features/api/githubAPI';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store';

export const NavbarDropdownMenu = () => {
  const { data } = useUserQuery(undefined);

  return (
    <div className="dropdown dropdown-end">
      <div role="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-20 rounded-full">
          <img alt="" src={data?.avatar_url} />
        </div>
      </div>
      <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <MenuItems />
      </ul>
    </div>
  );
};

export const MenuItems = () => {
  const dispatch = useAppDispatch();
  const { data } = useUserQuery(undefined);

  if (!data) return null;
  return (
    <>
      <li className="border-b">
        <p className="text-gray-500 pointer-events-none">Sign in as</p>
        <Link to={`users/${data?.login}`} className="justify-between">
          {data?.login}
        </Link>
      </li>
      <li className="border-b">
        <Link to="/gists/create" className="justify-between">
          Create gist
        </Link>
        <Link to="/gists/starred" className="justify-between">
          Starred gists
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            dispatch(logout());
            dispatch(githubAPI.util.resetApiState());
          }}
        >
          Logout
        </button>
      </li>
    </>
  );
};
