// ============================================================
// MEYAAR — API Endpoints Registry
// Organized API endpoint definitions for all platform services
// ============================================================

// ── Base URL Configuration ──────────────────────────────────

export const API_BASE = '/api/v1';

// ── Auth Endpoints ──────────────────────────────────────────

export const AUTH_ENDPOINTS = {
  login: `${API_BASE}/auth/login`,
  register: `${API_BASE}/auth/register`,
  logout: `${API_BASE}/auth/logout`,
  refresh: `${API_BASE}/auth/refresh`,
  forgotPassword: `${API_BASE}/auth/forgot-password`,
  resetPassword: `${API_BASE}/auth/reset-password`,
  verifyEmail: `${API_BASE}/auth/verify-email`,
  me: `${API_BASE}/auth/me`,
  updateProfile: `${API_BASE}/auth/profile`,
  changePassword: `${API_BASE}/auth/change-password`,
} as const;

// ── Project Endpoints ───────────────────────────────────────

export const PROJECT_ENDPOINTS = {
  list: `${API_BASE}/projects`,
  create: `${API_BASE}/projects`,
  get: (id: string) => `${API_BASE}/projects/${id}`,
  update: (id: string) => `${API_BASE}/projects/${id}`,
  delete: (id: string) => `${API_BASE}/projects/${id}`,
  updateStatus: (id: string) => `${API_BASE}/projects/${id}/status`,
  assign: (id: string) => `${API_BASE}/projects/${id}/assign`,
  timeline: (id: string) => `${API_BASE}/projects/${id}/timeline`,
  files: (id: string) => `${API_BASE}/projects/${id}/files`,
  deliverables: (id: string) => `${API_BASE}/projects/${id}/deliverables`,
  messages: (id: string) => `${API_BASE}/projects/${id}/messages`,
  activity: (id: string) => `${API_BASE}/projects/${id}/activity`,
} as const;

// ── User Endpoints ──────────────────────────────────────────

export const USER_ENDPOINTS = {
  list: `${API_BASE}/users`,
  get: (id: string) => `${API_BASE}/users/${id}`,
  create: `${API_BASE}/users`,
  update: (id: string) => `${API_BASE}/users/${id}`,
  delete: (id: string) => `${API_BASE}/users/${id}`,
  updateStatus: (id: string) => `${API_BASE}/users/${id}/status`,
  updateRole: (id: string) => `${API_BASE}/users/${id}/role`,
} as const;

// ── Engineer Endpoints ──────────────────────────────────────

export const ENGINEER_ENDPOINTS = {
  list: `${API_BASE}/engineers`,
  get: (id: string) => `${API_BASE}/engineers/${id}`,
  profile: (id: string) => `${API_BASE}/engineers/${id}/profile`,
  assignments: (id: string) => `${API_BASE}/engineers/${id}/assignments`,
  performance: (id: string) => `${API_BASE}/engineers/${id}/performance`,
  availability: (id: string) => `${API_BASE}/engineers/${id}/availability`,
  workload: (id: string) => `${API_BASE}/engineers/${id}/workload`,
} as const;

// ── Billing Endpoints ───────────────────────────────────────

export const BILLING_ENDPOINTS = {
  invoices: `${API_BASE}/billing/invoices`,
  getInvoice: (id: string) => `${API_BASE}/billing/invoices/${id}`,
  createInvoice: `${API_BASE}/billing/invoices`,
  updateInvoice: (id: string) => `${API_BASE}/billing/invoices/${id}`,
  markPaid: (id: string) => `${API_BASE}/billing/invoices/${id}/pay`,
  downloadPdf: (id: string) => `${API_BASE}/billing/invoices/${id}/pdf`,
  summary: `${API_BASE}/billing/summary`,
  engineerPayouts: `${API_BASE}/billing/payouts`,
} as const;

// ── Messaging Endpoints ─────────────────────────────────────

export const MESSAGING_ENDPOINTS = {
  conversations: `${API_BASE}/messages/conversations`,
  getConversation: (id: string) => `${API_BASE}/messages/conversations/${id}`,
  createConversation: `${API_BASE}/messages/conversations`,
  messages: (conversationId: string) => `${API_BASE}/messages/conversations/${conversationId}/messages`,
  sendMessage: (conversationId: string) => `${API_BASE}/messages/conversations/${conversationId}/messages`,
  markRead: (conversationId: string) => `${API_BASE}/messages/conversations/${conversationId}/read`,
  search: `${API_BASE}/messages/search`,
  unreadCount: `${API_BASE}/messages/unread-count`,
} as const;

