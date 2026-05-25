// ============================================================
// MEYAAR — Dashboard Layout (Enterprise Final Release)
// Shared layout for Client, Engineer, and Admin dashboards
// Features: Collapsible sidebar, sticky topbar, responsive,
//           Command Palette, role switching, notifications
// Design: Enterprise Dark Precision
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard, FolderOpen, Users, Settings, Bell, Search,
  ChevronRight, LogOut, Menu, X, Building2, Wrench, BarChart3,
  FileText, MessageSquare, CreditCard, CheckSquare, Shield,
  TrendingUp, UserCog, Briefcase, Home, DollarSign, AlertCircle,
  Activity, PanelRightClose, PanelRightOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { mockNotifications } from '@/lib/mock-data';
import type { UserRole } from '@/lib/mock-data';
import CommandPalette from './CommandPalette';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
  section?: string;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  client: [
    { label: 'لوحة التحكم', icon: LayoutDashboard, href: '/client', section: 'رئيسي' },
    { label: 'مشاريعي', icon: FolderOpen, href: '/client/projects', section: 'رئيسي' },
    { label: 'التقارير', icon: BarChart3, href: '/client/reports', section: 'رئيسي' },
    { label: 'الرسائل', icon: MessageSquare, href: '/client/messages', badge: 2, section: 'تواصل' },
    { label: 'الإشعارات', icon: Bell, href: '/client/notifications', badge: 3, section: 'تواصل' },
    { label: 'الفواتير', icon: CreditCard, href: '/client/billing', section: 'حسابي' },
    { label: 'الملف الشخصي', icon: UserCog, href: '/client/profile', section: 'حسابي' },
    { label: 'الإعدادات', icon: Settings, href: '/client/settings', section: 'حسابي' },
  ],
  engineer: [
    { label: 'لوحة التحكم', icon: LayoutDashboard, href: '/engineer', section: 'رئيسي' },
    { label: 'المشاريع المسندة', icon: Briefcase, href: '/engineer/projects', section: 'رئيسي' },
    { label: 'مساحة العمل', icon: Wrench, href: '/engineer/workspace', section: 'رئيسي' },
    { label: 'المهام', icon: CheckSquare, href: '/engineer/tasks', badge: 4, section: 'العمل' },
    { label: 'المخرجات', icon: FileText, href: '/engineer/deliverables', section: 'العمل' },
    { label: 'طلبات التوضيح', icon: AlertCircle, href: '/engineer/clarifications', badge: 2, section: 'العمل' },
    { label: 'الرسائل', icon: MessageSquare, href: '/engineer/messages', badge: 1, section: 'تواصل' },
    { label: 'الإشعارات', icon: Bell, href: '/engineer/notifications', section: 'تواصل' },
    { label: 'تحليلات الأداء', icon: TrendingUp, href: '/engineer/performance', section: 'حسابي' },
    { label: 'الملف الشخصي', icon: UserCog, href: '/engineer/profile', section: 'حسابي' },
  ],
  admin: [
    { label: 'لوحة التحكم', icon: LayoutDashboard, href: '/admin', section: 'رئيسي' },
    { label: 'جميع المشاريع', icon: FolderOpen, href: '/admin/projects', section: 'رئيسي' },
    { label: 'إدارة المهندسين', icon: Building2, href: '/admin/engineers', section: 'إدارة' },
    { label: 'إدارة العملاء', icon: Users, href: '/admin/clients', section: 'إدارة' },
    { label: 'التحليلات', icon: BarChart3, href: '/admin/analytics', section: 'تقارير' },
    { label: 'الإدارة المالية', icon: DollarSign, href: '/admin/finance', section: 'تقارير' },
    { label: 'مراجعة المخرجات', icon: FileText, href: '/admin/deliverables', badge: 3, section: 'عمليات' },
    { label: 'الصلاحيات', icon: Shield, href: '/admin/roles', section: 'عمليات' },
    { label: 'سجل النشاط', icon: Activity, href: '/admin/activity-log', section: 'عمليات' },
    { label: 'الإشعارات', icon: Bell, href: '/admin/notifications', badge: 5, section: 'تواصل' },
    { label: 'الرسائل', icon: MessageSquare, href: '/admin/messages', section: 'تواصل' },
    { label: 'إعدادات النظام', icon: Settings, href: '/admin/settings', section: 'نظام' },
  ],
  super_admin: [
    { label: 'لوحة التحكم', icon: LayoutDashboard, href: '/admin', section: 'رئيسي' },
    { label: 'جميع المشاريع', icon: FolderOpen, href: '/admin/projects', section: 'رئيسي' },
    { label: 'إدارة المهندسين', icon: Building2, href: '/admin/engineers', section: 'إدارة' },
    { label: 'إدارة العملاء', icon: Users, href: '/admin/clients', section: 'إدارة' },
    { label: 'التحليلات', icon: BarChart3, href: '/admin/analytics', section: 'تقارير' },
    { label: 'الإدارة المالية', icon: DollarSign, href: '/admin/finance', section: 'تقارير' },
    { label: 'مراجعة المخرجات', icon: FileText, href: '/admin/deliverables', badge: 3, section: 'عمليات' },
    { label: 'الصلاحيات', icon: Shield, href: '/admin/roles', section: 'عمليات' },
    { label: 'سجل النشاط', icon: Activity, href: '/admin/activity-log', section: 'عمليات' },
    { label: 'الإشعارات', icon: Bell, href: '/admin/notifications', section: 'تواصل' },
    { label: 'الرسائل', icon: MessageSquare, href: '/admin/messages', section: 'تواصل' },
    { label: 'إعدادات النظام', icon: Settings, href: '/admin/settings', section: 'نظام' },
  ],
};

