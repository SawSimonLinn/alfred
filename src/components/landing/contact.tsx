"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { Facebook, Instagram, Linkedin, Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await submitContactForm(formData);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.message || 'There was a problem with your request.',
        });
      }
    });
  }

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          Let’s Work Together
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind? I’d love to bring your vision to life.
        </p>

        <div className="mt-12 max-w-lg mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell me about your project..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-accent hover:text-accent-foreground" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
              </Button>
            </form>
          </Form>

          <div className="mt-12 flex justify-center gap-6">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
