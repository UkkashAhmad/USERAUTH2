import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authcontext/authContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext); // Get user and dispatch from context

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the LOGOUT action
  };

  return (
    <div className="container bg-gray-200">
      <nav className="flex justify-between items-center py-4">
        <div>LOGO</div>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
