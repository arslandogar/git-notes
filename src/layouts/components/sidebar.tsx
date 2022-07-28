import { FC } from 'react';

import { GistSearchInput } from './gistSearchInput';
import { MenuItems } from './navbarDropdownMenu';

export const Sidebar: FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="drawer-checkbox" className="drawer-overlay">
        {''}
      </label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        <li>
          <GistSearchInput />
        </li>
        <MenuItems />
      </ul>
    </div>
  );
};
