// ============================================================
// MEYAAR — Engineer Project Workspace (Complete 7-Tab)
// Tabs: Overview, Files, Study Workspace, Messages,
//       Activity Timeline, Deliverables, Internal Notes
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState } from 'react';
import { useRoute } from 'wouter';
import {
  LayoutDashboard, FileText, BookOpen, MessageSquare,
  Clock, Upload, StickyNote, User, MapPin, Calendar, DollarSign,
  Download, Eye, Plus, Send, Paperclip, CheckCircle2,
  Edit3, Trash2, Save, FileSpreadsheet, Image,
  File, Star, Timer, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { StatusBadge, PriorityBadge, ProgressBar } from '@/components/SharedComponents';
import { mockProjects } from '@/lib/mock-data';
import { toast } from 'sonner';

type TabId = 'overview' | 'files' | 'study' | 'messages' | 'activity' | 'deliverables' | 'notes';

const TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'files', label: 'الملفات', icon: FileText },
  { id: 'study', label: 'مساحة الدراسة', icon: BookOpen },
  { id: 'messages', label: 'الرسائل', icon: MessageSquare },
  { id: 'activity', label: 'سجل النشاط', icon: Clock },
  { id: 'deliverables', label: 'المخرجات', icon: Upload },
  { id: 'notes', label: 'ملاحظات داخلية', icon: StickyNote },
];

const PROJECT_FILES = [
  { id: 'f1', name: 'مخطط_الموقع.pdf', type: 'pdf' as const, size: '2.4 MB', date: '2025-05-10', category: 'مخططات' },
  { id: 'f2', name: 'دراسة_التربة.pdf', type: 'pdf' as const, size: '1.8 MB', date: '2025-05-08', category: 'تقارير' },
  { id: 'f3', name: 'الميزانية_التقديرية.xlsx', type: 'excel' as const, size: '890 KB', date: '2025-05-12', category: 'مالي' },
  { id: 'f4', name: 'صور_الموقع.zip', type: 'image' as const, size: '15.2 MB', date: '2025-05-05', category: 'صور' },
  { id: 'f5', name: 'المخطط_المعماري.dwg', type: 'dwg' as const, size: '4.1 MB', date: '2025-05-14', category: 'مخططات' },
];

const MESSAGES = [
  { id: 'm1', sender: 'أحمد العمري (عميل)', content: 'مرحباً، هل يمكن إضافة غرفة إضافية في الطابق الثاني؟', time: '10:30 ص', date: '2025-05-20', isMe: false },
  { id: 'm2', sender: 'م. سارة الزهراني', content: 'مرحباً أحمد، نعم يمكن ذلك. سأراجع المخطط وأرسل لك التعديل المقترح.', time: '11:15 ص', date: '2025-05-20', isMe: true },
  { id: 'm3', sender: 'المدير - خالد', content: 'سارة، يرجى تسليم الدراسة الأولية قبل نهاية الأسبوع.', time: '2:00 م', date: '2025-05-21', isMe: false },
  { id: 'm4', sender: 'م. سارة الزهراني', content: 'تم، سأنتهي منها غداً إن شاء الله.', time: '2:30 م', date: '2025-05-21', isMe: true },
];

const ACTIVITIES = [
  { action: 'رفع ملف', detail: 'تم رفع "المخطط المعماري" النسخة 2', time: '2025-05-22 14:30', user: 'م. سارة', type: 'upload' as const },
  { action: 'تحديث التقدم', detail: 'تم تحديث التقدم من 65% إلى 72%', time: '2025-05-21 16:00', user: 'م. سارة', type: 'progress' as const },
  { action: 'رسالة', detail: 'رسالة جديدة من العميل أحمد العمري', time: '2025-05-20 10:30', user: 'أحمد العمري', type: 'message' as const },
  { action: 'موافقة', detail: 'تمت الموافقة على دراسة التربة من المدير', time: '2025-05-19 09:00', user: 'خالد (مدير)', type: 'approval' as const },
  { action: 'إسناد', detail: 'تم إسناد المشروع إلى م. سارة الزهراني', time: '2025-05-15 08:00', user: 'النظام', type: 'assignment' as const },
];

const DELIVERABLES = [
  { id: 'd1', title: 'دراسة التربة - تقرير أولي', status: 'approved' as const, date: '2025-05-18', version: 2, notes: 'ممتاز، تمت الموافقة' },
  { id: 'd2', title: 'المخططات المعمارية - الطابق الأرضي', status: 'in_review' as const, date: '2025-05-22', version: 1, notes: '' },
  { id: 'd3', title: 'التحليل المالي - المرحلة الأولى', status: 'pending' as const, date: '', version: 0, notes: '' },
];

