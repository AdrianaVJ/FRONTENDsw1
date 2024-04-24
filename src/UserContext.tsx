import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface User {
  token: string;
  id : number,
  ci:number,
  nombre: string,
  apellido : string
  // Añade otros campos de usuario según sea necesario
}

interface UserContextProps {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  initialAuthenticated: boolean;
  children: ReactNode;
  initialUserData: any;
}

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ initialAuthenticated, children, initialUserData }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(initialAuthenticated);
  const [user, setUser] = useState<User | null>(() => initialUserData || null);

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [authenticated, user]);

  const login = (userData: User): void => {
    setAuthenticated(true);
    setUser(userData);
  };

  const logout = (): void => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
