// ============================================================
// MEYAAR — Admin Engineer Management (Complete)
// Features: Profiles, performance, workload, assignment, activation
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  Search, UserPlus, Star, Briefcase, CheckCircle2, Clock,
  AlertCircle, Eye, Edit, MoreVertical, Shield, Award,
  TrendingUp, BarChart3, Filter, X, Mail, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { ProgressBar } from '@/components/SharedComponents';
import { toast } from 'sonner';

const ENGINEERS = [
  {
    id: 'ENG-001', name: 'م. سارة الزهراني', email: 'sara@meyaar.sa', phone: '+966 55 111 2222',
    specializations: ['دراسات جدوى', 'تحليل مالي'], rating: 4.8, completedProjects: 24,
    activeProjects: 3, status: 'active' as const, workload: 75, joinDate: '2024-01-15',
    avgDeliveryTime: '12 يوم', onTimeRate: 96, avatar: 'س'
  },
  {
    id: 'ENG-002', name: 'م. فهد القحطاني', email: 'fahad@meyaar.sa', phone: '+966 55 333 4444',
    specializations: ['بنية تحتية', 'دراسات بيئية'], rating: 4.6, completedProjects: 18,
    activeProjects: 2, status: 'active' as const, workload: 50, joinDate: '2024-03-20',
    avgDeliveryTime: '15 يوم', onTimeRate: 89, avatar: 'ف'
  },
  {
    id: 'ENG-003', name: 'م. نورة العتيبي', email: 'noura@meyaar.sa', phone: '+966 55 555 6666',
    specializations: ['تصميم معماري', 'تخطيط عمراني'], rating: 4.9, completedProjects: 31,
    activeProjects: 4, status: 'active' as const, workload: 90, joinDate: '2023-08-10',
    avgDeliveryTime: '10 يوم', onTimeRate: 98, avatar: 'ن'
  },
  {
    id: 'ENG-004', name: 'م. خالد المطيري', email: 'khalid.m@meyaar.sa', phone: '+966 55 777 8888',
    specializations: ['دراسات صناعية', 'تقييم مخاطر'], rating: 4.4, completedProjects: 12,
    activeProjects: 1, status: 'active' as const, workload: 25, joinDate: '2024-06-01',
    avgDeliveryTime: '18 يوم', onTimeRate: 83, avatar: 'خ'
  },
  {
    id: 'ENG-005', name: 'م. عبدالله الشمري', email: 'abdullah@meyaar.sa', phone: '+966 55 999 0000',
    specializations: ['جدوى اقتصادية', 'تحليل سوق'], rating: 4.7, completedProjects: 20,
    activeProjects: 2, status: 'active' as const, workload: 60, joinDate: '2024-02-10',
    avgDeliveryTime: '14 يوم', onTimeRate: 92, avatar: 'ع'
  },
  {
    id: 'ENG-006', name: 'م. ريم الحربي', email: 'reem@meyaar.sa', phone: '+966 55 111 3333',
    specializations: ['دراسات بيئية', 'استدامة'], rating: 4.5, completedProjects: 8,
    activeProjects: 0, status: 'inactive' as const, workload: 0, joinDate: '2024-09-15',
    avgDeliveryTime: '16 يوم', onTimeRate: 87, avatar: 'ر'
  },
];

export default function AdminEngineers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filtered = ENGINEERS.filter(eng => {
    const matchSearch = eng.name.includes(search) || eng.email.includes(search) || eng.specializations.some(s => s.includes(search));
    const matchStatus = statusFilter === 'all' || eng.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalActive = ENGINEERS.filter(e => e.status === 'active').length;
  const avgRating = (ENGINEERS.reduce((s, e) => s + e.rating, 0) / ENGINEERS.length).toFixed(1);
  const totalCompleted = ENGINEERS.reduce((s, e) => s + e.completedProjects, 0);

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="إدارة المهندسين"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'إدارة المهندسين' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي المهندسين', value: ENGINEERS.length, icon: Briefcase, color: 'blue' },
          { label: 'نشط حالياً', value: totalActive, icon: CheckCircle2, color: 'emerald' },
          { label: 'متوسط التقييم', value: avgRating, icon: Star, color: 'amber' },
          { label: 'مشاريع مكتملة', value: totalCompleted, icon: Award, color: 'purple' },
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
              placeholder="بحث بالاسم أو التخصص..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${statusFilter === s ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                {s === 'all' ? 'الكل' : s === 'active' ? 'نشط' : 'غير نشط'}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-9" onClick={() => toast.info('دعوة مهندس جديد — قريباً')}>
            <UserPlus className="w-3.5 h-3.5" />
            دعوة مهندس
          </Button>
        </div>
      </div>

      {/* Engineers Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((eng, i) => (
          <div key={eng.id} className="glass-card p-5 animate-fade-in-up hover:border-blue-500/20 transition-all group"
            style={{ animationDelay: `${i * 60}ms` }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                  eng.status === 'active' ? 'bg-blue-500/15 text-blue-300' : 'bg-slate-500/15 text-slate-400'
                }`}>
                  {eng.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{eng.name}</h3>
                  <p className="text-xs text-muted-foreground">{eng.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                eng.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
              }`}>
                {eng.status === 'active' ? 'نشط' : 'غير نشط'}
              </span>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {eng.specializations.map((spec, si) => (
                <span key={si} className="px-2 py-0.5 rounded-lg text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {spec}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-white/3">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-bold text-white">{eng.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">التقييم</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/3">
                <p className="text-sm font-bold text-white">{eng.completedProjects}</p>
                <p className="text-xs text-muted-foreground">مكتمل</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/3">
                <p className="text-sm font-bold text-white">{eng.onTimeRate}%</p>
                <p className="text-xs text-muted-foreground">في الموعد</p>
              </div>
            </div>

            {/* Workload */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">تحميل العمل</span>
                <span className={`text-xs font-medium ${
                  eng.workload >= 80 ? 'text-red-400' : eng.workload >= 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>{eng.workload}%</span>
              </div>
              <ProgressBar value={eng.workload} />
              <p className="text-xs text-muted-foreground mt-1">{eng.activeProjects} مشاريع نشطة</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1"
                onClick={() => toast.info('عرض ملف المهندس')}>
                <Eye className="w-3 h-3" /> عرض الملف
              </Button>
              <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1"
                onClick={() => toast.info('إسناد مشروع')}>
                <Briefcase className="w-3 h-3" /> إسناد مشروع
              </Button>
              <button onClick={() => toast.info('المزيد')}
                className="p-1.5 rounded-lg border border-border hover:bg-white/5 text-muted-foreground">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">لا يوجد مهندسون يطابقون البحث</p>
        </div>
      )}
    </DashboardLayout>
  );
}
