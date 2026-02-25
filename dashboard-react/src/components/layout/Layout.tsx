import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useUIStore } from '../../stores';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'dashboard';
  const { sidebarOpen, toggleSidebar, closeSidebar } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          navigate(`/${page}`);
          closeSidebar();
        }}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      <main className="ml-0 lg:ml-60 mt-14 p-4 lg:p-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
