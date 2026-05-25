// ============================================================
// MEYAAR — Mock Data Layer
// Used across all dashboards for demo purposes
// Replace with real API calls in production
// ============================================================

export type UserRole = 'client' | 'engineer' | 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  clientId: string;
  clientName: string;
  engineerId?: string;
  engineerName?: string;
  budget: number;
  progress: number;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export type ProjectType =
  | 'engineering_study'
  | 'financial_feasibility'
  | 'infrastructure'
  | 'construction'
  | 'factory'
  | 'real_estate'
  | 'commercial';

export type ProjectStatus =
  | 'pending'
  | 'in_review'
  | 'in_progress'
  | 'completed'
  | 'delayed'
  | 'cancelled';

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  engineering_study: 'دراسة هندسية',
  financial_feasibility: 'جدوى مالية',
  infrastructure: 'تقييم بنية تحتية',
  construction: 'مشروع إنشائي',
  factory: 'دراسة مصنع',
  real_estate: 'مشروع عقاري',
  commercial: 'فرصة تجارية',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  pending: 'قيد الانتظار',
  in_review: 'قيد المراجعة',
  in_progress: 'قيد التنفيذ',
  completed: 'مكتمل',
  delayed: 'متأخر',
  cancelled: 'ملغي',
};

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'أحمد محمد العمري',
    email: 'ahmed@example.com',
    role: 'client',
    company: 'مجموعة العمري للاستثمار',
    phone: '+966 50 123 4567',
    createdAt: '2024-01-15',
  },
  {
    id: 'u2',
    name: 'م. سارة الزهراني',
    email: 'sara@meyaar.sa',
    role: 'engineer',
    company: 'معيار للاستشارات الهندسية',
    phone: '+966 55 987 6543',
    createdAt: '2023-08-20',
  },
  {
    id: 'u3',
    name: 'خالد الرشيد',
    email: 'khalid@meyaar.sa',
    role: 'admin',
    company: 'معيار',
    phone: '+966 56 456 7890',
    createdAt: '2023-01-01',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'دراسة جدوى مجمع سكني — الرياض',
    type: 'real_estate',
    status: 'in_progress',
    clientId: 'u1',
    clientName: 'أحمد محمد العمري',
    engineerId: 'u2',
    engineerName: 'م. سارة الزهراني',
    budget: 85000,
    progress: 65,
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    location: 'الرياض، حي النرجس',
    description: 'دراسة جدوى اقتصادية وهندسية شاملة لمجمع سكني من 200 وحدة',
    priority: 'high',
  },
  {
    id: 'p2',
    title: 'تقييم بنية تحتية — مشروع الميناء',
    type: 'infrastructure',
    status: 'in_review',
    clientId: 'u1',
    clientName: 'أحمد محمد العمري',
    budget: 120000,
    progress: 30,
    startDate: '2025-03-15',
    endDate: '2025-09-15',
    location: 'جدة، الميناء الإسلامي',
    description: 'تقييم شامل للبنية التحتية وتحديد متطلبات التطوير',
    priority: 'urgent',
  },
  {
    id: 'p3',
    title: 'دراسة إنشاء مصنع أغذية',
    type: 'factory',
    status: 'completed',
    clientId: 'u1',
    clientName: 'أحمد محمد العمري',
    engineerId: 'u2',
    engineerName: 'م. سارة الزهراني',
    budget: 65000,
    progress: 100,
    startDate: '2024-10-01',
    endDate: '2025-01-31',
    location: 'الدمام، المنطقة الصناعية',
    description: 'دراسة هندسية ومالية لإنشاء مصنع أغذية بطاقة 500 طن شهرياً',
    priority: 'medium',
  },
  {
    id: 'p4',
    title: 'تحليل فرصة تجارية — مركز تسوق',
    type: 'commercial',
    status: 'pending',
    clientId: 'u1',
    clientName: 'أحمد محمد العمري',
    budget: 45000,
    progress: 0,
    startDate: '2025-05-01',
    endDate: '2025-08-01',
    location: 'مكة المكرمة',
    description: 'تحليل شامل للفرصة الاستثمارية في إنشاء مركز تسوق متكامل',
    priority: 'low',
  },
  {
    id: 'p5',
    title: 'دراسة هندسية — جسر الربط',
    type: 'engineering_study',
    status: 'delayed',
    clientId: 'u1',
    clientName: 'أحمد محمد العمري',
    engineerId: 'u2',
    engineerName: 'م. سارة الزهراني',
    budget: 200000,
    progress: 45,
    startDate: '2024-12-01',
    endDate: '2025-05-01',
    location: 'المدينة المنورة',
    description: 'دراسة هندسية متخصصة لمشروع جسر الربط بين الأحياء',
    priority: 'high',
  },
];

