import { useState } from 'react';
import { Link2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { urlsApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function UrlShortenerForm({ onCreated }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value.trim()) return 'Please enter a URL';
    try {
      const parsed = new URL(value.trim());
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return 'URL must start with http:// or https://';
      }
    } catch {
      return 'Please enter a valid URL';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(url);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await urlsApi.create(url.trim());
      setUrl('');
      toast({
        title: 'Link created!',
        description: 'Your short URL is ready to share.',
        variant: 'success',
      });
      onCreated?.(data.url);
    } catch (err) {
      toast({
        title: 'Failed to shorten',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Link2 className="h-5 w-5 text-primary" />
          Shorten a new URL
        </CardTitle>
        <CardDescription>Paste any long link and get a trackable short URL instantly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="https://example.com/your-long-url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
            />
            {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" disabled={loading} className="sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Shorten URL'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
