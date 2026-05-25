// ============================================================
// MEYAAR — UI Preferences State
// User interface preferences with localStorage persistence
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import type { Locale } from '../models';

// ── Types ───────────────────────────────────────────────────

export interface UIPreferences {
  locale: Locale;
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
  projectsView: 'grid' | 'table';
  tasksView: 'kanban' | 'list';
  dashboardLayout: 'default' | 'compact' | 'expanded';
  fontSize: 'small' | 'medium' | 'large';
}

const DEFAULT_PREFERENCES: UIPreferences = {
  locale: 'ar',
  theme: 'dark',
  sidebarCollapsed: false,
  compactMode: false,
  animationsEnabled: true,
  projectsView: 'grid',
  tasksView: 'kanban',
  dashboardLayout: 'default',
  fontSize: 'medium',
};

const STORAGE_KEY = 'meyaar_ui_preferences';

// ── Hook ────────────────────────────────────────────────────

export function useUIPreferences() {
  const [preferences, setPreferences] = useState<UIPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_PREFERENCES;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = useCallback(<K extends keyof UIPreferences>(
    key: K,
    value: UIPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleSidebar = useCallback(() => {
    setPreferences((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const toggleCompactMode = useCallback(() => {
    setPreferences((prev) => ({ ...prev, compactMode: !prev.compactMode }));
  }, []);

  return {
    preferences,
    updatePreference,
    resetPreferences,
    toggleSidebar,
    toggleCompactMode,
  };
}
