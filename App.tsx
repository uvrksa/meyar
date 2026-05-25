import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProjects from "./pages/client/ClientProjects";
import ProjectDetails from "./pages/client/ProjectDetails";
import ClientReports from "./pages/client/ClientReports";
import ClientBilling from "./pages/client/ClientBilling";
import CreateProject from "./pages/client/CreateProject";

// Engineer Pages
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import EngineerProjects from "./pages/engineer/EngineerProjects";
import EngineerWorkspace from "./pages/engineer/EngineerWorkspace";
import EngineerTasks from "./pages/engineer/EngineerTasks";
import EngineerDeliverables from "./pages/engineer/EngineerDeliverables";
import EngineerClarifications from "./pages/engineer/EngineerClarifications";
import EngineerProfile from "./pages/engineer/EngineerProfile";
import EngineerPerformance from "./pages/engineer/EngineerPerformance";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminEngineers from "./pages/admin/AdminEngineers";
import AdminClients from "./pages/admin/AdminClients";
import AdminFinance from "./pages/admin/AdminFinance";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminDeliverables from "./pages/admin/AdminDeliverables";
import AdminActivityLog from "./pages/admin/AdminActivityLog";

// Shared Pages
import MessagesPage from "./pages/shared/MessagesPage";
import ProfilePage from "./pages/shared/ProfilePage";
import NotificationsPage from "./pages/shared/NotificationsPage";

// Placeholder for unimplemented pages
import { toast } from "sonner";
import { useEffect } from "react";

function ComingSoon({ title }: { title: string }) {
  useEffect(() => {
    toast.info(`${title} — قريباً`);
  }, [title]);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚧</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-muted-foreground">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* ── Public ── */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password">
        {() => <ComingSoon title="استعادة كلمة المرور" />}
      </Route>

      {/* ── Client ── */}
      <Route path="/client" component={ClientDashboard} />
      <Route path="/client/projects" component={ClientProjects} />
      <Route path="/client/projects/new" component={CreateProject} />
      <Route path="/client/projects/:id" component={ProjectDetails} />
      <Route path="/client/reports" component={ClientReports} />
      <Route path="/client/billing" component={ClientBilling} />
      <Route path="/client/messages">
        {() => <MessagesPage role="client" userName="أحمد محمد العمري" userEmail="ahmed@example.com" />}
      </Route>
      <Route path="/client/profile">
        {() => <ProfilePage role="client" userName="أحمد محمد العمري" userEmail="ahmed@example.com" />}
      </Route>
      <Route path="/client/notifications">
        {() => <NotificationsPage role="client" />}
      </Route>
      <Route path="/client/settings">
        {() => <ProfilePage role="client" userName="أحمد محمد العمري" userEmail="ahmed@example.com" />}
      </Route>

      {/* ── Engineer ── */}
      <Route path="/engineer" component={EngineerDashboard} />
      <Route path="/engineer/projects" component={EngineerProjects} />
      <Route path="/engineer/workspace" component={EngineerWorkspace} />
      <Route path="/engineer/workspace/:id" component={EngineerWorkspace} />
      <Route path="/engineer/tasks" component={EngineerTasks} />
      <Route path="/engineer/messages">
        {() => <MessagesPage role="engineer" userName="م. سارة الزهراني" userEmail="sara@meyaar.sa" />}
      </Route>
      <Route path="/engineer/profile" component={EngineerProfile} />
      <Route path="/engineer/deliverables" component={EngineerDeliverables} />
      <Route path="/engineer/clarifications" component={EngineerClarifications} />
      <Route path="/engineer/performance" component={EngineerPerformance} />
      <Route path="/engineer/notifications">
        {() => <NotificationsPage role="engineer" />}
      </Route>

      {/* ── Admin ── */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/engineers" component={AdminEngineers} />
      <Route path="/admin/clients" component={AdminClients} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/finance" component={AdminFinance} />
      <Route path="/admin/roles" component={AdminRoles} />
      <Route path="/admin/deliverables" component={AdminDeliverables} />
      <Route path="/admin/activity-log" component={AdminActivityLog} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/messages">
        {() => <MessagesPage role="admin" userName="خالد الرشيد" userEmail="khalid@meyaar.sa" />}
      </Route>
      <Route path="/admin/profile">
        {() => <ProfilePage role="admin" userName="خالد الرشيد" userEmail="khalid@meyaar.sa" />}
      </Route>
      <Route path="/admin/notifications">
        {() => <NotificationsPage role="admin" />}
      </Route>
      <Route path="/admin/reports">
        {() => <ComingSoon title="التقارير" />}
      </Route>

      {/* ── Fallback ── */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-center" dir="rtl" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
