// ============================================================
// MEYAAR — Engineer Task Management (Advanced)
// Features: Kanban-style, list view, priority, due dates, progress
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState } from 'react';
import {
  Plus, Clock, AlertTriangle, CheckCircle2,
  Calendar, LayoutGrid, List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { PriorityBadge } from '@/components/SharedComponents';
import { mockTasks } from '@/lib/mock-data';
import { toast } from 'sonner';

type TaskStatus = 'pending' | 'in_progress' | 'completed';

type TaskItem = {
  id: string;
  title: string;
  projectTitle: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: TaskStatus;
  dueDate: string;
  description?: string;
};

const ALL_TASKS: TaskItem[] = [
  ...mockTasks,
  { id: 't4', title: 'تحليل البيانات المالية للمشروع الثاني', projectTitle: 'دراسة جدوى مصنع الأغذية', priority: 'medium', status: 'pending', dueDate: '2025-06-10', description: 'إعداد جداول التدفقات النقدية والعائد المتوقع' },
  { id: 't5', title: 'إعداد ملخص تنفيذي للتقرير النهائي', projectTitle: 'تقييم البنية التحتية', priority: 'low', status: 'pending', dueDate: '2025-06-20' },
  { id: 't6', title: 'مراجعة الدراسة المالية مع العميل', projectTitle: 'مشروع مجمع الرياض السكني', priority: 'high', status: 'completed', dueDate: '2025-05-15' },
  { id: 't7', title: 'تحديث المخططات الكهربائية', projectTitle: 'فيلا الرياض', priority: 'medium', status: 'pending', dueDate: '2025-05-30' },
  { id: 't8', title: 'مراجعة عروض المقاولين', projectTitle: 'برج المكاتب', priority: 'medium', status: 'in_progress', dueDate: '2025-05-26' },
];

const STATUS_COLUMNS: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'pending', label: 'قيد الانتظار', color: 'border-slate-500/30' },
  { id: 'in_progress', label: 'قيد التنفيذ', color: 'border-cyan-500/30' },
  { id: 'completed', label: 'مكتمل', color: 'border-emerald-500/30' },
];

export default function EngineerTasks() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState(ALL_TASKS);

  const tasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date('2025-05-25')).length,
  };

  const completionRate = Math.round((stats.completed / stats.total) * 100);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    toast.success('تم إضافة المهمة');
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id
        ? { ...t, status: (t.status === 'completed' ? 'pending' : 'completed') as TaskStatus }
        : t
    ));
    toast.success('تم تحديث حالة المهمة');
  };

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="المهام"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'المهام' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-white">إدارة المهام</h1>
          <p className="text-sm text-muted-foreground">{stats.total} مهمة • {completionRate}% مكتمل</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('kanban')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'kanban' ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="glass-card p-4 mb-5 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">التقدم الإجمالي</span>
          <span className="text-sm font-bold text-cyan-300">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
        <div className="flex items-center gap-4 mt-3 text-xs">
          <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-400" /> {tasksByStatus('pending').length} انتظار</span>
          <span className="flex items-center gap-1 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400" /> {tasksByStatus('in_progress').length} تنفيذ</span>
          <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> {tasksByStatus('completed').length} مكتمل</span>
          {stats.overdue > 0 && (
            <span className="flex items-center gap-1 text-red-400"><AlertTriangle className="w-3 h-3" /> {stats.overdue} متأخر</span>
          )}
        </div>
      </div>

      {/* Add Task */}
      <div className="glass-card p-3 mb-5 animate-fade-in">
        <div className="flex items-center gap-2">
          <Input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)}
            placeholder="إضافة مهمة جديدة..."
            className="bg-white/5 border-border h-9 text-sm flex-1"
            onKeyDown={e => e.key === 'Enter' && handleAddTask()} />
          <Button size="sm" className="h-9 gap-1 bg-cyan-600 hover:bg-cyan-500" onClick={handleAddTask}>
            <Plus className="w-4 h-4" /> إضافة
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid md:grid-cols-3 gap-4">
          {STATUS_COLUMNS.map(col => (
            <div key={col.id} className={`rounded-xl border ${col.color} bg-white/2 p-3`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-bold text-foreground">{col.label}</h3>
                <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                  {tasksByStatus(col.id).length}
                </span>
              </div>
              <div className="space-y-2">
                {tasksByStatus(col.id).map((task, i) => (
                  <div key={task.id} className="glass-card p-3 animate-fade-in-up cursor-pointer hover:border-cyan-500/20 transition-all"
                    style={{ animationDelay: `${i * 40}ms` }}
                    onClick={() => toggleTask(task.id)}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className={`text-xs font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                        task.priority === 'high' || task.priority === 'urgent' ? 'bg-red-400' :
                        task.priority === 'medium' ? 'bg-amber-400' :
                        'bg-slate-400'
                      }`} />
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="truncate max-w-24">{task.projectTitle}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {task.dueDate.slice(5)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="glass-card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4 w-8"></th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">المهمة</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">المشروع</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الأولوية</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الحالة</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الموعد</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                    <td className="py-3 px-4">
                      <input type="checkbox" checked={task.status === 'completed'}
                        onChange={() => toggleTask(task.id)}
                        className="w-3.5 h-3.5 rounded border-border bg-white/5 text-cyan-500 cursor-pointer" />
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{task.projectTitle}</td>
                    <td className="py-3"><PriorityBadge priority={task.priority} /></td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        task.status === 'in_progress' ? 'bg-cyan-500/10 text-cyan-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {task.status === 'completed' ? 'مكتمل' : task.status === 'in_progress' ? 'قيد التنفيذ' : 'انتظار'}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
