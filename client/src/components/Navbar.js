import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const domNode = useClickOutside(() => {
    setNav(false);
  });

  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <header>
      <nav>
        <div className="flex items-center justify-between px-4 text-slate-200 ">
          <Link to={'/'} className="logo px-2 hover:text-emerald-400">
            Memocards
          </Link>
          <div className="md:hidden" onClick={handleClick}>
            {nav ? <FaTimes /> : <FaBars />}
          </div>
          {/* DESKTOP NAV  */}
          <div className="hidden md:flex">
            <ul className="flex list-none items-center justify-between gap-4">
              {isLoggedIn && (
                <li>
                  <NavLink
                    className="flex items-center font-bold no-underline hover:text-emerald-400"
                    to={'/dashboard'}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    className="flex items-center font-bold no-underline hover:text-emerald-400"
                    to={'/flashcard'}
                  >
                    Flashcard
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink
                    className="flex items-center font-bold no-underline hover:text-emerald-400"
                    to={'/signup'}
                  >
                    Signup
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink
                    className="flex items-center font-bold no-underline hover:text-emerald-400"
                    to={'/login'}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link
                    className="flex items-center font-bold no-underline hover:text-emerald-400"
                    onClick={() => logout()}
                    to={'/login'}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* MOBILE NAV  */}
        <div ref={domNode} className="md:hidden">
          <ul
            className={
              !nav
                ? 'fixed right-[-100%] duration-500 ease-in-out'
                : 'fixed right-0 w-3/4 bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#0B1627_57.38%,#142133_88.16%)] text-center text-slate-300 shadow-2xl duration-500 ease-in-out'
            }
          >
            <li onClick={handleClick}>
              <NavLink
                className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                to={'/'}
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <li onClick={handleClick}>
                <NavLink
                  className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                  to={'/dashboard'}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={handleClick}>
                <NavLink
                  className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                  to={'/flashcard'}
                >
                  Flashcard
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li onClick={handleClick}>
                <NavLink
                  className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                  to={'/signup'}
                >
                  Signup
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li onClick={handleClick}>
                <NavLink
                  className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                  to={'/login'}
                >
                  Login
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={handleClick}>
                <Link
                  className="flex h-full justify-center border-b border-slate-700 p-2 font-bold no-underline"
                  onClick={() => logout()}
                  to={'/login'}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
