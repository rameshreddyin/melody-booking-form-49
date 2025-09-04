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
      {/* Form Section - Now First */}
      <section className="py-8 md:py-16 px-4">
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
