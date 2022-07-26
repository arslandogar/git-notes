import { FC, ReactNode } from 'react';

import { Navbar, Sidebar } from './components';

interface Props {
  children: ReactNode;
}

export const AppLayout: FC<Props> = ({ children }) => {
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
