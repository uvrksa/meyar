// ============================================================
// MEYAAR — App State Management
// Global application state: notifications, messages, UI
// ============================================================

import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';

// ── Types ───────────────────────────────────────────────────

export interface AppState {
  notifications: {
    unreadCount: number;
    isLoading: boolean;
  };
  messages: {
    unreadCount: number;
    activeConversationId: string | null;
  };
  projects: {
    totalCount: number;
    activeCount: number;
  };
  sidebar: {
    isCollapsed: boolean;
    isMobileOpen: boolean;
  };
  modals: {
    activeModal: string | null;
    modalData: Record<string, unknown>;
  };
  loading: {
    global: boolean;
    operations: Set<string>;
  };
}

// ── Actions ─────────────────────────────────────────────────

type AppAction =
  | { type: 'SET_NOTIFICATION_COUNT'; payload: number }
  | { type: 'SET_MESSAGE_COUNT'; payload: number }
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: string | null }
  | { type: 'SET_PROJECT_COUNTS'; payload: { total: number; active: number } }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'SET_MOBILE_SIDEBAR'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: { id: string; data?: Record<string, unknown> } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'START_LOADING'; payload: string }
  | { type: 'STOP_LOADING'; payload: string }
  | { type: 'SET_GLOBAL_LOADING'; payload: boolean };

// ── Initial State ───────────────────────────────────────────

const initialState: AppState = {
  notifications: { unreadCount: 0, isLoading: false },
  messages: { unreadCount: 0, activeConversationId: null },
  projects: { totalCount: 0, activeCount: 0 },
  sidebar: { isCollapsed: false, isMobileOpen: false },
  modals: { activeModal: null, modalData: {} },
  loading: { global: false, operations: new Set() },
};

// ── Reducer ─────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_NOTIFICATION_COUNT':
      return { ...state, notifications: { ...state.notifications, unreadCount: action.payload } };
    case 'SET_MESSAGE_COUNT':
      return { ...state, messages: { ...state.messages, unreadCount: action.payload } };
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, messages: { ...state.messages, activeConversationId: action.payload } };
    case 'SET_PROJECT_COUNTS':
      return { ...state, projects: { totalCount: action.payload.total, activeCount: action.payload.active } };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebar: { ...state.sidebar, isCollapsed: !state.sidebar.isCollapsed } };
    case 'SET_SIDEBAR_COLLAPSED':
      return { ...state, sidebar: { ...state.sidebar, isCollapsed: action.payload } };
    case 'SET_MOBILE_SIDEBAR':
      return { ...state, sidebar: { ...state.sidebar, isMobileOpen: action.payload } };
    case 'OPEN_MODAL':
      return { ...state, modals: { activeModal: action.payload.id, modalData: action.payload.data || {} } };
    case 'CLOSE_MODAL':
      return { ...state, modals: { activeModal: null, modalData: {} } };
    case 'START_LOADING': {
      const ops = new Set(state.loading.operations);
      ops.add(action.payload);
      return { ...state, loading: { ...state.loading, operations: ops } };
    }
    case 'STOP_LOADING': {
      const ops = new Set(state.loading.operations);
      ops.delete(action.payload);
      return { ...state, loading: { ...state.loading, operations: ops } };
    }
    case 'SET_GLOBAL_LOADING':
      return { ...state, loading: { ...state.loading, global: action.payload } };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────

const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<AppAction> } | null>(null);

// ── Provider ────────────────────────────────────────────────

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
