// ============================================================
// MEYAAR — Admin Analytics & Reports (Complete Advanced)
// Features: Revenue, Projects, Engineers, Growth, Platform Activity
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  TrendingUp, DollarSign, FolderOpen, Users, BarChart3,
  Download, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { KpiCard, SectionHeader } from '@/components/SharedComponents';
import { mockChartData, mockStats } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';
import { toast } from 'sonner';

const TOOLTIP_STYLE = {
  backgroundColor: 'oklch(0.155 0.045 258)',
  border: '1px solid oklch(1 0 0 / 10%)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '12px',
};

const ENGINEER_PRODUCTIVITY = [
  { name: 'م. نورة', completed: 8, onTime: 7, rating: 4.9 },
  { name: 'م. سارة', completed: 6, onTime: 6, rating: 4.8 },
  { name: 'م. عبدالله', completed: 5, onTime: 4, rating: 4.7 },
  { name: 'م. فهد', completed: 4, onTime: 3, rating: 4.6 },
  { name: 'م. خالد', completed: 3, onTime: 3, rating: 4.4 },
];

const MONTHLY_GROWTH = [
  { month: 'يناير', clients: 12, engineers: 4, projects: 8 },
  { month: 'فبراير', clients: 15, engineers: 5, projects: 10 },
  { month: 'مارس', clients: 18, engineers: 5, projects: 9 },
  { month: 'أبريل', clients: 22, engineers: 6, projects: 12 },
  { month: 'مايو', clients: 28, engineers: 6, projects: 15 },
  { month: 'يونيو', clients: 32, engineers: 7, projects: 13 },
];

const CLIENT_ACTIVITY = [
  { month: 'يناير', newClients: 3, returning: 5 },
  { month: 'فبراير', newClients: 4, returning: 6 },
  { month: 'مارس', newClients: 3, returning: 6 },
  { month: 'أبريل', newClients: 5, returning: 7 },
  { month: 'مايو', newClients: 6, returning: 9 },
  { month: 'يونيو', newClients: 4, returning: 9 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="التحليلات والتقارير"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'التحليلات' }]}
    >
      {/* Time Range + Export */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex gap-1">
          {(['month', 'quarter', 'year'] as const).map(t => (
            <button key={t} onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${timeRange === t ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-white/5'}`}>
              {t === 'month' ? 'شهري' : t === 'quarter' ? 'ربع سنوي' : 'سنوي'}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('جارٍ تصدير التقرير...')}>
          <Download className="w-3.5 h-3.5" />
          تصدير PDF
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="إجمالي الإيرادات" value={`${(mockStats.totalRevenue / 1000000).toFixed(1)}M`} change={18.5} icon={DollarSign} accentColor="green" delay={0} />
        <KpiCard title="إجمالي المشاريع" value={mockStats.totalProjects} change={12} icon={FolderOpen} accentColor="blue" delay={50} />
        <KpiCard title="إجمالي العملاء" value={mockStats.totalClients} change={15} icon={Users} accentColor="cyan" delay={100} />
        <KpiCard title="معدل النمو" value={`${mockStats.revenueGrowth}%`} change={8} icon={TrendingUp} accentColor="purple" delay={150} />
      </div>

      {/* Revenue + Study Types */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <SectionHeader title="الإيرادات الشهرية" subtitle="ر.س" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData.monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={TOOLTIP_STYLE}
                  formatter={(v: number) => [`${v.toLocaleString('ar-SA')} ر.س`, 'الإيرادات']} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
          <SectionHeader title="أنواع الدراسات" subtitle="التوزيع" />
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockChartData.projectsByType} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                  paddingAngle={3} dataKey="count">
                  {mockChartData.projectsByType.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, _n: string, p: any) => [v, p.payload.type]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {mockChartData.projectsByType.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.type}</span>
                </div>
                <span className="text-foreground font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineer Productivity + Growth */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Engineer Productivity */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <SectionHeader title="إنتاجية المهندسين" subtitle="هذا الشهر" />
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGINEER_PRODUCTIVITY} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="completed" fill="#3B82F6" radius={[0, 4, 4, 0]} name="مكتمل" />
                <Bar dataKey="onTime" fill="#10B981" radius={[0, 4, 4, 0]} name="في الموعد" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
          <SectionHeader title="النمو الشهري" subtitle="العملاء والمشاريع" />
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="clients" stroke="#3B82F6" strokeWidth={2} dot={false} name="العملاء" />
                <Line type="monotone" dataKey="projects" stroke="#06B6D4" strokeWidth={2} dot={false} name="المشاريع" />
                <Line type="monotone" dataKey="engineers" stroke="#8B5CF6" strokeWidth={2} dot={false} name="المهندسون" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 bg-blue-500 rounded" /> العملاء</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 bg-cyan-500 rounded" /> المشاريع</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 bg-purple-500 rounded" /> المهندسون</span>
          </div>
        </div>
      </div>

      {/* Client Activity + Performance Summary */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <SectionHeader title="نشاط العملاء" subtitle="عملاء جدد مقابل عائدين" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CLIENT_ACTIVITY} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="newClients" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="عملاء جدد" />
                <Bar dataKey="returning" fill="#06B6D4" radius={[3, 3, 0, 0]} name="عملاء عائدون" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <SectionHeader title="ملخص الأداء" />
          <div className="space-y-3">
            {[
              { label: 'متوسط مدة المشروع', value: `${mockStats.avgProjectDuration} أشهر`, color: 'text-blue-300' },
              { label: 'المشاريع النشطة', value: mockStats.activeProjects, color: 'text-cyan-300' },
              { label: 'المشاريع المكتملة', value: mockStats.completedProjects, color: 'text-emerald-300' },
              { label: 'المهندسون النشطون', value: mockStats.activeEngineers, color: 'text-purple-300' },
              { label: 'معدل الرضا', value: `${mockStats.satisfactionRate}%`, color: 'text-amber-300' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-white/3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
