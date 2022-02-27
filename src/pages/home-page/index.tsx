import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function HomePage() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h1>Home Page</h1>
      <button type="button" className="logout" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default HomePage;
