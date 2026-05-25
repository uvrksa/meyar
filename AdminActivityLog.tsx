// ============================================================
// MEYAAR — Admin Activity Log (Complete)
// Features: System-wide activity tracking, filtering, user actions
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  Activity, Search, Filter, User, FolderOpen, FileText,
  DollarSign, Shield, Clock, Download, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

type ActivityType = 'project' | 'user' | 'finance' | 'deliverable' | 'system';

interface ActivityItem {
  id: string;
  type: ActivityType;
  action: string;
  user: string;
  details: string;
  timestamp: string;
  ip?: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: '1', type: 'project', action: 'إنشاء مشروع', user: 'أحمد العمري', details: 'تم إنشاء مشروع "فيلا سكنية - الرياض"', timestamp: '2025-05-25 14:30', ip: '192.168.1.1' },
  { id: '2', type: 'user', action: 'تسجيل دخول', user: 'م. نورة العتيبي', details: 'تسجيل دخول ناجح من الرياض', timestamp: '2025-05-25 14:15', ip: '10.0.0.45' },
  { id: '3', type: 'deliverable', action: 'رفع مخرج', user: 'م. سارة الزهراني', details: 'تم رفع "التحليل المالي" لمشروع المجمع التجاري', timestamp: '2025-05-25 13:45' },
  { id: '4', type: 'finance', action: 'إصدار فاتورة', user: 'النظام', details: 'تم إصدار فاتورة INV-003 بقيمة 62,000 ر.س', timestamp: '2025-05-25 12:00' },
  { id: '5', type: 'project', action: 'تغيير حالة', user: 'خالد الرشيد', details: 'تم تغيير حالة مشروع "مصنع أغذية" إلى قيد التنفيذ', timestamp: '2025-05-25 11:30' },
  { id: '6', type: 'user', action: 'إضافة مستخدم', user: 'خالد الرشيد', details: 'تمت إضافة المهندس "م. ريم الحربي" للمنصة', timestamp: '2025-05-25 10:00' },
  { id: '7', type: 'system', action: 'تحديث إعدادات', user: 'خالد الرشيد', details: 'تم تحديث إعدادات الإشعارات', timestamp: '2025-05-25 09:30' },
  { id: '8', type: 'project', action: 'إسناد مهندس', user: 'خالد الرشيد', details: 'تم إسناد م. عبدالله الشمري لمشروع "مصنع أغذية"', timestamp: '2025-05-24 16:00' },
  { id: '9', type: 'deliverable', action: 'موافقة على مخرج', user: 'خالد الرشيد', details: 'تمت الموافقة على "المخططات المعمارية" لمشروع الفيلا', timestamp: '2025-05-24 15:00' },
  { id: '10', type: 'finance', action: 'صرف مستحقات', user: 'النظام', details: 'تم صرف 12,500 ر.س لـ م. نورة العتيبي', timestamp: '2025-05-24 14:00' },
  { id: '11', type: 'user', action: 'تسجيل خروج', user: 'محمد السالم', details: 'تسجيل خروج من جدة', timestamp: '2025-05-24 13:00' },
  { id: '12', type: 'project', action: 'تعليق', user: 'أحمد العمري', details: 'أضاف تعليقاً على مشروع "فيلا سكنية"', timestamp: '2025-05-24 12:30' },
];

const TYPE_CONFIG: Record<ActivityType, { label: string; icon: typeof Activity; color: string }> = {
  project: { label: 'مشاريع', icon: FolderOpen, color: 'blue' },
  user: { label: 'مستخدمون', icon: User, color: 'purple' },
  finance: { label: 'مالية', icon: DollarSign, color: 'emerald' },
  deliverable: { label: 'مخرجات', icon: FileText, color: 'cyan' },
  system: { label: 'نظام', icon: Shield, color: 'amber' },
};

export default function AdminActivityLog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType | 'all'>('all');

  const filtered = ACTIVITIES.filter(a => {
    const matchSearch = a.action.includes(search) || a.user.includes(search) || a.details.includes(search);
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="سجل النشاط"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'سجل النشاط' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-white">سجل النشاط</h1>
          <p className="text-sm text-muted-foreground">جميع الإجراءات والأحداث في المنصة</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('جارٍ التصدير...')}>
          <Download className="w-3.5 h-3.5" />
          تصدير
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-5 animate-fade-in">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث في السجل..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-1 flex-wrap">
            <button onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === 'all' ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
              الكل
            </button>
            {(Object.entries(TYPE_CONFIG) as [ActivityType, typeof TYPE_CONFIG[ActivityType]][]).map(([key, config]) => (
              <button key={key} onClick={() => setTypeFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === key ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-1">
        {filtered.map((activity, i) => {
          const config = TYPE_CONFIG[activity.type];
          const Icon = config.icon;
          return (
            <div key={activity.id} className="glass-card p-4 animate-fade-in-up hover:border-border/80 transition-all"
              style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-${config.color}-500/10`}>
                  <Icon className={`w-4 h-4 text-${config.color}-400`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground mx-1.5">—</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.details}</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activity.timestamp}
                      </p>
                      {activity.ip && (
                        <p className="text-xs text-muted-foreground/60 mt-0.5 font-mono">{activity.ip}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">لا توجد أنشطة تطابق البحث</p>
        </div>
      )}

      {/* Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" className="gap-2" onClick={() => toast.info('تحميل المزيد — قريباً')}>
          <ChevronDown className="w-4 h-4" />
          تحميل المزيد
        </Button>
      </div>
    </DashboardLayout>
  );
}
