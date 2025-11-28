import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, ArrowUp, MessageCircle, Bookmark } from 'lucide-react';

const mockThreads = [
  {
    id: '1',
    title: 'Best resources for learning React in 2024?',
    content: 'I\'m looking to improve my React skills. What are the best courses, books, or tutorials you\'d recommend?',
    author: { name: 'Alex Chen', avatar: 'AC' },
    category: 'Technology',
    votes: 24,
    commentCount: 8,
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['react', 'learning', 'web-dev'],
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Study group for Database Systems course',
    content: 'Looking to form a study group for the DBMS course. Anyone interested in meeting twice a week?',
    author: { name: 'Sarah Johnson', avatar: 'SJ' },
    category: 'Academics',
    votes: 15,
    commentCount: 12,
    createdAt: '2024-01-14T15:30:00Z',
    tags: ['study-group', 'database', 'academics'],
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Campus WiFi connectivity issues',
    content: 'Has anyone else been experiencing WiFi drops in the library? It\'s been happening for the past few days.',
    author: { name: 'Mike Peters', avatar: 'MP' },
    category: 'Campus Life',
    votes: 42,
    commentCount: 23,
    createdAt: '2024-01-13T09:00:00Z',
    tags: ['wifi', 'campus', 'technical-issues'],
    isBookmarked: false,
  },
];

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'new' | 'top' | 'trending'>('new');

  const filteredThreads = mockThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Discussion Forum</h2>
          <p className="text-muted-foreground mt-1">Connect and collaborate with peers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'new' | 'top' | 'trending')}>
          <TabsList>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredThreads.map((thread, index) => (
          <motion.div
            key={thread.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-semibold">{thread.votes}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                        {thread.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {thread.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {thread.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{thread.author.name}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <Badge variant="outline">{thread.category}</Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{thread.commentCount} comments</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 hover:text-primary"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${thread.isBookmarked ? 'fill-primary text-primary' : ''}`}
                        />
                      </Button>
                      {thread.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
