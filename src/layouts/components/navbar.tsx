import { Link } from 'react-router-dom';

import { useAppSelector } from '@/store';

import { GistSearchInput } from './gistSearchInput';
import { NavbarDropdownMenu } from './navbarDropdownMenu';

export const Navbar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="md:px-40 navbar bg-primary">
      <div className="flex-none md:hidden">
        <label htmlFor="drawer-checkbox" className="btn btn-square btn-ghost">
          <i className="text-white fa-solid fa-bars"></i>
        </label>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-white text-xl">
          Emumba
        </Link>
      </div>
      <div className="flex-none gap-2 hidden md:flex">
        <div className="form-control">
          <GistSearchInput />
        </div>

        {isAuthenticated ? (
          <NavbarDropdownMenu />
        ) : (
          <a
            className="btn btn-secondary text-primary"
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=gist`}
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};
