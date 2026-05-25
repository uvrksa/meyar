// ============================================================
// MEYAAR — Engineer Clarification Requests
// Features: Submit, track, and manage clarification requests
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState } from 'react';
import {
  HelpCircle, Plus, MessageSquare, Clock, CheckCircle2,
  Send, User, Calendar, AlertTriangle, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

type ClarificationStatus = 'pending' | 'answered' | 'closed';

interface ClarificationRequest {
  id: string;
  question: string;
  projectName: string;
  status: ClarificationStatus;
  date: string;
  answer?: string;
  answeredBy?: string;
  answeredDate?: string;
  priority: 'high' | 'medium' | 'low';
}

const CLARIFICATIONS: ClarificationRequest[] = [
  {
    id: 'c1',
    question: 'هل المساحة المذكورة في العقد تشمل المسطحات الخارجية (الحديقة والمواقف)؟',
    projectName: 'فيلا الرياض',
    status: 'answered',
    date: '2025-05-18',
    answer: 'نعم، المساحة الإجمالية 600 م² تشمل المسطحات الخارجية. المساحة المبنية الصافية 420 م².',
    answeredBy: 'أحمد العمري (عميل)',
    answeredDate: '2025-05-19',
    priority: 'high',
  },
  {
    id: 'c2',
    question: 'ما هو الارتفاع المسموح به حسب اشتراطات البلدية في هذه المنطقة؟',
    projectName: 'فيلا الرياض',
    status: 'pending',
    date: '2025-05-22',
    priority: 'high',
  },
  {
    id: 'c3',
    question: 'هل يفضل العميل استخدام نظام تكييف مركزي أو سبليت؟',
    projectName: 'فيلا الرياض',
    status: 'answered',
    date: '2025-05-16',
    answer: 'تكييف مركزي مع نظام تحكم ذكي.',
    answeredBy: 'أحمد العمري (عميل)',
    answeredDate: '2025-05-17',
    priority: 'medium',
  },
  {
    id: 'c4',
    question: 'ما هي الميزانية المخصصة للتشطيبات الداخلية؟',
    projectName: 'مجمع تجاري',
    status: 'pending',
    date: '2025-05-21',
    priority: 'medium',
  },
  {
    id: 'c5',
    question: 'هل هناك تقرير جيوتقني سابق للموقع يمكن الاطلاع عليه؟',
    projectName: 'برج المكاتب',
    status: 'closed',
    date: '2025-05-10',
    answer: 'تم إرفاق التقرير في ملفات المشروع.',
    answeredBy: 'خالد (مدير)',
    answeredDate: '2025-05-11',
    priority: 'low',
  },
];

export default function EngineerClarifications() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newProject, setNewProject] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClarificationStatus | 'all'>('all');

  const filtered = CLARIFICATIONS.filter(c => statusFilter === 'all' || c.status === statusFilter);

  const handleSubmit = () => {
    if (!newQuestion.trim()) return;
    toast.success('تم إرسال طلب التوضيح');
    setNewQuestion('');
    setNewProject('');
    setShowNewForm(false);
  };

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="طلبات التوضيح"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'طلبات التوضيح' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-white">طلبات التوضيح</h1>
          <p className="text-sm text-muted-foreground">إرسال وتتبع الاستفسارات حول المشاريع</p>
        </div>
        <Button size="sm" className="gap-1 h-9 bg-blue-600 hover:bg-blue-500"
          onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="w-4 h-4" /> طلب توضيح جديد
        </Button>
      </div>

      {/* New Request Form */}
      {showNewForm && (
        <div className="glass-card p-5 mb-5 animate-fade-in border-cyan-500/20">
          <h3 className="text-sm font-bold text-white mb-3">طلب توضيح جديد</h3>
          <div className="space-y-3">
            <Input value={newProject} onChange={e => setNewProject(e.target.value)}
              placeholder="اسم المشروع..."
              className="bg-white/5 border-border h-9 text-sm" />
            <Textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)}
              placeholder="اكتب سؤالك أو طلب التوضيح بالتفصيل..."
              className="bg-white/5 border-border text-sm min-h-24" />
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 text-xs gap-1 bg-cyan-600 hover:bg-cyan-500" onClick={handleSubmit}>
                <Send className="w-3 h-3" /> إرسال
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setShowNewForm(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'بانتظار الرد', value: CLARIFICATIONS.filter(c => c.status === 'pending').length, color: 'text-amber-400' },
          { label: 'تم الرد', value: CLARIFICATIONS.filter(c => c.status === 'answered').length, color: 'text-emerald-400' },
          { label: 'مغلقة', value: CLARIFICATIONS.filter(c => c.status === 'closed').length, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-3 text-center animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {(['all', 'pending', 'answered', 'closed'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === s ? 'bg-cyan-600/20 text-cyan-300' : 'text-muted-foreground hover:bg-white/5'
            }`}>
            {s === 'all' ? 'الكل' : s === 'pending' ? 'بانتظار الرد' : s === 'answered' ? 'تم الرد' : 'مغلقة'}
          </button>
        ))}
      </div>

      {/* Clarifications List */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div key={item.id} className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.status === 'pending' ? 'bg-amber-500/10' :
                  item.status === 'answered' ? 'bg-emerald-500/10' :
                  'bg-slate-500/10'
                }`}>
                  <HelpCircle className={`w-4 h-4 ${
                    item.status === 'pending' ? 'text-amber-400' :
                    item.status === 'answered' ? 'text-emerald-400' :
                    'text-slate-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.question}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{item.projectName}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${
                      item.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                      item.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {item.priority === 'high' ? 'عالي' : item.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                item.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                item.status === 'answered' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-slate-500/10 text-slate-400'
              }`}>
                {item.status === 'pending' ? 'بانتظار الرد' : item.status === 'answered' ? 'تم الرد' : 'مغلقة'}
              </span>
            </div>

            {item.answer && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">{item.answeredBy}</span>
                  <span className="text-xs text-muted-foreground">• {item.answeredDate}</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">{item.answer}</p>
              </div>
            )}

            {item.status === 'pending' && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-400">
                <Clock className="w-3 h-3" />
                <span>في انتظار الرد من العميل أو المدير</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">لا توجد طلبات توضيح</p>
        </div>
      )}
    </DashboardLayout>
  );
}
