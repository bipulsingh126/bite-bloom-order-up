
import React from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Clock, Shield, Truck, Award, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">About BiteBloom</h1>
          <p className="text-muted-foreground text-lg mb-10">Connecting people with delicious food since 2023</p>
          
          {/* Mission Statement */}
          <div className="bg-card rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At BiteBloom, we're on a mission to transform how people experience food delivery. 
              We believe that great food should be accessible to everyone, and we're committed to 
              connecting hungry customers with the best local restaurants in their area.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By providing a seamless, reliable platform, we help local businesses thrive while 
              satisfying cravings across the country. Every order placed through BiteBloom supports 
              both local restaurants and our mission to make delicious meals just a few taps away.
            </p>
          </div>
          
          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Why Choose BiteBloom</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-lg p-5 flex">
                <div className="mr-4 text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Our delivery network ensures your food arrives hot and fresh, with real-time tracking.
                  </p>
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-5 flex">
                <div className="mr-4 text-primary">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple secure payment options, including credit cards and mobile payments.
                  </p>
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-5 flex">
                <div className="mr-4 text-primary">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Wide Coverage</h3>
                  <p className="text-sm text-muted-foreground">
                    Serving thousands of locations with an ever-expanding network of restaurant partners.
                  </p>
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-5 flex">
                <div className="mr-4 text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Quality Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">
                    We only partner with the best restaurants that meet our strict quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Story */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BiteBloom was founded in 2023 by a group of food enthusiasts who were frustrated with 
              the existing food delivery options. We started with just a few restaurant partners in 
              a single city, and have since grown to cover multiple metropolitan areas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team is passionate about great food and exceptional service. We work tirelessly 
              to ensure that every order is delivered with care and that both our restaurant partners 
              and customers are fully satisfied with their BiteBloom experience.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                  </div>
                  <Button>Send Message</Button>
                </form>
              </div>
              <div>
                <div className="space-y-4">
                  <h3 className="font-medium">Get in touch</h3>
                  <p className="text-muted-foreground">
                    Have questions or feedback? We'd love to hear from you. Fill out the form or contact us directly.
                  </p>
                  <div className="pt-4">
                    <div className="flex items-center mb-3">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>support@bitebloom.com</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>123 Delivery St, Foodville, CA 94103</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-card py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BiteBloom. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default About;
