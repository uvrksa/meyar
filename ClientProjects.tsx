// ============================================================
// MEYAAR — Client Projects Page (Advanced)
// Features: Grid/Table view, search, filter by status/category/priority, sort
// Design: Enterprise Dark Precision
// ============================================================

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Plus, Search, FolderOpen, MapPin, Calendar, DollarSign,
  LayoutGrid, List, SlidersHorizontal, ArrowUpDown,
  Eye, MessageSquare, ChevronRight, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { StatusBadge, PriorityBadge, ProgressBar, EmptyState } from '@/components/SharedComponents';
import { mockProjects } from '@/lib/mock-data';
import type { ProjectStatus } from '@/lib/mock-data';

const STATUS_FILTERS: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'الكل', value: 'all' },
  { label: 'منتظر', value: 'pending' },
  { label: 'قيد المراجعة', value: 'in_review' },
  { label: 'قيد التنفيذ', value: 'in_progress' },
  { label: 'مكتمل', value: 'completed' },
  { label: 'متأخر', value: 'delayed' },
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'كل التصنيفات' },
  { id: 'infrastructure', label: 'بنية تحتية' },
  { id: 'factory', label: 'مصانع' },
  { id: 'real_estate', label: 'عقارات' },
  { id: 'construction', label: 'إنشاءات' },
  { id: 'commercial', label: 'تجاري' },
];

const SORT_OPTIONS = [
  { id: 'date_desc', label: 'الأحدث أولاً' },
  { id: 'progress_desc', label: 'الأعلى تقدماً' },
  { id: 'title_asc', label: 'الاسم أ-ي' },
];

const EXTENDED = mockProjects.map((p, i) => ({
  ...p,
  category: ['infrastructure', 'factory', 'real_estate', 'construction', 'commercial'][i % 5],
  engineer: p.engineerName || ['م. سارة الزهراني', 'م. خالد الحربي', 'م. نورة السعدي', 'م. فهد العتيبي', 'م. ريم الشمري'][i % 5],
}));

type ViewMode = 'grid' | 'table';

export default function ClientProjects() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...EXTENDED];
    if (search) list = list.filter(p => p.title.includes(search) || p.engineer.includes(search));
    if (statusFilter !== 'all') list = list.filter(p => p.status === statusFilter);
    if (categoryFilter !== 'all') list = list.filter(p => p.category === categoryFilter);
    if (sortBy === 'progress_desc') list.sort((a, b) => b.progress - a.progress);
    else if (sortBy === 'title_asc') list.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    return list;
  }, [search, statusFilter, categoryFilter, sortBy]);

  const getCategoryLabel = (id: string) => CATEGORY_FILTERS.find(c => c.id === id)?.label || id;

  return (
    <DashboardLayout
      role="client"
      userName="أحمد محمد العمري"
      userEmail="ahmed@example.com"
      pageTitle="مشاريعي"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/client' }, { label: 'مشاريعي' }]}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white">مشاريعي</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} مشروع</p>
        </div>
        <Link href="/client/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
            <Plus className="w-4 h-4" />
            مشروع جديد
          </Button>
        </Link>
      </div>

      {/* ── Search & Controls ── */}
      <div className="glass-card p-4 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث في المشاريع..."
              className="bg-white/5 border-border h-9 pr-9 text-sm" />
          </div>

          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}
            className={`gap-2 h-9 border ${showFilters ? 'border-blue-500/50 text-blue-300' : 'border-border text-muted-foreground'}`}>
            <SlidersHorizontal className="w-4 h-4" />
            فلترة
          </Button>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="h-9 bg-white/5 border border-border rounded-lg px-3 text-sm text-foreground">
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-white/5'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-white/5'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border space-y-3 animate-fade-in">
            <div>
              <p className="text-xs text-muted-foreground mb-2">الحالة</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map(f => (
                  <button key={f.value} onClick={() => setStatusFilter(f.value)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${statusFilter === f.value ? 'border-blue-500/60 bg-blue-500/10 text-blue-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">التصنيف</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map(f => (
                  <button key={f.id} onClick={() => setCategoryFilter(f.id)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${categoryFilter === f.id ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300' : 'border-border text-muted-foreground hover:bg-white/5'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Grid View ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full">
              <EmptyState icon={FolderOpen} title="لا توجد مشاريع" description="لم يتم العثور على مشاريع تطابق البحث" />
            </div>
          ) : (
            filtered.map((project, i) => (
              <Link key={project.id} href={`/client/projects/${project.id}`}>
                <div className="glass-card p-5 cursor-pointer group hover:border-blue-500/30 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{getCategoryLabel(project.category)}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="text-foreground font-medium">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{project.engineer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>التسليم: {project.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="w-3 h-3 flex-shrink-0" />
                      <span>{project.budget.toLocaleString('ar-SA')} ر.س</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <PriorityBadge priority={project.priority} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors rotate-180" />
                  </div>
                </div>
              </Link>
            ))
          )}
          <Link href="/client/projects/new">
            <div className="border-2 border-dashed border-border rounded-xl p-5 cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center gap-3 min-h-48">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">إضافة مشروع جديد</p>
            </div>
          </Link>
        </div>
      )}

      {/* ── Table View ── */}
      {viewMode === 'table' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['المشروع', 'التصنيف', 'الحالة', 'المهندس', 'التقدم', 'الموعد', 'الأولوية', ''].map((h, i) => (
                    <th key={i} className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">{h}{i < 6 && <ArrowUpDown className="w-3 h-3 opacity-40" />}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((project, i) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-white/3 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 30}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="font-medium text-foreground truncate max-w-40">{project.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{getCategoryLabel(project.category)}</td>
                    <td className="px-4 py-3"><StatusBadge status={project.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{project.engineer}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-24">
                        <ProgressBar value={project.progress} className="flex-1" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{project.endDate}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={project.priority} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/client/projects/${project.id}`}>
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-blue-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-purple-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
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
        </div>
      )}
    </DashboardLayout>
  );
}
