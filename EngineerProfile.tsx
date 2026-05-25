// ============================================================
// MEYAAR — Engineer Professional Profile
// Features: Specializations, certifications, ratings, portfolio
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState } from 'react';
import {
  User, Award, Star, Briefcase, GraduationCap, MapPin,
  Mail, Phone, Calendar, Edit3, Shield, Target, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

const PROFILE = {
  name: 'م. سارة الزهراني',
  title: 'مهندسة مدنية أولى',
  email: 'sara@meyaar.sa',
  phone: '+966 55 123 4567',
  location: 'الرياض، المملكة العربية السعودية',
  joinDate: '2023-01-15',
  bio: 'مهندسة مدنية بخبرة 8 سنوات في تصميم وإدارة المشاريع الإنشائية والهندسية. متخصصة في دراسات الجدوى والتحليل الإنشائي.',
  rating: 4.8,
  totalRatings: 24,
  completedProjects: 18,
  activeProjects: 3,
};

const SPECIALIZATIONS = [
  { name: 'التصميم الإنشائي', level: 95 },
  { name: 'دراسات الجدوى', level: 90 },
  { name: 'إدارة المشاريع', level: 85 },
  { name: 'التحليل المالي', level: 80 },
  { name: 'التصميم المعماري', level: 70 },
  { name: 'الأنظمة الكهربائية', level: 60 },
];

const CERTIFICATIONS = [
  { name: 'عضوية الهيئة السعودية للمهندسين', issuer: 'الهيئة السعودية للمهندسين', date: '2023-03', status: 'active' as const },
  { name: 'PMP - إدارة المشاريع الاحترافية', issuer: 'PMI', date: '2022-06', status: 'active' as const },
  { name: 'LEED AP - الاستدامة البيئية', issuer: 'USGBC', date: '2021-11', status: 'active' as const },
  { name: 'شهادة AutoCAD المتقدمة', issuer: 'Autodesk', date: '2020-08', status: 'expired' as const },
];

const REVIEWS = [
  { client: 'أحمد العمري', project: 'فيلا الرياض', rating: 5, comment: 'عمل ممتاز واحترافية عالية. التسليم في الوقت المحدد.', date: '2025-04-20' },
  { client: 'محمد الشمري', project: 'مجمع تجاري', rating: 5, comment: 'دراسة شاملة ومفصلة. أنصح بالتعامل معها.', date: '2025-03-15' },
  { client: 'فهد القحطاني', project: 'مصنع الأغذية', rating: 4, comment: 'جودة عالية مع بعض التأخير البسيط.', date: '2025-02-10' },
];

export default function EngineerProfile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'specializations' | 'certifications' | 'reviews'>('overview');

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="الملف الشخصي"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'الملف الشخصي' }]}
    >
      {/* Profile Header */}
      <div className="glass-card p-6 mb-5 animate-fade-in">
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-white">{PROFILE.name}</h1>
                <p className="text-sm text-cyan-400 mt-0.5">{PROFILE.title}</p>
                <p className="text-xs text-muted-foreground mt-2 max-w-xl leading-relaxed">{PROFILE.bio}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-1 h-8 text-xs"
                onClick={() => toast.info('تعديل الملف الشخصي — قريباً')}>
                <Edit3 className="w-3 h-3" /> تعديل
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {PROFILE.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {PROFILE.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {PROFILE.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> انضمام: {PROFILE.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-lg font-bold text-white">{PROFILE.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">{PROFILE.totalRatings} تقييم</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-400">{PROFILE.completedProjects}</p>
            <p className="text-xs text-muted-foreground">مشروع مكتمل</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-cyan-400">{PROFILE.activeProjects}</p>
            <p className="text-xs text-muted-foreground">مشروع نشط</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-400">8</p>
            <p className="text-xs text-muted-foreground">سنوات خبرة</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto">
        {[
          { id: 'overview' as const, label: 'نظرة عامة' },
          { id: 'specializations' as const, label: 'التخصصات' },
          { id: 'certifications' as const, label: 'الشهادات' },
          { id: 'reviews' as const, label: 'التقييمات' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                : 'text-muted-foreground hover:bg-white/5 border border-transparent'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> أبرز التخصصات
              </h3>
              <div className="space-y-3">
                {SPECIALIZATIONS.slice(0, 4).map((spec, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground">{spec.name}</span>
                      <span className="text-xs text-cyan-300 font-mono">{spec.level}%</span>
                    </div>
                    <Progress value={spec.level} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> أحدث الشهادات
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.filter(c => c.status === 'active').slice(0, 3).map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" /> آخر التقييمات
              </h3>
              <div className="space-y-3">
                {REVIEWS.slice(0, 2).map((review, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/3 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground">{review.client}</span>
                        <span className="text-xs text-muted-foreground">• {review.project}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Specializations */}
        {activeTab === 'specializations' && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">التخصصات والمهارات</h3>
            <div className="space-y-4">
              {SPECIALIZATIONS.map((spec, i) => (
                <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground font-medium">{spec.name}</span>
                    <span className="text-xs text-cyan-300 font-mono">{spec.level}%</span>
                  </div>
                  <Progress value={spec.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    cert.status === 'active' ? 'bg-emerald-500/10' : 'bg-slate-500/10'
                  }`}>
                    <Award className={`w-5 h-5 ${cert.status === 'active' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{cert.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} • {cert.date}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        cert.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {cert.status === 'active' ? 'سارية' : 'منتهية'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="glass-card p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{PROFILE.rating}</p>
                  <div className="flex items-center gap-0.5 mt-1 justify-center">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < Math.round(PROFILE.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{PROFILE.totalRatings} تقييم</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const count = stars === 5 ? 18 : stars === 4 ? 4 : stars === 3 ? 2 : 0;
                    const pct = Math.round((count / PROFILE.totalRatings) * 100);
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-3">{stars}</span>
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground w-6">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {REVIEWS.map((review, i) => (
              <div key={i} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{review.client}</p>
                      <p className="text-xs text-muted-foreground">{review.project} • {review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
