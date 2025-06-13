import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const services = [
  { value: "fullstack", label: "Full-Stack Development" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "design", label: "UI/UX Design" },
  { value: "cloud", label: "Cloud Solutions" },
  { value: "ai", label: "AI/ML Integration" },
  { value: "consulting", label: "Technology Consulting" },
];

const budgetRanges = [
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-50k", label: "$25k - $50k" },
  { value: "50k-100k", label: "$50k - $100k" },
  { value: "100k+", label: "$100k+" },
];

export function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema.extend({
      gdprConsent: insertContactSchema.shape.firstName.optional(),
    })),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest('POST', '/api/contacts', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    const { gdprConsent, ...contactData } = data;
    if (!gdprConsent) {
      toast({
        title: "Privacy Policy Required",
        description: "Please accept the privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }
    createContactMutation.mutate(contactData);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-light mb-6">
            <span className="gradient-text">Start Your</span> <span className="font-semibold">Project Today</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary together.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-mars/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-envelope text-mars"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-neutral-300">hello@newtechagency.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-saturn/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-phone text-saturn"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">Phone</div>
                    <div className="text-neutral-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neptune/20 rounded-xl flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-neptune"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">Office</div>
                    <div className="text-neutral-300">123 Tech Street, San Francisco, CA</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6 mt-8">
                <div className="text-sm text-neutral-400 mb-4">Follow us on social media</div>
                <div className="flex space-x-4">
                  {['twitter', 'linkedin', 'github', 'dribbble'].map((platform) => (
                    <a 
                      key={platform}
                      href="#" 
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <i className={`fab fa-${platform} text-neutral-300`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="John"
                            className="bg-white/5 border-white/10 text-white placeholder-neutral-400 focus:border-mars/50 focus:bg-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Doe"
                            className="bg-white/5 border-white/10 text-white placeholder-neutral-400 focus:border-mars/50 focus:bg-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="john@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder-neutral-400 focus:border-mars/50 focus:bg-white/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Service Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-mars/50 focus:bg-white/10">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black border-white/10">
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value} className="text-white hover:bg-white/10">
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Project Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-mars/50 focus:bg-white/10">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black border-white/10">
                          {budgetRanges.map((budget) => (
                            <SelectItem key={budget.value} value={budget.value} className="text-white hover:bg-white/10">
                              {budget.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Tell us about your project requirements, goals, and timeline..."
                          className="bg-white/5 border-white/10 text-white placeholder-neutral-400 focus:border-mars/50 focus:bg-white/10 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gdprConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/20"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-neutral-300">
                          I agree to the{" "}
                          <a href="#" className="text-mars hover:text-mars/80 transition-colors">
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-mars hover:text-mars/80 transition-colors">
                            Terms of Service
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={createContactMutation.isPending}
                  className="w-full bg-mars hover:bg-mars/80 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mars/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createContactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
