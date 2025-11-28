import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Bell } from 'lucide-react';

export function TestNotificationButton() {
  const [isLoading, setIsLoading] = useState(false);

  const sendTestNotification = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to test notifications');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('No active session');
        return;
      }

      const response = await supabase.functions.invoke('send-notification', {
        body: {
          title: 'Test Notification',
          message: 'This is a test notification to verify your notification system is working!',
          type: 'system',
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw response.error;
      }

      toast.success('Test notification sent! Check the notification bell icon.');
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast.error('Failed to send test notification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={sendTestNotification}
      disabled={isLoading}
    >
      <Bell className="h-4 w-4 mr-2" />
      {isLoading ? 'Sending...' : 'Send Test Notification'}
    </Button>
  );
}
