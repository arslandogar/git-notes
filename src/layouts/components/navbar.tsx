import { Input } from '@/components';

export const Navbar = () => {
  const isLoggedIn = false;
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
          <Input
            value=""
            onChange={() => {}}
            placeholder="Search Notes..."
            rightIcon="text-white fa-solid fa-bars"
          />
        </div>

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="" src="https://placeimg.com/80/80/people" />
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-secondary text-primary" onClick={() => {}}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
