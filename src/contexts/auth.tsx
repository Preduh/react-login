import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

interface ISignin {
  email: string;
  password: string;
}

interface IUser {
  token: string;
}

interface IAuthContext {
  authenticated: boolean;
  user: IUser | null;
  signin: ({ email, password }: ISignin) => void;
  logout: () => void;
  loadingData: boolean;
}

const DEFAULT_CONTEXT_VALUE = {
  authenticated: false,
  user: {
    token: "",
  },
  signin: () => null,
  logout: () => null,
  loadingData: true,
};

const AuthContext = createContext<IAuthContext>(DEFAULT_CONTEXT_VALUE);

function AuthProvider({ children }: AuxProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("react-login.token");

    if (recoveredUser) {
      setUser({ token: recoveredUser });
    }

    setLoadingData(false);
  }, []);

  const signin = async ({ email, password }: ISignin) => {
    const { data } = await api.post("/session", { email, password }); // Fetch to api

    localStorage.setItem("react-login.token", data.token);
    setUser(data.token);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("react-login.token");

    setUser(null);
    navigate("/signin");
  };

  const authProviderValue = useMemo(
    () => ({
      authenticated: !!user,
      user,
      signin,
      logout,
      loadingData,
    }),
    [!!user, user, signin, logout, loadingData],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
