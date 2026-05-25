// ============================================================
// MEYAAR — Auth State Management
// Authentication context with session persistence
// ============================================================

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import type { User, UserRole, AuthSession, LoginCredentials, RegisterPayload } from '../models';
import { AuthService } from '../services/auth.service';

// ── Types ───────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  loginByRole: (role: UserRole) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  clearError: () => void;
}

// ── Context ─────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize from stored session
  useEffect(() => {
    const session = AuthService.getSession();
    if (session) {
      setState({
        user: session.user,
        session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await AuthService.login(credentials);
    if (result.success && result.session) {
      setState({
        user: result.session.user,
        session: result.session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    }

    setState((prev) => ({
      ...prev,
      isLoading: false,
      error: result.error || 'فشل تسجيل الدخول',
    }));
    return false;
  }, []);

  const loginByRole = useCallback(async (role: UserRole): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await AuthService.loginByRole(role);
    if (result.success && result.session) {
      setState({
        user: result.session.user,
        session: result.session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    }

    setState((prev) => ({ ...prev, isLoading: false, error: 'فشل تسجيل الدخول' }));
    return false;
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await AuthService.register(payload);
    if (result.success && result.session) {
      setState({
        user: result.session.user,
        session: result.session,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    }

    setState((prev) => ({
      ...prev,
      isLoading: false,
      error: result.error || 'فشل التسجيل',
    }));
    return false;
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    return AuthService.hasPermission(permission);
  }, []);

  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    return AuthService.hasRole(role);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    loginByRole,
    register,
    logout,
    hasPermission,
    hasRole,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
