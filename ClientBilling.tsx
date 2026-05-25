// ============================================================
// MEYAAR — Client Billing Page
// Features: Invoice list, payment summary, download invoices
// Design: Enterprise Dark Precision
// ============================================================

import { useState } from 'react';
import {
  CreditCard, Download, Search, Filter, CheckCircle2,
  Clock, AlertCircle, DollarSign, TrendingUp, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

const INVOICES = [
  { id: 'INV-001', project: 'مجمع سكني الرياض', desc: 'رسوم فتح الملف', amount: 50, status: 'paid', date: '2025-05-10', dueDate: '2025-05-10' },
  { id: 'INV-002', project: 'مجمع سكني الرياض', desc: 'الدراسة الفنية', amount: 1800, status: 'paid', date: '2025-05-12', dueDate: '2025-05-20' },
  { id: 'INV-003', project: 'مجمع سكني الرياض', desc: 'الدراسة المالية', amount: 1200, status: 'pending', date: '2025-05-20', dueDate: '2025-06-01' },
  { id: 'INV-004', project: 'مصنع الأثاث - جدة', desc: 'رسوم فتح الملف', amount: 50, status: 'paid', date: '2025-04-01', dueDate: '2025-04-01' },
  { id: 'INV-005', project: 'مصنع الأثاث - جدة', desc: 'دراسة الجدوى الكاملة', amount: 4500, status: 'paid', date: '2025-04-15', dueDate: '2025-04-30' },
  { id: 'INV-006', project: 'برج تجاري الدمام', desc: 'رسوم فتح الملف', amount: 50, status: 'overdue', date: '2025-03-01', dueDate: '2025-03-15' },
];

const STATUS_MAP = {
  paid: { label: 'مدفوع', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
  pending: { label: 'معلق', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
  overdue: { label: 'متأخر', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
};

export default function ClientBilling() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const filtered = INVOICES.filter(inv => {
    const matchSearch = inv.project.includes(search) || inv.id.includes(search) || inv.desc.includes(search);
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPaid = INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalPending = INVOICES.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const totalOverdue = INVOICES.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <DashboardLayout
      role="client"
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle="الفواتير"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/client' }, { label: 'الفواتير' }]}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'إجمالي المدفوع', value: totalPaid, color: 'text-emerald-400', icon: CheckCircle2, bg: 'bg-emerald-500/10' },
          { label: 'معلق الدفع', value: totalPending, color: 'text-amber-400', icon: Clock, bg: 'bg-amber-500/10' },
          { label: 'متأخر الدفع', value: totalOverdue, color: 'text-red-400', icon: AlertCircle, bg: 'bg-red-500/10' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value.toLocaleString('ar-SA')}</p>
              <p className="text-xs text-muted-foreground">ريال سعودي</p>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="glass-card p-4 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث في الفواتير..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-2">
            {(['all', 'paid', 'pending', 'overdue'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${statusFilter === s ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                {s === 'all' ? 'الكل' : STATUS_MAP[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['رقم الفاتورة', 'المشروع', 'الوصف', 'المبلغ', 'الحالة', 'تاريخ الإصدار', 'تاريخ الاستحقاق', ''].map((h, i) => (
                  <th key={i} className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => {
                const statusInfo = STATUS_MAP[inv.status as keyof typeof STATUS_MAP];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={inv.id} className="border-b border-border/50 hover:bg-white/3 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 30}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="font-mono text-xs text-blue-300">{inv.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-32">
                      <p className="truncate">{inv.project}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{inv.desc}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-foreground">{inv.amount.toLocaleString('ar-SA')}</span>
                      <span className="text-xs text-muted-foreground mr-1">ر.س</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{inv.date}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{inv.dueDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {inv.status === 'pending' && (
                          <Button size="sm" onClick={() => toast.info('سيتم تفعيل الدفع قريباً')}
                            className="h-7 px-2 text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30">
                            دفع
                          </Button>
                        )}
                        <button onClick={() => toast.success('جارٍ تحميل الفاتورة...')}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-emerald-400 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">لا توجد فواتير تطابق البحث</p>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="glass-card p-5 mt-5">
        <h3 className="text-sm font-bold text-white mb-4">طرق الدفع المتاحة</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'مدى', icon: '🏦' },
            { name: 'Visa', icon: '💳' },
            { name: 'Mastercard', icon: '💳' },
            { name: 'Apple Pay', icon: '🍎' },
          ].map((method, i) => (
            <button key={i} onClick={() => toast.info('سيتم تفعيل الدفع قريباً')}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-white/5 transition-all">
              <span className="text-xl">{method.icon}</span>
              <p className="text-sm font-medium text-foreground">{method.name}</p>
            </button>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">سيتم تفعيل بوابة الدفع الإلكتروني قريباً. للدفع الآن، يرجى التواصل مع فريق الدعم.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
