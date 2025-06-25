
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp,
  Target,
  Shield,
  PiggyBank,
  Heart,
  GraduationCap,
  Home,
  Star,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const InvestmentGuidancePage = () => {
  const [selectedGoal, setSelectedGoal] = useState('tax-saving');

  const investmentRecommendations = [
    {
      id: '1',
      title: 'ELSS Mutual Funds',
      category: '80C',
      riskLevel: 'High',
      returns: '12-15%',
      lockIn: '3 years',
      maxDeduction: '₹1,50,000',
      currentInvestment: '₹1,00,000',
      description: 'Equity Linked Savings Scheme with tax benefits and potential for high returns',
      recommended: true,
      pros: ['Tax deduction under 80C', 'Potential for high returns', 'Professional management'],
      cons: ['Market risk', '3-year lock-in period', 'No guaranteed returns']
    },
    {
      id: '2',
      title: 'PPF (Public Provident Fund)',
      category: '80C',
      riskLevel: 'Low',
      returns: '7-8%',
      lockIn: '15 years',
      maxDeduction: '₹1,50,000',
      currentInvestment: '₹50,000',
      description: 'Government-backed long-term savings scheme with tax benefits',
      recommended: false,
      pros: ['Guaranteed returns', 'Tax-free maturity', 'Government backing'],
      cons: ['15-year lock-in', 'Lower returns', 'Limited liquidity']
    },
    {
      id: '3',
      title: 'Health Insurance',
      category: '80D',
      riskLevel: 'Low',
      returns: 'Protection',
      lockIn: '1 year',
      maxDeduction: '₹25,000',
      currentInvestment: '₹15,000',
      description: 'Essential health coverage with tax benefits',
      recommended: true,
      pros: ['Medical coverage', 'Tax deduction', 'Family protection'],
      cons: ['No investment returns', 'Premium increases with age', 'Claim restrictions']
    },
    {
      id: '4',
      title: 'NSC (National Savings Certificate)',
      category: '80C',
      riskLevel: 'Low',
      returns: '6.8%',
      lockIn: '5 years',
      maxDeduction: '₹1,50,000',
      currentInvestment: '₹0',
      description: 'Government savings certificate with fixed returns',
      recommended: false,
      pros: ['Government guarantee', 'Fixed returns', 'Tax benefits'],
      cons: ['Lower returns', '5-year lock-in', 'Taxable interest']
    }
  ];

  const goalBasedPlanning = [
    {
      goal: 'Tax Saving',
      icon: <PiggyBank className="h-6 w-6" />,
      targetAmount: '₹1,50,000',
      currentAmount: '₹1,15,000',
      progress: 77,
      timeframe: 'This Financial Year',
      status: 'On Track',
      recommendations: ['Invest ₹35,000 more in ELSS', 'Consider PPF top-up']
    },
    {
      goal: 'Health Protection',
      icon: <Heart className="h-6 w-6" />,
      targetAmount: '₹5,00,000',
      currentAmount: '₹3,00,000',
      progress: 60,
      timeframe: 'Coverage Amount',
      status: 'Needs Attention',
      recommendations: ['Increase health insurance cover', 'Add critical illness rider']
    },
    {
      goal: 'Emergency Fund',
      icon: <Shield className="h-6 w-6" />,
      targetAmount: '₹6,00,000',
      currentAmount: '₹2,50,000',
      progress: 42,
      timeframe: '6 months expenses',
      status: 'Behind Target',
      recommendations: ['Increase SIP in liquid funds', 'Automate emergency savings']
    },
    {
      goal: 'Retirement',
      icon: <Target className="h-6 w-6" />,
      targetAmount: '₹2,00,00,000',
      currentAmount: '₹15,00,000',
      progress: 8,
      timeframe: '25 years',
      status: 'Just Started',
      recommendations: ['Start retirement-focused SIP', 'Consider NPS for additional tax benefits']
    }
  ];

  const taxSavingProgress = {
    section80C: { current: 115000, max: 150000, title: 'Section 80C' },
    section80D: { current: 15000, max: 25000, title: 'Section 80D' },
    section80CCD: { current: 0, max: 50000, title: 'Section 80CCD(1B) - NPS' },
    section80E: { current: 25000, max: 0, title: 'Section 80E - Education Loan' }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'text-green-600';
      case 'Needs Attention': return 'text-yellow-600';
      case 'Behind Target': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-blue-600" />
            Investment Guidance
          </h1>
          <p className="text-gray-600">Personalized investment recommendations for tax savings and wealth creation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="recommendations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="progress">Tax Progress</TabsTrigger>
                <TabsTrigger value="goals">Goal Planning</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid gap-6">
                  {investmentRecommendations.map((investment) => (
                    <Card key={investment.id} className={`relative ${investment.recommended ? 'border-2 border-blue-500' : ''}`}>
                      {investment.recommended && (
                        <div className="absolute -top-3 left-4">
                          <Badge className="bg-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{investment.title}</CardTitle>
                            <p className="text-gray-600 mt-1">{investment.description}</p>
                          </div>
                          <Badge className={getRiskColor(investment.riskLevel)}>
                            {investment.riskLevel} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Category</p>
                            <p className="font-semibold">{investment.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Expected Returns</p>
                            <p className="font-semibold">{investment.returns}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Lock-in Period</p>
                            <p className="font-semibold">{investment.lockIn}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Max Deduction</p>
                            <p className="font-semibold">{investment.maxDeduction}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Your Investment</span>
                            <span>{investment.currentInvestment} / {investment.maxDeduction}</span>
                          </div>
                          <Progress 
                            value={(parseInt(investment.currentInvestment.replace(/[^\d]/g, '')) / parseInt(investment.maxDeduction.replace(/[^\d]/g, ''))) * 100} 
                            className="h-2"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-green-700 mb-2 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Pros
                            </h4>
                            <ul className="text-sm space-y-1">
                              {investment.pros.map((pro, index) => (
                                <li key={index} className="text-gray-600">• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-700 mb-2 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Cons
                            </h4>
                            <ul className="text-sm space-y-1">
                              {investment.cons.map((con, index) => (
                                <li key={index} className="text-gray-600">• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button className="flex-1">
                            Invest Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                          <Button variant="outline">Learn More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Saving Progress - FY 2023-24</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(taxSavingProgress).map(([key, section]) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{section.title}</h4>
                            <span className="text-sm text-gray-600">
                              ₹{section.current.toLocaleString()} / ₹{section.max.toLocaleString() || 'No Limit'}
                            </span>
                          </div>
                          <Progress 
                            value={section.max ? (section.current / section.max) * 100 : 100} 
                            className="h-3"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Current Investment</span>
                            <span>
                              {section.max ? 
                                `₹${(section.max - section.current).toLocaleString()} remaining` : 
                                'No limit'
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Total Tax Savings Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Invested</p>
                        <p className="text-2xl font-bold text-blue-600">₹1,55,000</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Tax Saved</p>
                        <p className="text-2xl font-bold text-green-600">₹46,500</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Remaining Scope</p>
                        <p className="text-2xl font-bold text-orange-600">₹70,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <div className="grid gap-6">
                  {goalBasedPlanning.map((goal, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {goal.icon}
                            <div>
                              <CardTitle>{goal.goal}</CardTitle>
                              <p className="text-sm text-gray-600">{goal.timeframe}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(goal.status)}>
                            {goal.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{goal.currentAmount} / {goal.targetAmount}</span>
                          </div>
                          <Progress value={goal.progress} className="h-3" />
                          <p className="text-xs text-gray-500 mt-1">{goal.progress}% Complete</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <ul className="space-y-1">
                            {goal.recommendations.map((rec, recIndex) => (
                              <li key={recIndex} className="text-sm text-gray-600 flex items-center">
                                <ArrowRight className="h-3 w-3 mr-2 text-blue-600" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investments</span>
                    <span className="font-semibold">₹1,55,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Tax Savings</span>
                    <span className="font-semibold text-green-600">₹46,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly SIP</span>
                    <span className="font-semibold">₹12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Portfolio Value</span>
                    <span className="font-semibold text-blue-600">₹1,68,200</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Immediate Action</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Invest ₹35,000 more in ELSS to maximize Section 80C benefits
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Long-term Planning</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Consider starting NPS for additional ₹50,000 tax benefit under 80CCD(1B)
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900">Health Protection</h4>
                    <p className="text-sm text-orange-800 mt-1">
                      Increase health insurance cover to ₹10L for better protection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connect with Advisor */}
            <Card>
              <CardHeader>
                <CardTitle>Need Expert Advice?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with our certified financial advisors for personalized investment planning.
                </p>
                <Button className="w-full">
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGuidancePage;
