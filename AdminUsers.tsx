// ============================================================
// MEYAAR — Admin Users Management
// ============================================================

import { useState } from 'react';
import { UserPlus, Search, Shield, Mail, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { mockUsers } from '@/lib/mock-data';
import type { UserRole } from '@/lib/mock-data';
import { toast } from 'sonner';

const ROLE_LABELS: Record<UserRole, string> = {
  client: 'عميل',
  engineer: 'مهندس',
  admin: 'مدير',
  super_admin: 'مدير عام',
};

const ROLE_STYLES: Record<UserRole, string> = {
  client: 'bg-blue-500/10 text-blue-300',
  engineer: 'bg-cyan-500/10 text-cyan-300',
  admin: 'bg-purple-500/10 text-purple-300',
  super_admin: 'bg-amber-500/10 text-amber-300',
};

const EXTENDED_USERS = [
  ...mockUsers,
  { id: 'u4', name: 'م. محمد الغامدي', email: 'mghamdi@meyaar.sa', role: 'engineer' as UserRole, company: 'معيار', phone: '+966 50 111 2222', createdAt: '2024-03-10' },
  { id: 'u5', name: 'فاطمة الشهري', email: 'fshahri@example.com', role: 'client' as UserRole, company: 'شركة الشهري للتطوير', phone: '+966 55 333 4444', createdAt: '2024-06-20' },
  { id: 'u6', name: 'م. عمر القحطاني', email: 'oqahtani@meyaar.sa', role: 'engineer' as UserRole, company: 'معيار', phone: '+966 56 555 6666', createdAt: '2023-11-05' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const filtered = EXTENDED_USERS.filter(u => {
    const matchSearch = u.name.includes(search) || u.email.includes(search);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="إدارة المستخدمين"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'إدارة المستخدمين' }]}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">إدارة المستخدمين</h1>
          <p className="text-sm text-muted-foreground">{EXTENDED_USERS.length} مستخدم مسجل</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2" onClick={() => toast.info('قريباً: إضافة مستخدم')}>
          <UserPlus className="w-4 h-4" />
          مستخدم جديد
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="ابحث بالاسم أو البريد..." value={search} onChange={e => setSearch(e.target.value)}
            className="pr-9 bg-white/5 border-border" />
        </div>
        <div className="flex gap-2">
          {(['all', 'client', 'engineer', 'admin'] as const).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex-shrink-0 ${roleFilter === r
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                : 'border-border text-muted-foreground hover:bg-white/5'}`}>
              {r === 'all' ? 'الكل' : ROLE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right text-xs text-muted-foreground font-medium p-4">المستخدم</th>
                <th className="text-right text-xs text-muted-foreground font-medium p-4">الدور</th>
                <th className="text-right text-xs text-muted-foreground font-medium p-4 hidden md:table-cell">الشركة</th>
                <th className="text-right text-xs text-muted-foreground font-medium p-4 hidden lg:table-cell">الجوال</th>
                <th className="text-right text-xs text-muted-foreground font-medium p-4 hidden lg:table-cell">تاريخ التسجيل</th>
                <th className="text-right text-xs text-muted-foreground font-medium p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-300 font-semibold text-sm">{user.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_STYLES[user.role]}`}>
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5" />
                      {user.company || '—'}
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      {user.phone || '—'}
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-xs text-muted-foreground">{user.createdAt}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-blue-400" onClick={() => toast.info('قريباً: تعديل المستخدم')}>
                        تعديل
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400" onClick={() => toast.error('قريباً: حذف المستخدم')}>
                        حذف
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
