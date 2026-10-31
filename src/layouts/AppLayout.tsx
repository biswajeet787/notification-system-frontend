
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  BellRing,
  LayoutDashboard,
  TableProperties,
  FileText,
  Send,
  Settings2,
  ChevronRight,
  Activity,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/triggers', label: 'Trigger matrix', icon: TableProperties },
  { to: '/templates', label: 'Templates', icon: FileText },
  { to: '/testing', label: 'Test center', icon: Send },
  { to: '/push', label: 'Web Push', icon: BellRing },
  { to: '/demo', label: 'Login / Logout demo', icon: ShieldCheck },
  { to: '/settings', label: 'Configuration', icon: Settings2 },
];

export default function AppLayout() {
  const path = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const active =
    nav.find((n) => n.to === path.pathname)?.label || 'Dashboard';

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <BellRing size={23} />
          </span>

          <div>
            <strong>NotifyHub</strong>
            <small>CONTROL CENTER</small>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav>
          {nav.map((n) => (
            <NavLink
              end
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <n.icon size={18} />
              <span>{n.label}</span>

              {n.to === '/triggers' && (
                <ChevronRight size={15} className="nav-chevron" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <Activity size={17} />
            <span>Connected to Django API</span>
          </div>

          <div className="sidebar-profile">
            <div className="avatar">AD</div>

            <div>
              <strong>{user?.username || 'Admin'}</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-wrap">
        <header className="topbar">
          <div className="breadcrumbs">
            Workspace <ChevronRight size={14} />
            <strong>{active}</strong>
          </div>

          <div className="topbar-right">
            <span className="environment">DEVELOPMENT</span>

            <span>{user?.username}</span>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
