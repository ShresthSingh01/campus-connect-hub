import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/store/hooks';
import { useNotifications } from '@/hooks/useNotifications';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const user = useAppSelector(state => state.auth.user);
  const { preferences, updatePreferences } = useNotifications();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue={user?.role} disabled className="capitalize" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how Campus Connect looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="theme">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark themes
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive in-app toast notifications
              </p>
            </div>
            <Switch 
              id="push" 
              checked={preferences?.push_notifications ?? true}
              onCheckedChange={(checked) => updatePreferences({ push_notifications: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch 
              id="email" 
              checked={preferences?.email_notifications ?? false}
              onCheckedChange={(checked) => updatePreferences({ email_notifications: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="announcements">Announcement Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new announcements
              </p>
            </div>
            <Switch 
              id="announcements" 
              checked={preferences?.announcements_enabled ?? true}
              onCheckedChange={(checked) => updatePreferences({ announcements_enabled: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="bookings">Booking Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Reminders for upcoming bookings
              </p>
            </div>
            <Switch 
              id="bookings" 
              checked={preferences?.bookings_enabled ?? true}
              onCheckedChange={(checked) => updatePreferences({ bookings_enabled: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="forum">Forum Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Updates on replies and mentions
              </p>
            </div>
            <Switch 
              id="forum" 
              checked={preferences?.forum_enabled ?? true}
              onCheckedChange={(checked) => updatePreferences({ forum_enabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
