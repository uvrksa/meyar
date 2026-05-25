// ============================================================
// MEYAAR — Admin Roles & Permissions (Complete)
// Features: Role management, permissions matrix, access control
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  Shield, Users, CheckCircle2, XCircle, Edit, Plus,
  Lock, Eye, Settings, FolderOpen, DollarSign, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const ROLES = [
  {
    id: 'admin', name: 'مدير النظام', description: 'صلاحيات كاملة على جميع أقسام المنصة',
    usersCount: 2, color: 'red', icon: Shield
  },
  {
    id: 'project_manager', name: 'مدير مشاريع', description: 'إدارة المشاريع وإسناد المهندسين ومتابعة التقدم',
    usersCount: 3, color: 'purple', icon: FolderOpen
  },
  {
    id: 'engineer', name: 'مهندس', description: 'تنفيذ المشاريع المسندة ورفع المخرجات',
    usersCount: 7, color: 'blue', icon: Settings
  },
  {
    id: 'client', name: 'عميل', description: 'إنشاء المشاريع ومتابعتها وتحميل المخرجات',
    usersCount: 32, color: 'cyan', icon: Users
  },
  {
    id: 'viewer', name: 'مشاهد', description: 'عرض المشاريع والتقارير فقط بدون تعديل',
    usersCount: 5, color: 'slate', icon: Eye
  },
];

const PERMISSIONS = [
  { category: 'المشاريع', items: ['إنشاء مشروع', 'تعديل مشروع', 'حذف مشروع', 'إسناد مهندس', 'تغيير الحالة'] },
  { category: 'المستخدمون', items: ['عرض المستخدمين', 'إضافة مستخدم', 'تعديل مستخدم', 'إيقاف مستخدم', 'حذف مستخدم'] },
  { category: 'المالية', items: ['عرض الفواتير', 'إصدار فاتورة', 'صرف مستحقات', 'تعديل الأسعار'] },
  { category: 'التقارير', items: ['عرض التحليلات', 'تصدير التقارير', 'عرض المالية'] },
  { category: 'الإعدادات', items: ['إعدادات النظام', 'إدارة الأدوار', 'سجل النشاط'] },
];

const ROLE_PERMISSIONS: Record<string, Record<string, boolean>> = {
  admin: Object.fromEntries(PERMISSIONS.flatMap(c => c.items.map(i => [i, true]))),
  project_manager: {
    'إنشاء مشروع': true, 'تعديل مشروع': true, 'حذف مشروع': false, 'إسناد مهندس': true, 'تغيير الحالة': true,
    'عرض المستخدمين': true, 'إضافة مستخدم': false, 'تعديل مستخدم': false, 'إيقاف مستخدم': false, 'حذف مستخدم': false,
    'عرض الفواتير': true, 'إصدار فاتورة': true, 'صرف مستحقات': false, 'تعديل الأسعار': false,
    'عرض التحليلات': true, 'تصدير التقارير': true, 'عرض المالية': false,
    'إعدادات النظام': false, 'إدارة الأدوار': false, 'سجل النشاط': true,
  },
  engineer: {
    'إنشاء مشروع': false, 'تعديل مشروع': false, 'حذف مشروع': false, 'إسناد مهندس': false, 'تغيير الحالة': true,
    'عرض المستخدمين': false, 'إضافة مستخدم': false, 'تعديل مستخدم': false, 'إيقاف مستخدم': false, 'حذف مستخدم': false,
    'عرض الفواتير': true, 'إصدار فاتورة': false, 'صرف مستحقات': false, 'تعديل الأسعار': false,
    'عرض التحليلات': false, 'تصدير التقارير': false, 'عرض المالية': false,
    'إعدادات النظام': false, 'إدارة الأدوار': false, 'سجل النشاط': false,
  },
  client: {
    'إنشاء مشروع': true, 'تعديل مشروع': false, 'حذف مشروع': false, 'إسناد مهندس': false, 'تغيير الحالة': false,
    'عرض المستخدمين': false, 'إضافة مستخدم': false, 'تعديل مستخدم': false, 'إيقاف مستخدم': false, 'حذف مستخدم': false,
    'عرض الفواتير': true, 'إصدار فاتورة': false, 'صرف مستحقات': false, 'تعديل الأسعار': false,
    'عرض التحليلات': false, 'تصدير التقارير': false, 'عرض المالية': false,
    'إعدادات النظام': false, 'إدارة الأدوار': false, 'سجل النشاط': false,
  },
  viewer: Object.fromEntries(PERMISSIONS.flatMap(c => c.items.map(i => [i, i.startsWith('عرض')]))),
};

export default function AdminRoles() {
  const [selectedRole, setSelectedRole] = useState('admin');

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="الصلاحيات والأدوار"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'الصلاحيات' }]}
    >
      {/* Roles Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {ROLES.map((role, i) => {
          const Icon = role.icon;
          return (
            <button key={role.id} onClick={() => setSelectedRole(role.id)}
              className={`glass-card p-4 text-right transition-all animate-fade-in-up ${
                selectedRole === role.id ? 'border-blue-500/50 bg-blue-500/5' : 'hover:border-border/80'
              }`} style={{ animationDelay: `${i * 50}ms` }}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-${role.color}-500/10`}>
                <Icon className={`w-4 h-4 text-${role.color}-400`} />
              </div>
              <p className="text-sm font-bold text-foreground">{role.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{role.usersCount} مستخدم</p>
            </button>
          );
        })}
      </div>

      {/* Permissions Matrix */}
      <div className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white">
              صلاحيات: {ROLES.find(r => r.id === selectedRole)?.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ROLES.find(r => r.id === selectedRole)?.description}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-8 text-xs"
            onClick={() => toast.info('تعديل الصلاحيات — قريباً')}>
            <Edit className="w-3 h-3" /> تعديل
          </Button>
        </div>

        <div className="space-y-5">
          {PERMISSIONS.map((category, ci) => (
            <div key={ci}>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Lock className="w-3 h-3" /> {category.category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {category.items.map((perm, pi) => {
                  const hasPermission = ROLE_PERMISSIONS[selectedRole]?.[perm] ?? false;
                  return (
                    <div key={pi} className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors ${
                      hasPermission ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-border bg-white/2'
                    }`}>
                      {hasPermission ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${hasPermission ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {perm}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
