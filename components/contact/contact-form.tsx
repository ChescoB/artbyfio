
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/language-context';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Sparkles, Check } from 'lucide-react';
import { ContactFormData } from '@/lib/types';

const projectTypes = [
  { value: 'mural-commercial', labelEn: 'Commercial Mural', labelEs: 'Mural Comercial' },
  { value: 'mural-residential', labelEn: 'Residential Mural', labelEs: 'Mural Residencial' },
  { value: 'public-art', labelEn: 'Public Art', labelEs: 'Arte Público' },
  { value: 'canvas-original', labelEn: 'Original Canvas', labelEs: 'Lienzo Original' },
  { value: 'art-consultation', labelEn: 'Art Consultation', labelEs: 'Consultoría Artística' },
  { value: 'other', labelEn: 'Other', labelEs: 'Otro' }
];

const budgetRanges = [
  { value: 'under-5k', labelEn: 'Under $5,000', labelEs: 'Menos de $5,000' },
  { value: '5k-15k', labelEn: '$5,000 - $15,000', labelEs: '$5,000 - $15,000' },
  { value: '15k-30k', labelEn: '$15,000 - $30,000', labelEs: '$15,000 - $30,000' },
  { value: '30k-plus', labelEn: '$30,000+', labelEs: '$30,000+' },
  { value: 'flexible', labelEn: 'Flexible / Discuss', labelEs: 'Flexible / Discutir' }
];

export default function ContactForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    language: language
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData?.name || !formData?.email || !formData?.projectType || !formData?.message) {
      toast({
        title: "Error",
        description: language === 'es' 
          ? 'Por favor completa todos los campos requeridos.'
          : 'Please fill in all required fields.',
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language })
      });

  const data = await response.json();
      
  if (response.ok) {
        setIsSuccess(true);
        toast({
          title: language === 'es' ? '¡Mensaje Enviado! ✨' : 'Message Sent! ✨',
          description: language === 'es' 
            ? '¡Gracias por dar el primer paso hacia la transformación de tu espacio! Tu visión artística está a punto de cobrar vida. Nos pondremos en contacto pronto para comenzar este emocionante viaje creativo juntos.'
            : 'Thank you for taking the first step toward transforming your space! Your artistic vision is about to come to life. We\'ll be in touch soon to begin this exciting creative journey together.',
          duration: 8000,
        });
        
        // Reset form fields but keep success message visible
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
          language: language
        });
      } else {
        console.error('API Error Response:', data);
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error.message || t('contact.form.error', 'Error sending message. Please try again.'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-secondary/10" ref={ref}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center lg:text-left">
            {language === 'es' ? 'Envíanos un Mensaje' : 'Send us a Message'}
          </h2>

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-8 p-6 rounded-lg bg-gradient-to-br from-teal-500/10 via-coral-500/10 to-teal-500/10 border-2 border-teal-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-coral-500 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-2 bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">
                    {language === 'es' ? '¡Tu Visión Está en Camino!' : 'Your Vision is On Its Way!'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'es'
                      ? 'Cada gran obra de arte comienza con una conversación. Gracias por confiar en nosotros para transformar tu espacio en algo extraordinario. Prepárate para crear algo hermoso juntos. 🎨'
                      : 'Every great work of art begins with a conversation. Thank you for trusting us to transform your space into something extraordinary. Get ready to create something beautiful together. 🎨'
                    }
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-teal-500 animate-pulse" />
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('contact.form.name', 'Full Name')} *
                </label>
                <Input
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('contact.form.email', 'Email Address')} *
                </label>
                <Input
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={language === 'es' ? 'tu@email.com' : 'you@email.com'}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('contact.form.phone', 'Phone Number')}
              </label>
              <Input
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={language === 'es' ? 'Número de teléfono (opcional)' : 'Phone number (optional)'}
              />
            </div>

            {/* Project Type & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('contact.form.project_type', 'Project Type')} *
                </label>
                <Select value={formData?.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'es' ? 'Seleccionar tipo' : 'Select type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes?.map((type) => (
                      <SelectItem key={type?.value} value={type?.value}>
                        {language === 'es' ? type?.labelEs : type?.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('contact.form.budget', 'Budget Range')}
                </label>
                <Select value={formData?.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'es' ? 'Rango de presupuesto' : 'Budget range'} />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges?.map((range) => (
                      <SelectItem key={range?.value} value={range?.value}>
                        {language === 'es' ? range?.labelEs : range?.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('contact.form.message', 'Project Description')} *
              </label>
              <Textarea
                value={formData?.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder={language === 'es' 
                  ? 'Cuéntanos sobre tu proyecto, espacio, visión y cualquier detalle importante...'
                  : 'Tell us about your project, space, vision, and any important details...'
                }
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="art" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {language === 'es' ? 'Enviando...' : 'Sending...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.form.submit', 'Send Message')}
                </>
              )}
            </Button>
          </form>

          {/* Form Footer */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              {language === 'es' 
                ? 'Tu privacidad es importante. No compartiremos tu información.'
                : 'Your privacy matters. We will not share your information.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
