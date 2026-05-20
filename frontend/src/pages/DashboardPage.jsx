import { useCallback, useEffect, useState } from 'react';
import { MousePointerClick, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { UrlShortenerForm } from '@/components/UrlShortenerForm';
import { UrlTable } from '@/components/UrlTable';
import { EmptyState } from '@/components/EmptyState';
import { urlsApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUrls = useCallback(async () => {
    setLoading(true);
    try {
      const data = await urlsApi.list(searchDebounced);
      setUrls(data.urls);
    } catch (err) {
      toast({ title: 'Failed to load URLs', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [searchDebounced]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}. Manage your short links below.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MousePointerClick className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{urls.length}</p>
              <p className="text-sm text-muted-foreground">Active links</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <MousePointerClick className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total clicks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <UrlShortenerForm onCreated={(url) => setUrls((prev) => [url, ...prev])} />

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Your links</h2>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search URLs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {!loading && urls.length === 0 ? (
          <EmptyState
            title="No links yet"
            description="Create your first short URL using the form above to start tracking clicks."
          />
        ) : (
          <UrlTable
            urls={urls}
            loading={loading}
            onDelete={(id) => setUrls((prev) => prev.filter((u) => u.id !== id))}
          />
        )}
      </div>
    </div>
  );
}