// ── Notification Endpoints ──────────────────────────────────

export const NOTIFICATION_ENDPOINTS = {
  list: `${API_BASE}/notifications`,
  markRead: (id: string) => `${API_BASE}/notifications/${id}/read`,
  markAllRead: `${API_BASE}/notifications/read-all`,
  delete: (id: string) => `${API_BASE}/notifications/${id}`,
  preferences: `${API_BASE}/notifications/preferences`,
  unreadCount: `${API_BASE}/notifications/unread-count`,
} as const;

// ── File Endpoints ──────────────────────────────────────────

export const FILE_ENDPOINTS = {
  upload: `${API_BASE}/files/upload`,
  get: (id: string) => `${API_BASE}/files/${id}`,
  delete: (id: string) => `${API_BASE}/files/${id}`,
  download: (id: string) => `${API_BASE}/files/${id}/download`,
  versions: (id: string) => `${API_BASE}/files/${id}/versions`,
  permissions: (id: string) => `${API_BASE}/files/${id}/permissions`,
} as const;

// ── Deliverable Endpoints ───────────────────────────────────

export const DELIVERABLE_ENDPOINTS = {
  list: `${API_BASE}/deliverables`,
  get: (id: string) => `${API_BASE}/deliverables/${id}`,
  create: `${API_BASE}/deliverables`,
  submit: (id: string) => `${API_BASE}/deliverables/${id}/submit`,
  approve: (id: string) => `${API_BASE}/deliverables/${id}/approve`,
  reject: (id: string) => `${API_BASE}/deliverables/${id}/reject`,
  requestRevision: (id: string) => `${API_BASE}/deliverables/${id}/revision`,
  versions: (id: string) => `${API_BASE}/deliverables/${id}/versions`,
} as const;

// ── Clarification Endpoints ─────────────────────────────────

export const CLARIFICATION_ENDPOINTS = {
  list: `${API_BASE}/clarifications`,
  get: (id: string) => `${API_BASE}/clarifications/${id}`,
  create: `${API_BASE}/clarifications`,
  respond: (id: string) => `${API_BASE}/clarifications/${id}/respond`,
  resolve: (id: string) => `${API_BASE}/clarifications/${id}/resolve`,
  escalate: (id: string) => `${API_BASE}/clarifications/${id}/escalate`,
} as const;

// ── Analytics Endpoints ─────────────────────────────────────

export const ANALYTICS_ENDPOINTS = {
  dashboard: `${API_BASE}/analytics/dashboard`,
  projects: `${API_BASE}/analytics/projects`,
  revenue: `${API_BASE}/analytics/revenue`,
  engineers: `${API_BASE}/analytics/engineers`,
  clients: `${API_BASE}/analytics/clients`,
  export: `${API_BASE}/analytics/export`,
} as const;

// ── Settings Endpoints ──────────────────────────────────────

export const SETTINGS_ENDPOINTS = {
  general: `${API_BASE}/settings/general`,
  notifications: `${API_BASE}/settings/notifications`,
  billing: `${API_BASE}/settings/billing`,
  workflow: `${API_BASE}/settings/workflow`,
  security: `${API_BASE}/settings/security`,
  roles: `${API_BASE}/settings/roles`,
  getRole: (id: string) => `${API_BASE}/settings/roles/${id}`,
} as const;

// ── Activity Log Endpoints ──────────────────────────────────

export const ACTIVITY_ENDPOINTS = {
  list: `${API_BASE}/activity`,
  byResource: (resource: string, id: string) => `${API_BASE}/activity/${resource}/${id}`,
  byUser: (userId: string) => `${API_BASE}/activity/user/${userId}`,
  export: `${API_BASE}/activity/export`,
} as const;

// ── Company Endpoints ───────────────────────────────────────

export const COMPANY_ENDPOINTS = {
  list: `${API_BASE}/companies`,
  get: (id: string) => `${API_BASE}/companies/${id}`,
  create: `${API_BASE}/companies`,
  update: (id: string) => `${API_BASE}/companies/${id}`,
  members: (id: string) => `${API_BASE}/companies/${id}/members`,
  settings: (id: string) => `${API_BASE}/companies/${id}/settings`,
} as const;
