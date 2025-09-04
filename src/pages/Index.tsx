import React, { useState } from 'react';
import DemoBookingForm from '@/components/DemoBookingForm';
import SuccessMessage from '@/components/SuccessMessage';
import { Music, Star, Users, Award } from 'lucide-react';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  musicInterest: string;
  experience: string;
  preferredTime: string;
  message?: string;
};

const Index = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentData, setStudentData] = useState<FormData | null>(null);

  const handleFormSuccess = (data: FormData) => {
    setStudentData(data);
    setShowSuccess(true);
  };

  const handleBackToForm = () => {
    setShowSuccess(false);
    setStudentData(null);
  };

  if (showSuccess && studentData) {
    return (
      <SuccessMessage 
        studentName={studentData.fullName}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold mb-6 shadow-primary">
              <Music className="w-6 h-6" />
              <span className="text-lg">Musoclef</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Start Your Musical Journey
              </span>
              <br />
              <span className="text-foreground">
                With Expert Guidance
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who have discovered their musical potential with personalized lessons 
              from professional instructors. Book your free demo session today!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Music className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">15+</div>
              <div className="text-sm text-muted-foreground">Instruments</div>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">4.9★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <DemoBookingForm onSuccess={handleFormSuccess} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Why Choose Musoclef?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-muted-foreground">Learn from certified professionals with years of teaching experience and performance background.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
              <p className="text-muted-foreground">Customized lesson plans tailored to your skill level, goals, and musical preferences.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
              <p className="text-muted-foreground">95% of our students achieve their musical goals within their first year of training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-6 h-6" />
            <span className="text-xl font-semibold">Musoclef</span>
          </div>
          <p className="text-background/80">
            © 2024 Musoclef. All rights reserved. Start your musical journey today!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
