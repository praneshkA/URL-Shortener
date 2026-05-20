import { Link, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, Link2, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Sidebar({ onNavigate }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNav = () => onNavigate?.();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex items-center gap-2 border-b px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Link2 className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold leading-tight">SnapLink</p>
          <p className="text-xs text-muted-foreground">Analytics</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={handleNav}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              location.pathname === to
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4 space-y-3">
        <div className="rounded-lg bg-muted/50 px-3 py-2">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="truncate text-sm font-medium">{user?.name}</p>
        </div>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export function MobileHeader({ onMenuOpen }) {
  return (
    <header className="flex items-center justify-between border-b bg-card px-4 py-3 lg:hidden">
      <div className="flex items-center gap-2">
        <Link2 className="h-5 w-5 text-primary" />
        <span className="font-bold">SnapLink</span>
      </div>
      <Button variant="outline" size="sm" onClick={onMenuOpen}>
        <BarChart3 className="h-4 w-4" />
        Menu
      </Button>
    </header>
  );
}
