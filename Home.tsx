// ============================================================
// MEYAAR — Landing Page
// Design: Enterprise Dark Precision
// Sections: Hero, Stats, Services, How It Works, Features,
//           Testimonials, Pricing, CTA, Footer
// ============================================================

import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft, Building2, BarChart3, Factory, Home as HomeIcon,
  ShoppingBag, Layers, CheckCircle2, Star, ChevronDown,
  Zap, Shield, Globe, Clock, Users, TrendingUp, Menu, X,
  ArrowUpRight, Play, Award, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/hero-bg-QTzUMxttTvsCrVb2qghXa7.webp';
const DASHBOARD_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/dashboard-preview-BioyVtmtyz32vM3MqVb6WA.webp';
const ENGINEERING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/engineering-abstract-9CakZfd7S8mGwDv5mhsmMC.webp';
const TEAM_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/team-collaboration-Q7SgnXytyrfSFZ8EDWn6tM.webp';
const SERVICES_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663693354136/mxdHWFbkskM6xX9GpteyD4/services-bg-X7vHYFG82nQtTR7xnMP5iB.webp';

const SERVICES = [
  { icon: Building2, title: 'الدراسات الهندسية', desc: 'تحليل شامل للمشاريع الهندسية بأعلى معايير الجودة والدقة', color: 'blue' },
  { icon: BarChart3, title: 'الجدوى المالية', desc: 'دراسات جدوى اقتصادية ومالية متكاملة لاتخاذ قرارات استثمارية مدروسة', color: 'cyan' },
  { icon: Layers, title: 'تقييم البنية التحتية', desc: 'تقييم دقيق للبنية التحتية وتحديد متطلبات التطوير والتحديث', color: 'purple' },
  { icon: HomeIcon, title: 'المشاريع العقارية', desc: 'دراسات متخصصة للمشاريع العقارية السكنية والتجارية', color: 'green' },
  { icon: Factory, title: 'دراسات المصانع', desc: 'تحليل شامل لإنشاء وتطوير المنشآت الصناعية والمصانع', color: 'amber' },
  { icon: ShoppingBag, title: 'الفرص التجارية', desc: 'تحليل عميق للفرص التجارية وتقييم الجدوى الاستثمارية', color: 'rose' },
];

const STATS = [
  { value: '500+', label: 'مشروع منجز', icon: Target },
  { value: '47+', label: 'عميل موثوق', icon: Users },
  { value: '98%', label: 'معدل الرضا', icon: Star },
  { value: '8+', label: 'سنوات خبرة', icon: Award },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'رفع المشروع', desc: 'يقوم العميل برفع تفاصيل المشروع ومتطلباته عبر المنصة', icon: ArrowUpRight },
  { step: '02', title: 'تعيين المهندس', desc: 'يقوم الفريق بتعيين المهندس المناسب وفق تخصص المشروع', icon: Users },
  { step: '03', title: 'التحليل والدراسة', desc: 'يعمل المهندس على إعداد الدراسة الشاملة بأعلى معايير الجودة', icon: BarChart3 },
  { step: '04', title: 'التسليم والمتابعة', desc: 'تسليم التقرير النهائي مع إمكانية المتابعة والاستفسار', icon: CheckCircle2 },
];

const FEATURES = [
  { icon: Zap, title: 'سرعة التنفيذ', desc: 'نظام متكامل يضمن إنجاز الدراسات في أقصر وقت ممكن' },
  { icon: Shield, title: 'أمان البيانات', desc: 'حماية كاملة لبيانات مشاريعك بأحدث معايير التشفير' },
  { icon: Globe, title: 'إمكانية الوصول', desc: 'وصول من أي مكان وعلى أي جهاز في أي وقت' },
  { icon: Clock, title: 'متابعة لحظية', desc: 'تتبع تقدم مشروعك لحظة بلحظة عبر لوحة تحكم ذكية' },
  { icon: TrendingUp, title: 'تقارير تحليلية', desc: 'تقارير مفصلة وتحليلات بيانية احترافية لكل مشروع' },
  { icon: Users, title: 'فريق متخصص', desc: 'مهندسون معتمدون ذوو خبرة واسعة في مختلف التخصصات' },
];

