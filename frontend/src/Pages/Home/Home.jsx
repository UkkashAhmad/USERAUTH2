import React, { useContext } from "react";
import { AuthContext } from '../../Authcontext/authContext'

const HomePage = () => {
  const { user } = useContext(AuthContext); // Access the user info from context

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <div>
          <h2>Hello, {user.name}!</h2>
          <p>Email: {user.email}</p>
          {/* Add more user-specific information here */}
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default HomePage;
