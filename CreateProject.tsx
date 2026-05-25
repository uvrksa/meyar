// ============================================================
// MEYAAR — Create Project (Multi-Step Wizard)
// Steps: 1. Project Info → 2. Study Options → 3. File Upload → 4. Review & Pricing
// Design: Enterprise Dark Precision
// ============================================================

import { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import {
  Building2, Route, Factory, Home, ShoppingBag, Layers,
  CheckCircle2, ChevronRight, ChevronLeft, Upload, X,
  FileText, Image, Table, File, Calculator, AlertCircle,
  Globe, Languages, DollarSign, Calendar, MapPin, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

// ── Types ──────────────────────────────────────────────────
interface ProjectForm {
  title: string;
  description: string;
  category: string;
  location: string;
  estimatedValue: number;
  timeline: string;
  priority: string;
  studyTypes: string[];
  language: string;
  files: UploadedFile[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
}

// ── Constants ──────────────────────────────────────────────
const CATEGORIES = [
  { id: 'infrastructure', label: 'بنية تحتية', icon: Layers, color: 'blue' },
  { id: 'roads', label: 'طرق وجسور', icon: Route, color: 'cyan' },
  { id: 'construction', label: 'إنشاءات', icon: Building2, color: 'purple' },
  { id: 'factory', label: 'مصانع', icon: Factory, color: 'amber' },
  { id: 'real_estate', label: 'عقارات', icon: Home, color: 'emerald' },
  { id: 'commercial', label: 'فرص تجارية', icon: ShoppingBag, color: 'rose' },
];

const STUDY_TYPES = [
  { id: 'technical', label: 'الدراسة الفنية', desc: 'تحليل تقني شامل للمشروع', price: 150 },
  { id: 'financial', label: 'الدراسة المالية', desc: 'تحليل مالي واقتصادي', price: 150 },
  { id: 'feasibility', label: 'دراسة الجدوى', desc: 'جدوى اقتصادية متكاملة', price: 150 },
  { id: 'pricing', label: 'تحليل التسعير', desc: 'تقييم وتسعير المشروع', price: 150 },
  { id: 'full', label: 'الباقة الكاملة', desc: 'جميع الدراسات بسعر مخفض', price: 450 },
];

const TIMELINES = ['أسبوع واحد', 'أسبوعان', 'شهر واحد', 'شهران', '3 أشهر', '6 أشهر'];
const PRIORITIES = [
  { id: 'low', label: 'منخفضة', color: 'text-gray-400' },
  { id: 'medium', label: 'متوسطة', color: 'text-amber-400' },
  { id: 'high', label: 'عالية', color: 'text-orange-400' },
  { id: 'urgent', label: 'عاجلة', color: 'text-red-400' },
];

const FILE_CATEGORIES = ['مخططات', 'وثائق قانونية', 'صور الموقع', 'دراسات سابقة', 'أخرى'];

// ── Pricing Engine ─────────────────────────────────────────
function calculatePrice(form: ProjectForm): { opening: number; base: number; multiplier: number; langMultiplier: number; total: number } {
  const opening = 50;
  const studyCount = form.studyTypes.includes('full') ? 1 : form.studyTypes.length;
  const base = studyCount * 150;

  const valueMillion = form.estimatedValue / 1_000_000;
  let multiplier = 1;
  if (valueMillion > 0) {
    multiplier = Math.pow(2, Math.floor(valueMillion));
    if (form.estimatedValue > 10_000_000) multiplier *= 1.2;
  }
  multiplier = Math.min(multiplier, 16); // cap at 16x

  const langMultiplier = form.language === 'both' ? 1.3 : 1;
  const total = Math.round((opening + base * multiplier) * langMultiplier);

  return { opening, base, multiplier, langMultiplier, total };
}

// ── Step Indicator ─────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ['معلومات المشروع', 'خيارات الدراسة', 'رفع الملفات', 'المراجعة والتسعير'];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < current ? 'bg-emerald-500 text-white' : i === current ? 'bg-blue-600 text-white' : 'bg-white/10 text-muted-foreground'}`}>
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1 hidden sm:block whitespace-nowrap ${i === current ? 'text-blue-300 font-medium' : 'text-muted-foreground'}`}>{step}</span>
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-px mx-2 transition-all ${i < current ? 'bg-emerald-500/50' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function CreateProject() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    category: '',
    location: '',
    estimatedValue: 0,
    timeline: '',
    priority: 'medium',
    studyTypes: [],
    language: 'arabic',
    files: [],
  });

  const update = (key: keyof ProjectForm, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleStudy = (id: string) => {
    if (id === 'full') {
      update('studyTypes', form.studyTypes.includes('full') ? [] : ['full']);
      return;
    }
    const filtered = form.studyTypes.filter(s => s !== 'full');
    if (filtered.includes(id)) {
      update('studyTypes', filtered.filter(s => s !== id));
    } else {
      update('studyTypes', [...filtered, id]);
    }
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, [form.files]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const addFiles = (newFiles: File[]) => {
    const mapped: UploadedFile[] = newFiles.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: f.type,
      category: 'أخرى',
    }));
    update('files', [...form.files, ...mapped]);
    toast.success(`تم إضافة ${newFiles.length} ملف`);
  };

  const removeFile = (id: string) =>
    update('files', form.files.filter(f => f.id !== id));

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    if (type.includes('sheet') || type.includes('excel')) return Table;
    return File;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const pricing = calculatePrice(form);

  const canNext = () => {
    if (step === 0) return form.title.trim() && form.category && form.location.trim();
    if (step === 1) return form.studyTypes.length > 0;
    return true;
  };

  const handleSubmit = () => {
    toast.success('تم إرسال طلب المشروع بنجاح! سيتواصل معك فريقنا قريباً.');
    setTimeout(() => navigate('/client/projects'), 1500);
  };

  return (
    <DashboardLayout
      role="client"
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle="مشروع جديد"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/client' }, { label: 'المشاريع', href: '/client/projects' }, { label: 'مشروع جديد' }]}
    >
      <div className="max-w-3xl mx-auto">
        <StepIndicator current={step} total={4} />

        {/* ── Step 0: Project Info ── */}
        {step === 0 && (
          <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-lg font-bold text-white mb-5">معلومات المشروع</h2>
            <div className="space-y-5">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">عنوان المشروع *</Label>
                <Input value={form.title} onChange={e => update('title', e.target.value)}
                  placeholder="مثال: دراسة جدوى مجمع سكني في الرياض"
                  className="bg-white/5 border-border h-11" />
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">وصف المشروع</Label>
                <Textarea value={form.description} onChange={e => update('description', e.target.value)}
                  placeholder="اكتب وصفاً مختصراً للمشروع وأهدافه..."
                  className="bg-white/5 border-border min-h-24 resize-none" rows={3} />
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-3 block">تصنيف المشروع *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = form.category === cat.id;
                    return (
                      <button key={cat.id} onClick={() => update('category', cat.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-right ${isSelected ? 'border-blue-500/60 bg-blue-500/10' : 'border-border hover:bg-white/5'}`}>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-muted-foreground'}`} />
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-blue-300' : 'text-foreground'}`}>{cat.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400 mr-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">موقع المشروع *</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={form.location} onChange={e => update('location', e.target.value)}
                      placeholder="المدينة، الحي" className="bg-white/5 border-border h-11 pr-9" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">القيمة التقديرية (ر.س)</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="number" value={form.estimatedValue || ''}
                      onChange={e => update('estimatedValue', Number(e.target.value))}
                      placeholder="0" className="bg-white/5 border-border h-11 pr-9" dir="ltr" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">مدة التنفيذ المتوقعة</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIMELINES.map(t => (
                      <button key={t} onClick={() => update('timeline', t)}
                        className={`px-2 py-2 rounded-lg text-xs border transition-all ${form.timeline === t ? 'border-blue-500/60 bg-blue-500/10 text-blue-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">مستوى الأولوية</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITIES.map(p => (
                      <button key={p.id} onClick={() => update('priority', p.id)}
                        className={`px-3 py-2 rounded-lg text-xs border transition-all ${form.priority === p.id ? 'border-blue-500/60 bg-blue-500/10' : 'border-border hover:bg-white/5'}`}>
                        <span className={form.priority === p.id ? 'text-blue-300' : p.color}>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Study Options ── */}
        {step === 1 && (
          <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-lg font-bold text-white mb-2">خيارات الدراسة</h2>
            <p className="text-sm text-muted-foreground mb-5">اختر نوع الدراسة أو الدراسات التي تحتاجها</p>

            <div className="space-y-3 mb-6">
              {STUDY_TYPES.map(study => {
                const isSelected = form.studyTypes.includes(study.id);
                const isDisabled = study.id !== 'full' && form.studyTypes.includes('full');
                return (
                  <button key={study.id} onClick={() => !isDisabled && toggleStudy(study.id)} disabled={isDisabled}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-right ${isSelected ? 'border-blue-500/60 bg-blue-500/10' : isDisabled ? 'border-border opacity-40 cursor-not-allowed' : 'border-border hover:bg-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-muted-foreground'}`}>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${isSelected ? 'text-blue-300' : 'text-foreground'}`}>{study.label}</p>
                        {study.id === 'full' && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">موصى به</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{study.desc}</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="text-sm font-bold text-cyan-400">{study.price.toLocaleString('ar-SA')} ر.س</p>
                      <p className="text-xs text-muted-foreground">أساسي</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">لغة الدراسة</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'arabic', label: 'عربي', icon: '🇸🇦' },
                  { id: 'english', label: 'إنجليزي', icon: '🇬🇧' },
                  { id: 'both', label: 'كلاهما', icon: '🌐', badge: '+30%' },
                ].map(lang => (
                  <button key={lang.id} onClick={() => update('language', lang.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${form.language === lang.id ? 'border-blue-500/60 bg-blue-500/10' : 'border-border hover:bg-white/5'}`}>
                    <span className="text-2xl">{lang.icon}</span>
                    <span className={`text-sm font-medium ${form.language === lang.id ? 'text-blue-300' : 'text-foreground'}`}>{lang.label}</span>
                    {lang.badge && <span className="text-xs text-amber-400">{lang.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: File Upload ── */}
        {step === 2 && (
          <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-lg font-bold text-white mb-2">رفع الملفات</h2>
            <p className="text-sm text-muted-foreground mb-5">ارفع المستندات والملفات المتعلقة بمشروعك (اختياري)</p>

            {/* Drop Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all mb-5 ${isDragging ? 'border-blue-500/60 bg-blue-500/10' : 'border-border hover:border-blue-500/40 hover:bg-white/3'}`}
            >
              <input type="file" multiple accept=".pdf,.dwg,.xlsx,.xls,.png,.jpg,.jpeg"
                onChange={handleFileInput} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-blue-400' : 'text-muted-foreground'}`} />
              <p className="text-sm font-medium text-foreground mb-1">اسحب وأفلت الملفات هنا</p>
              <p className="text-xs text-muted-foreground">أو انقر للاختيار</p>
              <div className="flex items-center justify-center gap-3 mt-3">
                {['PDF', 'DWG', 'Excel', 'صور'].map(t => (
                  <span key={t} className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded border border-border">{t}</span>
                ))}
              </div>
            </div>

            {/* File List */}
            {form.files.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">{form.files.length} ملف مرفق</p>
                {form.files.map(file => {
                  const Icon = getFileIcon(file.type);
                  return (
                    <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white/3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                      </div>
                      <select value={file.category}
                        onChange={e => update('files', form.files.map(f => f.id === file.id ? { ...f, category: e.target.value } : f))}
                        className="text-xs bg-white/5 border border-border rounded-lg px-2 py-1 text-muted-foreground">
                        {FILE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <button onClick={() => removeFile(file.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {form.files.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-2">يمكنك تخطي هذه الخطوة وإضافة الملفات لاحقاً</p>
            )}
          </div>
        )}

        {/* ── Step 3: Review & Pricing ── */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            {/* Project Summary */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4">ملخص المشروع</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'عنوان المشروع', value: form.title || '—' },
                  { label: 'التصنيف', value: CATEGORIES.find(c => c.id === form.category)?.label || '—' },
                  { label: 'الموقع', value: form.location || '—' },
                  { label: 'القيمة التقديرية', value: form.estimatedValue ? `${form.estimatedValue.toLocaleString('ar-SA')} ر.س` : '—' },
                  { label: 'مدة التنفيذ', value: form.timeline || '—' },
                  { label: 'الأولوية', value: PRIORITIES.find(p => p.id === form.priority)?.label || '—' },
                  { label: 'الدراسات المطلوبة', value: form.studyTypes.map(s => STUDY_TYPES.find(st => st.id === s)?.label).join('، ') || '—' },
                  { label: 'لغة الدراسة', value: form.language === 'arabic' ? 'عربي' : form.language === 'english' ? 'إنجليزي' : 'كلاهما' },
                  { label: 'الملفات المرفقة', value: `${form.files.length} ملف` },
                ].map((item, i) => (
                  <div key={i} className={i === 0 ? 'col-span-2' : ''}>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="glass-card p-5" style={{ border: '1px solid oklch(0.52 0.20 258 / 30%)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">تفاصيل التسعير</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">رسوم فتح الملف</span>
                  <span className="text-foreground font-medium">{pricing.opening} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">رسوم الدراسة الأساسية</span>
                  <span className="text-foreground font-medium">{pricing.base} ر.س</span>
                </div>
                {pricing.multiplier > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">معامل القيمة التقديرية</span>
                    <span className="text-amber-400 font-medium">× {pricing.multiplier.toFixed(1)}</span>
                  </div>
                )}
                {pricing.langMultiplier > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">معامل اللغة المزدوجة</span>
                    <span className="text-amber-400 font-medium">× {pricing.langMultiplier}</span>
                  </div>
                )}
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between">
                  <span className="text-base font-bold text-white">الإجمالي المقدر</span>
                  <span className="text-xl font-bold text-cyan-400">{pricing.total.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">السعر تقديري ويخضع للمراجعة النهائية من قِبل فريق معيار بعد دراسة تفاصيل المشروع.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/client/projects')}
            className="gap-2 text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-4 h-4" />
            {step === 0 ? 'إلغاء' : 'السابق'}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{step + 1} / 4</span>
            {step < 3 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                التالي
                <ChevronLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                <Zap className="w-4 h-4" />
                إرسال الطلب
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