const STUDY_SECTIONS = [
  { id: 's1', title: 'التحليل الفني', content: 'الموقع يقع في منطقة سكنية بمساحة 600 م². التربة مناسبة للبناء حسب تقرير الجيوتقنية. يُوصى بأساسات شريطية بعمق 1.5 م.', status: 'completed' as const },
  { id: 's2', title: 'التحليل المالي', content: 'التكلفة التقديرية للمشروع: 1,200,000 ريال. العائد المتوقع: 8.5% سنوياً. فترة الاسترداد: 7 سنوات.', status: 'in_progress' as const },
  { id: 's3', title: 'دراسة الجدوى', content: '', status: 'pending' as const },
  { id: 's4', title: 'المخاطر والتحديات', content: 'ارتفاع أسعار مواد البناء، تأخر التراخيص البلدية المحتمل.', status: 'in_progress' as const },
  { id: 's5', title: 'التوصيات', content: '', status: 'pending' as const },
  { id: 's6', title: 'الملخص التنفيذي', content: '', status: 'pending' as const },
];

const INTERNAL_NOTES = [
  { id: 'n1', title: 'ملاحظات حول التربة', content: 'مستوى المياه الجوفية مرتفع نسبياً - يجب مراجعة نظام العزل.', date: '2025-05-18', priority: 'high' as const },
  { id: 'n2', title: 'تواصل مع المقاول', content: 'المقاول أكد جاهزية الموقع للبدء بعد أسبوعين.', date: '2025-05-20', priority: 'low' as const },
  { id: 'n3', title: 'مراجعة المخططات', content: 'يجب التأكد من مطابقة المخططات لاشتراطات البلدية الجديدة.', date: '2025-05-22', priority: 'medium' as const },
];

