"use server";

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(formData: FormData) {
  try {
    const parsedData = contactFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    // In a real application, you would send an email here.
    // For this example, we'll just log the data and simulate a delay.
    console.log("New contact form submission:", parsedData);
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, message: "There was an error sending your message. Please try again." };
  }
}
