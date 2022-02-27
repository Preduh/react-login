import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  token: string;
}

interface IAuthContext {
  authenticated: boolean;
  user: IUser | null;
  login: ({ email, password }: ILogin) => void;
  logout: () => void;
  loadingData: boolean;
}

const DEFAULT_CONTEXT_VALUE = {
  authenticated: false,
  user: {
    token: "",
  },
  login: () => null,
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

  const login = () => {
    const response = { token: "This is my JWT" }; // Fetch to api

    localStorage.setItem("react-login.token", response.token);

    setUser(response);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("react-login.token");

    setUser(null);
    navigate("/login");
  };

  const authProviderValue = useMemo(
    () => ({
      authenticated: !!user,
      user,
      login,
      logout,
      loadingData,
    }),
    [!!user, user, login, logout, loadingData],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
