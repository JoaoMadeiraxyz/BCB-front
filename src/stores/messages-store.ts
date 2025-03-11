import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

type Message = {
  content: string;
  telefone: string;
  type: "whatsapp" | "sms";
};

type MessagesState = {
  messages: Message[] | null;
  loading: boolean;
  error: string | null;
  addCredits: (amount: number) => Promise<void>;
  updateLimit: (newLimit: number) => Promise<void>;
  payBill: () => Promise<void>;
  sendMessage: (data: Message) => Promise<void>;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: null,
  loading: false,
  error: null,

  addCredits: async (amount) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found", loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      await api.post(
        "/messages/add-credits",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to add credits",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateLimit: async (newLimit) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found", loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      await api.post(
        "/messages/update-limit",
        { newLimit },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update limit",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  payBill: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found", loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      await api.post(
        "/messages/pay-bill",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to pay bill",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      set({ error: "No access token found", loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      await api.post("/messages/send-message", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to send message",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