const TESTIMONIALS = [
  {
    name: 'م. عبدالله الحارثي',
    role: 'مدير التطوير — شركة الخليج للاستثمار',
    text: 'منصة معيار غيّرت طريقة عملنا كلياً. الدراسات التي كانت تستغرق أشهراً أصبحت تنجز في أسابيع بجودة استثنائية.',
    rating: 5,
  },
  {
    name: 'أ. نورة السعيد',
    role: 'رئيسة قسم المشاريع — مجموعة الفيصل',
    text: 'الشفافية الكاملة في متابعة المشاريع وجودة التقارير المقدمة جعلتنا نثق بمعيار كشريك استراتيجي.',
    rating: 5,
  },
  {
    name: 'م. فهد العتيبي',
    role: 'مستثمر عقاري',
    text: 'استثمرت في 3 مشاريع بناءً على دراسات معيار، وكانت النتائج أفضل من التوقعات في جميع الحالات.',
    rating: 5,
  },
];

const PRICING_PLANS = [
  {
    name: 'الأساسي',
    price: '2,500',
    period: 'لكل مشروع',
    desc: 'مثالي للمشاريع الصغيرة والمتوسطة',
    features: ['دراسة جدوى أساسية', 'تقرير PDF احترافي', 'مراجعة واحدة', 'دعم عبر البريد', 'تسليم خلال 14 يوم'],
    cta: 'ابدأ الآن',
    highlighted: false,
  },
  {
    name: 'المتقدم',
    price: '5,500',
    period: 'لكل مشروع',
    desc: 'الخيار الأمثل للمشاريع الكبيرة',
    features: ['دراسة شاملة متعمقة', 'تقرير تفاعلي + PDF', '3 مراجعات', 'دعم أولوية 24/7', 'تسليم خلال 10 أيام', 'تحليل المنافسين', 'خطة تنفيذية'],
    cta: 'ابدأ الآن',
    highlighted: true,
  },
  {
    name: 'المؤسسي',
    price: 'تواصل معنا',
    period: '',
    desc: 'حلول مخصصة للمؤسسات الكبرى',
    features: ['دراسات غير محدودة', 'مهندس مخصص', 'مراجعات غير محدودة', 'دعم مباشر 24/7', 'تسليم سريع', 'لوحة تحكم مخصصة', 'تكامل API'],
    cta: 'تواصل معنا',
    highlighted: false,
  },
];

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'الخدمات', href: '#services' },
  { label: 'كيف يعمل', href: '#how-it-works' },
  { label: 'الأسعار', href: '#pricing' },
  { label: 'تجربة المنصة', href: '#demo' },
  { label: 'تواصل معنا', href: '#contact' },
];

