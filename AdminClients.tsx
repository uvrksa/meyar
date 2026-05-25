// ============================================================
// MEYAAR — Admin Client/Company Management (Complete)
// Features: CRM-style layout, company profiles, spending, activity
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  Search, Building2, Users, DollarSign, FolderOpen, Eye,
  Mail, Phone, MapPin, Calendar, MoreVertical, Ban,
  CheckCircle2, TrendingUp, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

const CLIENTS = [
  {
    id: 'CLT-001', name: 'أحمد محمد العمري', company: 'شركة العمري للاستثمار',
    email: 'ahmed@example.com', phone: '+966 50 123 4567', city: 'الرياض',
    totalProjects: 4, activeProjects: 2, totalSpending: 85000, status: 'active' as const,
    joinDate: '2024-08-15', lastActivity: 'منذ ساعتين', avatar: 'أ'
  },
  {
    id: 'CLT-002', name: 'محمد السالم', company: 'مجموعة السالم التجارية',
    email: 'msalem@example.com', phone: '+966 50 234 5678', city: 'جدة',
    totalProjects: 6, activeProjects: 1, totalSpending: 142000, status: 'active' as const,
    joinDate: '2024-03-10', lastActivity: 'منذ يوم', avatar: 'م'
  },
  {
    id: 'CLT-003', name: 'فاطمة الدوسري', company: 'شركة الدوسري العقارية',
    email: 'fatima@example.com', phone: '+966 50 345 6789', city: 'الدمام',
    totalProjects: 3, activeProjects: 1, totalSpending: 67000, status: 'active' as const,
    joinDate: '2024-06-20', lastActivity: 'منذ 3 أيام', avatar: 'ف'
  },
  {
    id: 'CLT-004', name: 'عبدالرحمن الغامدي', company: 'مؤسسة الغامدي للمقاولات',
    email: 'abdulrahman@example.com', phone: '+966 50 456 7890', city: 'المدينة',
    totalProjects: 2, activeProjects: 0, totalSpending: 38000, status: 'active' as const,
    joinDate: '2024-11-01', lastActivity: 'منذ أسبوع', avatar: 'ع'
  },
  {
    id: 'CLT-005', name: 'سلطان الحربي', company: 'شركة المستقبل للتطوير',
    email: 'sultan@example.com', phone: '+966 50 567 8901', city: 'الرياض',
    totalProjects: 1, activeProjects: 1, totalSpending: 22000, status: 'active' as const,
    joinDate: '2025-01-15', lastActivity: 'منذ 5 ساعات', avatar: 'س'
  },
  {
    id: 'CLT-006', name: 'نوف القحطاني', company: 'شركة نوف للاستشارات',
    email: 'nouf@example.com', phone: '+966 50 678 9012', city: 'الخبر',
    totalProjects: 2, activeProjects: 0, totalSpending: 45000, status: 'suspended' as const,
    joinDate: '2024-05-10', lastActivity: 'منذ شهر', avatar: 'ن'
  },
];

export default function AdminClients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filtered = CLIENTS.filter(c => {
    const matchSearch = c.name.includes(search) || c.company.includes(search) || c.email.includes(search) || c.city.includes(search);
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = CLIENTS.reduce((s, c) => s + c.totalSpending, 0);
  const totalActiveProjects = CLIENTS.reduce((s, c) => s + c.activeProjects, 0);

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="إدارة العملاء"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'إدارة العملاء' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي العملاء', value: CLIENTS.length, icon: Users, color: 'blue' },
          { label: 'عملاء نشطون', value: CLIENTS.filter(c => c.status === 'active').length, icon: CheckCircle2, color: 'emerald' },
          { label: 'إجمالي الإيرادات', value: `${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'amber' },
          { label: 'مشاريع نشطة', value: totalActiveProjects, icon: FolderOpen, color: 'purple' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${stat.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
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
              placeholder="بحث بالاسم، الشركة، أو المدينة..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'suspended'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${statusFilter === s ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                {s === 'all' ? 'الكل' : s === 'active' ? 'نشط' : 'موقوف'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-card overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4">العميل / الشركة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">التواصل</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المدينة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المشاريع</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الإنفاق</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الحالة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">آخر نشاط</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3 w-16">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => (
                <tr key={client.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-300">{client.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> {client.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {client.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1" dir="ltr">
                        <Phone className="w-3 h-3" /> {client.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {client.city}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground">{client.totalProjects}</p>
                      <p className="text-xs text-muted-foreground">{client.activeProjects} نشط</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <p className="text-sm font-bold text-foreground">{client.totalSpending.toLocaleString('ar-SA')}</p>
                    <p className="text-xs text-muted-foreground">ر.س</p>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {client.status === 'active' ? 'نشط' : 'موقوف'}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground whitespace-nowrap">{client.lastActivity}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.info('عرض ملف العميل')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toast.info('تواصل مع العميل')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-emerald-400 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toast.info('المزيد')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">لا يوجد عملاء يطابقون البحث</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">عرض {filtered.length} من {CLIENTS.length} عميل</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-white/5">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 text-xs font-medium">1</span>
            <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-white/5">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
