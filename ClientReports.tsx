// ============================================================
// MEYAAR — Client Reports Page
// ============================================================

import { FileText, Download, Eye, Calendar, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { SectionHeader } from '@/components/SharedComponents';
import { mockProjects } from '@/lib/mock-data';
import { toast } from 'sonner';

const REPORTS = mockProjects.flatMap(p => [
  { id: `${p.id}-1`, projectTitle: p.title, name: 'تقرير المرحلة الأولى', type: 'PDF', size: '2.4 MB', date: '2025-04-15', status: 'available' },
  { id: `${p.id}-2`, projectTitle: p.title, name: 'الدراسة المالية', type: 'XLSX', size: '1.1 MB', date: '2025-04-20', status: p.progress >= 50 ? 'available' : 'pending' },
]).slice(0, 8);

export default function ClientReports() {
  return (
    <DashboardLayout
      role="client"
      pageTitle="التقارير"
      breadcrumbs={[{ label: 'لوحة التحكم', href: '/client' }, { label: 'التقارير' }]}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">التقارير والمستندات</h1>
        <p className="text-sm text-muted-foreground">جميع تقارير مشاريعك في مكان واحد</p>
      </div>

      <div className="space-y-3">
        {REPORTS.map((report, i) => (
          <div key={report.id} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${report.status === 'available' ? 'bg-blue-500/10' : 'bg-white/5'}`}>
                <FileText className={`w-5 h-5 ${report.status === 'available' ? 'text-blue-400' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{report.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span className="truncate max-w-48">{report.projectTitle}</span>
                  </div>
                  <span>{report.type} · {report.size}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {report.status === 'available' ? (
                  <>
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-blue-400 gap-1" onClick={() => toast.info('قريباً: معاينة التقرير')}>
                      <Eye className="w-3.5 h-3.5" />
                      معاينة
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-emerald-400 gap-1" onClick={() => toast.success('جارٍ التحميل...')}>
                      <Download className="w-3.5 h-3.5" />
                      تحميل
                    </Button>
                  </>
                ) : (
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">قيد الإعداد</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
