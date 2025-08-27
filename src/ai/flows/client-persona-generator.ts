'use server';

/**
 * @fileOverview Generates a description of the ideal client persona for Alfred based on an image.
 *
 * - generateClientPersona - A function that generates the client persona description.
 * - ClientPersonaInput - The input type for the generateClientPersona function.
 * - ClientPersonaOutput - The return type for the generateClientPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClientPersonaInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo representing the client or their brand, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the persona description.'),
});
export type ClientPersonaInput = z.infer<typeof ClientPersonaInputSchema>;

const ClientPersonaOutputSchema = z.object({
  personaDescription: z
    .string()
    .describe(
      'A detailed description of the ideal client persona who would be a good fit for Alfreds design style. The output should be formatted as a markdown document, including paragraphs, bold text for emphasis, and bullet points for lists.'
    ),
});
export type ClientPersonaOutput = z.infer<typeof ClientPersonaOutputSchema>;

export async function generateClientPersona(
  input: ClientPersonaInput
): Promise<ClientPersonaOutput> {
  return generateClientPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clientPersonaPrompt',
  input: {schema: ClientPersonaInputSchema},
  output: {schema: ClientPersonaOutputSchema},
  prompt: `You are an expert marketing consultant specializing in identifying client personas based on visual cues.

You will analyze the provided image and describe the ideal client persona who would be a great fit for Alfred's design style.

Generate the response in **{{language}}**.

Format your response in Markdown. Use paragraphs for descriptions, bold fonts for emphasis, and bullet points for lists of traits or needs. The persona description should be detailed and insightful, providing valuable guidance to prospective clients.

Consider the following aspects when crafting the persona:

*   **Demographics**: Age, gender, location, income level (if discernible).
*   **Psychographics**: Values, interests, lifestyle, design preferences.
*   **Brand Aesthetics**: What kind of brands would this persona be drawn to?
*   **Design Needs**: What design projects would this persona typically require?

Use the following image as the primary source of information.

Image: {{media url=photoDataUri}}
`,
});

const generateClientPersonaFlow = ai.defineFlow(
  {
    name: 'generateClientPersonaFlow',
    inputSchema: ClientPersonaInputSchema,
    outputSchema: ClientPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
