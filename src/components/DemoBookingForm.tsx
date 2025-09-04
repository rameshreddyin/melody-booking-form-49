import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Music, Phone, Mail, User, Calendar, MessageCircle, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Enable real-time validation
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

  // Track form completion progress
  const watchedValues = form.watch();
  const totalRequiredFields = 7; // excluding optional message field
  
  useEffect(() => {
    const completed = new Set<string>();
    Object.entries(watchedValues).forEach(([key, value]) => {
      if (key !== 'message' && value && value.toString().trim() !== '') {
        completed.add(key);
      }
    });
    setCompletedFields(completed);
  }, [watchedValues]);

  const completionPercentage = (completedFields.size / totalRequiredFields) * 100;

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

  // Helper function to get field status
  const getFieldStatus = (fieldName: string, fieldState: any) => {
    if (focusedField === fieldName) return 'focused';
    if (fieldState.error) return 'error';
    if (completedFields.has(fieldName)) return 'completed';
    return 'default';
  };

  // Helper function to get field icon
  const getFieldIcon = (fieldName: string, fieldState: any, defaultIcon: React.ReactNode) => {
    const status = getFieldStatus(fieldName, fieldState);
    if (status === 'error') return <AlertCircle className="w-4 h-4 text-destructive" />;
    if (status === 'completed') return <Check className="w-4 h-4 text-green-500" />;
    return defaultIcon;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft bg-gradient-to-br from-background to-muted/20 border-2 border-primary/20 relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-primary transition-all duration-700 ease-out" 
           style={{ width: `${completionPercentage}%` }} />
      
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
          <Music className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Book Your Free Demo
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Start your musical journey with us! Fill out the form below and we'll schedule your personalized demo session.
        </CardDescription>
        
        {/* Progress indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gradient-primary" />
            <span>Progress: {Math.round(completionPercentage)}% complete</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('fullName', fieldState, <User className="w-4 h-4 text-primary" />)}
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="Enter your full name"
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "h-12 border-2 transition-all duration-300 transform",
                          getFieldStatus('fullName', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                          getFieldStatus('fullName', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                          getFieldStatus('fullName', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                          getFieldStatus('fullName', fieldState) === 'default' && "border-muted hover:border-primary/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('email', fieldState, <Mail className="w-4 h-4 text-primary" />)}
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "h-12 border-2 transition-all duration-300 transform",
                          getFieldStatus('email', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                          getFieldStatus('email', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                          getFieldStatus('email', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                          getFieldStatus('email', fieldState) === 'default' && "border-muted hover:border-primary/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('phone', fieldState, <Phone className="w-4 h-4 text-primary" />)}
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="tel"
                        placeholder="Enter your phone number"
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "h-12 border-2 transition-all duration-300 transform",
                          getFieldStatus('phone', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                          getFieldStatus('phone', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                          getFieldStatus('phone', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                          getFieldStatus('phone', fieldState) === 'default' && "border-muted hover:border-primary/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('age', fieldState, <Calendar className="w-4 h-4 text-primary" />)}
                      Age Group *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          onFocus={() => setFocusedField('age')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "h-12 border-2 transition-all duration-300 transform",
                            getFieldStatus('age', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                            getFieldStatus('age', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                            getFieldStatus('age', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                            getFieldStatus('age', fieldState) === 'default' && "border-muted hover:border-primary/50"
                          )}
                        >
                          <SelectValue placeholder="Select your age group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-25">16-25 years</SelectItem>
                        <SelectItem value="26-35">26-35 years</SelectItem>
                        <SelectItem value="36-50">36-50 years</SelectItem>
                        <SelectItem value="50+">50+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="musicInterest"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('musicInterest', fieldState, <Music className="w-4 h-4 text-primary" />)}
                      Music Interest *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          onFocus={() => setFocusedField('musicInterest')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "h-12 border-2 transition-all duration-300 transform",
                            getFieldStatus('musicInterest', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                            getFieldStatus('musicInterest', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                            getFieldStatus('musicInterest', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                            getFieldStatus('musicInterest', fieldState) === 'default' && "border-muted hover:border-primary/50"
                          )}
                        >
                          <SelectValue placeholder="Choose your interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="piano">🎹 Piano</SelectItem>
                        <SelectItem value="guitar">🎸 Guitar</SelectItem>
                        <SelectItem value="violin">🎻 Violin</SelectItem>
                        <SelectItem value="drums">🥁 Drums</SelectItem>
                        <SelectItem value="vocal">🎤 Vocal Training</SelectItem>
                        <SelectItem value="saxophone">🎷 Saxophone</SelectItem>
                        <SelectItem value="flute">🪈 Flute</SelectItem>
                        <SelectItem value="other">🎵 Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field, fieldState }) => (
                  <FormItem className="group">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                      {getFieldIcon('experience', fieldState, <User className="w-4 h-4 text-primary" />)}
                      Experience Level *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          onFocus={() => setFocusedField('experience')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "h-12 border-2 transition-all duration-300 transform",
                            getFieldStatus('experience', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                            getFieldStatus('experience', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                            getFieldStatus('experience', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                            getFieldStatus('experience', fieldState) === 'default' && "border-muted hover:border-primary/50"
                          )}
                        >
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="beginner">🌱 Absolute Beginner</SelectItem>
                        <SelectItem value="some-experience">📈 Some Experience</SelectItem>
                        <SelectItem value="intermediate">🎯 Intermediate</SelectItem>
                        <SelectItem value="advanced">🏆 Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field, fieldState }) => (
                <FormItem className="group">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                    {getFieldIcon('preferredTime', fieldState, <Calendar className="w-4 h-4 text-primary" />)}
                    Preferred Demo Time *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        onFocus={() => setFocusedField('preferredTime')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "h-12 border-2 transition-all duration-300 transform",
                          getFieldStatus('preferredTime', fieldState) === 'focused' && "border-primary ring-2 ring-primary/20 scale-[1.02]",
                          getFieldStatus('preferredTime', fieldState) === 'error' && "border-destructive ring-2 ring-destructive/20",
                          getFieldStatus('preferredTime', fieldState) === 'completed' && "border-green-500 bg-green-50/50",
                          getFieldStatus('preferredTime', fieldState) === 'default' && "border-muted hover:border-primary/50"
                        )}
                      >
                        <SelectValue placeholder="When would you prefer your demo?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="weekday-morning">🌅 Weekday Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="weekday-afternoon">☀️ Weekday Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="weekday-evening">🌇 Weekday Evening (5pm - 8pm)</SelectItem>
                      <SelectItem value="weekend-morning">🏠 Weekend Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="weekend-afternoon">🏞️ Weekend Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="weekend-evening">🌆 Weekend Evening (5pm - 8pm)</SelectItem>
                      <SelectItem value="flexible">🕐 I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <FormItem className="group">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium transition-colors duration-200">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Additional Message (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      placeholder="Tell us about your musical goals or any specific questions you have..."
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "min-h-[100px] border-2 transition-all duration-300 transform resize-none",
                        focusedField === 'message' && "border-primary ring-2 ring-primary/20 scale-[1.01]",
                        fieldState.error && "border-destructive ring-2 ring-destructive/20",
                        !focusedField && !fieldState.error && "border-muted hover:border-primary/50"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-xs animate-in slide-in-from-top-1 duration-200" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              variant="hero"
              className={cn(
                "w-full h-14 text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
                completionPercentage === 100 && "shadow-primary animate-pulse"
              )}
              disabled={isSubmitting || completionPercentage < 100}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Booking Your Demo...
                </div>
              ) : completionPercentage < 100 ? (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Complete all fields to continue ({Math.round(completionPercentage)}%)
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