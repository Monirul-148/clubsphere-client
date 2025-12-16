import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Logo from "../../../components/Logo/Logo";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">

          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Home, Clubs, Events */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/clubs" className={linkClass}>
              Clubs
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        
        
          <div className="md:hidden ml-auto">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <NavLink to="/" end className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/clubs" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
            Clubs
          </NavLink>
          <NavLink to="/events" className="block px-4 py-2" onClick={() => setMenuOpen(false)}>
            Events
          </NavLink>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 bg-red-500 text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 bg-blue-500 text-white">
                Login
              </Link>
              <Link to="/register" className="block px-4 py-2 bg-green-500 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
