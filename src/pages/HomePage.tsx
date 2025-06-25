
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Calculator, FileText, Bot, Bell, TrendingUp, CheckCircle, Star, Users, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage = () => {
  const [income, setIncome] = useState([800000]);
  const oldRegimeTax = Math.max(0, (income[0] - 250000) * 0.05 + Math.max(0, (income[0] - 500000) * 0.15) + Math.max(0, (income[0] - 1000000) * 0.25));
  const newRegimeTax = Math.max(0, (income[0] - 300000) * 0.05 + Math.max(0, (income[0] - 600000) * 0.10) + Math.max(0, (income[0] - 900000) * 0.15));
  const potentialSavings = Math.max(0, oldRegimeTax - newRegimeTax);

  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Tax Optimization",
      description: "Smart AI recommendations to maximize your tax savings based on your financial profile"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Automated Filing",
      description: "One-click ITR submission with pre-filled forms and automatic calculations"
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Smart Calculator",
      description: "Compare old vs new tax regime and find the best option for your situation"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Document Scanner",
      description: "OCR-powered receipt scanning for automatic expense categorization"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Compliance Tracking",
      description: "Never miss a deadline with smart reminders and filing alerts"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Investment Guidance",
      description: "Personalized investment advice for 80C, 80D, and other tax-saving options"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      location: "Bangalore",
      rating: 5,
      comment: "Saved ₹45,000 in taxes this year! The AI recommendations were spot-on.",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Marketing Manager",
      location: "Mumbai",
      rating: 5,
      comment: "Filing taxes has never been this easy. Completed everything in 15 minutes!",
      avatar: "RK"
    },
    {
      name: "Anita Patel",
      role: "Consultant",
      location: "Pune",
      rating: 5,
      comment: "The investment guidance helped me optimize my portfolio for maximum tax savings.",
      avatar: "AP"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Save <span className="text-blue-600">₹50,000+</span> on Taxes with AI-Powered Optimization
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                India's smartest tax platform helps middle-class professionals maximize savings and simplify compliance in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/auth">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                    Start Free Tax Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  Watch 2-Min Demo
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>500+ CAs Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>₹10 Crore Taxes Optimized</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.8/5 from 10,000+ users</span>
                  </div>
                  <p className="text-gray-600">Join thousands of satisfied taxpayers</p>
                </div>
                
                {/* Interactive Calculator Preview */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Tax Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Income: ₹{(income[0] / 100000).toFixed(1)}L
                      </label>
                      <Slider
                        value={income}
                        onValueChange={setIncome}
                        max={2000000}
                        min={300000}
                        step={50000}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Old Regime</p>
                        <p className="text-lg font-semibold text-red-600">₹{oldRegimeTax.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">New Regime</p>
                        <p className="text-lg font-semibold text-green-600">₹{newRegimeTax.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Potential Savings</p>
                      <p className="text-2xl font-bold text-blue-600">₹{potentialSavings.toLocaleString()}</p>
                    </div>
                    <Link to="/auth">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Get Detailed Analysis
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Tax Optimization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines the expertise of certified tax professionals with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How TaxGenie Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Quick Setup", description: "Create account and complete your profile in 2 minutes" },
              { step: 2, title: "Document Upload", description: "Upload or scan your tax documents with our OCR technology" },
              { step: 3, title: "AI Analysis", description: "Our AI analyzes your finances and finds optimization opportunities" },
              { step: 4, title: "Tax Optimization", description: "Implement recommendations and file your returns with confidence" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/auth">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied taxpayers who have optimized their taxes with TaxGenie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "₹0",
                period: "forever",
                features: ["Basic tax calculator", "Regime comparison", "Email support", "Basic recommendations"],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Premium",
                price: "₹999",
                period: "per year",
                features: ["Advanced AI optimization", "Automated filing", "Document scanning", "Priority support", "Investment guidance", "Unlimited calculations"],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Pro",
                price: "₹2,999",
                period: "per year",
                features: ["Everything in Premium", "Dedicated CA support", "Custom tax strategies", "Business tax planning", "Multi-year planning", "Phone support"],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-600 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Taxes?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indians who have already saved lakhs in taxes with TaxGenie
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              Start Free Analysis Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
