
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Bell, 
  MessageCircle,
  Upload,
  Target,
  DollarSign,
  Clock,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  const { user } = useAuth();

  const quickActions = [
    { 
      icon: Calculator, 
      title: 'Tax Calculator', 
      description: 'Calculate your tax liability', 
      href: '/calculator',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Upload, 
      title: 'Upload Documents', 
      description: 'Add your tax documents', 
      href: '/documents',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      icon: TrendingUp, 
      title: 'Investment Guide', 
      description: 'Get investment recommendations', 
      href: '/investments',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      icon: MessageCircle, 
      title: 'AI Assistant', 
      description: 'Chat with TaxGenie AI', 
      href: '#',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const upcomingDeadlines = [
    { title: 'ITR Filing Deadline', date: 'July 31, 2024', daysLeft: 45, priority: 'high' },
    { title: 'Advance Tax Payment', date: 'June 15, 2024', daysLeft: 15, priority: 'medium' },
    { title: 'TDS Return Filing', date: 'May 31, 2024', daysLeft: 5, priority: 'urgent' }
  ];

  const aiRecommendations = [
    { 
      title: 'Invest ₹1.5L in ELSS', 
      savings: '₹46,800', 
      description: 'Save tax under Section 80C',
      priority: 'high'
    },
    { 
      title: 'Health Insurance Premium', 
      savings: '₹15,600', 
      description: 'Claim deduction under Section 80D',
      priority: 'medium'
    },
    { 
      title: 'Switch to New Tax Regime', 
      savings: '₹12,000', 
      description: 'Based on your income profile',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <Header />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header with Animation */}
          <div className="mb-8 animate-in fade-in-0 duration-500">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                  <h1 className="text-3xl font-bold">
                    Welcome back, {user?.user_metadata?.full_name || 'Taxpayer'}!
                  </h1>
                </div>
                <p className="text-blue-100 text-lg mb-6">Here's your tax optimization dashboard</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Potential Savings</p>
                        <p className="text-2xl font-bold text-green-300">₹75,400</p>
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-green-300" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Tax Progress</p>
                        <p className="text-2xl font-bold">68%</p>
                      </div>
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Documents</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in-0 duration-700 delay-200">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                    <p className="text-2xl font-bold text-green-600">₹75,400</p>
                    <p className="text-xs text-green-500 mt-1">+12% from last month</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Tax</p>
                    <p className="text-2xl font-bold text-blue-600">₹1,24,800</p>
                    <p className="text-xs text-blue-500 mt-1">New regime</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-xs text-purple-500 mt-1">3 processed today</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-orange-600">68%</p>
                    <p className="text-xs text-orange-500 mt-1">Almost there!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <Card className="animate-in fade-in-0 duration-700 delay-300 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-6 flex flex-col items-center text-center space-y-3 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                        asChild
                      >
                        <a href={action.href}>
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient}`}>
                            <action.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{action.title}</p>
                            <p className="text-sm text-gray-500">{action.description}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="animate-in fade-in-0 duration-700 delay-400 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiRecommendations.map((rec, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                              <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{rec.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-green-600 text-lg">{rec.savings}</p>
                            <Button size="sm" className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              Act Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Planning Progress */}
              <Card className="animate-in fade-in-0 duration-700 delay-500 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Tax Planning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium">Section 80C Investments</span>
                        <span className="text-sm text-gray-500">₹1,00,000 / ₹1,50,000</span>
                      </div>
                      <Progress value={67} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">₹50,000 remaining to maximize savings</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium">Health Insurance (80D)</span>
                        <span className="text-sm text-gray-500">₹25,000 / ₹25,000</span>
                      </div>
                      <Progress value={100} className="h-3" />
                      <p className="text-xs text-green-600 mt-1">✓ Completed</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium">Home Loan Interest</span>
                        <span className="text-sm text-gray-500">₹1,80,000 / ₹2,00,000</span>
                      </div>
                      <Progress value={90} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">₹20,000 more can be claimed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Upcoming Deadlines */}
              <Card className="animate-in fade-in-0 duration-700 delay-600 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-gray-500">{deadline.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <Badge 
                            variant={deadline.priority === 'urgent' ? 'destructive' : 
                                     deadline.priority === 'high' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {deadline.daysLeft}d
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="animate-in fade-in-0 duration-700 delay-700 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Tax calculation completed</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New document uploaded</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Investment recommendation generated</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat Widget */}
              <Card className="animate-in fade-in-0 duration-700 delay-800 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <span>TaxGenie AI</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about your taxes? Ask our AI assistant!
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
