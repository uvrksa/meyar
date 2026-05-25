// ============================================================
// MEYAAR — Global Command Palette
// Smart search & quick navigation across the entire platform
// Keyboard shortcut: ⌘K / Ctrl+K
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard, FolderOpen, Users, Settings, Bell,
  Building2, Wrench, BarChart3, FileText, MessageSquare,
  CreditCard, CheckSquare, Shield, TrendingUp, UserCog,
  Briefcase, DollarSign, AlertCircle, Search, Plus,
  Home, LogOut, ArrowLeft
} from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: 'client' | 'engineer' | 'admin';
}

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  group: string;
}

const CLIENT_ROUTES: SearchResult[] = [
  { id: 'c-dash', title: 'لوحة التحكم', subtitle: 'الرئيسية', icon: LayoutDashboard, href: '/client', group: 'التنقل' },
  { id: 'c-proj', title: 'مشاريعي', subtitle: 'عرض جميع المشاريع', icon: FolderOpen, href: '/client/projects', group: 'التنقل' },
  { id: 'c-new', title: 'مشروع جديد', subtitle: 'إنشاء مشروع جديد', icon: Plus, href: '/client/projects/new', group: 'إجراءات سريعة' },
  { id: 'c-msg', title: 'الرسائل', subtitle: 'المحادثات', icon: MessageSquare, href: '/client/messages', group: 'التنقل' },
  { id: 'c-bill', title: 'الفواتير', subtitle: 'المدفوعات والفواتير', icon: CreditCard, href: '/client/billing', group: 'التنقل' },
  { id: 'c-notif', title: 'الإشعارات', icon: Bell, href: '/client/notifications', group: 'التنقل' },
  { id: 'c-prof', title: 'الملف الشخصي', icon: UserCog, href: '/client/profile', group: 'التنقل' },
  { id: 'c-set', title: 'الإعدادات', icon: Settings, href: '/client/settings', group: 'التنقل' },
];

const ENGINEER_ROUTES: SearchResult[] = [
  { id: 'e-dash', title: 'لوحة التحكم', subtitle: 'الرئيسية', icon: LayoutDashboard, href: '/engineer', group: 'التنقل' },
  { id: 'e-proj', title: 'المشاريع المسندة', subtitle: 'مشاريعي الحالية', icon: Briefcase, href: '/engineer/projects', group: 'التنقل' },
  { id: 'e-work', title: 'مساحة العمل', subtitle: 'بيئة العمل الهندسية', icon: Wrench, href: '/engineer/workspace', group: 'التنقل' },
  { id: 'e-task', title: 'المهام', subtitle: 'إدارة المهام', icon: CheckSquare, href: '/engineer/tasks', group: 'التنقل' },
  { id: 'e-deliv', title: 'المخرجات', subtitle: 'رفع وإدارة المخرجات', icon: FileText, href: '/engineer/deliverables', group: 'التنقل' },
  { id: 'e-clar', title: 'طلبات التوضيح', icon: AlertCircle, href: '/engineer/clarifications', group: 'التنقل' },
  { id: 'e-msg', title: 'الرسائل', icon: MessageSquare, href: '/engineer/messages', group: 'التنقل' },
  { id: 'e-perf', title: 'تحليلات الأداء', icon: TrendingUp, href: '/engineer/performance', group: 'التنقل' },
  { id: 'e-prof', title: 'الملف الشخصي', icon: UserCog, href: '/engineer/profile', group: 'التنقل' },
];

const ADMIN_ROUTES: SearchResult[] = [
  { id: 'a-dash', title: 'لوحة التحكم', subtitle: 'الرئيسية', icon: LayoutDashboard, href: '/admin', group: 'التنقل' },
  { id: 'a-proj', title: 'جميع المشاريع', subtitle: 'إدارة المشاريع', icon: FolderOpen, href: '/admin/projects', group: 'التنقل' },
  { id: 'a-eng', title: 'إدارة المهندسين', icon: Building2, href: '/admin/engineers', group: 'التنقل' },
  { id: 'a-cli', title: 'إدارة العملاء', icon: Users, href: '/admin/clients', group: 'التنقل' },
  { id: 'a-anal', title: 'التحليلات', icon: BarChart3, href: '/admin/analytics', group: 'التنقل' },
  { id: 'a-fin', title: 'الإدارة المالية', icon: DollarSign, href: '/admin/finance', group: 'التنقل' },
  { id: 'a-deliv', title: 'مراجعة المخرجات', icon: FileText, href: '/admin/deliverables', group: 'التنقل' },
  { id: 'a-role', title: 'الصلاحيات والأدوار', icon: Shield, href: '/admin/roles', group: 'التنقل' },
  { id: 'a-log', title: 'سجل النشاط', icon: AlertCircle, href: '/admin/activity-log', group: 'التنقل' },
  { id: 'a-set', title: 'إعدادات النظام', icon: Settings, href: '/admin/settings', group: 'التنقل' },
  { id: 'a-notif', title: 'الإشعارات', icon: Bell, href: '/admin/notifications', group: 'التنقل' },
];

