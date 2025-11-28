import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Bell, Calendar, MessageSquare, Users, Shield } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bell,
      title: 'Smart Announcements',
      description: 'Stay updated with real-time campus notifications and important updates',
    },
    {
      icon: Calendar,
      title: 'Resource Booking',
      description: 'Book labs, classrooms, and facilities with our intuitive calendar system',
    },
    {
      icon: MessageSquare,
      title: 'Discussion Forum',
      description: 'Connect with peers, share knowledge, and collaborate on projects',
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Build connections across departments and year groups',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Role-based access control ensures your data stays protected',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Campus Connect</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="default">
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Your Campus, Connected
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive platform for campus collaboration, resource management, and community engagement
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-card rounded-lg p-12 border border-border"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to transform your campus experience?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students and faculty already using Campus Connect
          </p>
          <Button size="lg" onClick={() => navigate('/auth')}>
            Get Started Today
          </Button>
        </motion.div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 Campus Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
