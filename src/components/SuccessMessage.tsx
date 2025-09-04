import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MessageCircle, Music2, ArrowLeft } from 'lucide-react';

interface SuccessMessageProps {
  studentName: string;
  onBack: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ studentName, onBack }) => {
  const handleWhatsAppContact = () => {
    const message = `Hi! I just booked a free demo session through the Musoclef website. My name is ${studentName}. Could you please help me schedule my demo session? Thank you!`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-soft bg-gradient-to-br from-background to-muted/20 border-2 border-primary/20 text-center">
        <CardHeader className="pb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Demo Booked Successfully! 🎵
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Thank you, {studentName}! We're excited to help you start your musical journey.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Music2 className="w-5 h-5 text-primary" />
              <span>Your demo session has been scheduled</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <span>We'll contact you within 24 hours</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Want to speak with us immediately? Click the button below to connect via WhatsApp!
            </p>
            
            <Button 
              onClick={handleWhatsAppContact}
              variant="whatsapp"
              className="w-full h-12 text-base font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us on WhatsApp
            </Button>
          </div>

          <div className="pt-4 border-t border-muted">
            <Button 
              onClick={onBack}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessMessage;