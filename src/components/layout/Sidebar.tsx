
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart2, 
  Plane, 
  Home, 
  MapPin, 
  Radio, 
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, to, active, collapsed }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
        active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <span>{label}</span>}
      {active && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute -right-px h-full w-1 bg-primary rounded-l-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className={cn(
        "h-full border-r border-border bg-sidebar fixed top-0 pt-16 transition-all z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4">
        {!collapsed && (
          <div className="mb-6">
            <div className="relative flex items-center h-10">
              <div className="flex items-center gap-2 font-semibold text-xl">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Radio className="h-4 w-4 text-white" />
                </span>
                <span>DroneVision</span>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          <SidebarItem
            to="/dashboard"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            active={currentPath === '/dashboard'}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/missions"
            icon={<Plane className="h-5 w-5" />}
            label="Mission Planning"
            active={currentPath === '/missions'}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/fleet"
            icon={<Radio className="h-5 w-5" />}
            label="Fleet Management"
            active={currentPath === '/fleet'}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/monitoring"
            icon={<MapPin className="h-5 w-5" />}
            label="Mission Monitoring"
            active={currentPath === '/monitoring'}
            collapsed={collapsed}
          />
          <SidebarItem
            to="/reports"
            icon={<BarChart2 className="h-5 w-5" />}
            label="Reports"
            active={currentPath === '/reports'}
            collapsed={collapsed}
          />
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <SidebarItem
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={currentPath === '/settings'}
            collapsed={collapsed}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
