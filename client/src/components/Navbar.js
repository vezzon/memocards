import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to={'/'} className="site-title">
        Flashcards
      </Link>
      <ul>
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
    </nav>
  );
};

export default Navbar;
