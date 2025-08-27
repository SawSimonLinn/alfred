import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-foreground text-background">
      <div className="container mx-auto py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Alfred's Design. All Rights Reserved.
        </p>
        <p className="text-xs mt-2 text-muted-foreground flex items-center justify-center gap-1.5">
          Designed with <Heart className="w-3 h-3 text-primary" /> and coded with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
