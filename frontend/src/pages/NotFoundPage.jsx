import { Link } from 'react-router-dom';
import { Home, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero p-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Link2 className="h-8 w-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Page not found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
