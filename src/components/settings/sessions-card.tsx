'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, LogOut } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function SessionsCard() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const onConfirm = async () => {
    setSigningOut(true);
    try {
      // scope: 'global' revokes every refresh token for this user
      // across all devices; the next auth-state change on this tab
      // triggers the usual redirect.
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        toast.error(`Sign-out failed: ${error.message}`);
        return;
      }
      window.location.href = '/login';
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(msg);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <Card className="bg-white border-slate-200 shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 font-semibold">
            <LogOut className="size-4 text-primary" />
            Active sessions
          </CardTitle>
          <CardDescription className="text-slate-500">
            Sign out of every device where you&apos;re logged in — including
            this one. Useful if you lost a laptop or shared your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(true)}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-white shadow-xs"
          >
            <LogOut className="size-4" />
            Sign out of all devices
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-slate-200 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-slate-900 font-semibold">Sign out everywhere?</DialogTitle>
            <DialogDescription className="text-slate-500">
              Every device logged into this account will be signed out and
              will need to log in again. You will be redirected to the login
              page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-slate-50 border-t border-slate-100 p-4 -mx-6 -mb-6 rounded-b-lg flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={signingOut}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-white shadow-xs"
            >
              Cancel
            </Button>
            <Button type="button" onClick={onConfirm} disabled={signingOut} className="bg-primary hover:bg-primary-hover text-white font-medium shadow-xs">
              {signingOut ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing out…
                </>
              ) : (
                'Sign out everywhere'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
