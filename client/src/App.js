import Dashboard from './components/pages/Dashboard';
import Flashcard from './components/pages/Flashcard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import Signup from './components/pages/Signup';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersisLogin';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flashcard" element={<Flashcard />} />
          </Route>
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
