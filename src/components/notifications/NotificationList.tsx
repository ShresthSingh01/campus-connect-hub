import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, MessageSquare, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'booking' | 'forum' | 'system';
  is_read: boolean;
  created_at: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return Bell;
      case 'booking':
        return Calendar;
      case 'forum':
        return MessageSquare;
      default:
        return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'text-primary';
      case 'booking':
        return 'text-accent-foreground';
      case 'forum':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
        <p className="text-sm">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {notifications.map((notification) => {
        const Icon = getIcon(notification.type);
        const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
          addSuffix: true,
        });

        return (
          <div
            key={notification.id}
            className={cn(
              'p-4 hover:bg-accent/50 transition-colors cursor-pointer',
              !notification.is_read && 'bg-primary/5'
            )}
            onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
          >
            <div className="flex gap-3">
              <div className={cn('flex-shrink-0 mt-1', getTypeColor(notification.type))}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn(
                    'font-medium text-sm',
                    !notification.is_read && 'text-foreground'
                  )}>
                    {notification.title}
                  </p>
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
