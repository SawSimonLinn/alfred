"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const portfolioItems = {
  social: [
    { src: 'https://picsum.photos/600/400?random=1', title: 'Event Poster', hint: 'event poster' },
    { src: 'https://picsum.photos/600/400?random=2', title: 'Product Ad', hint: 'product ad' },
    { src: 'https://picsum.photos/600/400?random=3', title: 'Food Promotion', hint: 'food promotion' },
    { src: 'https://picsum.photos/600/400?random=4', title: 'Festival Design', hint: 'festival design' },
    { src: 'https://picsum.photos/600/400?random=5', title: 'Ad Campaign', hint: 'ad campaign' },
    { src: 'https://picsum.photos/600/400?random=6', title: 'Facebook Post', hint: 'social media' },
  ],
  logos: [
    { src: 'https://picsum.photos/400/400?random=7', title: 'Abstract Logo', hint: 'logo abstract' },
    { src: 'https://picsum.photos/400/400?random=8', title: 'Minimalist Logo', hint: 'logo minimal' },
    { src: 'https://picsum.photos/400/400?random=9', title: 'Lettermark Logo', hint: 'logo lettermark' },
    { src: 'https://picsum.photos/400/400?random=10', title: 'Geometric Logo', hint: 'logo geometric' },
    { src: 'https://picsum.photos/400/400?random=11', title: 'Brandmark', hint: 'logo brandmark' },
    { src: 'https://picsum.photos/400/400?random=12', title: 'Iconic Logo', hint: 'logo iconic' },
  ],
  flyers: [
    { src: 'https://picsum.photos/400/600?random=13', title: 'Lux Botanicals Campaign', hint: 'flyer campaign' },
    { src: 'https://picsum.photos/400/600?random=14', title: 'Music Camp Flyer', hint: 'flyer music' },
  ],
  menus: [
    { src: 'https://picsum.photos/400/600?random=15', title: 'Yangon Thanlwin Menu', hint: 'menu restaurant' },
    { src: 'https://picsum.photos/400/600?random=16', title: 'BBQ & Grilled Menu', hint: 'menu bbq' },
  ],
};

type PortfolioItem = {
    src: string;
    title: string;
    hint: string;
};

const PortfolioSection = () => {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState("social");

  const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <Card
          key={index}
          onClick={() => setSelectedImage(item)}
          className="group overflow-hidden cursor-pointer bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/50"
        >
          <CardContent className="p-0">
            <div className="aspect-w-4 aspect-h-3">
              <Image
                src={item.src}
                alt={item.title}
                data-ai-hint={item.hint}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          Featured Works
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto">
          Take a look at some of my designs – from event posters and logos to full-scale social media campaigns.
        </p>

        <Tabs defaultValue="social" className="mt-12" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto h-auto bg-transparent">
            <TabsTrigger value="social" asChild>
                <Button variant={activeTab === 'social' ? 'default' : 'outline'} className="w-full">Social Media</Button>
            </TabsTrigger>
            <TabsTrigger value="logos" asChild>
                <Button variant={activeTab === 'logos' ? 'default' : 'outline'} className="w-full">Logos</Button>
            </TabsTrigger>
            <TabsTrigger value="flyers" asChild>
                 <Button variant={activeTab === 'flyers' ? 'default' : 'outline'} className="w-full">Flyers</Button>
            </TabsTrigger>
            <TabsTrigger value="menus" asChild>
                 <Button variant={activeTab === 'menus' ? 'default' : 'outline'} className="w-full">Menus</Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="social" className="mt-8">
            <PortfolioGrid items={portfolioItems.social} />
          </TabsContent>
          <TabsContent value="logos" className="mt-8">
            <PortfolioGrid items={portfolioItems.logos} />
          </TabsContent>
          <TabsContent value="flyers" className="mt-8">
            <PortfolioGrid items={portfolioItems.flyers} />
          </TabsContent>
          <TabsContent value="menus" className="mt-8">
            <PortfolioGrid items={portfolioItems.menus} />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2 bg-transparent border-none shadow-none">
          {selectedImage && (
            <div className="relative">
                 <Image
                    src={selectedImage.src.replace(/\d+\/\d+/, "1200/800")}
                    alt={selectedImage.title}
                    data-ai-hint={selectedImage.hint}
                    width={1200}
                    height={800}
                    className="rounded-lg object-contain w-full h-full"
                />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
