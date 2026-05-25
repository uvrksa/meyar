// ============================================================
// MEYAAR — Engineer Performance Analytics
// Features: Productivity metrics, completion rates, time tracking
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import {
  TrendingUp, Clock, CheckCircle2, Star, Target,
  BarChart3, Calendar, Award, Zap, Timer
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';

const PERFORMANCE_METRICS = {
  completionRate: 94,
  avgDeliveryDays: 12,
  onTimeRate: 88,
  clientSatisfaction: 4.8,
  totalHours: 1240,
  activeProjects: 3,
  completedThisMonth: 4,
  revisionRate: 15,
};

const MONTHLY_STATS = [
  { month: 'يناير', completed: 3, hours: 160, rating: 4.9 },
  { month: 'فبراير', completed: 2, hours: 140, rating: 4.7 },
  { month: 'مارس', completed: 4, hours: 180, rating: 4.8 },
  { month: 'أبريل', completed: 3, hours: 155, rating: 5.0 },
  { month: 'مايو', completed: 4, hours: 170, rating: 4.8 },
];

const ACHIEVEMENTS = [
  { title: 'أسرع إنجاز', description: 'إنجاز مشروع في 5 أيام', icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
  { title: 'تقييم ممتاز', description: '10 تقييمات 5 نجوم متتالية', icon: Star, color: 'text-emerald-400 bg-emerald-500/10' },
  { title: 'إنتاجية عالية', description: '4 مشاريع مكتملة هذا الشهر', icon: Target, color: 'text-cyan-400 bg-cyan-500/10' },
  { title: 'التزام بالمواعيد', description: '88% تسليم في الوقت', icon: Timer, color: 'text-blue-400 bg-blue-500/10' },
];

export default function EngineerPerformance() {
  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="تحليلات الأداء"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'تحليلات الأداء' }]}
    >
      {/* Header */}
      <div className="mb-5 animate-fade-in">
        <h1 className="text-xl font-bold text-white">تحليلات الأداء</h1>
        <p className="text-sm text-muted-foreground">مؤشرات الإنتاجية والجودة</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'معدل الإنجاز', value: `${PERFORMANCE_METRICS.completionRate}%`, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'متوسط التسليم', value: `${PERFORMANCE_METRICS.avgDeliveryDays} يوم`, icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'الالتزام بالمواعيد', value: `${PERFORMANCE_METRICS.onTimeRate}%`, icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'رضا العملاء', value: `${PERFORMANCE_METRICS.clientSatisfaction}/5`, icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${kpi.color}`} />
              </div>
              <p className="text-xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Performance Breakdown */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" /> مؤشرات الأداء التفصيلية
          </h3>
          <div className="space-y-4">
            {[
              { label: 'معدل الإنجاز', value: PERFORMANCE_METRICS.completionRate, color: 'emerald' },
              { label: 'الالتزام بالمواعيد', value: PERFORMANCE_METRICS.onTimeRate, color: 'blue' },
              { label: 'معدل المراجعات', value: 100 - PERFORMANCE_METRICS.revisionRate, color: 'cyan' },
              { label: 'رضا العملاء', value: Math.round((PERFORMANCE_METRICS.clientSatisfaction / 5) * 100), color: 'amber' },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-foreground">{metric.label}</span>
                  <span className="text-xs font-mono text-cyan-300">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" /> الإحصائيات الشهرية
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right text-xs text-muted-foreground font-medium py-2">الشهر</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-2">مشاريع</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-2">ساعات</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-2">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY_STATS.map((stat, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 text-xs text-foreground">{stat.month}</td>
                    <td className="py-2 text-xs text-cyan-300 font-mono">{stat.completed}</td>
                    <td className="py-2 text-xs text-muted-foreground">{stat.hours} س</td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-foreground">{stat.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> الإنجازات
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((achievement, i) => {
              const Icon = achievement.icon;
              return (
                <div key={i} className="p-3 rounded-xl border border-border bg-white/2">
                  <div className={`w-8 h-8 rounded-lg ${achievement.color} flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> ملخص الأداء
          </h3>
          <div className="space-y-3">
            {[
              { label: 'إجمالي ساعات العمل', value: `${PERFORMANCE_METRICS.totalHours} ساعة` },
              { label: 'المشاريع النشطة حالياً', value: `${PERFORMANCE_METRICS.activeProjects} مشاريع` },
              { label: 'مشاريع مكتملة هذا الشهر', value: `${PERFORMANCE_METRICS.completedThisMonth} مشاريع` },
              { label: 'معدل طلبات التعديل', value: `${PERFORMANCE_METRICS.revisionRate}%` },
              { label: 'متوسط وقت الاستجابة', value: '4 ساعات' },
              { label: 'أطول مشروع', value: '45 يوم' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/3 transition-colors">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
