import { useGetUserQuery, githubAPI } from '@/features/api/githubAPI';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store';

export const NavbarDropdownMenu = () => {
  const { data } = useGetUserQuery(undefined);

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
  const { data } = useGetUserQuery(undefined);
  return (
    <>
      <li className="border-b">
        <p className="text-gray-500 pointer-events-none">Sign in as</p>
        <a className="justify-between">{data?.login}</a>
      </li>
      <li className="border-b">
        <a className="justify-between">Create gist</a>
        <a className="justify-between">Starred gists</a>
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