export default function EngineerWorkspace() {
  const [, params] = useRoute('/engineer/workspace/:id');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [messageInput, setMessageInput] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const project = mockProjects.find(p => p.id === params?.id) || mockProjects[0];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    toast.success('تم إرسال الرسالة');
    setMessageInput('');
  };

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    toast.success('تم حفظ الملاحظة');
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      breadcrumbs={[
        { label: 'لوحة التحكم', href: '/engineer' },
        { label: 'المشاريع', href: '/engineer/projects' },
        { label: project.title }
      ]}
    >
      {/* Project Header */}
      <div className="glass-card p-5 mb-5 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-lg font-bold text-white">{project.title}</h1>
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {project.clientName}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.startDate} → {project.endDate}</span>
              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {project.budget?.toLocaleString()} ريال</span>
            </div>
          </div>
          <div className="text-left flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">التقدم</span>
              <span className="text-sm font-bold text-cyan-300">{project.progress}%</span>
            </div>
            <div className="w-32">
              <Progress value={project.progress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-muted-foreground hover:bg-white/5 border border-transparent'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-white mb-3">ملخص المشروع</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: 'نوع المشروع', value: project.type === 'engineering_study' ? 'دراسة هندسية' : project.type === 'financial_feasibility' ? 'جدوى مالية' : project.type === 'construction' ? 'إنشائي' : project.type },
                    { label: 'الميزانية', value: `${project.budget?.toLocaleString()} ريال` },
                    { label: 'تاريخ البدء', value: project.startDate },
                    { label: 'الموعد النهائي', value: project.endDate },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/3">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-white mb-4">مراحل المشروع</h3>
                <div className="space-y-4">
                  {[
                    { label: 'استلام المشروع', status: 'done', date: '2025-05-15' },
                    { label: 'مراجعة الملفات', status: 'done', date: '2025-05-17' },
                    { label: 'إعداد الدراسة', status: 'current', date: '2025-05-20' },
                    { label: 'تسليم المخرجات', status: 'pending', date: '2025-06-10' },
                    { label: 'المراجعة النهائية', status: 'pending', date: '2025-06-15' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                        step.status === 'current' ? 'bg-cyan-500/20 text-cyan-400 ring-2 ring-cyan-500/30' :
                        'bg-white/5 text-muted-foreground'
                      }`}>
                        {step.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> :
                         step.status === 'current' ? <Timer className="w-4 h-4" /> :
                         <span className="text-xs">{i + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-medium ${step.status === 'done' ? 'text-emerald-400' : step.status === 'current' ? 'text-cyan-300' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-white mb-3">معلومات العميل</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{project.clientName}</p>
                    <p className="text-xs text-muted-foreground">عميل</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-white mb-3">الدراسات المطلوبة</h3>
                <div className="space-y-2">
                  {['جدوى اقتصادية', 'دراسة فنية', 'تحليل مالي'].map((study, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/3">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs text-foreground">{study}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== FILES TAB ===== */}
        {activeTab === 'files' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{PROJECT_FILES.length} ملف</h3>
              <Button size="sm" className="gap-1 h-8 text-xs bg-cyan-600 hover:bg-cyan-500"
                onClick={() => toast.info('رفع ملف — قريباً')}>
                <Plus className="w-3 h-3" /> رفع ملف
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['الكل', 'مخططات', 'تقارير', 'مالي', 'صور'].map(cat => (
                <button key={cat} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors">
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PROJECT_FILES.map((file, i) => (
                <div key={file.id} className="glass-card p-4 hover:border-cyan-500/20 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      file.type === 'pdf' ? 'bg-red-500/10' :
                      file.type === 'excel' ? 'bg-emerald-500/10' :
                      file.type === 'image' ? 'bg-purple-500/10' :
                      'bg-blue-500/10'
                    }`}>
                      {file.type === 'pdf' ? <FileText className="w-5 h-5 text-red-400" /> :
                       file.type === 'excel' ? <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> :
                       file.type === 'image' ? <Image className="w-5 h-5 text-purple-400" /> :
                       <File className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{file.size} • {file.date}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs bg-white/5 text-muted-foreground">{file.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border">
                    <button className="p-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-colors"
                      onClick={() => toast.info('معاينة الملف — قريباً')}>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-emerald-400 transition-colors"
                      onClick={() => toast.success('جارٍ التحميل...')}>
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== STUDY WORKSPACE TAB ===== */}
        {activeTab === 'study' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">مساحة إعداد الدراسة</h3>
                <p className="text-xs text-muted-foreground mt-0.5">أقسام الدراسة الهندسية</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">الإنجاز:</span>
                <span className="text-xs font-bold text-cyan-300">33%</span>
                <Progress value={33} className="w-20 h-1.5" />
              </div>
            </div>

            <div className="space-y-3">
              {STUDY_SECTIONS.map((section, i) => (
                <div key={section.id} className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        section.status === 'completed' ? 'bg-emerald-400' :
                        section.status === 'in_progress' ? 'bg-cyan-400' :
                        'bg-muted-foreground'
                      }`} />
                      <h4 className="text-sm font-bold text-foreground">{section.title}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      section.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      section.status === 'in_progress' ? 'bg-cyan-500/10 text-cyan-400' :
                      'bg-white/5 text-muted-foreground'
                    }`}>
                      {section.status === 'completed' ? 'مكتمل' : section.status === 'in_progress' ? 'قيد العمل' : 'لم يبدأ'}
                    </span>
                  </div>
                  {section.content ? (
                    <div className="p-3 rounded-lg bg-white/3 border border-border">
                      <p className="text-xs text-foreground leading-relaxed">{section.content}</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-white/2 border border-dashed border-border text-center">
                      <p className="text-xs text-muted-foreground">لم يتم إضافة محتوى بعد</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                      onClick={() => toast.info('تحرير القسم — قريباً')}>
                      <Edit3 className="w-3 h-3" /> تحرير
                    </Button>
                    {section.status !== 'completed' && (
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-emerald-400 border-emerald-500/30"
                        onClick={() => toast.success('تم تحديد القسم كمكتمل')}>
                        <CheckCircle2 className="w-3 h-3" /> تحديد كمكتمل
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-3">قائمة المهام</h3>
              <div className="space-y-2">
                {[
                  { task: 'مراجعة تقرير التربة', done: true },
                  { task: 'إعداد التحليل المالي', done: false },
                  { task: 'كتابة الملخص التنفيذي', done: false },
                  { task: 'مراجعة المخططات المعمارية', done: true },
                  { task: 'تقييم المخاطر', done: false },
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/3 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked={item.done}
                      className="w-4 h-4 rounded border-border bg-white/5 text-cyan-500 focus:ring-cyan-500/30" />
                    <span className={`text-xs ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{item.task}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== MESSAGES TAB ===== */}
        {activeTab === 'messages' && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">المحادثات</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto mb-4 p-2">
              {MESSAGES.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] p-3 rounded-xl ${
                    msg.isMe ? 'bg-cyan-600/20 border border-cyan-500/20' : 'bg-white/5 border border-border'
                  }`}>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{msg.sender}</p>
                    <p className="text-sm text-foreground">{msg.content}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-left">{msg.time} • {msg.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground">
                <Paperclip className="w-4 h-4" />
              </button>
              <Input value={messageInput} onChange={e => setMessageInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-white/5 border-border h-9 text-sm"
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()} />
              <Button size="sm" className="h-9 bg-cyan-600 hover:bg-cyan-500 gap-1" onClick={handleSendMessage}>
                <Send className="w-3.5 h-3.5" /> إرسال
              </Button>
            </div>
          </div>
        )}

        {/* ===== ACTIVITY TIMELINE TAB ===== */}
        {activeTab === 'activity' && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-white mb-4">سجل النشاط</h3>
            <div className="space-y-4">
              {ACTIVITIES.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  {i < ACTIVITIES.length - 1 && (
                    <div className="absolute top-8 right-4 w-px h-full bg-border" />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    activity.type === 'upload' ? 'bg-emerald-500/10 text-emerald-400' :
                    activity.type === 'progress' ? 'bg-blue-500/10 text-blue-400' :
                    activity.type === 'message' ? 'bg-purple-500/10 text-purple-400' :
                    activity.type === 'approval' ? 'bg-cyan-500/10 text-cyan-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {activity.type === 'upload' ? <Upload className="w-3.5 h-3.5" /> :
                     activity.type === 'progress' ? <TrendingUp className="w-3.5 h-3.5" /> :
                     activity.type === 'message' ? <MessageSquare className="w-3.5 h-3.5" /> :
                     activity.type === 'approval' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                     <Star className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== DELIVERABLES TAB ===== */}
        {activeTab === 'deliverables' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">المخرجات</h3>
              <Button size="sm" className="gap-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-500"
                onClick={() => toast.info('رفع مخرج جديد — قريباً')}>
                <Upload className="w-3 h-3" /> رفع مخرج جديد
              </Button>
            </div>

            <div className="space-y-3">
              {DELIVERABLES.map((del, i) => (
                <div key={del.id} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        del.status === 'approved' ? 'bg-emerald-500/10' :
                        del.status === 'in_review' ? 'bg-amber-500/10' :
                        'bg-white/5'
                      }`}>
                        <FileText className={`w-5 h-5 ${
                          del.status === 'approved' ? 'text-emerald-400' :
                          del.status === 'in_review' ? 'text-amber-400' :
                          'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{del.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          {del.date && <span>تاريخ التسليم: {del.date}</span>}
                          {del.version > 0 && <span>النسخة: {del.version}</span>}
                        </div>
                        {del.notes && <p className="text-xs text-emerald-400 mt-1">{del.notes}</p>}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      del.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                      del.status === 'in_review' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-white/5 text-muted-foreground'
                    }`}>
                      {del.status === 'approved' ? 'معتمد' : del.status === 'in_review' ? 'قيد المراجعة' : 'لم يُسلّم'}
                    </span>
                  </div>
                  {del.status === 'pending' && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button size="sm" className="h-7 text-xs gap-1 bg-cyan-600 hover:bg-cyan-500"
                        onClick={() => toast.info('رفع المخرج — قريباً')}>
                        <Upload className="w-3 h-3" /> رفع الملف
                      </Button>
                    </div>
                  )}
                  {del.status === 'in_review' && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                        onClick={() => toast.info('تحديث المخرج — قريباً')}>
                        <Edit3 className="w-3 h-3" /> تحديث النسخة
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== INTERNAL NOTES TAB ===== */}
        {activeTab === 'notes' && (
          <div className="space-y-5">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-1">ملاحظات داخلية</h3>
              <p className="text-xs text-muted-foreground mb-4">ملاحظات خاصة بالمهندس والمدير — غير مرئية للعميل</p>

              <div className="p-4 rounded-xl border border-dashed border-border bg-white/2 mb-4">
                <Input value={noteTitle} onChange={e => setNoteTitle(e.target.value)}
                  placeholder="عنوان الملاحظة..."
                  className="bg-white/5 border-border h-8 text-sm mb-2" />
                <Textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}
                  placeholder="محتوى الملاحظة..."
                  className="bg-white/5 border-border text-sm min-h-20 mb-2" />
                <Button size="sm" className="h-7 text-xs gap-1 bg-cyan-600 hover:bg-cyan-500" onClick={handleAddNote}>
                  <Save className="w-3 h-3" /> حفظ الملاحظة
                </Button>
              </div>

              <div className="space-y-3">
                {INTERNAL_NOTES.map((note, i) => (
                  <div key={note.id} className="p-4 rounded-xl border border-border bg-white/2 animate-fade-in-up"
                    style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-medium text-foreground">{note.title}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        note.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                        note.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {note.priority === 'high' ? 'مهم' : note.priority === 'medium' ? 'متوسط' : 'عادي'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{note.content}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                      <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-cyan-400">
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
