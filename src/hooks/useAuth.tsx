import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getCurrentUser: () => User | null;
  updateProfile: (newName: string, newEmail: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email: string, _password: string) => {
    const nameFromEmail = email.split("@")[0];
    const loggedUser: User = {
      name: nameFromEmail,
      email,
      isAuthenticated: true,
    };
    setUser(loggedUser);
  };

  const register = (name: string, email: string, _password: string) => {
    const newUser: User = {
      name,
      email,
      isAuthenticated: true,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = (): boolean => !!user?.isAuthenticated;

  const getCurrentUser = (): User | null => user;

  const updateProfile = (newName: string) => {
    if (!user) return;
    const updated: User = { ...user, name: newName };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        getCurrentUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
