// ============================================================
// MEYAAR — Admin Projects Management (Complete)
// Features: Advanced filtering, bulk actions, workflow management,
//           status transitions, assignment, data tables
// Design: Enterprise Dark Precision — Executive Grade
// ============================================================

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Search, Filter, FolderOpen, Plus, MoreVertical, CheckCircle2,
  Clock, AlertCircle, Archive, UserPlus, Eye, Edit, Trash2,
  ArrowUpDown, Download, X, Calendar, DollarSign,
  User, MapPin, ArrowLeft, ArrowRight, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import DashboardLayout from '@/components/DashboardLayout';
import { StatusBadge, TypeBadge, ProgressBar } from '@/components/SharedComponents';
import { mockProjects } from '@/lib/mock-data';
import type { ProjectStatus } from '@/lib/mock-data';
import { toast } from 'sonner';

// Extended mock data for admin projects
const ADMIN_PROJECTS = [
  ...mockProjects,
  { id: 'PRJ-006', title: 'مجمع تجاري - المدينة المنورة', type: 'commercial' as const, status: 'pending' as const, progress: 0, clientName: 'شركة النور', engineerName: '', budget: 28000, category: 'تجاري', priority: 'medium' as const, createdAt: '2025-05-20', startDate: '2025-06-01', endDate: '2025-08-20', location: 'المدينة المنورة', studies: ['جدوى اقتصادية'] },
  { id: 'PRJ-007', title: 'مشروع طرق - حائل', type: 'infrastructure' as const, status: 'pending' as const, progress: 0, clientName: 'بلدية حائل', engineerName: '', budget: 45000, category: 'بنية تحتية', priority: 'high' as const, createdAt: '2025-05-18', startDate: '2025-06-10', endDate: '2025-09-01', location: 'حائل', studies: ['دراسة فنية', 'دراسة بيئية'] },
  { id: 'PRJ-008', title: 'مصنع أغذية - القصيم', type: 'factory' as const, status: 'in_progress' as const, progress: 55, clientName: 'مجموعة الراجحي', engineerName: 'م. عبدالله الشمري', budget: 62000, category: 'صناعي', priority: 'high' as const, createdAt: '2025-04-10', startDate: '2025-04-20', endDate: '2025-07-15', location: 'القصيم', studies: ['جدوى اقتصادية', 'دراسة فنية'] },
];

const STATUS_OPTIONS: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'الكل' },
  { value: 'pending', label: 'معلق' },
  { value: 'in_progress', label: 'قيد التنفيذ' },
  { value: 'in_review', label: 'قيد المراجعة' },
  { value: 'completed', label: 'مكتمل' },
  { value: 'delayed', label: 'متأخر' },
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'الكل' },
  { value: 'high', label: 'عالي' },
  { value: 'medium', label: 'متوسط' },
  { value: 'low', label: 'منخفض' },
];

const WORKFLOW_STATUSES = [
  { id: 'pending', label: 'معلق', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'in_progress', label: 'قيد التنفيذ', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'in_review', label: 'قيد المراجعة', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'completed', label: 'مكتمل', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'delayed', label: 'متأخر', color: 'text-red-400', bg: 'bg-red-500/10' },
];

