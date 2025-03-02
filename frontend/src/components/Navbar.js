import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check if user is logged in (from localStorage) safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); // Clear corrupted data
    }
  }, []);

  // ✅ Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Family Blog</Link>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="bg-green-500 px-3 py-1 rounded">Login</Link>
            <Link to="/register" className="bg-yellow-500 px-3 py-1 rounded">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
