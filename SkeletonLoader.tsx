// ============================================================
// MEYAAR — Skeleton Loaders
// Enterprise-grade loading states for dashboards and pages
// ============================================================

import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" dir="rtl">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
        <div className="glass-card p-5 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-border/30 last:border-0">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 px-4 rounded-lg" style={{ background: 'oklch(1 0 0 / 2%)' }}>
          <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`flex gap-3 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className={`space-y-1.5 max-w-[70%] ${i % 2 === 0 ? '' : 'items-end'}`}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className={`h-16 rounded-xl ${i % 2 === 0 ? 'w-64' : 'w-48'}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function KPICardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}
