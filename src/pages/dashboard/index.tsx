import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" className="logout" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
