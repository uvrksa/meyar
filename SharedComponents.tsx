// ============================================================
// MEYAAR — Shared UI Components
// Reusable across all dashboard roles
// ============================================================

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ProjectStatus, ProjectType } from '@/lib/mock-data';
import { PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS } from '@/lib/mock-data';

// ── KPI Card ──────────────────────────────────────────────
interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: 'blue' | 'cyan' | 'purple' | 'green' | 'amber';
  className?: string;
  delay?: number;
}

const ACCENT_STYLES = {
  blue: {
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    topBorder: 'from-blue-500 to-blue-400',
    valuColor: 'text-blue-300',
  },
  cyan: {
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    topBorder: 'from-cyan-500 to-blue-500',
    valuColor: 'text-cyan-300',
  },
  purple: {
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    topBorder: 'from-purple-500 to-blue-500',
    valuColor: 'text-purple-300',
  },
  green: {
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    topBorder: 'from-emerald-500 to-cyan-500',
    valuColor: 'text-emerald-300',
  },
  amber: {
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    topBorder: 'from-amber-500 to-orange-400',
    valuColor: 'text-amber-300',
  },
};

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  accentColor = 'blue',
  className = '',
  delay = 0,
}: KpiCardProps) {
  const accent = ACCENT_STYLES[accentColor];
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={`kpi-card animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-l ${accent.topBorder}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-muted-foreground text-sm mb-2 truncate">{title}</p>
          <p className={`text-2xl font-bold ${accent.valuColor} leading-none`}>{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              ) : isNegative ? (
                <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Minus className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-muted-foreground'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent.iconBg}`}>
          <Icon className={`w-5 h-5 ${accent.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────
const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  in_review: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  in_progress: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  delayed: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
  cancelled: { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-400' },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

// ── Type Badge ────────────────────────────────────────────
export function TypeBadge({ type }: { type: ProjectType }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
      {PROJECT_TYPE_LABELS[type]}
    </span>
  );
}

// ── Priority Badge ────────────────────────────────────────
const PRIORITY_STYLES = {
  low: { bg: 'bg-gray-500/10', text: 'text-gray-400', label: 'منخفضة' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'متوسطة' },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'عالية' },
  urgent: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'عاجلة' },
};

export function PriorityBadge({ priority }: { priority: 'low' | 'medium' | 'high' | 'urgent' }) {
  const style = PRIORITY_STYLES[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

// ── Progress Bar ──────────────────────────────────────────
export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`progress-bar ${className}`}>
      <div className="progress-bar-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

// ── Section Header ────────────────────────────────────────
export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

// ── Activity Item ─────────────────────────────────────────
export function ActivityItem({
  icon: Icon,
  iconColor = 'text-blue-400',
  iconBg = 'bg-blue-500/10',
  title,
  subtitle,
  time,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
    </div>
  );
}
