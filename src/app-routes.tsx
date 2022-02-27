import React, { ReactChild, ReactChildren, useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import { AuthContext, AuthProvider } from "./contexts/auth";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

function Private({ children }: AuxProps) {
  const { authenticated, loadingData } = useContext(AuthContext);

  if (loadingData) {
    return <div className="loading">Carregando...</div>;
  }

  return !authenticated ? <Navigate to="/login" /> : (children as JSX.Element);
}

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