export default function AdminProjects() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'progress'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showWorkflow, setShowWorkflow] = useState(false);

  const filtered = useMemo(() => {
    let result = ADMIN_PROJECTS.filter(p => {
      const matchSearch = p.title.includes(search) || p.clientName.includes(search) || p.id.includes(search);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchPriority = priorityFilter === 'all' || p.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'budget') return sortDir === 'asc' ? a.budget - b.budget : b.budget - a.budget;
      if (sortBy === 'progress') return sortDir === 'asc' ? a.progress - b.progress : b.progress - a.progress;
      return sortDir === 'asc' ? ((a as any).createdAt || '').localeCompare((b as any).createdAt || '') : ((b as any).createdAt || '').localeCompare((a as any).createdAt || '');
    });

    return result;
  }, [search, statusFilter, priorityFilter, sortBy, sortDir]);

  const toggleSelect = (id: string) => {
    setSelectedProjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedProjects.length === filtered.length) setSelectedProjects([]);
    else setSelectedProjects(filtered.map(p => p.id));
  };

  const handleBulkAction = (action: string) => {
    toast.success(`تم تنفيذ "${action}" على ${selectedProjects.length} مشروع`);
    setSelectedProjects([]);
  };

  return (
    <DashboardLayout
      role="admin"
      userName="خالد الرشيد"
      userEmail="khalid@meyaar.sa"
      pageTitle="إدارة المشاريع"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/admin' }, { label: 'إدارة المشاريع' }]}
    >
      {/* ── Workflow Timeline ── */}
      {showWorkflow && (
        <div className="glass-card p-5 mb-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">سير عمل المشاريع</h3>
            <button onClick={() => setShowWorkflow(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {WORKFLOW_STATUSES.map((ws, i) => (
              <div key={ws.id} className="flex items-center gap-1 flex-shrink-0">
                <div className={`px-3 py-2 rounded-lg ${ws.bg} border border-border`}>
                  <p className={`text-xs font-medium ${ws.color} whitespace-nowrap`}>{ws.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ADMIN_PROJECTS.filter(p => p.status === ws.id).length} مشروع
                  </p>
                </div>
                {i < WORKFLOW_STATUSES.length - 1 && (
                  <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Header Actions ── */}
      <div className="glass-card p-4 mb-5 animate-fade-in">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-56">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالاسم، العميل، أو الرقم..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>

          {/* Filter Toggle */}
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}
            className={`gap-2 h-9 ${showFilters ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : ''}`}>
            <Filter className="w-3.5 h-3.5" />
            فلترة
          </Button>

          {/* Workflow Toggle */}
          <Button variant="outline" size="sm" onClick={() => setShowWorkflow(!showWorkflow)}
            className={`gap-2 h-9 ${showWorkflow ? 'bg-purple-600/20 border-purple-500/50 text-purple-300' : ''}`}>
            <RefreshCw className="w-3.5 h-3.5" />
            سير العمل
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="h-9 bg-white/5 border border-border rounded-lg px-2 text-xs text-foreground">
              <option value="date">التاريخ</option>
              <option value="budget">الميزانية</option>
              <option value="progress">التقدم</option>
            </select>
            <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-lg border border-border hover:bg-white/5 transition-colors">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>

          {/* Export */}
          <Button variant="outline" size="sm" className="gap-2 h-9" onClick={() => toast.info('جارٍ التصدير...')}>
            <Download className="w-3.5 h-3.5" />
            تصدير
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border flex-wrap animate-fade-in">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">الحالة</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
                className="h-8 bg-white/5 border border-border rounded-lg px-2 text-xs text-foreground min-w-28">
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">الأولوية</label>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                className="h-8 bg-white/5 border border-border rounded-lg px-2 text-xs text-foreground min-w-24">
                {PRIORITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <button onClick={() => { setStatusFilter('all'); setPriorityFilter('all'); setSearch(''); }}
              className="text-xs text-blue-400 hover:text-blue-300 mt-4">
              مسح الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* ── Bulk Actions ── */}
      {selectedProjects.length > 0 && (
        <div className="glass-card p-3 mb-4 flex items-center gap-3 animate-fade-in border-blue-500/30">
          <span className="text-sm text-blue-300 font-medium">{selectedProjects.length} محدد</span>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulkAction('إسناد مهندس')}>
              <UserPlus className="w-3 h-3" /> إسناد مهندس
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulkAction('تغيير الحالة')}>
              <RefreshCw className="w-3 h-3" /> تغيير الحالة
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleBulkAction('أرشفة')}>
              <Archive className="w-3 h-3" /> أرشفة
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
              onClick={() => handleBulkAction('حذف')}>
              <Trash2 className="w-3 h-3" /> حذف
            </Button>
          </div>
          <button onClick={() => setSelectedProjects([])} className="mr-auto text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Projects Table ── */}
      <div className="glass-card overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 w-10">
                  <Checkbox checked={selectedProjects.length === filtered.length && filtered.length > 0}
                    onCheckedChange={selectAll} />
                </th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المشروع</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">العميل</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">المهندس</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الحالة</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الأولوية</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">التقدم</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الميزانية</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3">الموعد</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3 w-16">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project, i) => (
                <tr key={project.id}
                  className={`border-b border-border/50 hover:bg-white/3 transition-colors ${selectedProjects.includes(project.id) ? 'bg-blue-500/5' : ''}`}>
                  <td className="px-3 py-3">
                    <Checkbox checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleSelect(project.id)} />
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="text-foreground font-medium text-xs leading-snug max-w-44 truncate">{project.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground font-mono">{project.id}</span>
                        <TypeBadge type={project.type} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{project.clientName}</td>
                  <td className="py-3 text-xs">
                    {project.engineerName ? (
                      <span className="text-foreground">{project.engineerName}</span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> غير مسند
                      </span>
                    )}
                  </td>
                  <td className="py-3"><StatusBadge status={project.status} /></td>
                  <td className="py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      project.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                      project.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {project.priority === 'high' ? 'عالي' : project.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </td>
                  <td className="py-3 w-28">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={project.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-left">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {project.budget.toLocaleString('ar-SA')} ر.س
                  </td>
                  <td className="py-3 text-xs text-muted-foreground whitespace-nowrap">{project.endDate}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.info('عرض تفاصيل المشروع')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toast.info('تعديل المشروع')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-amber-400 transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toast.info('المزيد من الخيارات')}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">لا توجد مشاريع تطابق البحث</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            عرض {filtered.length} من {ADMIN_PROJECTS.length} مشروع
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-white/5 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 text-xs font-medium">1</span>
            <button className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:bg-white/5 transition-colors">2</button>
            <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
        {WORKFLOW_STATUSES.map((ws, i) => (
          <div key={i} className="glass-card p-3 text-center">
            <p className={`text-xl font-bold ${ws.color}`}>
              {ADMIN_PROJECTS.filter(p => p.status === ws.id).length}
            </p>
            <p className="text-xs text-muted-foreground">{ws.label}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
