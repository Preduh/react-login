import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useMemo,
  useState,
} from "react";

interface AuxProps {
  children: ReactChild | ReactChildren;
}

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  id: string;
}

interface IAuthContext {
  authenticated: boolean;
  user: {
    id: string;
  } | null;
  login: ({ email, password }: ILogin) => void;
  logout: () => void;
}

const DEFAULT_CONTEXT_VALUE = {
  authenticated: false,
  user: {
    id: "",
  },
  login: () => null,
  logout: () => null,
};

const AuthContext = createContext<IAuthContext>(DEFAULT_CONTEXT_VALUE);

function AuthProvider({ children }: AuxProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const login = ({ email, password }: ILogin) => {
    console.log(email, password);
    setUser({ id: "123" });
  };

  const logout = () => {
    console.log("Logout");
  };

  const authProviderValue = useMemo(
    () => ({
      authenticated: !!user,
      user,
      login,
      logout,
    }),
    [!!user, user, login, logout],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
