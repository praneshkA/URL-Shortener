import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowLeft, Copy, ExternalLink, Loader2, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { analyticsApi } from '@/services/api';
import { formatDate, truncateUrl } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export function AnalyticsPage() {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await analyticsApi.get(shortCode);
        setData(res.analytics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [shortCode]);

  const copyShortUrl = async () => {
    if (!data?.shortUrl) return;
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      toast({ title: 'Copied!', variant: 'success' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4 text-center py-16">
        <p className="text-destructive">{error || 'Analytics not found'}</p>
        <Button variant="outline" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const chartData = data.dailyClicks.length
    ? data.dailyClicks
    : [{ date: new Date().toISOString().slice(0, 10), clicks: 0 }];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" className="mb-2 -ml-2" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold md:text-3xl">Link analytics</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">{data.shortCode}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyShortUrl}>
            <Copy className="h-4 w-4" />
            Copy link
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={data.originalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Original
            </a>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Destination</p>
          <a
            href={data.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {truncateUrl(data.originalUrl, 80)}
          </a>
          <p className="mt-2 font-mono text-sm">{data.shortUrl}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total clicks</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <MousePointerClick className="h-8 w-8 text-primary" />
              {data.totalClicks.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last visited</CardDescription>
            <CardTitle className="text-xl">
              {data.lastVisited ? formatDate(data.lastVisited) : 'No visits yet'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily clicks</CardTitle>
          <CardDescription>Click activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(239 84% 67%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(239 84% 67%)"
                  fill="url(#clickGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent visits</CardTitle>
          <CardDescription>
            Last {data.recentVisits.length} recorded visits
            {data.recentVisits.length >= 50 ? ' (showing max 50)' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {data.recentVisits.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">No visits recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentVisits.map((visit, i) => (
                  <TableRow key={`${visit.timestamp}-${i}`}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>{formatDate(visit.timestamp)}</TableCell>
                    <TableCell>
                      <Badge variant="success">Recorded</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
