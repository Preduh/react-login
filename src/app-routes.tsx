import React, { ReactChild, ReactChildren, useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./pages/dashboard";
import SignIn from "./pages/signin";
import { AuthContext, AuthProvider } from "./contexts/auth";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

function Private({ children }: AuxProps) {
  const { authenticated, loadingData } = useContext(AuthContext);

  if (loadingData) {
    return <div className="loading">Carregando...</div>;
  }

  return !authenticated ? <Navigate to="/signin" /> : (children as JSX.Element);
}

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
