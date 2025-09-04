import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Music, Phone, Mail, User, Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please select your age group'),
  musicInterest: z.string().min(1, 'Please select your music interest'),
  experience: z.string().min(1, 'Please select your experience level'),
  preferredTime: z.string().min(1, 'Please select your preferred time'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface DemoBookingFormProps {
  onSuccess: (data: FormData) => void;
}

const DemoBookingForm: React.FC<DemoBookingFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      age: '',
      musicInterest: '',
      experience: '',
      preferredTime: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Demo booked successfully! 🎵",
      description: "We'll contact you shortly to schedule your free demo session.",
    });

    onSuccess(data);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft bg-gradient-to-br from-background to-muted/20 border-2 border-primary/20">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Book Your Free Demo
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Start your musical journey with us! Fill out the form below and we'll schedule your personalized demo session.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4 text-primary" />
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your full name"
                        className="h-12 border-2 border-muted focus:border-primary transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        placeholder="Enter your email address"
                        className="h-12 border-2 border-muted focus:border-primary transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-12 border-2 border-muted focus:border-primary transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Age Group *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 border-muted focus:border-primary transition-colors">
                          <SelectValue placeholder="Select your age group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-25">16-25 years</SelectItem>
                        <SelectItem value="26-35">26-35 years</SelectItem>
                        <SelectItem value="36-50">36-50 years</SelectItem>
                        <SelectItem value="50+">50+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="musicInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Music Interest *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 border-muted focus:border-primary transition-colors">
                          <SelectValue placeholder="Choose your interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="piano">Piano</SelectItem>
                        <SelectItem value="guitar">Guitar</SelectItem>
                        <SelectItem value="violin">Violin</SelectItem>
                        <SelectItem value="drums">Drums</SelectItem>
                        <SelectItem value="vocal">Vocal Training</SelectItem>
                        <SelectItem value="saxophone">Saxophone</SelectItem>
                        <SelectItem value="flute">Flute</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Experience Level *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 border-muted focus:border-primary transition-colors">
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Absolute Beginner</SelectItem>
                        <SelectItem value="some-experience">Some Experience</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Demo Time *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-muted focus:border-primary transition-colors">
                        <SelectValue placeholder="When would you prefer your demo?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekday-morning">Weekday Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="weekday-afternoon">Weekday Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="weekday-evening">Weekday Evening (5pm - 8pm)</SelectItem>
                      <SelectItem value="weekend-morning">Weekend Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="weekend-afternoon">Weekend Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="weekend-evening">Weekend Evening (5pm - 8pm)</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Additional Message (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      placeholder="Tell us about your musical goals or any specific questions you have..."
                      className="min-h-[100px] border-2 border-muted focus:border-primary transition-colors resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              variant="hero"
              className="w-full h-14 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Booking Your Demo...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Book My Free Demo Session
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DemoBookingForm;