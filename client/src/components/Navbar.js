import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <header>
      <nav>
        <Link to={'/'} className="logo">
          Memocards
        </Link>
        <div>
          <ul id="navbar" className={clicked ? '' : 'mobile'}>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to={'/flashcard'}>Flashcard</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to={'/signup'}>Signup</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link onClick={() => logout()} to={'/login'}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          {clicked ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
