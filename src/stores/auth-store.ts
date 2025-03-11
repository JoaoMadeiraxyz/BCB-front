import { create } from "zustand";
import axios from "axios";
import { UserData } from "@/types/user";
import { Message } from "@/types/message";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

type User = {
  id: string;
  name: string;
  email: string;
  telefone?: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  plan: string;
  messages: Message[];
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  signup: (data: UserData) => Promise<void>;
  signin: (data: { email: string; password: string }) => Promise<void>;
  fetchUser: () => Promise<void>;
  signout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: true,
  error: null,

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/signup", data);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to register",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  signin: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/signin", data);
      const { accessToken } = response.data;
      set({ accessToken, loading: false });
      localStorage.setItem("accessToken", accessToken);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Invalid credentials",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchUser: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found", loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ user: response.data, loading: false });
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      set({
        error: error.response?.data?.message || "Failed to fetch user",
        loading: false,
      });
    }
  },

  signout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null, loading: false });
  },
}));
