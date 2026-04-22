import { createContext, useContext, useEffect, useState } from "react";

type Role = "user" | "creator";

type AuthUser = {
  name: string;
  role: Role;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (name: string, role: Role) => void;
  logout: () => void;
};

const AUTH_KEY = "farmora-auth";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return;
    try {
      setUser(JSON.parse(raw) as AuthUser);
    } catch {
      setUser(null);
    }
  }, []);

  function login(name: string, role: Role) {
    const next = { name, role };
    setUser(next);
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
