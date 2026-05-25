// ============================================================
// MEYAAR — Admin Finance Management (Complete)
// Features: Revenue tracking, invoices, payments, engineer payouts
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle2, Clock, AlertCircle, Eye, Search,
  Calendar, CreditCard, Wallet, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { toast } from 'sonner';

const INVOICES = [
  { id: 'INV-001', project: 'فيلا سكنية - الرياض', client: 'أحمد العمري', amount: 15000, status: 'paid' as const, date: '2025-05-15', dueDate: '2025-06-15' },
  { id: 'INV-002', project: 'مجمع تجاري - جدة', client: 'محمد السالم', amount: 28000, status: 'paid' as const, date: '2025-05-10', dueDate: '2025-06-10' },
  { id: 'INV-003', project: 'مصنع أغذية - القصيم', client: 'مجموعة الراجحي', amount: 62000, status: 'pending' as const, date: '2025-05-20', dueDate: '2025-06-20' },
  { id: 'INV-004', project: 'مشروع طرق - حائل', client: 'بلدية حائل', amount: 45000, status: 'pending' as const, date: '2025-05-18', dueDate: '2025-06-18' },
  { id: 'INV-005', project: 'مجمع سكني - الدمام', client: 'فاطمة الدوسري', amount: 22000, status: 'overdue' as const, date: '2025-04-01', dueDate: '2025-05-01' },
  { id: 'INV-006', project: 'مبنى إداري - الخبر', client: 'سلطان الحربي', amount: 18000, status: 'paid' as const, date: '2025-04-20', dueDate: '2025-05-20' },
];

const ENGINEER_PAYOUTS = [
  { name: 'م. نورة العتيبي', amount: 12500, projects: 3, status: 'paid' as const, date: '2025-05-25' },
  { name: 'م. سارة الزهراني', amount: 9800, projects: 2, status: 'paid' as const, date: '2025-05-25' },
  { name: 'م. عبدالله الشمري', amount: 8200, projects: 2, status: 'pending' as const, date: '2025-05-28' },
  { name: 'م. فهد القحطاني', amount: 7500, projects: 1, status: 'pending' as const, date: '2025-05-28' },
  { name: 'م. خالد المطيري', amount: 5000, projects: 1, status: 'pending' as const, date: '2025-05-30' },
];

export default function AdminFinance() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const totalRevenue = INVOICES.reduce((s, inv) => s + inv.amount, 0);
  const paidAmount = INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingAmount = INVOICES.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const overdueAmount = INVOICES.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  const filteredInvoices = INVOICES.filter(inv => {
    const matchSearch = inv.project.includes(search) || inv.client.includes(search) || inv.id.includes(search);
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="الإدارة المالية"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'الإدارة المالية' }]}
    >
      {/* Financial KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي الإيرادات', value: totalRevenue, icon: DollarSign, color: 'emerald', change: 18 },
          { label: 'المحصّل', value: paidAmount, icon: CheckCircle2, color: 'blue', change: 12 },
          { label: 'قيد التحصيل', value: pendingAmount, icon: Clock, color: 'amber', change: -5 },
          { label: 'متأخر', value: overdueAmount, icon: AlertCircle, color: 'red', change: -15 },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${kpi.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${kpi.color}-400`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {kpi.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(kpi.change)}%
                </span>
              </div>
              <p className="text-xl font-bold text-white">{kpi.value.toLocaleString('ar-SA')}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Invoices Section */}
      <div className="glass-card overflow-hidden mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <SectionHeader title="الفواتير" subtitle={`${INVOICES.length} فاتورة`} />
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="بحث..." className="bg-white/5 border-border h-8 pr-8 text-xs w-40" />
              </div>
              <div className="flex gap-1">
                {(['all', 'paid', 'pending', 'overdue'] as const).map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-2 py-1 rounded-md text-xs transition-all ${statusFilter === s ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
                    {s === 'all' ? 'الكل' : s === 'paid' ? 'مدفوع' : s === 'pending' ? 'معلق' : 'متأخر'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4">رقم الفاتورة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المشروع</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">العميل</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المبلغ</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الحالة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">تاريخ الإصدار</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">تاريخ الاستحقاق</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3 w-16">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="py-3 px-4">
                    <span className="text-xs font-mono text-blue-300">{inv.id}</span>
                  </td>
                  <td className="py-3 text-xs text-foreground max-w-36 truncate">{inv.project}</td>
                  <td className="py-3 text-xs text-muted-foreground">{inv.client}</td>
                  <td className="py-3 text-xs font-bold text-foreground">{inv.amount.toLocaleString('ar-SA')} ر.س</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' :
                      inv.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {inv.status === 'paid' ? 'مدفوع' : inv.status === 'pending' ? 'معلق' : 'متأخر'}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{inv.date}</td>
                  <td className="py-3 text-xs text-muted-foreground">{inv.dueDate}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.info('عرض الفاتورة')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toast.info('تحميل PDF')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-emerald-400 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineer Payouts */}
      <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="مستحقات المهندسين" subtitle="هذا الشهر" />
          <Button variant="outline" size="sm" className="gap-2 h-8 text-xs" onClick={() => toast.info('صرف جميع المستحقات المعلقة')}>
            <Wallet className="w-3.5 h-3.5" />
            صرف المعلق
          </Button>
        </div>

        <div className="space-y-3">
          {ENGINEER_PAYOUTS.map((payout, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-white/3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{payout.name}</p>
                  <p className="text-xs text-muted-foreground">{payout.projects} مشاريع • {payout.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  payout.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {payout.status === 'paid' ? 'مصروف' : 'معلق'}
                </span>
                <p className="text-sm font-bold text-foreground">{payout.amount.toLocaleString('ar-SA')} ر.س</p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">إجمالي المستحقات</p>
          <p className="text-lg font-bold text-white">
            {ENGINEER_PAYOUTS.reduce((s, p) => s + p.amount, 0).toLocaleString('ar-SA')} ر.س
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
