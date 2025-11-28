import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Pin, Calendar } from 'lucide-react';
import { TestNotificationButton } from '@/components/notifications/TestNotificationButton';

const mockAnnouncements = [
  {
    id: '1',
    title: 'Semester Exam Schedule Released',
    content: 'The examination schedule for the current semester has been published. Please check the academic portal for detailed timings.',
    category: 'academic' as const,
    priority: 'high' as const,
    isPinned: true,
    author: { name: 'Dr. Sarah Johnson', role: 'Dean' },
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['exams', 'schedule'],
  },
  {
    id: '2',
    title: 'Annual Tech Fest Registration Open',
    content: 'Registration for the annual tech fest is now open. Participate in various technical competitions and workshops.',
    category: 'events' as const,
    priority: 'medium' as const,
    isPinned: false,
    author: { name: 'Student Council', role: 'Organization' },
    createdAt: '2024-01-14T15:30:00Z',
    tags: ['fest', 'registration'],
  },
  {
    id: '3',
    title: 'Library Hours Extended',
    content: 'The central library will now remain open until 10 PM on weekdays to support students during exam preparation.',
    category: 'general' as const,
    priority: 'low' as const,
    isPinned: false,
    author: { name: 'Library Administration', role: 'Staff' },
    createdAt: '2024-01-13T09:00:00Z',
    tags: ['library', 'facilities'],
  },
];

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Announcements</h2>
          <p className="text-muted-foreground mt-1">Stay updated with campus news</p>
        </div>
        <div className="flex gap-2">
          <TestNotificationButton />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={announcement.isPinned ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.isPinned && (
                        <Pin className="h-4 w-4 text-primary" />
                      )}
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2 flex-wrap">
                      <span>{announcement.author.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{announcement.content}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {announcement.category}
                  </Badge>
                  {announcement.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
