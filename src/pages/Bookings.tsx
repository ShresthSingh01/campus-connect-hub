import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Clock, MapPin } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    resourceName: 'Computer Lab A',
    resourceType: 'lab' as const,
    startTime: '2024-01-16T14:00:00Z',
    endTime: '2024-01-16T16:00:00Z',
    bookedBy: 'John Doe',
    purpose: 'Database Project Work',
    status: 'confirmed' as const,
  },
  {
    id: '2',
    resourceName: 'Main Auditorium',
    resourceType: 'auditorium' as const,
    startTime: '2024-01-17T10:00:00Z',
    endTime: '2024-01-17T12:00:00Z',
    bookedBy: 'Student Council',
    purpose: 'Guest Lecture Series',
    status: 'confirmed' as const,
  },
  {
    id: '3',
    resourceName: 'Basketball Court',
    resourceType: 'sports' as const,
    startTime: '2024-01-18T16:00:00Z',
    endTime: '2024-01-18T18:00:00Z',
    bookedBy: 'Sports Committee',
    purpose: 'Inter-Department Tournament',
    status: 'pending' as const,
  },
];

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-primary/10 text-primary';
      case 'pending': return 'bg-accent/10 text-accent-foreground';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getResourceIcon = (type: string) => {
    return MapPin;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Resource Booking</h2>
          <p className="text-muted-foreground mt-1">Manage your facility bookings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBookings.map((booking, index) => {
                const ResourceIcon = getResourceIcon(booking.resourceType);
                
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <ResourceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{booking.resourceName}</h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {booking.resourceType}
                            </p>
                          </div>
                        </div>
                        
                        <div className="ml-13 space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(booking.startTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                              {' - '}
                              {new Date(booking.endTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Purpose:</span> {booking.purpose}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Booked by:</span> {booking.bookedBy}
                          </p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Total Bookings</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10">
                  <div className="text-2xl font-bold text-accent-foreground">3</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary-foreground">85%</div>
                  <div className="text-xs text-muted-foreground">Utilization</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
