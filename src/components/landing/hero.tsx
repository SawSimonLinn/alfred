import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex h-dvh min-h-[600px] w-full items-center justify-center bg-background"
    >
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-headline font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                Hello! I’m Alfred 👋
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 md:text-xl">
                I design clean, bold, and creative visuals that connect brands with people.
            </p>
            <div className="mt-10">
                <Button asChild size="lg" className="bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground transition-all duration-300 transform hover:scale-105">
                    <Link href="#portfolio">View My Work</Link>
                </Button>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
