import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    date: '2019 – 2021',
    company: 'Printingbee by Gandamar',
    role: 'Graphic Designer',
    description: 'Designed a wide range of print materials including billboards, flyers, and posters. Gained extensive experience in print production processes.',
  },
  {
    date: '2019',
    company: 'AUKEY Myanmar',
    role: 'Freelance Designer',
    description: 'Created engaging social media content, including Facebook posts, and designed large-format graphics like billboards and vinyls for campaigns.',
  },
  {
    date: '2016 – 2018',
    company: 'IYF Myanmar',
    role: 'Volunteer Designer',
    description: 'Contributed to magazine layouts, event billboards, and vinyl designs, supporting the organization\'s promotional activities.',
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          Work Experience
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto">
          I’ve worked with international and local brands, creating impactful designs for magazines, billboards, social media campaigns, and product branding.
        </p>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 mb-12">
                <div className="absolute left-4 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                <p className="text-sm font-medium text-primary">{exp.date}</p>
                <h3 className="text-xl font-semibold text-foreground mt-1">{exp.company}</h3>
                <h4 className="text-md font-medium text-muted-foreground">{exp.role}</h4>
                <p className="mt-2 text-sm text-foreground/80">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
