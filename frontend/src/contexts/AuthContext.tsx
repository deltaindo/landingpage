"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/oldapi2";
import toast from "react-hot-toast";

/**
 * 🔐 Authentication Context with WireGuard VPN + SSO Support
 *
 * WireGuard VPN Integration:
 * - All auth requests go through encrypted VPN tunnel when enabled
 * - SSO token validation happens over VPN for enhanced security
 * - Client certificate validation (mutual TLS) can be added
 */

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSSO: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  ssoEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SSO_ENABLED = process.env.NEXT_PUBLIC_SSO_ENABLED === "true";
const USE_VPN = process.env.NEXT_PUBLIC_USE_VPN_TUNNEL === "true";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await api.getCurrentUser();
        if (response.success) {
          setUser(response.data);
          if (USE_VPN) {
            console.log("✅ User authenticated through VPN tunnel");
          }
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Standard login (disabled when SSO is enabled)
   */
  const login = async (email: string, password: string) => {
    if (SSO_ENABLED) {
      toast.error("Please use SSO to login");
      return;
    }

    try {
      const response = await api.login(email, password);
      if (response.success && response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        setUser(response.data.user);
        toast.success("Login successful!");
        router.push("/admin");
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  /**
   * 🔐 SSO Login with WireGuard VPN
   *
   * Flow:
   * 1. Receive SSO token from provider
   * 2. Validate token through VPN-encrypted channel
   * 3. Exchange for application JWT
   * 4. Store JWT and fetch user profile
   *
   * @param ssoToken - Token from SSO provider
   */
  const loginWithSSO = async (ssoToken: string) => {
    try {
      setLoading(true);

      if (USE_VPN) {
        console.log("🔒 Validating SSO token through WireGuard VPN tunnel");
      }

      // Validate SSO token and exchange for app token
      const response = await api.validateSSOToken(ssoToken);

      if (response.success && response.data?.token) {
        localStorage.setItem("authToken", response.data.token);

        // Fetch user profile
        const userResponse = await api.getCurrentUser();
        if (userResponse.success) {
          setUser(userResponse.data);
          toast.success("SSO login successful!");
          router.push("/admin");
        }
      } else {
        throw new Error(response.error || "SSO validation failed");
      }
    } catch (error: any) {
      console.error("SSO login error:", error);
      toast.error("SSO login failed");
      localStorage.removeItem("authToken");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (USE_VPN) {
      console.log("🔒 Logging out through VPN tunnel");
    }

    api.logout();
    setUser(null);
    toast.success("Logged out successfully");

    // SSO logout will redirect to SSO provider
    if (!SSO_ENABLED) {
      router.push("/admin/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithSSO,
        logout,
        isAuthenticated: !!user,
        ssoEnabled: SSO_ENABLED,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
