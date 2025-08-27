import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEventSchema, type InsertEvent, type Event } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Tag,
  Image,
  User,
  TrendingUp
} from "lucide-react";

const eventTypes = [
  "Hackathon",
  "Workshop", 
  "Webinar",
  "Bootcamp",
  "Challenge",
  "Tech Talk",
  "Sprint"
];

const eventStatuses = [
  "Registration Open",
  "Early Bird",
  "Coming Soon",
  "Live Now",
  "Register Now",
  "Completed"
];

export default function AdminPanel() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        setLocation("/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setLocation("/login");
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLocation("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [setLocation]);

  // Fetch events
  const { data: eventsResponse, isLoading } = useQuery({
    queryKey: ["/api/events"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLocation("/login");
        throw new Error("Unauthorized");
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      
      return response.json();
    },
  });

  const events: Event[] = (eventsResponse as any)?.data || [];

  // Create event form
  const createForm = useForm<InsertEvent>({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      participants: "",
      prize: "",
      type: "",
      status: "",
      image: "",
      speaker: "",
      progress: "",
    },
  });

  // Edit event form
  const editForm = useForm<InsertEvent>({
    resolver: zodResolver(insertEventSchema),
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (data: InsertEvent) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLocation("/login");
        throw new Error("Unauthorized");
      }
      
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({
        title: "Success!",
        description: "Event created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create event.",
        variant: "destructive",
      });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertEvent }) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLocation("/login");
        throw new Error("Unauthorized");
      }
      
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setIsEditDialogOpen(false);
      setSelectedEvent(null);
      toast({
        title: "Success!",
        description: "Event updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update event.",
        variant: "destructive",
      });
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setLocation("/login");
        throw new Error("Unauthorized");
      }
      
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Success!",
        description: "Event deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete event.",
        variant: "destructive",
      });
    },
  });

  // Handle edit event
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    const editData = {
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      participants: event.participants,
      prize: event.prize || "",
      type: event.type,
      status: event.status,
      image: event.image,
      speaker: event.speaker || "",
      progress: event.progress || "",
    };
    editForm.reset(editData);
    setIsEditDialogOpen(true);
  };

  // Handle create event
  const handleCreateEvent = (data: InsertEvent) => {
    createEventMutation.mutate(data);
  };

  // Handle update event
  const handleUpdateEvent = (data: InsertEvent) => {
    if (selectedEvent) {
      updateEventMutation.mutate({ id: selectedEvent.id, data });
    }
  };

  // Handle delete event
  const handleDeleteEvent = (id: string) => {
    deleteEventMutation.mutate(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setLocation("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-orbitron font-bold mb-4">
              Event <span className="gradient-text">Management</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              Create, edit, and manage CodeQuity events
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            Logout
          </Button>
        </div>

        {/* Create Event Button */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(handleCreateEvent)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={createForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Event description" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input placeholder="March 15-17, 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input placeholder="48 Hours" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi & Virtual" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="participants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participants</FormLabel>
                          <FormControl>
                            <Input placeholder="500+" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eventStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="prize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prize (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="₹5,00,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={createForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://images.unsplash.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="speaker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speaker (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Priya Sharma, Google AI" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="progress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Progress (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="75 (for ongoing events)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createEventMutation.isPending}
                      className="bg-primary"
                    >
                      {createEventMutation.isPending ? "Creating..." : "Create Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="bg-card/40 backdrop-blur-xl border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold leading-tight mb-2">
                      {event.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {event.type}
                      </Badge>
                      <Badge 
                        variant={event.status === 'Live Now' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary/60" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent/60" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent/60" />
                    <span>{event.participants}</span>
                  </div>
                  {event.prize && (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>{event.prize}</span>
                    </div>
                  )}
                  {event.speaker && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary/60" />
                      <span>{event.speaker}</span>
                    </div>
                  )}
                  {event.progress && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>{event.progress}% Complete</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditEvent(event)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{event.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No events yet</h3>
            <p className="text-muted-foreground">Create your first event to get started.</p>
          </div>
        )}

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(handleUpdateEvent)} className="space-y-6">
                  {/* Same form fields as create form but with edit form control */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={editForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Event description" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input placeholder="March 15-17, 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input placeholder="48 Hours" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi & Virtual" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="participants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participants</FormLabel>
                          <FormControl>
                            <Input placeholder="500+" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eventStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="prize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prize (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="₹5,00,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={editForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://images.unsplash.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="speaker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speaker (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Priya Sharma, Google AI" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="progress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Progress (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="75 (for ongoing events)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditDialogOpen(false);
                        setSelectedEvent(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={updateEventMutation.isPending}
                      className="bg-primary"
                    >
                      {updateEventMutation.isPending ? "Updating..." : "Update Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}