"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, Sparkles, Loader2, AlertCircle, FileImage } from 'lucide-react';
import { generateClientPersona, type ClientPersonaOutput } from '@/ai/flows/client-persona-generator';
import { Skeleton } from '../ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const StyleIdentifierSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClientPersonaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'English' | 'Myanmar'>('English');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image first.');
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const photoDataUri = await toDataURL(file);
      const persona = await generateClientPersona({ photoDataUri, language });
      setResult(persona);
    } catch (err) {
      console.error(err);
      setError('Failed to generate persona. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-subheading text-center font-semibold text-foreground md:text-4xl">
          AI Style Identifier
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto">
          Curious about what kind of client would be a perfect match for my design style? Upload an image representing your brand or aesthetic, and let my AI assistant paint a picture of our ideal collaboration.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>1. Upload Your Inspiration</CardTitle>
              <CardDescription>Select an image that captures your brand's essence.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted transition-colors"
                >
                  {preview ? (
                    <Image src={preview} alt="Image preview" width={256} height={256} className="h-full w-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                    </div>
                  )}
                </label>

                <div className='space-y-2'>
                  <Label>Output Language</Label>
                  <RadioGroup
                    defaultValue="English"
                    value={language}
                    onValueChange={(value: 'English' | 'Myanmar') => setLanguage(value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="English" id="lang-en" />
                      <Label htmlFor="lang-en">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Myanmar" id="lang-my" />
                      <Label htmlFor="lang-my">Myanmar</Label>
                    </div>
                  </RadioGroup>
                </div>


                <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                    <FileImage className="mr-2 h-4 w-4" />
                    {file ? 'Change Image' : 'Select Image'}
                </Button>
                <Button type="submit" className="w-full bg-primary hover:bg-accent hover:text-accent-foreground" disabled={isLoading || !file}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Persona
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="w-full min-h-[400px]">
            <CardHeader>
              <CardTitle>2. Your Ideal Client Persona</CardTitle>
              <CardDescription>Here's the persona that aligns with your style.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                 <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full mt-4" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && !isLoading && (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground/90"
                  dangerouslySetInnerHTML={{ __html: result.personaDescription.replace(/\n/g, '<br />') }}
                />
              )}
              {!isLoading && !result && !error && (
                <div className="text-center text-muted-foreground py-10">
                    <p>Your generated persona will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StyleIdentifierSection;
