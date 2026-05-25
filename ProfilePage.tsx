// ============================================================
// MEYAAR — Profile & Settings Page (Shared)
// Tabs: Profile | Security | Notifications | Preferences
// Design: Enterprise Dark Precision
// ============================================================

import { useState } from 'react';
import {
  User, Shield, Bell, Settings, Camera, Save,
  Eye, EyeOff, CheckCircle2, Phone, Mail, MapPin, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/components/DashboardLayout';
import type { UserRole } from '@/lib/mock-data';
import { toast } from 'sonner';

const TABS = [
  { id: 'profile', label: 'الملف الشخصي', icon: User },
  { id: 'security', label: 'الأمان', icon: Shield },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'preferences', label: 'التفضيلات', icon: Settings },
];

interface ProfilePageProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export default function ProfilePage({ role, userName = 'أحمد محمد العمري', userEmail = 'ahmed@example.com' }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState({
    emailMessages: true,
    emailProjects: true,
    emailBilling: true,
    smsMessages: false,
    smsProjects: true,
    smsBilling: true,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); toast.success('تم حفظ التغييرات بنجاح'); }, 1000);
  };

  return (
    <DashboardLayout
      role={role}
      userName={userName}
      userEmail={userEmail}
      pageTitle="الملف الشخصي"
      breadcrumbs={[{ label: 'لوحة التحكم', href: `/${role}` }, { label: 'الملف الشخصي' }]}
    >
      {/* Profile Header */}
      <div className="glass-card p-6 mb-6 animate-fade-in">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 flex items-center justify-center border border-blue-500/20">
              <span className="text-3xl font-bold text-blue-300">{userName[0]}</span>
            </div>
            <button onClick={() => toast.info('رفع الصورة قريباً')}
              className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center border-2 border-background hover:bg-blue-500 transition-colors">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{userName}</h2>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {role === 'client' ? 'عميل' : role === 'engineer' ? 'مهندس' : 'مدير'}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> حساب موثق
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-white/5'}`}>
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Profile ── */}
      {activeTab === 'profile' && (
        <div className="glass-card p-6 animate-fade-in max-w-2xl">
          <h3 className="text-sm font-bold text-white mb-5">المعلومات الشخصية</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">الاسم الأول</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="أحمد" className="bg-white/5 border-border pr-9" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">اسم العائلة</Label>
                <Input defaultValue="العمري" className="bg-white/5 border-border" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue={userEmail} className="bg-white/5 border-border pr-9" dir="ltr" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">رقم الجوال</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="+966 50 123 4567" className="bg-white/5 border-border pr-9" dir="ltr" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">الشركة / المؤسسة</Label>
              <div className="relative">
                <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="شركة العمري للاستثمار" className="bg-white/5 border-border pr-9" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">المدينة</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="الرياض" className="bg-white/5 border-border pr-9" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">نبذة شخصية</Label>
              <textarea defaultValue="مستثمر عقاري ومطور مشاريع صناعية وتجارية في المملكة العربية السعودية."
                rows={3}
                className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              حفظ التغييرات
            </Button>
          </div>
        </div>
      )}

      {/* ── Tab: Security ── */}
      {activeTab === 'security' && (
        <div className="glass-card p-6 animate-fade-in max-w-2xl">
          <h3 className="text-sm font-bold text-white mb-5">تغيير كلمة المرور</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">كلمة المرور الحالية</Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  className="bg-white/5 border-border pl-9" dir="ltr" />
                <button onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">كلمة المرور الجديدة</Label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-border" dir="ltr" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">تأكيد كلمة المرور</Label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-border" dir="ltr" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => toast.success('تم تغيير كلمة المرور')} className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
              <Shield className="w-4 h-4" />
              تغيير كلمة المرور
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-bold text-white mb-4">التحقق بخطوتين</h3>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">التحقق عبر الجوال</p>
                <p className="text-xs text-muted-foreground mt-0.5">إرسال رمز تحقق عند تسجيل الدخول</p>
              </div>
              <Switch onCheckedChange={() => toast.info('سيتم تفعيل هذه الميزة قريباً')} />
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Notifications ── */}
      {activeTab === 'notifications' && (
        <div className="glass-card p-6 animate-fade-in max-w-2xl">
          <h3 className="text-sm font-bold text-white mb-5">إعدادات الإشعارات</h3>
          <div className="space-y-5">
            {[
              {
                section: 'البريد الإلكتروني',
                items: [
                  { key: 'emailMessages', label: 'الرسائل الجديدة' },
                  { key: 'emailProjects', label: 'تحديثات المشاريع' },
                  { key: 'emailBilling', label: 'الفواتير والمدفوعات' },
                ],
              },
              {
                section: 'الرسائل النصية (SMS)',
                items: [
                  { key: 'smsMessages', label: 'الرسائل الجديدة' },
                  { key: 'smsProjects', label: 'تحديثات المشاريع' },
                  { key: 'smsBilling', label: 'الفواتير والمدفوعات' },
                ],
              },
            ].map(group => (
              <div key={group.section}>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{group.section}</p>
                <div className="space-y-3">
                  {group.items.map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl border border-border">
                      <p className="text-sm text-foreground">{item.label}</p>
                      <Switch
                        checked={notifPrefs[item.key as keyof typeof notifPrefs]}
                        onCheckedChange={v => setNotifPrefs(p => ({ ...p, [item.key]: v }))} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => toast.success('تم حفظ إعدادات الإشعارات')} className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
              <Save className="w-4 h-4" />
              حفظ الإعدادات
            </Button>
          </div>
        </div>
      )}

      {/* ── Tab: Preferences ── */}
      {activeTab === 'preferences' && (
        <div className="glass-card p-6 animate-fade-in max-w-2xl">
          <h3 className="text-sm font-bold text-white mb-5">تفضيلات العرض</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">اللغة</Label>
              <select className="w-full h-10 bg-white/5 border border-border rounded-lg px-3 text-sm text-foreground">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">المنطقة الزمنية</Label>
              <select className="w-full h-10 bg-white/5 border border-border rounded-lg px-3 text-sm text-foreground">
                <option value="AST">توقيت الرياض (GMT+3)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">العملة الافتراضية</Label>
              <select className="w-full h-10 bg-white/5 border border-border rounded-lg px-3 text-sm text-foreground">
                <option value="SAR">ريال سعودي (ر.س)</option>
                <option value="USD">دولار أمريكي ($)</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => toast.success('تم حفظ التفضيلات')} className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
              <Save className="w-4 h-4" />
              حفظ التفضيلات
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