export const mockStats = {
  totalProjects: 24,
  activeProjects: 12,
  completedProjects: 9,
  pendingProjects: 3,
  totalRevenue: 2450000,
  monthlyRevenue: 385000,
  revenueGrowth: 8.2,
  totalClients: 47,
  activeEngineers: 8,
  avgProjectDuration: 4.2,
  satisfactionRate: 94,
};

export const mockChartData = {
  monthlyRevenue: [
    { month: 'يناير', value: 320000 },
    { month: 'فبراير', value: 280000 },
    { month: 'مارس', value: 410000 },
    { month: 'أبريل', value: 350000 },
    { month: 'مايو', value: 390000 },
    { month: 'يونيو', value: 385000 },
  ],
  projectsByType: [
    { type: 'عقاري', count: 8, color: '#3B82F6' },
    { type: 'إنشائي', count: 6, color: '#06B6D4' },
    { type: 'صناعي', count: 4, color: '#8B5CF6' },
    { type: 'تجاري', count: 3, color: '#10B981' },
    { type: 'بنية تحتية', count: 3, color: '#F59E0B' },
  ],
  completionRate: [
    { month: 'يناير', rate: 78 },
    { month: 'فبراير', rate: 82 },
    { month: 'مارس', rate: 75 },
    { month: 'أبريل', rate: 88 },
    { month: 'مايو', rate: 91 },
    { month: 'يونيو', rate: 94 },
  ],
};

export const mockNotifications = [
  {
    id: 'n1',
    title: 'تم تعيين مهندس لمشروعك',
    body: 'تم تعيين م. سارة الزهراني لمشروع مجمع سكني الرياض',
    time: 'منذ 5 دقائق',
    read: false,
    type: 'info',
  },
  {
    id: 'n2',
    title: 'تحديث تقدم المشروع',
    body: 'وصل تقدم مشروع جسر الربط إلى 45%',
    time: 'منذ ساعة',
    read: false,
    type: 'success',
  },
  {
    id: 'n3',
    title: 'تنبيه: موعد نهائي قريب',
    body: 'مشروع تقييم الميناء موعده النهائي بعد 30 يوماً',
    time: 'منذ 3 ساعات',
    read: true,
    type: 'warning',
  },
  {
    id: 'n4',
    title: 'تم اكتمال التقرير',
    body: 'تم رفع التقرير النهائي لمشروع مصنع الأغذية',
    time: 'أمس',
    read: true,
    type: 'success',
  },
];

export const mockMessages = [
  {
    id: 'm1',
    from: 'م. سارة الزهراني',
    avatar: null,
    preview: 'تم الانتهاء من المرحلة الأولى من الدراسة...',
    time: '10:30 ص',
    unread: 2,
    projectId: 'p1',
  },
  {
    id: 'm2',
    from: 'خالد الرشيد',
    avatar: null,
    preview: 'يرجى مراجعة المستندات المرفقة وتأكيد...',
    time: 'أمس',
    unread: 0,
    projectId: 'p2',
  },
];

export const mockTasks = [
  {
    id: 't1',
    title: 'مراجعة تقرير الجدوى المالية',
    projectId: 'p1',
    projectTitle: 'مجمع سكني — الرياض',
    dueDate: '2025-06-01',
    priority: 'high' as const,
    status: 'in_progress' as const,
  },
  {
    id: 't2',
    title: 'إعداد مخططات البنية التحتية',
    projectId: 'p2',
    projectTitle: 'مشروع الميناء',
    dueDate: '2025-05-28',
    priority: 'urgent' as const,
    status: 'pending' as const,
  },
  {
    id: 't3',
    title: 'تحليل السوق العقاري',
    projectId: 'p1',
    projectTitle: 'مجمع سكني — الرياض',
    dueDate: '2025-06-10',
    priority: 'medium' as const,
    status: 'completed' as const,
  },
];
