import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { useAppSelector } from '@/store/hooks';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useNotifications } from '@/hooks/useNotifications';

export function DashboardLayout() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  useNotifications(); // Initialize notifications

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">Campus Connect</h1>
            </div>
            <NotificationBell />
          </header>
          <main className="flex-1 overflow-y-auto bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