const MOCK_PROJECTS: SearchResult[] = [
  { id: 'p1', title: 'دراسة جدوى مجمع سكني', subtitle: 'قيد التنفيذ', icon: FolderOpen, href: '/client/projects/1', group: 'المشاريع' },
  { id: 'p2', title: 'تقييم مصنع بتروكيماويات', subtitle: 'قيد المراجعة', icon: FolderOpen, href: '/client/projects/2', group: 'المشاريع' },
  { id: 'p3', title: 'دراسة مركز تجاري', subtitle: 'مكتمل', icon: FolderOpen, href: '/client/projects/3', group: 'المشاريع' },
];

const MOCK_USERS: SearchResult[] = [
  { id: 'u1', title: 'م. سارة الزهراني', subtitle: 'مهندسة — هندسة مدنية', icon: Users, href: '/admin/engineers', group: 'المستخدمون' },
  { id: 'u2', title: 'م. فهد العتيبي', subtitle: 'مهندس — دراسات جدوى', icon: Users, href: '/admin/engineers', group: 'المستخدمون' },
  { id: 'u3', title: 'أحمد محمد العمري', subtitle: 'عميل', icon: Users, href: '/admin/clients', group: 'المستخدمون' },
];

export default function CommandPalette({ open, onOpenChange, role = 'client' }: CommandPaletteProps) {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState('');

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = useCallback((href: string) => {
    onOpenChange(false);
    setSearch('');
    navigate(href);
  }, [navigate, onOpenChange]);

  const roleRoutes = role === 'client' ? CLIENT_ROUTES : role === 'engineer' ? ENGINEER_ROUTES : ADMIN_ROUTES;

  const quickActions: SearchResult[] = [
    ...(role === 'client' ? [{ id: 'qa-new', title: 'إنشاء مشروع جديد', subtitle: 'بدء مشروع', icon: Plus, href: '/client/projects/new', group: 'إجراءات سريعة' }] : []),
    { id: 'qa-home', title: 'العودة للرئيسية', icon: Home, href: '/', group: 'إجراءات سريعة' },
    { id: 'qa-logout', title: 'تسجيل الخروج', icon: LogOut, href: '/', group: 'إجراءات سريعة' },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div dir="rtl">
        <CommandInput
          placeholder="ابحث عن صفحة، مشروع، مستخدم..."
          value={search}
          onValueChange={setSearch}
          className="text-right"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            <div className="py-6 text-center">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">لا توجد نتائج لـ "{search}"</p>
            </div>
          </CommandEmpty>

          {/* Quick Actions */}
          <CommandGroup heading="إجراءات سريعة">
            {quickActions.map(item => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                  </div>
                  <ArrowLeft className="w-3 h-3 text-muted-foreground" />
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* Navigation */}
          <CommandGroup heading="التنقل">
            {roleRoutes.filter(r => r.group === 'التنقل').map(item => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.subtitle || ''}`}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.title}</p>
                    {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* Projects */}
          <CommandGroup heading="المشاريع">
            {MOCK_PROJECTS.map(item => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.subtitle || ''}`}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          {/* Users (admin only) */}
          {role === 'admin' && (
            <>
              <CommandSeparator />
              <CommandGroup heading="المستخدمون">
                {MOCK_USERS.map(item => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      value={`${item.title} ${item.subtitle || ''}`}
                      onSelect={() => handleSelect(item.href)}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
        </CommandList>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-border">↑↓</kbd>
              للتنقل
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-border">↵</kbd>
              للفتح
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-border">Esc</kbd>
            للإغلاق
          </span>
        </div>
      </div>
    </CommandDialog>
  );
}
