// ============================================================
// MEYAAR — Workflow Status Bar Component
// Visual representation of project workflow stages
// ============================================================

import { CheckCircle2, Clock, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

export type WorkflowStage = {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  date?: string;
};

interface WorkflowStatusBarProps {
  stages: WorkflowStage[];
  className?: string;
}

const STATUS_ICONS = {
  completed: CheckCircle2,
  active: Loader2,
  pending: Clock,
  error: AlertCircle,
};

const STATUS_COLORS = {
  completed: {
    dot: 'bg-emerald-400',
    line: 'bg-emerald-400',
    text: 'text-emerald-400',
    ring: 'ring-emerald-400/30',
  },
  active: {
    dot: 'bg-blue-400',
    line: 'bg-blue-400/30',
    text: 'text-blue-400',
    ring: 'ring-blue-400/30',
  },
  pending: {
    dot: 'bg-muted-foreground/30',
    line: 'bg-muted-foreground/20',
    text: 'text-muted-foreground',
    ring: 'ring-muted-foreground/20',
  },
  error: {
    dot: 'bg-red-400',
    line: 'bg-red-400/30',
    text: 'text-red-400',
    ring: 'ring-red-400/30',
  },
};

export function WorkflowStatusBar({ stages, className = '' }: WorkflowStatusBarProps) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">مسار سير العمل</h3>
        <span className="text-xs text-muted-foreground">
          {stages.filter(s => s.status === 'completed').length} / {stages.length} مراحل مكتملة
        </span>
      </div>

      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center gap-0">
        {stages.map((stage, i) => {
          const colors = STATUS_COLORS[stage.status];
          const Icon = STATUS_ICONS[stage.status];
          const isLast = i === stages.length - 1;

          return (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-2 ${colors.ring} ${stage.status === 'completed' ? 'bg-emerald-500/15' : stage.status === 'active' ? 'bg-blue-500/15' : 'bg-white/5'}`}>
                  <Icon className={`w-4 h-4 ${colors.text} ${stage.status === 'active' ? 'animate-spin' : ''}`} />
                </div>
                <span className={`text-[10px] font-medium ${colors.text} text-center max-w-[80px] leading-tight`}>
                  {stage.label}
                </span>
                {stage.date && (
                  <span className="text-[9px] text-muted-foreground">{stage.date}</span>
                )}
              </div>
              {!isLast && (
                <div className={`flex-1 h-0.5 mx-1 rounded-full ${i < stages.findIndex(s => s.status === 'active') ? STATUS_COLORS.completed.line : STATUS_COLORS.pending.line}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-3">
        {stages.map((stage, i) => {
          const colors = STATUS_COLORS[stage.status];
          const Icon = STATUS_ICONS[stage.status];
          const isLast = i === stages.length - 1;

          return (
            <div key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ring-2 ${colors.ring} ${stage.status === 'completed' ? 'bg-emerald-500/15' : stage.status === 'active' ? 'bg-blue-500/15' : 'bg-white/5'}`}>
                  <Icon className={`w-3.5 h-3.5 ${colors.text} ${stage.status === 'active' ? 'animate-spin' : ''}`} />
                </div>
                {!isLast && <div className={`w-0.5 flex-1 mt-1 rounded-full ${colors.line}`} />}
              </div>
              <div className="flex-1 pb-3">
                <p className={`text-xs font-medium ${colors.text}`}>{stage.label}</p>
                {stage.date && <p className="text-[10px] text-muted-foreground mt-0.5">{stage.date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Preset workflow stages for common project types ──
export const DEFAULT_PROJECT_WORKFLOW: WorkflowStage[] = [
  { id: 'submitted', label: 'تم الإرسال', status: 'completed', date: '15 يناير' },
  { id: 'review', label: 'المراجعة', status: 'completed', date: '17 يناير' },
  { id: 'assigned', label: 'تم الإسناد', status: 'completed', date: '18 يناير' },
  { id: 'in_progress', label: 'قيد التنفيذ', status: 'active' },
  { id: 'pending_approval', label: 'بانتظار الموافقة', status: 'pending' },
  { id: 'delivered', label: 'تم التسليم', status: 'pending' },
];

export const COMPLETED_WORKFLOW: WorkflowStage[] = [
  { id: 'submitted', label: 'تم الإرسال', status: 'completed', date: '1 ديسمبر' },
  { id: 'review', label: 'المراجعة', status: 'completed', date: '3 ديسمبر' },
  { id: 'assigned', label: 'تم الإسناد', status: 'completed', date: '4 ديسمبر' },
  { id: 'in_progress', label: 'قيد التنفيذ', status: 'completed', date: '5 ديسمبر' },
  { id: 'pending_approval', label: 'بانتظار الموافقة', status: 'completed', date: '20 ديسمبر' },
  { id: 'delivered', label: 'تم التسليم', status: 'completed', date: '22 ديسمبر' },
];
