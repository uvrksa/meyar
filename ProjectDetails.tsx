// ============================================================
// MEYAAR — Project Details Page (Client)
// Tabs: Overview | Files | Messages | Activity | Deliverables | Billing
// Design: Enterprise Dark Precision
// ============================================================

import { useState } from 'react';
import { useRoute } from 'wouter';
import {
  FolderOpen, FileText, MessageSquare, Activity, Download,
  CreditCard, CheckCircle2, Clock, User, MapPin, DollarSign,
  Calendar, Send, Paperclip, File, Image, Table as TableIcon,
  Eye, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { StatusBadge, PriorityBadge, ProgressBar } from '@/components/SharedComponents';
import { mockProjects } from '@/lib/mock-data';
import { toast } from 'sonner';

// ── Mock Data ───────────────────────────────────────────────
const MOCK_FILES = [
  { id: 'f1', name: 'مخططات الموقع الرئيسية.pdf', size: '4.2 MB', type: 'pdf', category: 'مخططات', uploadedAt: '2025-05-10', uploadedBy: 'أحمد العمري' },
  { id: 'f2', name: 'دراسة التربة.pdf', size: '2.8 MB', type: 'pdf', category: 'دراسات سابقة', uploadedAt: '2025-05-12', uploadedBy: 'م. سارة الزهراني' },
  { id: 'f3', name: 'صور الموقع.zip', size: '18.5 MB', type: 'image', category: 'صور الموقع', uploadedAt: '2025-05-08', uploadedBy: 'أحمد العمري' },
  { id: 'f4', name: 'جدول الكميات.xlsx', size: '1.1 MB', type: 'excel', category: 'وثائق مالية', uploadedAt: '2025-05-15', uploadedBy: 'م. سارة الزهراني' },
];

const MOCK_MESSAGES_INIT = [
  { id: 'm1', sender: 'م. سارة الزهراني', role: 'engineer', avatar: 'س', content: 'مرحباً، تم استلام ملفات المشروع وسنبدأ بمراجعتها خلال يومي عمل.', time: '10:30 ص', isMe: false },
  { id: 'm2', sender: 'أنت', role: 'client', avatar: 'أ', content: 'شكراً جزيلاً. هل تحتاجون لأي مستندات إضافية؟', time: '10:45 ص', isMe: true },
  { id: 'm3', sender: 'م. سارة الزهراني', role: 'engineer', avatar: 'س', content: 'نعم، نحتاج شهادة ملكية الأرض وعقد الإيجار إن وجد.', time: '11:00 ص', isMe: false },
  { id: 'm4', sender: 'الإدارة', role: 'admin', avatar: 'م', content: 'تم تعيين المهندسة سارة الزهراني للعمل على مشروعكم.', time: '09:00 ص', isMe: false },
];

const MOCK_TIMELINE = [
  { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'تم استلام الملفات', desc: 'تم استلام جميع المستندات المطلوبة', time: '2025-05-15' },
  { icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'تعيين المهندس', desc: 'تم تعيين م. سارة الزهراني للمشروع', time: '2025-05-14' },
  { icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'رفع ملف جديد', desc: 'جدول الكميات.xlsx', time: '2025-05-15' },
  { icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/10', title: 'رسالة جديدة', desc: 'م. سارة الزهراني: تم استلام ملفات المشروع', time: '2025-05-16' },
  { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'تحديث الحالة', desc: 'تم تغيير الحالة إلى "قيد المراجعة"', time: '2025-05-16' },
];

const MOCK_DELIVERABLES = [
  { id: 'd1', name: 'تقرير الدراسة الفنية الأولية', type: 'pdf', size: '3.5 MB', status: 'available', uploadedAt: '2025-05-20', summary: 'تقرير شامل يغطي الجوانب الفنية للمشروع' },
  { id: 'd2', name: 'تحليل التربة والموقع', type: 'pdf', size: '2.1 MB', status: 'available', uploadedAt: '2025-05-22', summary: 'نتائج فحص التربة وتوصيات الأساسات' },
  { id: 'd3', name: 'التقرير المالي النهائي', type: 'excel', size: '1.8 MB', status: 'pending', uploadedAt: '—', summary: 'قيد الإعداد' },
];

const MOCK_BILLING = {
  invoices: [
    { id: 'INV-001', desc: 'رسوم فتح الملف', amount: 50, status: 'paid', date: '2025-05-10' },
    { id: 'INV-002', desc: 'الدراسة الفنية', amount: 1800, status: 'paid', date: '2025-05-12' },
    { id: 'INV-003', desc: 'الدراسة المالية', amount: 1200, status: 'pending', date: '2025-06-01' },
  ],
  total: 3050,
  paid: 1850,
  pending: 1200,
};

const TABS = [
  { id: 'overview', label: 'نظرة عامة', icon: FolderOpen },
  { id: 'files', label: 'الملفات', icon: FileText },
  { id: 'messages', label: 'الرسائل', icon: MessageSquare },
  { id: 'activity', label: 'سجل النشاط', icon: Activity },
  { id: 'deliverables', label: 'المخرجات', icon: Download },
  { id: 'billing', label: 'الفواتير', icon: CreditCard },
];

const FILE_ICONS: Record<string, typeof FileText> = { pdf: FileText, image: Image, excel: TableIcon };

export default function ProjectDetails() {
  const [, params] = useRoute('/client/projects/:id');
  const project = mockProjects.find(p => p.id === params?.id) || mockProjects[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES_INIT);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`, sender: 'أنت', role: 'client', avatar: 'أ',
      content: message,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }]);
    setMessage('');
    toast.success('تم إرسال الرسالة');
  };

  return (
    <DashboardLayout
      role="client"
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle={project.title}
      breadcrumbs={[
        { label: 'لوحة التحكم', href: '/client' },
        { label: 'مشاريعي', href: '/client/projects' },
        { label: project.title },
      ]}
    >
      {/* ── Project Header ── */}
      <div className="glass-card p-5 mb-5 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{project.title}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <StatusBadge status={project.status} />
                <PriorityBadge priority={project.priority} />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{project.location}
                </span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground mb-1">التقدم الكلي</p>
            <div className="flex items-center gap-2">
              <ProgressBar value={project.progress} className="w-32" />
              <span className="text-sm font-bold text-cyan-400">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
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

      {/* ── Tab: Overview ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in">
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4">ملخص المشروع</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'رقم المشروع', value: project.id },
                  { label: 'تاريخ الإنشاء', value: project.startDate },
                  { label: 'الموعد النهائي', value: project.endDate },
                  { label: 'الميزانية', value: `${project.budget.toLocaleString('ar-SA')} ر.س` },
                  { label: 'المهندس المسؤول', value: project.engineerName || 'م. سارة الزهراني' },
                  { label: 'الموقع', value: project.location },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4">مراحل المشروع</h3>
              <div className="relative">
                <div className="absolute right-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-4">
                  {[
                    { label: 'استلام الملفات', done: true },
                    { label: 'مراجعة المستندات', done: true },
                    { label: 'الدراسة الفنية', done: project.progress >= 50 },
                    { label: 'الدراسة المالية', done: project.progress >= 75 },
                    { label: 'التقرير النهائي', done: project.status === 'completed' },
                  ].map((phase, i) => (
                    <div key={i} className="flex items-center gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${phase.done ? 'bg-emerald-500/20' : 'bg-white/5 border border-border'}`}>
                        {phase.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${phase.done ? 'text-foreground' : 'text-muted-foreground'}`}>{phase.label}</p>
                      </div>
                      {phase.done && <span className="text-xs text-emerald-400">مكتمل</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-4">
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">الخدمات المطلوبة</h3>
              <div className="space-y-2">
                {['الدراسة الفنية', 'الدراسة المالية', 'دراسة الجدوى'].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-4">
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">ملخص الفاتورة</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الإجمالي</span>
                  <span className="font-bold text-foreground">{MOCK_BILLING.total.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مدفوع</span>
                  <span className="text-emerald-400">{MOCK_BILLING.paid.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">متبقي</span>
                  <span className="text-amber-400">{MOCK_BILLING.pending.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Files ── */}
      {activeTab === 'files' && (
        <div className="animate-fade-in">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">الملفات المرفوعة ({MOCK_FILES.length})</h3>
              <Button size="sm" variant="ghost" className="gap-2 text-blue-400 border border-blue-500/30 h-8 text-xs">
                رفع ملف جديد
              </Button>
            </div>
            <div className="space-y-3">
              {MOCK_FILES.map(file => {
                const Icon = FILE_ICONS[file.type] || File;
                return (
                  <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                        <span className="text-xs text-muted-foreground">{file.category}</span>
                        <span className="text-xs text-muted-foreground">{file.uploadedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => toast.success('جارٍ تحميل الملف...')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-emerald-400 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Messages ── */}
      {activeTab === 'messages' && (
        <div className="glass-card flex flex-col h-[520px] animate-fade-in">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-300">س</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">م. سارة الزهراني</p>
              <p className="text-xs text-emerald-400">متصلة الآن</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${msg.role === 'engineer' ? 'bg-blue-500/20 text-blue-300' : msg.role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {msg.avatar}
                </div>
                <div className={`max-w-xs flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  {!msg.isMe && <p className="text-xs text-muted-foreground">{msg.sender}</p>}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.isMe ? 'bg-blue-600 text-white rounded-tl-sm' : 'bg-white/8 text-foreground rounded-tr-sm border border-border'}`}>
                    {msg.content}
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <Input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-white/5 border-border h-9 text-sm" />
              <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-500 h-9 px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Activity ── */}
      {activeTab === 'activity' && (
        <div className="glass-card p-5 animate-fade-in">
          <h3 className="text-sm font-bold text-white mb-5">سجل النشاط</h3>
          <div className="relative">
            <div className="absolute right-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-5">
              {MOCK_TIMELINE.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${item.bg}`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Deliverables ── */}
      {activeTab === 'deliverables' && (
        <div className="animate-fade-in">
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">المخرجات والتقارير</h3>
            <div className="space-y-3">
              {MOCK_DELIVERABLES.map(d => {
                const Icon = FILE_ICONS[d.type] || File;
                return (
                  <div key={d.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${d.status === 'available' ? 'border-border hover:bg-white/5' : 'border-border/50 opacity-60'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${d.status === 'available' ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
                      <Icon className={`w-5 h-5 ${d.status === 'available' ? 'text-emerald-400' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{d.summary}</p>
                      {d.status === 'available' && (
                        <p className="text-xs text-muted-foreground mt-0.5">{d.size} · {d.uploadedAt}</p>
                      )}
                    </div>
                    {d.status === 'available' ? (
                      <Button size="sm" onClick={() => toast.success('جارٍ تحميل التقرير...')}
                        className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 gap-2 h-8 text-xs">
                        <Download className="w-3 h-3" />
                        تحميل
                      </Button>
                    ) : (
                      <span className="text-xs text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> قيد الإعداد
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Billing ── */}
      {activeTab === 'billing' && (
        <div className="animate-fade-in space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'إجمالي الفاتورة', value: MOCK_BILLING.total, color: 'text-foreground' },
              { label: 'مدفوع', value: MOCK_BILLING.paid, color: 'text-emerald-400' },
              { label: 'متبقي', value: MOCK_BILLING.pending, color: 'text-amber-400' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={`text-xl font-bold ${item.color}`}>{item.value.toLocaleString('ar-SA')}</p>
                <p className="text-xs text-muted-foreground">ر.س</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">سجل الفواتير</h3>
            <div className="space-y-3">
              {MOCK_BILLING.invoices.map(inv => (
                <div key={inv.id} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-white/5 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${inv.status === 'paid' ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                    <CreditCard className={`w-4 h-4 ${inv.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{inv.desc}</p>
                    <p className="text-xs text-muted-foreground">{inv.id} · {inv.date}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">{inv.amount.toLocaleString('ar-SA')} ر.س</p>
                    <span className={`text-xs ${inv.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {inv.status === 'paid' ? 'مدفوع' : 'معلق'}
                    </span>
                  </div>
                  <button onClick={() => toast.success('جارٍ تحميل الفاتورة...')}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">طرق الدفع</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'مدى', icon: '🏦', desc: 'بطاقة مدى' },
                { name: 'Visa', icon: '💳', desc: 'بطاقة فيزا' },
                { name: 'Apple Pay', icon: '🍎', desc: 'آبل باي' },
              ].map((method, i) => (
                <button key={i} onClick={() => toast.info('سيتم تفعيل الدفع قريباً')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:bg-white/5 transition-all">
                  <span className="text-2xl">{method.icon}</span>
                  <p className="text-sm font-medium text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">سيتم تفعيل بوابة الدفع قريباً</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
