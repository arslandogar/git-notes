import { FC } from 'react';

import { useAppSelector } from '@/store';

import { GistSearchInput } from './gistSearchInput';
import { LoginLink } from './loginLink';
import { MenuItems } from './navbarDropdownMenu';

export const Sidebar: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="drawer-side">
      <label htmlFor="drawer-checkbox" className="drawer-overlay">
        {''}
      </label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        <li>
          <GistSearchInput />
        </li>
        {isAuthenticated ? (
          <MenuItems />
        ) : (
          <li>
            <LoginLink />
          </li>
        )}
      </ul>
    </div>
  );
};
