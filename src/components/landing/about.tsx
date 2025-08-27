import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          About Me
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          A glimpse into my journey as a creative professional.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 flex justify-center">
                 <Image
                    src="https://picsum.photos/400/400"
                    alt="Alfred, Graphic Designer"
                    data-ai-hint="portrait professional"
                    width={300}
                    height={300}
                    className="rounded-full object-cover shadow-lg border-4 border-card"
                />
            </div>
            <div className="md:col-span-3">
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="font-subheading">My Story</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>
                            From a young age, I've been captivated by the power of visual storytelling. This passion led me to pursue formal education in <span className="text-primary font-medium">Graphic Design &amp; Digital Painting at Yangonbee</span>, where I honed my technical skills and creative instincts.
                        </p>
                        <p>
                            My career has been a dynamic journey of turning ideas into compelling visuals. I thrive on collaborating with brands to create designs that are not only beautiful but also effective in communicating their message and connecting with their audience.
                        </p>
                        <div className="border-t pt-4 mt-4 space-y-3">
                            <h3 className="text-lg font-semibold font-subheading">Contact Details</h3>
                             <a href="mailto:alfred@atelier.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>alfred.designer@email.com</span>
                            </a>
                            <a href="tel:+95912345678" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+95 9 123 456 789</span>
                            </a>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Yangon, Myanmar</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
