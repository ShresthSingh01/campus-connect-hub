import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function Dashboard() {
  const user = useAppSelector(state => state.auth.user);

  const stats = [
    {
      title: 'Active Announcements',
      value: '12',
      icon: Bell,
      description: '+2 from last week',
      color: 'text-primary',
    },
    {
      title: 'Upcoming Bookings',
      value: '3',
      icon: Calendar,
      description: 'Next: Lab A - 2:00 PM',
      color: 'text-accent-foreground',
    },
    {
      title: 'Forum Threads',
      value: '47',
      icon: MessageSquare,
      description: '8 new discussions',
      color: 'text-secondary',
    },
    {
      title: 'Engagement',
      value: '89%',
      icon: TrendingUp,
      description: '+5% this month',
      color: 'text-primary',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground mt-1">
          Here's what's happening on campus today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates from campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      Sample Announcement {i}
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">Lab Booking {i}</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
