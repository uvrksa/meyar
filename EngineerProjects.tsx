// ============================================================
// MEYAAR — Engineer Assigned Projects (Complete Advanced)
// Features: Search, filter by status/priority, grid/table view,
//           quick actions, progress tracking
// Design: Enterprise Dark Precision — Technical Productivity
// ============================================================

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Search, FolderOpen, Clock, Wrench, Upload,
  TrendingUp, LayoutGrid, List, User, MapPin, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { StatusBadge, TypeBadge, PriorityBadge, ProgressBar } from '@/components/SharedComponents';
import { mockProjects, type ProjectStatus } from '@/lib/mock-data';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'table';
type PriorityFilter = 'all' | 'high' | 'medium' | 'low';
type StatusFilterType = 'all' | ProjectStatus;

const ENGINEER_PROJECTS = mockProjects.filter(p => p.engineerId === 'u2');

export default function EngineerProjects() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

  const filtered = useMemo(() => {
    return ENGINEER_PROJECTS.filter(p => {
      const matchSearch = p.title.includes(search) || p.clientName.includes(search);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchPriority = priorityFilter === 'all' || p.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  return (
    <DashboardLayout
      role="engineer"
      userName="م. سارة الزهراني"
      userEmail="sara@meyaar.sa"
      pageTitle="المشاريع المسندة"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/engineer' }, { label: 'المشاريع المسندة' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-white">المشاريع المسندة</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} مشروع</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-5 animate-fade-in">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو العميل..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {(['all', 'in_progress', 'pending', 'in_review', 'completed'] as StatusFilterType[]).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-blue-600/20 text-blue-300' : 'text-muted-foreground hover:bg-white/5'}`}>
                {s === 'all' ? 'الكل' : s === 'in_progress' ? 'قيد التنفيذ' : s === 'pending' ? 'معلق' : s === 'in_review' ? 'قيد المراجعة' : 'مكتمل'}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map(p => (
              <button key={p} onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${priorityFilter === p ? 'bg-cyan-600/20 text-cyan-300' : 'text-muted-foreground hover:bg-white/5'}`}>
                {p === 'all' ? 'كل الأولويات' : p === 'high' ? 'عالي' : p === 'medium' ? 'متوسط' : 'منخفض'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <div key={project.id} className="glass-card p-4 animate-fade-in-up hover:border-cyan-500/20 transition-all"
              style={{ animationDelay: `${i * 50}ms` }}>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.clientName}</p>
                </div>
                <PriorityBadge priority={project.priority} />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {project.endDate}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">التقدم</span>
                  <span className="text-xs font-mono text-cyan-300">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>

              {/* Status & Type */}
              <div className="flex items-center gap-2 mb-3">
                <StatusBadge status={project.status} />
                <TypeBadge type={project.type} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Link href={`/engineer/workspace/${project.id}`} className="flex-1">
                  <Button size="sm" className="w-full h-7 text-xs gap-1 bg-cyan-600 hover:bg-cyan-500">
                    <Wrench className="w-3 h-3" /> مساحة العمل
                  </Button>
                </Link>
                <button onClick={() => toast.info('تحديث التقدم — قريباً')}
                  className="p-1.5 rounded-lg border border-border hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-colors">
                  <TrendingUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toast.info('رفع مخرج — قريباً')}
                  className="p-1.5 rounded-lg border border-border hover:bg-white/5 text-muted-foreground hover:text-emerald-400 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="glass-card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4">المشروع</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">العميل</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الأولوية</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">التقدم</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الحالة</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3">الموعد</th>
                  <th className="text-right text-xs text-muted-foreground font-medium py-3 w-28">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-xs font-medium text-foreground">{project.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{project.id}</p>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{project.clientName}</td>
                    <td className="py-3"><PriorityBadge priority={project.priority} /></td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 w-24">
                        <Progress value={project.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground font-mono">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3"><StatusBadge status={project.status} /></td>
                    <td className="py-3 text-xs text-muted-foreground">{project.endDate}</td>
                    <td className="py-3">
                      <Link href={`/engineer/workspace/${project.id}`}>
                        <Button size="sm" variant="outline" className="h-6 text-xs px-2 gap-1">
                          <Wrench className="w-3 h-3" /> فتح
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <FolderOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">لا توجد مشاريع تطابق البحث</p>
        </div>
      )}
    </DashboardLayout>
  );
}
