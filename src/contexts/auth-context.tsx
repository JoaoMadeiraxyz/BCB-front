"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any;
  accessToken: string | null;
  loading: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, accessToken, loading, signin, signout, fetchUser } =
    useAuthStore();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    setIsHydrated(true);
  }, [user, fetchUser]);

  if (!isHydrated) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
