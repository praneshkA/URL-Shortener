import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Copy, ExternalLink, Loader2, QrCode, Trash2 } from 'lucide-react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate, formatRelative, truncateUrl } from '@/lib/utils';
import { urlsApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function UrlTable({ urls, loading, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied!', description: 'Short URL copied to clipboard.', variant: 'success' });
    } catch {
      toast({ title: 'Copy failed', description: 'Could not copy to clipboard.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await urlsApi.delete(id);
      toast({ title: 'Deleted', description: 'Short URL removed.', variant: 'success' });
      onDelete?.(id);
    } catch (err) {
      toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
    } finally {
      setDeletingId(null);
    }
  };

  const showQr = async (shortUrl) => {
    try {
      const dataUrl = await QRCode.toDataURL(shortUrl, { width: 256, margin: 2 });
      setQrDataUrl(dataUrl);
      setQrUrl(shortUrl);
      setQrOpen(true);
    } catch {
      toast({ title: 'QR failed', description: 'Could not generate QR code.', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="max-w-[200px]">
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-primary"
                    title={url.originalUrl}
                  >
                    {truncateUrl(url.originalUrl, 36)}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{url.shortCode}</code>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{url.clicks.toLocaleString()}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                  {formatDate(url.createdAt)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                  {formatRelative(url.lastVisited)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Copy" onClick={() => copyToClipboard(url.shortUrl)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="QR Code" onClick={() => showQr(url.shortUrl)}>
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="Analytics">
                      <Link to={`/analytics/${url.shortCode}`}>
                        <BarChart3 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      disabled={deletingId === url.id}
                      onClick={() => handleDelete(url.id)}
                    >
                      {deletingId === url.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription className="break-all">{qrUrl}</DialogDescription>
          </DialogHeader>
          {qrDataUrl && (
            <div className="flex justify-center py-4">
              <img src={qrDataUrl} alt="QR Code" className="rounded-lg border" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