const COLOR_MAP: Record<string, { icon: string; glow: string; border: string }> = {
  blue: { icon: 'text-blue-400', glow: 'bg-blue-500/10', border: 'border-blue-500/20' },
  cyan: { icon: 'text-cyan-400', glow: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  purple: { icon: 'text-purple-400', glow: 'bg-purple-500/10', border: 'border-purple-500/20' },
  green: { icon: 'text-emerald-400', glow: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  amber: { icon: 'text-amber-400', glow: 'bg-amber-500/10', border: 'border-amber-500/20' },
  rose: { icon: 'text-rose-400', glow: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ background: 'oklch(0.11 0.04 260 / 90%)', backdropFilter: 'blur(16px)', borderBottom: '1px solid oklch(1 0 0 / 6%)' }}>
        <div className="container h-full flex items-center justify-between" style={{ maxWidth: '1200px' }}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
              <span className="text-white font-bold text-base"></span>
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none block" style={{ width: '88px', height: '24px' }}>مِعيار</span>
              <span className="text-muted-foreground text-base font-black" style={{ display: 'grid' }}>Meyar</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
                ابدأ مجاناً
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">تسجيل الدخول</Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-500">ابدأ مجاناً</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero Section ── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.11 0.04 260 / 95%) 0%, oklch(0.11 0.04 260 / 70%) 50%, oklch(0.11 0.04 260 / 90%) 100%)' }} />
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.52 0.20 258), transparent)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.15 200), transparent)' }} />

        <div className="container relative z-10" style={{ maxWidth: '1200px' }}>
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 animate-fade-in"
              style={{ background: 'oklch(0.52 0.20 258 / 10%)', borderColor: 'oklch(0.52 0.20 258 / 30%)' }}>
              <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px oklch(0.72 0.15 200)' }} />
              <span className="text-cyan-300 font-medium" style={{ fontSize: '24px' }}>منصة دراسة وتسعير المشاريع الإنشائية والأستثمارية الرائدة في المملكة</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-100">
              دراسات هندسية
              <br />
              <span className="gradient-text">بمعايير عالمية</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200">
              منصة متكاملة تربط شركات المقاولات بأفضل المهندسين المتخصصين لإعداد عروض اسعار ودراسات الجدوى والتحليلات الهندسية الشاملة — من الفكرة إلى القرار.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white gap-2 h-12 px-8 text-base">
                  ابدأ مشروعك الآن
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-white/20 text-white hover:bg-white/5">
                <Play className="w-4 h-4" />
                شاهد كيف يعمل
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 animate-fade-in-up delay-400">
              {[
                { icon: CheckCircle2, text: 'بدون رسوم إضافية' },
                { icon: Shield, text: 'بيانات آمنة 100%' },
                { icon: Clock, text: 'تسليم في الموعد' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={SERVICES_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container relative z-10" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="py-24 overflow-hidden">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">لوحة التحكم</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              تحكم كامل في مشاريعك
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              لوحة تحكم ذكية تمنحك رؤية شاملة لجميع مشاريعك وتقدمها في مكان واحد
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 animate-scale-in"
            style={{ boxShadow: '0 20px 80px oklch(0.52 0.20 258 / 20%)' }}>
            <img src={DASHBOARD_IMG} alt="لوحة تحكم معيار" className="w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={ENGINEERING_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="container relative z-10" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">خدماتنا</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              حلول هندسية متكاملة
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              نقدم مجموعة شاملة من الدراسات والتحليلات الهندسية لدعم قراراتك الاستثمارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const colors = COLOR_MAP[service.color];
              const Icon = service.icon;
              return (
                <div key={i}
                  className={`glass-card p-6 border ${colors.border} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.glow}`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">كيف يعمل</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              أربع خطوات للنجاح
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              عملية بسيطة وشفافة من رفع المشروع حتى استلام الدراسة الكاملة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258 / 20%), oklch(0.72 0.15 200 / 10%))', border: '1px solid oklch(0.52 0.20 258 / 30%)' }}>
                    <step.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-24 border-y border-border">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">المميزات</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                لماذا تختار معيار؟
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                نجمع بين التكنولوجيا المتقدمة والخبرة الهندسية العميقة لنقدم لك تجربة استثنائية في إعداد الدراسات والتحليلات.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <feature.icon className="w-4.5 h-4.5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={TEAM_IMG} alt="فريق معيار" className="w-full" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl border border-white/10 animate-scale-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">تم إنجاز الدراسة</p>
                    <p className="text-xs text-muted-foreground">مشروع مجمع الرياض السكني</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">آراء العملاء</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ماذا يقول عملاؤنا
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-300 font-semibold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 border-t border-border">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">الأسعار</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              خطط تناسب جميع الاحتياجات
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              أسعار شفافة بدون رسوم خفية — اختر الخطة المناسبة لمشروعك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i}
                className={`rounded-2xl p-6 border animate-fade-in-up relative ${plan.highlighted
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'glass-card'}`}
                style={{ animationDelay: `${i * 100}ms` }}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">الأكثر شيوعاً</span>
                  </div>
                )}
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-l from-blue-500 to-cyan-400" />
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm mr-1">ر.س / {plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'border-white/20 hover:bg-white/5 text-white'}`}
                    variant={plan.highlighted ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258 / 15%), oklch(0.72 0.15 200 / 8%))', border: '1px solid oklch(0.52 0.20 258 / 30%)' }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              جاهز لبدء مشروعك؟
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              انضم إلى أكثر من 47 عميلاً يثقون في معيار لإنجاز دراساتهم الهندسية
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white gap-2 h-12 px-8">
                  ابدأ مجاناً الآن
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/5">
                  تواصل مع الفريق
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Access Section ── */}
      <section id="demo" className="py-20 border-t border-border">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: 'oklch(0.52 0.20 258 / 10%)', color: 'oklch(0.72 0.15 200)', border: '1px solid oklch(0.52 0.20 258 / 20%)' }}>
              تجربة المنصة
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              استكشف لوحات التحكم
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              ادخل مباشرة إلى لوحات التحكم الثلاث لاستكشاف كامل للمنصة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Client Dashboard */}
            <Link href="/client">
              <div className="group rounded-2xl p-6 border border-border hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
                style={{ background: 'oklch(0.15 0.04 258 / 60%)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'oklch(0.72 0.15 200 / 15%)' }}>
                  <Users className="w-6 h-6" style={{ color: 'oklch(0.72 0.15 200)' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">لوحة العميل</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  إنشاء المشاريع، متابعة التقدم، الفواتير، الرسائل، التقارير
                </p>
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <span>دخول كعميل</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Engineer Dashboard */}
            <Link href="/engineer">
              <div className="group rounded-2xl p-6 border border-border hover:border-blue-500/40 transition-all duration-300 cursor-pointer"
                style={{ background: 'oklch(0.15 0.04 258 / 60%)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'oklch(0.52 0.20 258 / 15%)' }}>
                  <Building2 className="w-6 h-6" style={{ color: 'oklch(0.62 0.20 258)' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">لوحة المهندس</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  مساحة العمل، المهام، المخرجات، طلبات التوضيح، تحليلات الأداء
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <span>دخول كمهندس</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Admin Dashboard */}
            <Link href="/admin">
              <div className="group rounded-2xl p-6 border border-border hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
                style={{ background: 'oklch(0.15 0.04 258 / 60%)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'oklch(0.55 0.15 310 / 15%)' }}>
                  <Shield className="w-6 h-6" style={{ color: 'oklch(0.65 0.15 310)' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">لوحة الإدارة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  إدارة المشاريع، المهندسين، العملاء، المالية، التحليلات
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
                  <span>دخول كمدير</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            هذه نسخة تجريبية ببيانات وهمية — يمكنك التنقل بحرية بين جميع الصفحات
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="border-t border-border py-16">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, oklch(0.52 0.20 258), oklch(0.72 0.15 200))' }}>
                  <span className="text-white font-bold">م</span>
                </div>
                <span className="text-white font-bold text-xl">معيار</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                منصة الدراسات الهندسية والجدوى الاقتصادية الرائدة في المملكة العربية السعودية.
              </p>
              <div className="flex gap-3 mt-6">
                {['تويتر', 'لينكدإن', 'واتساب'].map(s => (
                  <button key={s} className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground border border-border hover:bg-white/5 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">المنصة</h4>
              <ul className="space-y-2">
                {['الخدمات', 'الأسعار', 'كيف يعمل', 'الأسئلة الشائعة'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>info@meyaar.sa</li>
                <li>+966 11 XXX XXXX</li>
                <li>الرياض، المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>

          <div className="section-divider mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2025 معيار — جميع الحقوق محفوظة</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-foreground transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