const ROLE_LABELS: Record<UserRole, string> = {
  client: 'عميل',
  engineer: 'مهندس',
  admin: 'مدير',
  super_admin: 'مدير عام',
};

const ROLE_COLORS: Record<UserRole, string> = {
  client: 'text-cyan-400',
  engineer: 'text-blue-400',
  admin: 'text-purple-400',
  super_admin: 'text-amber-400',
};

const ROLE_DOT_COLORS: Record<UserRole, string> = {
  client: 'bg-cyan-400',
  engineer: 'bg-blue-400',
  admin: 'bg-purple-400',
  super_admin: 'bg-amber-400',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName?: string;
  userEmail?: string;
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function DashboardLayout({
  children,
  role,
  userName = 'أحمد العمري',
  userEmail = 'ahmed@example.com',
  pageTitle,
  breadcrumbs = [],
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [location] = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);

  const navItems = NAV_ITEMS[role];
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location]);

  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');

  // Group nav items by section
  const sections = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const section = item.section || 'أخرى';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  const roleForCommand = role === 'super_admin' ? 'admin' : role;

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} role={roleForCommand} />

      {/* ── Mobile Overlay ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-50 flex flex-col
          transition-all duration-200
          bg-sidebar border-l border-sidebar-border
          ${sidebarCollapsed ? 'w-[68px]' : 'w-[260px]'}
          ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        style={{ boxShadow: '0 0 40px rgba(0,0,0,0.4)' }}
      >
        {/* Logo */}
        <div className={`flex items-center h-14 border-b border-sidebar-border px-4 flex-shrink-0 ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
            <span className="text-white font-bold text-sm">م</span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-foreground font-bold text-sm leading-tight">معيار</span>
              <span className="text-muted-foreground text-[10px]">Meyaar Platform</span>
            </div>
          )}
        </div>

        {/* Role Badge */}
        {!sidebarCollapsed && (
          <div className="px-3 py-2 border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: 'oklch(1 0 0 / 3%)' }}>
              <div className={`w-2 h-2 rounded-full ${ROLE_DOT_COLORS[role]} flex-shrink-0`} style={{ boxShadow: '0 0 6px currentColor' }} />
              <span className={`text-xs font-semibold ${ROLE_COLORS[role]}`}>{ROLE_LABELS[role]}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section}>
              {!sidebarCollapsed && (
                <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-3 pt-3 pb-1">{section}</p>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href || (item.href !== '/client' && item.href !== '/engineer' && item.href !== '/admin' && location.startsWith(item.href));

                const navLink = (
                  <Link key={item.href} href={item.href}>
                    <div className={`
                      flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 cursor-pointer
                      transition-all duration-150
                      ${isActive
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent'
                      }
                      ${sidebarCollapsed ? 'justify-center px-2' : ''}
                    `}>
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-[13px] font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge className="h-5 min-w-5 text-[10px] px-1.5 bg-blue-500/20 text-blue-300 border-blue-500/30 font-semibold">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                );

                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.href} delayDuration={0}>
                      <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                      <TooltipContent side="left" className="text-xs">
                        {item.label}
                        {item.badge ? ` (${item.badge})` : ''}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
                return navLink;
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-2">
          {sidebarCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex justify-center py-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-blue-500/20 text-blue-300">{initials}</AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">{userName}</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs bg-blue-500/20 text-blue-300">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{userName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{userEmail}</p>
              </div>
              <Link href="/">
                <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
              </Link>
            </div>
          )}
        </div>

        {/* Collapse Toggle (desktop) */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -left-3 top-20 w-6 h-6 rounded-full items-center justify-center border border-border bg-card hover:bg-accent transition-all z-10"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          {sidebarCollapsed ? (
            <PanelRightOpen className="w-3 h-3 text-muted-foreground" />
          ) : (
            <PanelRightClose className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      </aside>

      {/* ── Main Content ── */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${sidebarCollapsed ? 'lg:mr-[68px]' : 'lg:mr-[260px]'}`}
      >
        {/* ── Topbar ── */}
        <header className="sticky top-0 z-30 h-14 flex items-center gap-3 px-4 lg:px-6 border-b border-border"
          style={{ background: 'oklch(0.13 0.045 258 / 95%)', backdropFilter: 'blur(12px)' }}>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-muted-foreground"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Breadcrumbs / Page Title */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {breadcrumbs.length > 0 ? (
              <nav className="flex items-center gap-1 text-sm">
                <Link href={`/${role === 'super_admin' ? 'admin' : role}`}>
                  <Home className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-muted-foreground rotate-180" />
                    {crumb.href ? (
                      <Link href={crumb.href}>
                        <span className="text-muted-foreground hover:text-foreground transition-colors">{crumb.label}</span>
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            ) : (
              pageTitle && <h1 className="text-base font-semibold text-foreground truncate">{pageTitle}</h1>
            )}
          </div>

          {/* Search (Command Palette Trigger) */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-white/5 transition-colors border border-border/50 hover:border-border"
            style={{ minWidth: '180px' }}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">بحث...</span>
            <kbd className="mr-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
          </button>

          {/* Mobile search */}
          <button
            onClick={() => setCommandOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-muted-foreground"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold"
                    style={{ boxShadow: '0 0 8px oklch(0.62 0.21 260 / 50%)' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card border-border">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">الإشعارات</p>
                  <p className="text-xs text-muted-foreground">{unreadCount} غير مقروءة</p>
                </div>
                <Link href={`/${role === 'super_admin' ? 'admin' : role}/notifications`}>
                  <span className="text-xs text-blue-400 hover:text-blue-300 transition-colors">عرض الكل</span>
                </Link>
              </div>
              {mockNotifications.slice(0, 4).map(n => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    {!n.read && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" style={{ boxShadow: '0 0 4px oklch(0.72 0.15 260)' }} />}
                    <span className={`text-sm font-medium flex-1 ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>{n.title}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pr-4 line-clamp-1">{n.body}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Link href={`/${role === 'super_admin' ? 'admin' : role}/notifications`}>
                <DropdownMenuItem className="text-center text-sm text-blue-400 justify-center cursor-pointer">
                  عرض جميع الإشعارات
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-[10px] bg-blue-500/20 text-blue-300">{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-foreground">{userName.split(' ')[0]}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <div className="px-3 py-2">
                <p className="font-medium text-sm text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${ROLE_DOT_COLORS[role]}`} />
                  <span className={`text-[10px] font-medium ${ROLE_COLORS[role]}`}>{ROLE_LABELS[role]}</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link href={`/${role === 'super_admin' ? 'admin' : role}/profile`}>
                <DropdownMenuItem className="cursor-pointer">
                  <UserCog className="w-4 h-4 ml-2" />
                  الملف الشخصي
                </DropdownMenuItem>
              </Link>
              <Link href={`/${role === 'super_admin' ? 'admin' : role}/settings`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 ml-2" />
                  الإعدادات
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {/* Role Switch (Demo) */}
              <div className="px-2 py-1.5">
                <p className="text-[10px] text-muted-foreground font-medium mb-1.5 px-1">تبديل الدور (تجريبي)</p>
                <div className="flex gap-1">
                  <Link href="/client">
                    <button className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${role === 'client' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-muted-foreground hover:text-foreground'}`}>
                      عميل
                    </button>
                  </Link>
                  <Link href="/engineer">
                    <button className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${role === 'engineer' ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-muted-foreground hover:text-foreground'}`}>
                      مهندس
                    </button>
                  </Link>
                  <Link href="/admin">
                    <button className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${role === 'admin' || role === 'super_admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-muted-foreground hover:text-foreground'}`}>
                      مدير
                    </button>
                  </Link>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
