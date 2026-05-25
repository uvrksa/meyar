// ============================================================
// MEYAAR — Admin Deliverables Review (Complete)
// Features: Review queue, approve/reject, version history
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  FileText, CheckCircle2, XCircle, Clock, Eye, Download,
  MessageSquare, Search, Filter, AlertCircle, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { toast } from 'sonner';

const DELIVERABLES = [
  {
    id: 'DEL-001', project: 'فيلا سكنية - الرياض', engineer: 'م. نورة العتيبي',
    title: 'دراسة الجدوى الاقتصادية - النسخة النهائية', type: 'PDF',
    status: 'pending_review' as const, submittedAt: '2025-05-24', version: 3,
    fileSize: '2.4 MB', pages: 45
  },
  {
    id: 'DEL-002', project: 'مجمع تجاري - جدة', engineer: 'م. سارة الزهراني',
    title: 'التحليل المالي والتدفقات النقدية', type: 'Excel',
    status: 'pending_review' as const, submittedAt: '2025-05-23', version: 2,
    fileSize: '1.8 MB', pages: 12
  },
  {
    id: 'DEL-003', project: 'مصنع أغذية - القصيم', engineer: 'م. عبدالله الشمري',
    title: 'دراسة الأثر البيئي', type: 'PDF',
    status: 'pending_review' as const, submittedAt: '2025-05-22', version: 1,
    fileSize: '3.1 MB', pages: 62
  },
  {
    id: 'DEL-004', project: 'فيلا سكنية - الرياض', engineer: 'م. نورة العتيبي',
    title: 'المخططات المعمارية', type: 'DWG',
    status: 'approved' as const, submittedAt: '2025-05-20', version: 2,
    fileSize: '8.5 MB', pages: 15
  },
  {
    id: 'DEL-005', project: 'مجمع تجاري - جدة', engineer: 'م. فهد القحطاني',
    title: 'تقرير دراسة التربة', type: 'PDF',
    status: 'rejected' as const, submittedAt: '2025-05-19', version: 1,
    fileSize: '1.2 MB', pages: 28
  },
  {
    id: 'DEL-006', project: 'مشروع طرق - حائل', engineer: 'م. خالد المطيري',
    title: 'دراسة حركة المرور', type: 'PDF',
    status: 'approved' as const, submittedAt: '2025-05-18', version: 1,
    fileSize: '4.2 MB', pages: 55
  },
];

export default function AdminDeliverables() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_review' | 'approved' | 'rejected'>('all');

  const filtered = DELIVERABLES.filter(d => {
    const matchSearch = d.title.includes(search) || d.project.includes(search) || d.engineer.includes(search);
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = DELIVERABLES.filter(d => d.status === 'pending_review').length;
  const approvedCount = DELIVERABLES.filter(d => d.status === 'approved').length;
  const rejectedCount = DELIVERABLES.filter(d => d.status === 'rejected').length;

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="مراجعة المخرجات"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'مراجعة المخرجات' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'بانتظار المراجعة', count: pendingCount, icon: Clock, color: 'amber' },
          { label: 'تمت الموافقة', count: approvedCount, icon: CheckCircle2, color: 'emerald' },
          { label: 'مرفوض', count: rejectedCount, icon: XCircle, color: 'red' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${stat.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.count}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="glass-card p-4 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالعنوان، المشروع، أو المهندس..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-1">
            {(['all', 'pending_review', 'approved', 'rejected'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
                {s === 'all' ? 'الكل' : s === 'pending_review' ? 'بانتظار المراجعة' : s === 'approved' ? 'موافق عليه' : 'مرفوض'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-3">
        {filtered.map((del, i) => (
          <div key={del.id} className={`glass-card p-4 animate-fade-in-up transition-all hover:border-blue-500/20 ${
            del.status === 'pending_review' ? 'border-amber-500/20' : ''
          }`} style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-4">
              {/* File Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                del.type === 'PDF' ? 'bg-red-500/10' : del.type === 'Excel' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
              }`}>
                <FileText className={`w-6 h-6 ${
                  del.type === 'PDF' ? 'text-red-400' : del.type === 'Excel' ? 'text-emerald-400' : 'text-blue-400'
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{del.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {del.project} • {del.engineer}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                    del.status === 'pending_review' ? 'bg-amber-500/10 text-amber-400' :
                    del.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {del.status === 'pending_review' ? 'بانتظار المراجعة' : del.status === 'approved' ? 'موافق عليه' : 'مرفوض'}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span>النسخة {del.version}</span>
                  <span>{del.fileSize}</span>
                  <span>{del.pages} صفحة</span>
                  <span>{del.submittedAt}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                    onClick={() => toast.info('معاينة المخرج')}>
                    <Eye className="w-3 h-3" /> معاينة
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                    onClick={() => toast.info('تحميل الملف')}>
                    <Download className="w-3 h-3" /> تحميل
                  </Button>
                  {del.status === 'pending_review' && (
                    <>
                      <Button size="sm" className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => toast.success('تمت الموافقة على المخرج')}>
                        <CheckCircle2 className="w-3 h-3" /> موافقة
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
                        onClick={() => toast.error('تم رفض المخرج')}>
                        <XCircle className="w-3 h-3" /> رفض
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                        onClick={() => toast.info('إضافة ملاحظة')}>
                        <MessageSquare className="w-3 h-3" /> ملاحظة
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
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
