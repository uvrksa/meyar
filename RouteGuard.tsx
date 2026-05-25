// ============================================================
// MEYAAR — Route Guard Component
// Protects routes based on authentication and permissions
// ============================================================

import { type ReactNode } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useAuth } from '../state/auth.state';
import { canAccessRoute, getDefaultRoute } from './index';
import type { UserRole } from '../models';

// ── Props ───────────────────────────────────────────────────

interface RouteGuardProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  requiredPermission?: string;
  fallback?: ReactNode;
  redirectTo?: string;
}

// ── Component ───────────────────────────────────────────────

export function RouteGuard({
  children,
  requiredRoles,
  fallback,
  redirectTo,
}: RouteGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [location] = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">جارٍ التحقق...</p>
          </div>
        </div>
      )
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated || !user) {
    const loginUrl = `/login?redirect=${encodeURIComponent(location)}`;
    return <Redirect to={redirectTo || loginUrl} />;
  }

  // Check role access
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // Redirect to user's default dashboard
    return <Redirect to={getDefaultRoute(user.role)} />;
  }

  // Check route access via RBAC
  if (!canAccessRoute(user.role, location)) {
    return <Redirect to={getDefaultRoute(user.role)} />;
  }

  return <>{children}</>;
}

// ── Permission Gate Component ───────────────────────────────

interface PermissionGateProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

/**
 * Conditionally render content based on permission
 * Does NOT redirect — just hides content
 */
export function PermissionGate({ children, permission, fallback }: PermissionGateProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

// ── Role Gate Component ─────────────────────────────────────

interface RoleGateProps {
  children: ReactNode;
  roles: UserRole[];
  fallback?: ReactNode;
}

/**
 * Conditionally render content based on role
 */
export function RoleGate({ children, roles, fallback }: RoleGateProps) {
  const { hasRole } = useAuth();

  if (!hasRole(roles)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
