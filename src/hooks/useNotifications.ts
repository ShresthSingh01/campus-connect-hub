import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useNotifications() {
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    fetchPreferences();
    subscribeToNotifications();
  }, []);

  const fetchPreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setPreferences(data);
    } else if (error?.code === 'PGRST116') {
      // No preferences found, create default ones
      const { data: newPrefs } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: user.id,
        })
        .select()
        .single();
      
      setPreferences(newPrefs);
    }
  };

  const subscribeToNotifications = () => {
    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const notification = payload.new;
          
          // Show toast for new notifications
          if (preferences?.push_notifications) {
            toast(notification.title, {
              description: notification.message,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updatePreferences = async (updates: Partial<typeof preferences>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notification_preferences')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (data && !error) {
      setPreferences(data);
      toast.success('Notification preferences updated');
    }
  };

  return {
    preferences,
    updatePreferences,
  };
}
