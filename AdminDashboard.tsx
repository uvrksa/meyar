// ============================================================
// MEYAAR — Admin Executive Dashboard (Complete)
// Features: KPIs, Revenue Charts, Quick Actions, Activity Feed,
//           Pending Approvals, System Health, Project Distribution
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { Link } from 'wouter';
import { useState } from 'react';
import {
  FolderOpen, Users, DollarSign, TrendingUp, ArrowLeft,
  Building2, CheckCircle2, AlertCircle, Clock, BarChart3,
  UserPlus, Settings, Shield, Zap, Bell, FileCheck,
  Send, Eye, Plus, Activity, Server, Database,
  Briefcase, Target, Award, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { KpiCard, StatusBadge, TypeBadge, ProgressBar, SectionHeader } from '@/components/SharedComponents';
import { mockProjects, mockStats, mockChartData } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { toast } from 'sonner';

const CUSTOM_TOOLTIP_STYLE = {
  backgroundColor: 'oklch(0.155 0.045 258)',
  border: '1px solid oklch(1 0 0 / 10%)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '12px',
};

// Mock data for enhanced dashboard
const PENDING_APPROVALS = [
  { id: 1, title: 'دراسة جدوى - مجمع الرياض', type: 'deliverable', engineer: 'م. سارة الزهراني', time: 'منذ ساعتين', priority: 'high' },
  { id: 2, title: 'تسعير مشروع - مصنع جدة', type: 'pricing', engineer: 'م. فهد القحطاني', time: 'منذ 4 ساعات', priority: 'medium' },
  { id: 3, title: 'طلب تسجيل مهندس جديد', type: 'registration', engineer: 'م. نورة العتيبي', time: 'منذ يوم', priority: 'low' },
  { id: 4, title: 'تقرير مالي - برج الدمام', type: 'deliverable', engineer: 'م. خالد المطيري', time: 'منذ يومين', priority: 'medium' },
];

const RECENT_ACTIVITY = [
  { id: 1, action: 'أكمل م. سارة تسليم دراسة الجدوى', type: 'success', time: 'منذ 15 دقيقة' },
  { id: 2, action: 'تم تسجيل عميل جديد: شركة المستقبل', type: 'info', time: 'منذ 30 دقيقة' },
  { id: 3, action: 'طلب توضيح من العميل أحمد العمري', type: 'warning', time: 'منذ ساعة' },
  { id: 4, action: 'تم اعتماد تسعير مشروع المصنع', type: 'success', time: 'منذ ساعتين' },
  { id: 5, action: 'تأخر تسليم مشروع البنية التحتية', type: 'error', time: 'منذ 3 ساعات' },
  { id: 6, action: 'تم إسناد مشروع جديد لـ م. فهد', type: 'info', time: 'منذ 4 ساعات' },
];

const SYSTEM_HEALTH = [
  { label: 'الخادم الرئيسي', status: 'online', uptime: '99.9%' },
  { label: 'قاعدة البيانات', status: 'online', uptime: '99.8%' },
  { label: 'خدمة البريد', status: 'online', uptime: '99.5%' },
  { label: 'التخزين السحابي', status: 'online', uptime: '100%' },
];

const WEEKLY_DATA = [
  { day: 'سبت', projects: 3, revenue: 12000 },
  { day: 'أحد', projects: 5, revenue: 18000 },
  { day: 'اثنين', projects: 4, revenue: 15000 },
  { day: 'ثلاثاء', projects: 7, revenue: 25000 },
  { day: 'أربعاء', projects: 6, revenue: 22000 },
  { day: 'خميس', projects: 8, revenue: 30000 },
  { day: 'جمعة', projects: 2, revenue: 8000 },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="لوحة التحكم"
      breadcrumbs={[{ label: 'لوحة التحكم' }]}
    >
      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden animate-fade-in"
        style={{ background: 'linear-gradient(135deg, oklch(0.25 0.12 258 / 40%), oklch(0.20 0.08 220 / 30%))', border: '1px solid oklch(0.45 0.18 258 / 25%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">مرحباً، خالد 👋</h2>
            <p className="text-muted-foreground text-sm">
              لديك <span className="text-amber-400 font-semibold">{PENDING_APPROVALS.length}</span> موافقات معلقة ·
              <span className="text-emerald-400 font-semibold"> {mockStats.activeProjects}</span> مشروع نشط ·
              إيرادات اليوم: <span className="text-blue-300 font-semibold">٨,٥٠٠ ر.س</span>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/admin/projects">
              <Button variant="outline" className="border-border gap-2 text-xs h-9">
                <Plus className="w-3.5 h-3.5" />
                مشروع جديد
              </Button>
            </Link>
            <Link href="/admin/engineers">
              <Button variant="outline" className="border-border gap-2 text-xs h-9">
                <UserPlus className="w-3.5 h-3.5" />
                دعوة مهندس
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 text-xs h-9">
                <BarChart3 className="w-3.5 h-3.5" />
                التقارير
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Primary KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <KpiCard title="إجمالي المشاريع" value={mockStats.totalProjects} icon={FolderOpen} accentColor="blue" delay={0} />
        <KpiCard title="المشاريع النشطة" value={mockStats.activeProjects} change={8} icon={Activity} accentColor="cyan" delay={50} />
        <KpiCard title="بانتظار المراجعة" value={PENDING_APPROVALS.length} icon={Clock} accentColor="amber" delay={100} />
        <KpiCard title="مشاريع مكتملة" value={mockStats.completedProjects} change={15} icon={CheckCircle2} accentColor="green" delay={150} />
      </div>

      {/* ── Secondary KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="إجمالي المهندسين" value={mockStats.activeEngineers} icon={Building2} accentColor="purple" delay={200} />
        <KpiCard title="إجمالي العملاء" value={mockStats.totalClients} change={12} icon={Users} accentColor="cyan" delay={250} />
        <KpiCard title="الإيرادات الشهرية" value={`${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`} change={mockStats.revenueGrowth} icon={DollarSign} accentColor="green" delay={300} />
        <KpiCard title="معدل الرضا" value={`${mockStats.satisfactionRate}%`} change={2.1} icon={Award} accentColor="amber" delay={350} />
      </div>

      {/* ── Quick Actions Panel ── */}
      <div className="glass-card p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">إجراءات سريعة</h3>
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: 'إنشاء مشروع', icon: Plus, href: '/admin/projects', iconBg: 'bg-blue-500/10', iconHover: 'group-hover:bg-blue-500/20', iconColor: 'text-blue-400' },
            { label: 'إسناد مهندس', icon: UserPlus, href: '/admin/engineers', iconBg: 'bg-purple-500/10', iconHover: 'group-hover:bg-purple-500/20', iconColor: 'text-purple-400' },
            { label: 'مراجعة مخرجات', icon: FileCheck, href: '/admin/deliverables', iconBg: 'bg-emerald-500/10', iconHover: 'group-hover:bg-emerald-500/20', iconColor: 'text-emerald-400' },
            { label: 'إرسال إشعار', icon: Send, href: '/admin/notifications', iconBg: 'bg-cyan-500/10', iconHover: 'group-hover:bg-cyan-500/20', iconColor: 'text-cyan-400' },
            { label: 'إدارة المستخدمين', icon: Users, href: '/admin/users', iconBg: 'bg-amber-500/10', iconHover: 'group-hover:bg-amber-500/20', iconColor: 'text-amber-400' },
            { label: 'الإعدادات', icon: Settings, href: '/admin/settings', iconBg: 'bg-slate-500/10', iconHover: 'group-hover:bg-slate-500/20', iconColor: 'text-slate-400' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href}>
                <button className="w-full flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:bg-white/5 hover:border-blue-500/30 transition-all group">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${action.iconBg} ${action.iconHover} transition-colors`}>
                    <Icon className={`w-4.5 h-4.5 ${action.iconColor}`} />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <SectionHeader title="الإيرادات" subtitle="آخر 6 أشهر (ر.س)" />
            <div className="flex gap-1">
              {(['week', 'month', 'year'] as const).map(t => (
                <button key={t} onClick={() => setTimeRange(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${timeRange === t ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-muted-foreground hover:bg-white/5'}`}>
                  {t === 'week' ? 'أسبوع' : t === 'month' ? 'شهر' : 'سنة'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData.monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.52 0.20 258)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.52 0.20 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} cursor={{ stroke: 'oklch(0.52 0.20 258)', strokeWidth: 1 }}
                  formatter={(v: number) => [`${v.toLocaleString('ar-SA')} ر.س`, 'الإيرادات']} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.52 0.20 258)" strokeWidth={2.5}
                  fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects Distribution */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
          <SectionHeader title="توزيع المشاريع" subtitle="حسب النوع" />
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockChartData.projectsByType} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  paddingAngle={3} dataKey="count">
                  {mockChartData.projectsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} formatter={(v: number, n: string, p: any) => [v, p.payload.type]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-1">
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

      {/* ── Pending Approvals + Activity ── */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Pending Approvals */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <SectionHeader title="موافقات معلقة" subtitle={`${PENDING_APPROVALS.length} عناصر`}
            action={
              <Link href="/admin/deliverables">
                <Button variant="ghost" size="sm" className="text-blue-400 gap-1 text-xs">
                  عرض الكل <ArrowLeft className="w-3 h-3" />
                </Button>
              </Link>
            } />
          <div className="space-y-3 mt-3">
            {PENDING_APPROVALS.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-white/3 transition-colors group">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.priority === 'high' ? 'bg-red-500/10' : item.priority === 'medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                }`}>
                  {item.type === 'deliverable' ? <FileCheck className={`w-4 h-4 ${item.priority === 'high' ? 'text-red-400' : 'text-amber-400'}`} /> :
                   item.type === 'pricing' ? <DollarSign className="w-4 h-4 text-amber-400" /> :
                   <UserPlus className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.engineer} · {item.time}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toast.success('تمت الموافقة')}
                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => toast.info('تم فتح المراجعة')}
                    className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <SectionHeader title="النشاط الأخير" subtitle="آخر 24 ساعة"
            action={
              <Link href="/admin/activity">
                <Button variant="ghost" size="sm" className="text-blue-400 gap-1 text-xs">
                  عرض الكل <ArrowLeft className="w-3 h-3" />
                </Button>
              </Link>
            } />
          <div className="space-y-3 mt-3">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  item.type === 'success' ? 'bg-emerald-400' :
                  item.type === 'warning' ? 'bg-amber-400' :
                  item.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Weekly Performance + System Health ── */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Weekly Performance */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <SectionHeader title="الأداء الأسبوعي" subtitle="المشاريع والإيرادات" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="left" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                <Bar yAxisId="left" dataKey="projects" fill="oklch(0.55 0.20 200)" radius={[3, 3, 0, 0]} name="المشاريع" />
                <Bar yAxisId="right" dataKey="revenue" fill="oklch(0.52 0.20 258)" radius={[3, 3, 0, 0]} name="الإيرادات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
          <SectionHeader title="صحة النظام" subtitle="حالة الخدمات" />
          <div className="space-y-3 mt-3">
            {SYSTEM_HEALTH.map((service, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-foreground">{service.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-medium">{service.uptime}</span>
                  <span className="text-xs text-muted-foreground">uptime</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <p className="text-xs text-emerald-300">جميع الخدمات تعمل بشكل طبيعي</p>
          </div>
        </div>
      </div>

      {/* ── Projects Table ── */}
      <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <SectionHeader
          title="أحدث المشاريع"
          action={
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm" className="text-blue-400 gap-1 text-xs">
                عرض الكل <ArrowLeft className="w-3 h-3" />
              </Button>
            </Link>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right text-xs text-muted-foreground font-medium pb-3 pr-2">المشروع</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-3">العميل</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-3">المهندس</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-3">الحالة</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-3">التقدم</th>
                <th className="text-right text-xs text-muted-foreground font-medium pb-3">الميزانية</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.slice(0, 5).map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-2">
                    <div>
                      <p className="text-foreground font-medium text-xs leading-snug max-w-48 truncate">{project.title}</p>
                      <TypeBadge type={project.type} />
                    </div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{project.clientName}</td>
                  <td className="py-3 text-xs text-muted-foreground">{project.engineerName || '—'}</td>
                  <td className="py-3"><StatusBadge status={project.status} /></td>
                  <td className="py-3 w-28">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={project.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-left">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{project.budget.toLocaleString('ar-SA')} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
