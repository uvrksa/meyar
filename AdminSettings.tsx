// ============================================================
// MEYAAR — Admin Settings (Complete Advanced)
// Features: General, Notifications, Security, Pricing, Integrations
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState } from 'react';
import {
  Settings, Bell, Shield, Globe, Palette, Save, DollarSign,
  Mail, Phone, MapPin, Building2, Link2, Key, Database,
  Zap, Clock, FileText, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { toast } from 'sonner';

type SettingsTab = 'general' | 'notifications' | 'security' | 'pricing' | 'integrations';

const TABS: { id: SettingsTab; label: string; icon: typeof Settings }[] = [
  { id: 'general', label: 'عام', icon: Settings },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'security', label: 'الأمان', icon: Shield },
  { id: 'pricing', label: 'التسعير', icon: DollarSign },
  { id: 'integrations', label: 'التكاملات', icon: Link2 },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-blue-600' : 'bg-white/10'}`}>
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${value ? 'right-1' : 'left-1'}`} />
    </button>
  );

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="الإعدادات"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'الإعدادات' }]}
    >
      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0 hidden lg:block">
          <div className="glass-card p-2 sticky top-4">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 ${
                    activeTab === tab.id ? 'bg-blue-600/20 text-blue-300 font-medium' : 'text-muted-foreground hover:bg-white/5'
                  }`}>
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-1 overflow-x-auto pb-3 mb-4 w-full">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* General */}
          {activeTab === 'general' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-6">
                <SectionHeader title="معلومات المنصة" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">اسم المنصة</Label>
                    <Input defaultValue="معيار — Meyaar" className="bg-white/5 border-border h-10" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">النطاق</Label>
                    <Input defaultValue="meyaar.sa" className="bg-white/5 border-border h-10" dir="ltr" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">البريد الرسمي</Label>
                    <Input defaultValue="info@meyaar.sa" className="bg-white/5 border-border h-10" dir="ltr" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">رقم الهاتف</Label>
                    <Input defaultValue="+966 11 XXX XXXX" className="bg-white/5 border-border h-10" dir="ltr" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-muted-foreground mb-1.5 block">العنوان</Label>
                    <Input defaultValue="الرياض، المملكة العربية السعودية" className="bg-white/5 border-border h-10" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-muted-foreground mb-1.5 block">وصف المنصة</Label>
                    <Textarea defaultValue="منصة معيار — حلول هندسية متكاملة لدراسات الجدوى والاستشارات الفنية" className="bg-white/5 border-border min-h-20" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <SectionHeader title="الشعار والهوية" />
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center border border-border">
                    <Building2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2 mb-1" onClick={() => toast.info('رفع شعار — قريباً')}>
                      <Upload className="w-3.5 h-3.5" /> تغيير الشعار
                    </Button>
                    <p className="text-xs text-muted-foreground">PNG أو SVG، بحد أقصى 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="glass-card p-6 animate-fade-in">
              <SectionHeader title="إعدادات الإشعارات" />
              <div className="space-y-4">
                {[
                  { label: 'إشعارات البريد الإلكتروني', desc: 'إرسال إشعارات المشاريع والتحديثات عبر البريد', value: emailNotif, onChange: setEmailNotif, icon: Mail },
                  { label: 'إشعارات SMS', desc: 'إرسال تنبيهات عاجلة عبر الرسائل النصية', value: smsNotif, onChange: setSmsNotif, icon: Phone },
                  { label: 'إشعارات المتصفح', desc: 'إشعارات فورية في المتصفح', value: pushNotif, onChange: setPushNotif, icon: Bell },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-white/2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <Toggle value={item.value} onChange={item.onChange} />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <SectionHeader title="أحداث الإشعارات" />
                <div className="space-y-2">
                  {['مشروع جديد', 'تغيير حالة مشروع', 'رفع مخرج', 'فاتورة جديدة', 'رسالة جديدة', 'تسجيل مستخدم جديد'].map((event, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                      <span className="text-sm text-foreground">{event}</span>
                      <Toggle value={true} onChange={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-5 animate-fade-in">
              <div className="glass-card p-6">
                <SectionHeader title="إعدادات الأمان" />
                <div className="space-y-4">
                  {[
                    { label: 'التحقق الثنائي (2FA)', desc: 'إلزام جميع المستخدمين بالتحقق الثنائي', value: twoFactor, onChange: setTwoFactor },
                    { label: 'انتهاء الجلسة التلقائي', desc: 'إنهاء الجلسة بعد 30 دقيقة من عدم النشاط', value: sessionTimeout, onChange: setSessionTimeout },
                    { label: 'قائمة IP المسموحة', desc: 'تقييد الوصول لعناوين IP محددة', value: ipWhitelist, onChange: setIpWhitelist },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-white/2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Toggle value={item.value} onChange={item.onChange} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <SectionHeader title="سياسة كلمات المرور" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">الحد الأدنى للطول</Label>
                    <Input defaultValue="8" type="number" className="bg-white/5 border-border h-10" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">مدة صلاحية كلمة المرور (يوم)</Label>
                    <Input defaultValue="90" type="number" className="bg-white/5 border-border h-10" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing */}
          {activeTab === 'pricing' && (
            <div className="glass-card p-6 animate-fade-in">
              <SectionHeader title="إعدادات التسعير" />
              <p className="text-xs text-muted-foreground mb-5">تحديد الأسعار الأساسية لأنواع الدراسات</p>
              <div className="space-y-3">
                {[
                  { type: 'دراسة جدوى اقتصادية', basePrice: 15000 },
                  { type: 'دراسة فنية', basePrice: 12000 },
                  { type: 'دراسة بيئية', basePrice: 10000 },
                  { type: 'تحليل مالي', basePrice: 8000 },
                  { type: 'تقييم مخاطر', basePrice: 7000 },
                  { type: 'دراسة سوق', basePrice: 9000 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-white/2">
                    <span className="text-sm text-foreground">{item.type}</span>
                    <div className="flex items-center gap-2">
                      <Input defaultValue={item.basePrice.toString()} className="bg-white/5 border-border h-8 w-24 text-xs text-left" dir="ltr" />
                      <span className="text-xs text-muted-foreground">ر.س</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">نسبة المنصة (%)</Label>
                    <Input defaultValue="15" type="number" className="bg-white/5 border-border h-10" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">ضريبة القيمة المضافة (%)</Label>
                    <Input defaultValue="15" type="number" className="bg-white/5 border-border h-10" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="glass-card p-6 animate-fade-in">
              <SectionHeader title="التكاملات الخارجية" />
              <div className="space-y-4">
                {[
                  { name: 'بوابة الدفع (Moyasar)', status: 'متصل', connected: true },
                  { name: 'خدمة البريد (SendGrid)', status: 'متصل', connected: true },
                  { name: 'خدمة SMS (Unifonic)', status: 'غير متصل', connected: false },
                  { name: 'التخزين السحابي (AWS S3)', status: 'متصل', connected: true },
                  { name: 'Google Analytics', status: 'غير متصل', connected: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-white/2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.connected ? 'bg-emerald-500/10' : 'bg-slate-500/10'}`}>
                        <Zap className={`w-4 h-4 ${item.connected ? 'text-emerald-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className={`text-xs ${item.connected ? 'text-emerald-400' : 'text-muted-foreground'}`}>{item.status}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs"
                      onClick={() => toast.info(item.connected ? 'إعدادات التكامل' : 'ربط الخدمة — قريباً')}>
                      {item.connected ? 'إعدادات' : 'ربط'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button onClick={() => toast.success('تم حفظ الإعدادات بنجاح')}
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white gap-2 mt-5">
            <Save className="w-4 h-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
