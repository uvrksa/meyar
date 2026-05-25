// ============================================================
// MEYAAR — Signup Page
// ============================================================

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ENGINEERING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/engineering-abstract-9CakZfd7S8mGwDv5mhsmMC.webp';

export default function Signup() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'client' | 'engineer'>('client');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === 'client' ? '/client' : '/engineer');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Left: Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src={ENGINEERING_IMG} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.11 0.04 260 / 85%), oklch(0.14 0.05 258 / 65%))' }} />
        <div className="absolute inset-0 flex flex-col justify-center p-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
              <span className="text-white font-bold text-lg">م</span>
            </div>
            <span className="text-white font-bold text-2xl">معيار</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            انضم إلى
            <br />
            <span className="gradient-text">مجتمع معيار</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md mb-10">
            سجّل حسابك وابدأ رحلتك نحو قرارات استثمارية مدروسة ودراسات هندسية احترافية.
          </p>
          <div className="space-y-3">
            {[
              'إنشاء حساب مجاني في دقيقة واحدة',
              'وصول فوري لجميع خدمات المنصة',
              'دعم فني متخصص على مدار الساعة',
              'تقارير احترافية بمعايير دولية',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 py-12 overflow-y-auto">
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
            <span className="text-white font-bold">م</span>
          </div>
          <span className="text-white font-bold text-xl">معيار</span>
        </div>

        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground mb-8">أنشئ حسابك وابدأ مشروعك الأول</p>

          {/* Role Selector */}
          <div className="mb-6">
            <Label className="text-sm text-muted-foreground mb-3 block">أنا...</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'client', label: 'عميل / مستثمر', desc: 'أريد دراسة مشروعي' },
                { value: 'engineer', label: 'مهندس متخصص', desc: 'أريد تقديم خدماتي' },
              ].map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value as typeof role)}
                  className={`p-3 rounded-xl text-right transition-all border ${role === r.value
                    ? 'bg-blue-600/15 border-blue-500/50'
                    : 'border-border hover:bg-white/5'}`}>
                  <p className={`text-sm font-semibold ${role === r.value ? 'text-blue-300' : 'text-foreground'}`}>{r.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">الاسم الأول</Label>
                <Input placeholder="أحمد" className="bg-white/5 border-border h-10" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">اسم العائلة</Label>
                <Input placeholder="العمري" className="bg-white/5 border-border h-10" />
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">البريد الإلكتروني</Label>
              <Input type="email" placeholder="example@email.com" className="bg-white/5 border-border h-10" dir="ltr" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">رقم الجوال</Label>
              <Input type="tel" placeholder="+966 5X XXX XXXX" className="bg-white/5 border-border h-10" dir="ltr" />
            </div>

            {role === 'engineer' && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">التخصص الهندسي</Label>
                <Input placeholder="هندسة مدنية، معمارية، ..." className="bg-white/5 border-border h-10" />
              </div>
            )}

            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">كلمة المرور</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8 أحرف على الأقل"
                  className="bg-white/5 border-border h-10 pl-10"
                  dir="ltr"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white gap-2 mt-2" disabled={loading}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  إنشاء الحساب
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            بالتسجيل، أنت توافق على{' '}
            <a href="#" className="text-blue-400 hover:underline">شروط الاستخدام</a>
            {' '}و{' '}
            <a href="#" className="text-blue-400 hover:underline">سياسة الخصوصية</a>
          </p>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              لديك حساب بالفعل؟{' '}
              <Link href="/login">
                <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium">
                  تسجيل الدخول
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
