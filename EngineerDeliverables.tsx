// ============================================================
// MEYAAR — Engineer Deliverables Management
// Features: Upload, version tracking, review status, feedback
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState } from 'react';
import {
  Upload, FileText, CheckCircle2, Clock, XCircle, Eye,
  Download, Plus, Filter, Search, AlertTriangle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

type DeliverableStatus = 'approved' | 'in_review' | 'rejected' | 'pending' | 'revision_requested';

interface Deliverable {
  id: string;
  title: string;
  projectName: string;
  status: DeliverableStatus;
  date: string;
  version: number;
  feedback: string;
  fileSize: string;
}

const ALL_DELIVERABLES: Deliverable[] = [
  { id: 'd1', title: 'دراسة التربة - تقرير أولي', projectName: 'فيلا الرياض', status: 'approved', date: '2025-05-18', version: 2, feedback: 'ممتاز، تمت الموافقة', fileSize: '2.4 MB' },
  { id: 'd2', title: 'المخططات المعمارية - الطابق الأرضي', projectName: 'فيلا الرياض', status: 'in_review', date: '2025-05-22', version: 1, feedback: '', fileSize: '5.1 MB' },
  { id: 'd3', title: 'التحليل المالي - المرحلة الأولى', projectName: 'مجمع تجاري', status: 'pending', date: '', version: 0, feedback: '', fileSize: '' },
  { id: 'd4', title: 'دراسة الجدوى الاقتصادية', projectName: 'مجمع تجاري', status: 'revision_requested', date: '2025-05-20', version: 1, feedback: 'يرجى تحديث أرقام العائد المتوقع بناءً على بيانات السوق الأخيرة', fileSize: '1.8 MB' },
  { id: 'd5', title: 'تقرير التحليل الإنشائي', projectName: 'برج المكاتب', status: 'rejected', date: '2025-05-15', version: 1, feedback: 'التقرير غير مكتمل - ينقص قسم الأحمال الزلزالية', fileSize: '3.2 MB' },
  { id: 'd6', title: 'المخططات الكهربائية', projectName: 'فيلا الرياض', status: 'approved', date: '2025-05-12', version: 3, feedback: 'معتمد بعد التعديلات', fileSize: '4.7 MB' },
];

const STATUS_CONFIG: Record<DeliverableStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  approved: { label: 'معتمد', color: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle2 },
  in_review: { label: 'قيد المراجعة', color: 'bg-amber-500/10 text-amber-400', icon: Clock },
  rejected: { label: 'مرفوض', color: 'bg-red-500/10 text-red-400', icon: XCircle },
  pending: { label: 'لم يُسلّم', color: 'bg-slate-500/10 text-slate-400', icon: Clock },
  revision_requested: { label: 'مطلوب تعديل', color: 'bg-orange-500/10 text-orange-400', icon: RefreshCw },
};

export default function EngineerDeliverables() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliverableStatus | 'all'>('all');

  const filtered = ALL_DELIVERABLES.filter(d => {
    const matchSearch = d.title.includes(search) || d.projectName.includes(search);
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: ALL_DELIVERABLES.length,
    approved: ALL_DELIVERABLES.filter(d => d.status === 'approved').length,
    inReview: ALL_DELIVERABLES.filter(d => d.status === 'in_review').length,
    pending: ALL_DELIVERABLES.filter(d => d.status === 'pending' || d.status === 'revision_requested').length,
  };

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="المخرجات"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'المخرجات' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-white">إدارة المخرجات</h1>
          <p className="text-sm text-muted-foreground">تتبع وإدارة جميع المخرجات المسلّمة</p>
        </div>
        <Button size="sm" className="gap-1 h-9 bg-emerald-600 hover:bg-emerald-500"
          onClick={() => toast.info('رفع مخرج جديد — قريباً')}>
          <Upload className="w-4 h-4" /> رفع مخرج جديد
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'إجمالي المخرجات', value: stats.total, color: 'text-blue-400' },
          { label: 'معتمدة', value: stats.approved, color: 'text-emerald-400' },
          { label: 'قيد المراجعة', value: stats.inReview, color: 'text-amber-400' },
          { label: 'بانتظار التسليم', value: stats.pending, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-5 animate-fade-in">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالعنوان أو المشروع..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {(['all', 'approved', 'in_review', 'revision_requested', 'rejected', 'pending'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === s ? 'bg-cyan-600/20 text-cyan-300' : 'text-muted-foreground hover:bg-white/5'
                }`}>
                {s === 'all' ? 'الكل' : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-3">
        {filtered.map((del, i) => {
          const config = STATUS_CONFIG[del.status];
          const StatusIcon = config.icon;
          return (
            <div key={del.id} className="glass-card p-5 animate-fade-in-up hover:border-cyan-500/20 transition-all"
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    del.status === 'approved' ? 'bg-emerald-500/10' :
                    del.status === 'rejected' ? 'bg-red-500/10' :
                    del.status === 'revision_requested' ? 'bg-orange-500/10' :
                    del.status === 'in_review' ? 'bg-amber-500/10' :
                    'bg-white/5'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      del.status === 'approved' ? 'text-emerald-400' :
                      del.status === 'rejected' ? 'text-red-400' :
                      del.status === 'revision_requested' ? 'text-orange-400' :
                      del.status === 'in_review' ? 'text-amber-400' :
                      'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{del.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{del.projectName}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {del.date && <span>التسليم: {del.date}</span>}
                      {del.version > 0 && <span>النسخة: {del.version}</span>}
                      {del.fileSize && <span>الحجم: {del.fileSize}</span>}
                    </div>
                    {del.feedback && (
                      <div className={`mt-2 p-2 rounded-lg text-xs ${
                        del.status === 'approved' ? 'bg-emerald-500/5 text-emerald-400' :
                        del.status === 'rejected' ? 'bg-red-500/5 text-red-400' :
                        'bg-orange-500/5 text-orange-400'
                      }`}>
                        <span className="font-medium">ملاحظات المراجع: </span>{del.feedback}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                  <div className="flex gap-1">
                    {del.status === 'pending' && (
                      <Button size="sm" className="h-7 text-xs gap-1 bg-cyan-600 hover:bg-cyan-500"
                        onClick={() => toast.info('رفع المخرج — قريباً')}>
                        <Upload className="w-3 h-3" /> رفع
                      </Button>
                    )}
                    {del.status === 'revision_requested' && (
                      <Button size="sm" className="h-7 text-xs gap-1 bg-orange-600 hover:bg-orange-500"
                        onClick={() => toast.info('تحديث النسخة — قريباً')}>
                        <RefreshCw className="w-3 h-3" /> تحديث
                      </Button>
                    )}
                    {del.status === 'rejected' && (
                      <Button size="sm" className="h-7 text-xs gap-1 bg-blue-600 hover:bg-blue-500"
                        onClick={() => toast.info('إعادة التسليم — قريباً')}>
                        <Upload className="w-3 h-3" /> إعادة تسليم
                      </Button>
                    )}
                    {(del.status === 'approved' || del.status === 'in_review') && (
                      <button className="p-1.5 rounded-lg border border-border hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-colors"
                        onClick={() => toast.info('معاينة — قريباً')}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">لا توجد مخرجات تطابق البحث</p>
        </div>
      )}
    </DashboardLayout>
  );
}
