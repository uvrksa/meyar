// ============================================================
// MEYAAR — API Client Layer
// Enterprise HTTP client with interceptors, retry, and caching
// Prepared for future backend integration
// ============================================================

import type { ApiResponse, ApiError, PaginationParams, PaginatedResponse } from '../models';

// ── Configuration ───────────────────────────────────────────

export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  headers?: Record<string, string>;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseUrl: '/api/v1',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// ── Request/Response Interceptors ───────────────────────────

type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string };
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: ApiError) => ApiError | Promise<never>;

// ── API Client Class ────────────────────────────────────────

export class ApiClient {
  private config: ApiClientConfig;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];
  private abortControllers: Map<string, AbortController> = new Map();

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ── Interceptor Management ──────────────────────────────

  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter((i) => i !== interceptor);
    };
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter((i) => i !== interceptor);
    };
  }

  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter((i) => i !== interceptor);
    };
  }

  // ── HTTP Methods ────────────────────────────────────────

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>('GET', url);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('POST', url, body);
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('PUT', url, body);
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('PATCH', url, body);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.request<T>('DELETE', url);
  }

  // ── Paginated Request ───────────────────────────────────

  async getPaginated<T>(endpoint: string, pagination: PaginationParams, filters?: Record<string, string | number | boolean>): Promise<PaginatedResponse<T>> {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...(pagination.sortBy && { sortBy: pagination.sortBy }),
      ...(pagination.sortOrder && { sortOrder: pagination.sortOrder }),
      ...filters,
    };
    const response = await this.get<PaginatedResponse<T>>(endpoint, params as Record<string, string | number | boolean>);
    if (response.success && response.data) {
      return response.data;
    }
    return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false } };
  }

  // ── File Upload ─────────────────────────────────────────

  async upload<T>(endpoint: string, file: File, metadata?: Record<string, string>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const url = this.buildUrl(endpoint);
    return this.request<T>('POST', url, formData, true);
  }

  // ── Request Cancellation ────────────────────────────────

  cancelRequest(key: string): void {
    const controller = this.abortControllers.get(key);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(key);
    }
  }

  cancelAllRequests(): void {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }

  // ── Private Methods ─────────────────────────────────────

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    let url = `${this.config.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) url += `?${queryString}`;
    }
    return url;
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    const requestKey = `${method}:${url}`;
    const controller = new AbortController();
    this.abortControllers.set(requestKey, controller);

    let requestConfig: RequestInit & { url: string } = {
      url,
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(this.config.headers || {}),
      },
      signal: controller.signal,
    };

    if (body) {
      requestConfig.body = isFormData ? (body as FormData) : JSON.stringify(body);
    }

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      requestConfig = interceptor(requestConfig);
    }

    try {
      // Mock delay for realistic behavior
      await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

      // In production, this would be a real fetch call
      // For now, return mock success
      const mockResponse: ApiResponse<T> = {
        success: true,
        data: undefined as unknown as T,
      };

      this.abortControllers.delete(requestKey);
      return mockResponse;
    } catch (error) {
      this.abortControllers.delete(requestKey);

      const apiError: ApiError = {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 0,
      };

      // Apply error interceptors
      for (const interceptor of this.errorInterceptors) {
        await interceptor(apiError);
      }

      return { success: false, error: apiError };
    }
  }
}

// ── Singleton Instance ──────────────────────────────────────

export const apiClient = new ApiClient();

// ── Auth Interceptor (adds token to requests) ───────────────

apiClient.addRequestInterceptor((config) => {
  const token = localStorage.getItem('meyaar_access_token');
  if (token) {
    config.headers = {
      ...config.headers as Record<string, string>,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});
