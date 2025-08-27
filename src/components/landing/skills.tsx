import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  { name: 'Adobe Photoshop', value: 95 },
  { name: 'Adobe Illustrator', value: 90 },
  { name: 'Adobe InDesign', value: 85 },
  { name: 'Adobe Premiere Pro', value: 75 },
];

const otherSkills = [
    'Branding & Identity',
    'Print Design',
    'Social Media Graphics',
    'UI/UX Fundamentals',
    'Digital Painting',
    'Typography',
];

const SkillsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          Skills & Expertise
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Turning ideas into visuals with Photoshop, Illustrator, InDesign, and Premiere Pro.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-subheading">Software Proficiency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">{skill.name}</span>
                            <span className="text-xs font-mono text-muted-foreground">{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} aria-label={`${skill.name} proficiency ${skill.value}%`} />
                    </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-subheading">Other Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-foreground/90">
                        {otherSkills.map(skill => (
                            <li key={skill} className="flex items-center">
                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
