// ============================================================
// MEYAAR — Client Dashboard (Enhanced)
// Design: Enterprise Dark Precision
// Features: KPI cards, project stats, activity feed, quick actions
// ============================================================

import { useState } from 'react';
import { Link } from 'wouter';
import {
  FolderOpen, Clock, CheckCircle2, AlertCircle, Plus,
  TrendingUp, FileText, MessageSquare, Bell, ArrowLeft,
  BarChart3, Upload, ChevronRight, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { KpiCard, StatusBadge, ProgressBar, ActivityItem, SectionHeader } from '@/components/SharedComponents';
import { mockProjects, mockNotifications, mockChartData } from '@/lib/mock-data';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid
} from 'recharts';

const PIE_DATA = [
  { name: 'قيد التنفيذ', value: 2, color: '#06B6D4' },
  { name: 'قيد المراجعة', value: 1, color: '#3B82F6' },
  { name: 'مكتمل', value: 1, color: '#10B981' },
  { name: 'منتظر', value: 1, color: '#F59E0B' },
];

const QUICK_ACTIONS = [
  { icon: Plus, label: 'مشروع جديد', href: '/client/projects/new', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Upload, label: 'رفع ملفات', href: '/client/projects', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: MessageSquare, label: 'الرسائل', href: '/client/messages', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: FileText, label: 'التقارير', href: '/client/reports', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const RECENT_ACTIVITY = [
  { icon: CheckCircle2, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10', title: 'تم اكتمال مشروع مصنع الأغذية', subtitle: 'تم رفع التقرير النهائي', time: 'منذ ساعة' },
  { icon: MessageSquare, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10', title: 'رسالة جديدة من م. سارة الزهراني', subtitle: 'تم الانتهاء من المرحلة الأولى', time: 'منذ 3 ساعات' },
  { icon: TrendingUp, iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/10', title: 'تحديث تقدم مشروع الرياض', subtitle: 'وصل التقدم إلى 65%', time: 'أمس' },
  { icon: Bell, iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10', title: 'تذكير: موعد مشروع الميناء', subtitle: 'الموعد النهائي بعد 30 يوماً', time: 'أمس' },
  { icon: FileText, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10', title: 'تم رفع ملف جديد', subtitle: 'مخططات البنية التحتية.pdf', time: 'منذ يومين' },
];

const TOOLTIP_STYLE = {
  backgroundColor: 'oklch(0.155 0.045 258)',
  border: '1px solid oklch(1 0 0 / 10%)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '12px',
};

export default function ClientDashboard() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'صباح الخير';
    if (h < 17) return 'مساء الخير';
    return 'مساء النور';
  });

  const total = mockProjects.length;
  const inProgress = mockProjects.filter(p => p.status === 'in_progress').length;
  const inReview = mockProjects.filter(p => p.status === 'in_review').length;
  const completed = mockProjects.filter(p => p.status === 'completed').length;
  const pending = mockProjects.filter(p => p.status === 'pending').length;
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <DashboardLayout
      role="client"
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle="لوحة التحكم"
      breadcrumbs={[{ label: 'لوحة التحكم' }]}
    >
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-xl p-6 mb-6 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, oklch(0.18 0.08 258) 0%, oklch(0.22 0.10 240) 100%)', border: '1px solid oklch(1 0 0 / 10%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, oklch(0.72 0.15 200) 0%, transparent 60%)' }} />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-muted-foreground text-sm mb-1">{greeting}،</p>
            <h1 className="text-2xl font-bold text-white">أحمد محمد العمري</h1>
            <p className="text-sm text-muted-foreground mt-1">
              لديك <span className="text-cyan-400 font-semibold">{inProgress}</span> مشاريع نشطة و
              <span className="text-amber-400 font-semibold mx-1">{unread}</span> إشعارات غير مقروءة
            </p>
          </div>
          <Link href="/client/projects/new">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 h-10">
              <Plus className="w-4 h-4" />
              مشروع جديد
            </Button>
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="إجمالي المشاريع" value={total} icon={FolderOpen} accentColor="blue" delay={0} />
        <KpiCard title="قيد التنفيذ" value={inProgress} icon={Activity} accentColor="cyan" delay={50} />
        <KpiCard title="قيد المراجعة" value={inReview} icon={Clock} accentColor="amber" delay={100} />
        <KpiCard title="مكتملة" value={completed} change={12} changeLabel="هذا الشهر" icon={CheckCircle2} accentColor="green" delay={150} />
      </div>

      {/* ── Quick Actions ── */}
      <div className="glass-card p-4 mb-6 animate-fade-in-up delay-200">
        <p className="text-sm font-semibold text-muted-foreground mb-3">إجراءات سريعة</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href}>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:bg-white/5 transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in-up delay-250">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">معدل الإنجاز الشهري</h3>
              <p className="text-xs text-muted-foreground">آخر 6 أشهر</p>
            </div>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mockChartData.completionRate} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'oklch(1 0 0 / 3%)' }} formatter={(v: number) => [`${v}%`, 'معدل الإنجاز']} />
              <Bar dataKey="rate" fill="oklch(0.52 0.20 258)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="glass-card p-5 animate-fade-in-up delay-300">
          <h3 className="text-sm font-semibold text-foreground mb-4">توزيع حالات المشاريع</h3>
          <div className="flex justify-center mb-3">
            <PieChart width={130} height={130}>
              <Pie data={PIE_DATA} cx={65} cy={65} innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2">
            {PIE_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Projects + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="glass-card p-5 animate-fade-in-up delay-300">
          <SectionHeader
            title="المشاريع الأخيرة"
            action={
              <Link href="/client/projects">
                <span className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer">
                  عرض الكل <ChevronRight className="w-3 h-3 rotate-180" />
                </span>
              </Link>
            }
          />
          <div className="space-y-2">
            {mockProjects.slice(0, 4).map((project) => (
              <Link key={project.id} href={`/client/projects/${project.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-border">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-blue-300 transition-colors">{project.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ProgressBar value={project.progress} className="flex-1 max-w-20" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-5 animate-fade-in-up delay-350">
          <SectionHeader title="النشاط الأخير" />
          <div className="space-y-1">
            {RECENT_ACTIVITY.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Pending Actions Banner ── */}
      {pending > 0 && (
        <div className="mt-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3 animate-fade-in-up delay-400">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-300">لديك {pending} مشروع في انتظار الإجراء</p>
            <p className="text-xs text-muted-foreground">يرجى مراجعة المشاريع المعلقة وإتمام البيانات المطلوبة</p>
          </div>
          <Link href="/client/projects">
            <Button size="sm" variant="ghost" className="text-amber-400 border border-amber-500/30 h-8 text-xs">
              مراجعة
            </Button>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
