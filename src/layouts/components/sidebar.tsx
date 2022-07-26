import { FC } from 'react';

import { Input } from '@/components';

export const Sidebar: FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="drawer-checkbox" className="drawer-overlay">
        {''}
      </label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        <li>
          <Input
            value=""
            onChange={() => {}}
            placeholder="Search Notes..."
            rightIcon="fa-solid fa-bars"
          />
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </div>
  );
};
