// ============================================================
// MEYAAR — Login Page
// Design: Enterprise Dark Precision
// ============================================================

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/hero-bg-QTzUMxttTvsCrVb2qghXa7.webp';

export default function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'client' | 'engineer' | 'admin'>('client');
  const [loading, setLoading] = useState(false);

  const ROLE_ROUTES: Record<string, string> = {
    client: '/client',
    engineer: '/engineer',
    admin: '/admin',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(ROLE_ROUTES[role]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Left: Visual Panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.11 0.04 260 / 80%), oklch(0.14 0.05 258 / 60%))' }} />
        <div className="absolute inset-0 flex flex-col justify-center p-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
              <span className="text-white font-bold text-lg">م</span>
            </div>
            <span className="text-white font-bold text-2xl">معيار</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            منصة الدراسات
            <br />
            <span className="gradient-text">الهندسية المتكاملة</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md">
            دراسات جدوى احترافية، تحليلات هندسية دقيقة، وقرارات استثمارية مدروسة.
          </p>
          <div className="mt-12 space-y-4">
            {[
              'أكثر من 500 مشروع منجز بنجاح',
              'فريق من أفضل المهندسين المعتمدين',
              'تقارير شاملة بمعايير دولية',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 py-12">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
            <span className="text-white font-bold">م</span>
          </div>
          <span className="text-white font-bold text-xl">معيار</span>
        </div>

        <div className="animate-fade-in-up">
          <h1 className="text-2xl font-bold text-white mb-2">مرحباً بعودتك</h1>
          <p className="text-muted-foreground mb-8">سجّل دخولك للوصول إلى لوحة التحكم</p>

          {/* Role Selector */}
          <div className="mb-6">
            <Label className="text-sm text-muted-foreground mb-3 block">نوع الحساب</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'client', label: 'عميل' },
                { value: 'engineer', label: 'مهندس' },
                { value: 'admin', label: 'مدير' },
              ].map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value as typeof role)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all border ${role === r.value
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                    : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                defaultValue="demo@meyaar.sa"
                className="bg-white/5 border-border text-foreground placeholder:text-muted-foreground h-11"
                dir="ltr"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">
                  كلمة المرور
                </Label>
                <Link href="/forgot-password">
                  <span className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                    نسيت كلمة المرور؟
                  </span>
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  defaultValue="demo1234"
                  className="bg-white/5 border-border text-foreground placeholder:text-muted-foreground h-11 pl-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white gap-2"
              disabled={loading}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{' '}
              <Link href="/signup">
                <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium">
                  إنشاء حساب جديد
                </span>
              </Link>
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-border">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              بياناتك محمية بتشفير SSL 256-bit. نحن لا نشارك معلوماتك مع أي طرف ثالث.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
