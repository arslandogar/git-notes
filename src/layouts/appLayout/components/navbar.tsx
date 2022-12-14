import { Link } from 'react-router-dom';

import { useAppSelector } from '@/redux';

import { GistSearchInput } from './gistSearchInput';
import { LoginLink } from './loginLink';
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

        {isAuthenticated ? <NavbarDropdownMenu /> : <LoginLink />}
      </div>
    </div>
  );
};
