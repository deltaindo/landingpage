import axios from "axios";
import { ContactFormData, Training, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contactAPI = {
  sendMessage: async (data: ContactFormData): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post("/contact", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  },
};

export const trainingAPI = {
  getAll: async (): Promise<ApiResponse<Training[]>> => {
    try {
      const response = await api.get("/training");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trainings"
      );
    }
  },

  getByCategory: async (category: string): Promise<ApiResponse<Training[]>> => {
    try {
      const response = await api.get(`/training?category=${category}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trainings"
      );
    }
  },
};

export const subscriptionAPI = {
  subscribe: async (email: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post("/subscription", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to subscribe");
    }
  },
};

export default api;
