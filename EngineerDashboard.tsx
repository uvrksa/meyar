// ============================================================
// MEYAAR — Engineer Dashboard (Complete Advanced)
// Features: KPIs, workload indicators, deadlines, quick actions,
//           performance charts, recent activity, messages
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { Link } from 'wouter';
import {
  Briefcase, CheckSquare, Clock, Star, ArrowLeft,
  FileText, TrendingUp, CheckCircle2, Calendar,
  Wrench, Upload, MessageSquare, Zap, Target,
  FolderOpen, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { KpiCard, SectionHeader } from '@/components/SharedComponents';
import { mockProjects, mockTasks, mockChartData } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CUSTOM_TOOLTIP_STYLE = {
  backgroundColor: 'oklch(0.155 0.045 258)',
  border: '1px solid oklch(1 0 0 / 10%)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '12px',
};

const UPCOMING_DEADLINES = [
  { project: 'فيلا سكنية - الرياض', task: 'تسليم دراسة الجدوى', date: '2025-06-15', daysLeft: 21, priority: 'high' as const },
  { project: 'مجمع تجاري - جدة', task: 'تسليم التحليل المالي', date: '2025-07-01', daysLeft: 37, priority: 'medium' as const },
  { project: 'مصنع أغذية - القصيم', task: 'تسليم الدراسة البيئية', date: '2025-07-15', daysLeft: 51, priority: 'high' as const },
];

const RECENT_ACTIVITIES = [
  { action: 'رفع مخرج', detail: 'تم رفع "المخططات المعمارية" لمشروع الفيلا', time: 'منذ ساعتين', type: 'deliverable' as const },
  { action: 'تحديث تقدم', detail: 'تم تحديث تقدم مشروع المجمع التجاري إلى 45%', time: 'منذ 4 ساعات', type: 'progress' as const },
  { action: 'رسالة جديدة', detail: 'رسالة من المدير بخصوص مشروع المصنع', time: 'منذ 5 ساعات', type: 'message' as const },
  { action: 'مشروع جديد', detail: 'تم إسناد مشروع "مبنى إداري - الخبر"', time: 'أمس', type: 'assignment' as const },
  { action: 'موافقة على مخرج', detail: 'تمت الموافقة على دراسة التربة', time: 'أمس', type: 'approval' as const },
];

const PERFORMANCE_DATA = {
  completedThisMonth: 2,
  avgCompletionDays: 18,
  rating: 4.8,
  onTimeRate: 94,
  totalCompleted: 23,
  activeProjects: 4,
};

export default function EngineerDashboard() {
  const assignedProjects = mockProjects.filter(p => p.engineerId === 'u2');

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="لوحة التحكم"
      breadcrumbs={[{ label: 'لوحة التحكم' }]}
    >
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden animate-fade-in"
        style={{ background: 'linear-gradient(135deg, oklch(0.45 0.18 258 / 15%), oklch(0.72 0.15 200 / 8%))', border: '1px solid oklch(0.45 0.18 258 / 25%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-cyan-500/50 to-transparent" />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">صباح الخير، م. سارة</h2>
            <p className="text-muted-foreground text-sm">لديك {mockTasks.filter(t => t.status !== 'completed').length} مهام مستحقة و{assignedProjects.length} مشاريع نشطة</p>
          </div>
          <Link href="/engineer/workspace">
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2 flex-shrink-0">
              <Wrench className="w-4 h-4" />
              مساحة العمل
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="مشاريع نشطة" value={String(PERFORMANCE_DATA.activeProjects)} icon={Briefcase} accentColor="blue" delay={0} />
        <KpiCard title="مكتملة هذا الشهر" value={String(PERFORMANCE_DATA.completedThisMonth)} change={15} icon={CheckCircle2} accentColor="green" delay={50} />
        <KpiCard title="التقييم" value={`${PERFORMANCE_DATA.rating} ★`} icon={Star} accentColor="cyan" delay={100} />
        <KpiCard title="التسليم بالموعد" value={`${PERFORMANCE_DATA.onTimeRate}%`} change={5} icon={Target} accentColor="green" delay={150} />
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-5 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          إجراءات سريعة
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'مساحة العمل', icon: Wrench, href: '/engineer/workspace', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', hoverBorder: 'hover:border-blue-500/30' },
            { label: 'رفع مخرج', icon: Upload, href: '/engineer/deliverables', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/30' },
            { label: 'تحديث التقدم', icon: TrendingUp, href: '/engineer/projects', iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', hoverBorder: 'hover:border-cyan-500/30' },
            { label: 'طلب توضيح', icon: MessageSquare, href: '/engineer/messages', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', hoverBorder: 'hover:border-purple-500/30' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-white/2 hover:bg-white/5 ${action.hoverBorder} transition-all group`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.iconBg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-4 h-4 ${action.iconColor}`} />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main Content - 2 cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Projects */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-4">
              <SectionHeader title="المشاريع النشطة" />
              <Link href="/engineer/projects" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                عرض الكل <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {assignedProjects.map((project) => (
                <Link key={project.id} href={`/engineer/workspace/${project.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-border">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.clientName}</p>
                    </div>
                    <div className="text-left flex-shrink-0 w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground font-mono">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      project.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                      project.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {project.priority === 'high' ? 'عالي' : project.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <SectionHeader title="النشاط الأخير" />
            <div className="space-y-2.5 mt-3">
              {RECENT_ACTIVITIES.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/3 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'deliverable' ? 'bg-emerald-500/10' :
                    activity.type === 'progress' ? 'bg-blue-500/10' :
                    activity.type === 'message' ? 'bg-purple-500/10' :
                    activity.type === 'assignment' ? 'bg-amber-500/10' :
                    'bg-cyan-500/10'
                  }`}>
                    {activity.type === 'deliverable' ? <Upload className="w-3.5 h-3.5 text-emerald-400" /> :
                     activity.type === 'progress' ? <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> :
                     activity.type === 'message' ? <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> :
                     activity.type === 'assignment' ? <FolderOpen className="w-3.5 h-3.5 text-amber-400" /> :
                     <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <SectionHeader title="معدل إنجاز المشاريع" subtitle="آخر 6 أشهر" />
            <div className="h-48 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData.completionRate}>
                  <defs>
                    <linearGradient id="colorRateEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.15 200)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.72 0.15 200)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'oklch(0.60 0.02 240)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="rate" stroke="oklch(0.72 0.15 200)" strokeWidth={2} fill="url(#colorRateEng)" name="معدل الإنجاز %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 col */}
        <div className="space-y-5">
          {/* Workload Indicator */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              حمل العمل
            </h3>
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#workloadGradient)" strokeWidth="8"
                  strokeDasharray={`${75 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="workloadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">75%</span>
                <span className="text-xs text-muted-foreground">مشغول</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white/3">
                <p className="text-sm font-bold text-white">{PERFORMANCE_DATA.activeProjects}</p>
                <p className="text-xs text-muted-foreground">نشطة</p>
              </div>
              <div className="p-2 rounded-lg bg-white/3">
                <p className="text-sm font-bold text-white">1</p>
                <p className="text-xs text-muted-foreground">معلقة</p>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              المواعيد القادمة
            </h3>
            <div className="space-y-2.5">
              {UPCOMING_DEADLINES.map((deadline, i) => (
                <div key={i} className={`p-3 rounded-xl border transition-colors ${
                  deadline.daysLeft <= 21 ? 'border-red-500/20 bg-red-500/5' :
                  deadline.daysLeft <= 37 ? 'border-amber-500/20 bg-amber-500/5' :
                  'border-border bg-white/2'
                }`}>
                  <p className="text-xs font-medium text-foreground">{deadline.task}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{deadline.project}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{deadline.date}</span>
                    <span className={`text-xs font-bold ${
                      deadline.daysLeft <= 21 ? 'text-red-400' :
                      deadline.daysLeft <= 37 ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}>
                      {deadline.daysLeft} يوم
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Summary */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                المهام
              </h3>
              <Link href="/engineer/tasks" className="text-xs text-cyan-400 hover:text-cyan-300">الكل</Link>
            </div>
            <div className="space-y-2">
              {mockTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="p-2.5 rounded-lg border border-border bg-white/2 hover:bg-white/4 transition-colors">
                  <p className="text-xs font-medium text-foreground leading-snug">{task.title}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      task.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {task.status === 'completed' ? 'مكتمل' : task.status === 'in_progress' ? 'قيد التنفيذ' : 'منتظر'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              ملخص الأداء
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'إجمالي المكتملة', value: PERFORMANCE_DATA.totalCompleted, suffix: 'مشروع' },
                { label: 'متوسط الإنجاز', value: PERFORMANCE_DATA.avgCompletionDays, suffix: 'يوم' },
                { label: 'التقييم العام', value: PERFORMANCE_DATA.rating, suffix: '/ 5' },
                { label: 'التسليم بالموعد', value: PERFORMANCE_DATA.onTimeRate, suffix: '%' },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/3">
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                  <span className="text-sm font-bold text-white">{metric.value} <span className="text-xs text-muted-foreground font-normal">{metric.suffix}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
