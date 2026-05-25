// ============================================================
// MEYAAR — Notifications Page (Shared)
// Features: Filter by type, mark all as read, delete
// Design: Enterprise Dark Precision
// ============================================================

import { useState } from 'react';
import {
  Bell, CheckCircle2, MessageSquare, FileText, CreditCard,
  AlertCircle, Info, Trash2, CheckCheck, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

type NotifType = 'all' | 'message' | 'project' | 'billing' | 'system';

interface Notification {
  id: string;
  type: 'message' | 'project' | 'billing' | 'system';
  title: string;
  desc: string;
  time: string;
  read: boolean;
  icon: typeof Bell;
  iconColor: string;
  iconBg: string;
}

const INITIAL_NOTIFS: Notification[] = [
  { id: 'n1', type: 'message', title: 'رسالة جديدة من م. سارة الزهراني', desc: 'نعم، نحتاج شهادة ملكية الأرض وعقد الإيجار إن وجد.', time: 'منذ 10 دقائق', read: false, icon: MessageSquare, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
  { id: 'n2', type: 'project', title: 'تم تحديث حالة مشروعك', desc: 'مشروع: مجمع سكني الرياض — تم تغيير الحالة إلى "قيد التنفيذ"', time: 'منذ ساعة', read: false, icon: CheckCircle2, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
  { id: 'n3', type: 'billing', title: 'فاتورة جديدة بانتظار الدفع', desc: 'INV-003 — الدراسة المالية — 1,200 ر.س', time: 'منذ 3 ساعات', read: false, icon: CreditCard, iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  { id: 'n4', type: 'project', title: 'تم رفع مخرج جديد', desc: 'تقرير الدراسة الفنية الأولية جاهز للتحميل', time: 'منذ يوم', read: true, icon: FileText, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10' },
  { id: 'n5', type: 'system', title: 'مرحباً بك في معيار!', desc: 'تم إنشاء حسابك بنجاح. يمكنك الآن إنشاء مشروعك الأول.', time: 'منذ 3 أيام', read: true, icon: Info, iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/10' },
  { id: 'n6', type: 'message', title: 'رسالة من الإدارة', desc: 'تم تعيين المهندسة سارة الزهراني للعمل على مشروعكم.', time: 'منذ 5 أيام', read: true, icon: MessageSquare, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
  { id: 'n7', type: 'system', title: 'تحديث في سياسة الخصوصية', desc: 'تم تحديث سياسة الخصوصية وشروط الاستخدام. يرجى المراجعة.', time: 'منذ أسبوع', read: true, icon: AlertCircle, iconColor: 'text-red-400', iconBg: 'bg-red-500/10' },
];

const TYPE_FILTERS: { id: NotifType; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'message', label: 'الرسائل' },
  { id: 'project', label: 'المشاريع' },
  { id: 'billing', label: 'الفواتير' },
  { id: 'system', label: 'النظام' },
];

interface Props {
  role?: 'client' | 'engineer' | 'admin';
}

export default function NotificationsPage({ role = 'client' }: Props) {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [filter, setFilter] = useState<NotifType>('all');

  const unreadCount = notifs.filter(n => !n.read).length;
  const filtered = filter === 'all' ? notifs : notifs.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('تم تحديد جميع الإشعارات كمقروءة');
  };

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
    toast.success('تم حذف الإشعار');
  };

  return (
    <DashboardLayout
      role={role}
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle="الإشعارات"
      breadcrumbs={[{ label: 'لوحة التحكم', href: `/${role}` }, { label: 'الإشعارات' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            الإشعارات
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-600 text-white">{unreadCount}</span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">{unreadCount} إشعار غير مقروء</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" onClick={markAllRead}
            className="gap-2 text-blue-400 border border-blue-500/30 h-9 text-sm">
            <CheckCheck className="w-4 h-4" />
            تحديد الكل كمقروء
          </Button>
        )}
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {TYPE_FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${filter === f.id ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-white/5 border border-border'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">لا توجد إشعارات</p>
          </div>
        ) : (
          filtered.map((notif, i) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id}
                onClick={() => markRead(notif.id)}
                className={`glass-card p-4 cursor-pointer transition-all animate-fade-in-up group ${!notif.read ? 'border-blue-500/20 bg-blue-500/3' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                    <Icon className={`w-5 h-5 ${notif.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!notif.read ? 'text-white' : 'text-foreground'}`}>{notif.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                        <button onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{notif.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}
