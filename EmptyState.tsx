// ============================================================
// MEYAAR — Empty State Component
// Professional empty states for lists, tables, and pages
// ============================================================

import { FolderOpen, Search, Bell, MessageSquare, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  variant?: 'default' | 'compact';
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  variant = 'default',
}: EmptyStateProps) {
  const isCompact = variant === 'compact';

  return (
    <div className={`flex flex-col items-center justify-center text-center ${isCompact ? 'py-8' : 'py-16'}`}>
      <div className={`${isCompact ? 'w-12 h-12' : 'w-16 h-16'} rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-4`}>
        <Icon className={`${isCompact ? 'w-6 h-6' : 'w-8 h-8'} text-blue-400/60`} />
      </div>
      <h3 className={`${isCompact ? 'text-sm' : 'text-base'} font-semibold text-foreground mb-1`}>{title}</h3>
      <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-muted-foreground max-w-sm mb-4`}>{description}</p>
      {actionLabel && (
        actionHref ? (
          <a href={actionHref}>
            <Button size={isCompact ? 'sm' : 'default'} className="gap-2">
              <Plus className="w-4 h-4" />
              {actionLabel}
            </Button>
          </a>
        ) : onAction ? (
          <Button size={isCompact ? 'sm' : 'default'} onClick={onAction} className="gap-2">
            <Plus className="w-4 h-4" />
            {actionLabel}
          </Button>
        ) : null
      )}
    </div>
  );
}

// ── Preset Empty States ──
export function NoProjectsState() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="لا توجد مشاريع"
      description="لم يتم إنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول."
      actionLabel="مشروع جديد"
      actionHref="/client/projects/new"
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={Search}
      title="لا توجد نتائج"
      description="لم يتم العثور على نتائج مطابقة. جرب تعديل معايير البحث."
      variant="compact"
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="لا توجد إشعارات"
      description="أنت على اطلاع بكل شيء! ستظهر الإشعارات الجديدة هنا."
      variant="compact"
    />
  );
}

export function NoMessages() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="لا توجد رسائل"
      description="لم تبدأ أي محادثة بعد. ابدأ محادثة جديدة مع فريقك."
      variant="compact"
    />
  );
}

export function NoDeliverables() {
  return (
    <EmptyState
      icon={FileText}
      title="لا توجد مخرجات"
      description="لم يتم رفع أي مخرجات بعد لهذا المشروع."
      variant="compact"
    />
  );
}
