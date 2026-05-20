import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Link2, Moon, Shield, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';

const features = [
  {
    icon: Link2,
    title: 'Instant shortening',
    description: 'Turn long URLs into memorable short links with unique nanoid codes.',
  },
  {
    icon: BarChart3,
    title: 'Rich analytics',
    description: 'Track clicks, visit history, and daily trends with beautiful charts.',
  },
  {
    icon: Shield,
    title: 'Secure & private',
    description: 'JWT authentication, bcrypt passwords, and protected API routes.',
  },
  {
    icon: Zap,
    title: 'Lightning redirects',
    description: 'Server-side redirects with real-time click tracking on every visit.',
  },
];

const demoUrls = [
  { original: 'https://katomaran.com/hackathon', short: 'snap.link/a8Kx2mQp', clicks: 1247 },
  { original: 'https://github.com/features', short: 'snap.link/b3Nm9kRt', clicks: 892 },
  { original: 'https://docs.mongodb.com/atlas', short: 'snap.link/c7Pq4nWx', clicks: 456 },
];

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Link2 className="h-4 w-4" />
            </div>
            SnapLink Analytics
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#preview" className="hover:text-foreground">Preview</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="gradient-hero relative overflow-hidden px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Production-ready URL analytics platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Shorten links.
            <br />
            <span className="text-primary">Track every click.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            SnapLink Analytics helps you create branded short URLs, monitor traffic in real time,
            and visualize engagement with powerful dashboards and charts.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/signup">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">View dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything you need</h2>
            <p className="mt-3 text-muted-foreground">Built for marketers, developers, and growth teams.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="glass-card transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="preview" className="px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Dashboard preview</h2>
            <p className="mt-3 text-muted-foreground">See how your links perform at a glance.</p>
          </div>
          <Card className="overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-muted-foreground">dashboard.snaplink.app</span>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-3 gap-4 border-b p-4 bg-card">
                {[
                  { label: 'Total links', value: '24' },
                  { label: 'Total clicks', value: '12,847' },
                  { label: 'Active today', value: '342' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-muted/50 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y">
                {demoUrls.map((item) => (
                  <div key={item.short} className="flex flex-wrap items-center justify-between gap-4 p-4 text-sm">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-muted-foreground">{item.original}</p>
                      <p className="font-mono text-primary">{item.short}</p>
                    </div>
                    <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      {item.clicks.toLocaleString()} clicks
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">Ready to snap your links?</h2>
          <p className="mt-4 opacity-90">Join SnapLink Analytics and start tracking clicks in minutes.</p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link to="/signup">
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} SnapLink Analytics. All rights reserved.</p>
          <p>
            Built for the{' '}
            <a href="https://katomaran.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Katomaran Hackathon
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
