
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap, Shield, CheckCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    employmentType: 'salaried',
    annualIncome: [800000],
    taxRegime: 'new',
    aadhaarLastFour: '',
    goals: [] as string[]
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          city: formData.city,
          employment_type: formData.employmentType,
          annual_income: formData.annualIncome[0],
          tax_regime: formData.taxRegime,
          aadhaar_last_four: formData.aadhaarLastFour,
          goals: formData.goals,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Profile setup completed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const progressValue = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in-0 duration-500">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TaxGenie</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your tax optimization experience</p>
          <div className="mt-6">
            <Progress value={progressValue} className="w-full max-w-md mx-auto h-3" />
            <p className="text-sm text-gray-500 mt-2">Step {step} of 3</p>
          </div>
        </div>

        {/* Step Cards */}
        <div className="mb-6">
          <div className="flex justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  stepNum <= step
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNum < step ? <CheckCircle className="h-5 w-5" /> : stepNum}
              </div>
            ))}
          </div>
        </div>

        <Card className={`shadow-2xl border-0 animate-in fade-in-0 duration-700 ${step === 1 ? 'delay-200' : step === 2 ? 'delay-300' : 'delay-400'}`}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span>
                {step === 1 && 'Personal Details'}
                {step === 2 && 'Income Information'}  
                {step === 3 && 'Tax Goals'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-1 border-0 bg-gray-50 focus:bg-white shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter your city"
                      className="mt-1 border-0 bg-gray-50 focus:bg-white shadow-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Employment Type</Label>
                  <RadioGroup
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, employmentType: value }))}
                    className="mt-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="salaried" id="salaried" />
                      <Label htmlFor="salaried" className="flex-1">Salaried Employee</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="flex-1">Business Owner</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="freelancer" id="freelancer" />
                      <Label htmlFor="freelancer" className="flex-1">Freelancer</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="aadhaar" className="text-sm font-medium text-gray-700">Last 4 digits of Aadhaar (Optional)</Label>
                  <div className="relative mt-1">
                    <Input
                      id="aadhaar"
                      value={formData.aadhaarLastFour}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhaarLastFour: e.target.value }))}
                      placeholder="XXXX"
                      maxLength={4}
                      className="pr-10 border-0 bg-gray-50 focus:bg-white shadow-sm"
                    />
                    <Shield className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Your data is encrypted and secure
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Annual Income: ₹{(formData.annualIncome[0] / 100000).toFixed(1)}L</Label>
                  <div className="mt-4 px-3">
                    <Slider
                      value={formData.annualIncome}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, annualIncome: value }))}
                      max={2000000}
                      min={300000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₹3L</span>
                      <span>₹20L</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Preferred Tax Regime</Label>
                  <RadioGroup
                    value={formData.taxRegime}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, taxRegime: value }))}
                    className="mt-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="new" id="new-regime" />
                      <div className="flex-1">
                        <Label htmlFor="new-regime" className="font-medium">New Tax Regime</Label>
                        <p className="text-sm text-gray-500">Lower rates, fewer deductions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                      <RadioGroupItem value="old" id="old-regime" />
                      <div className="flex-1">
                        <Label htmlFor="old-regime" className="font-medium">Old Tax Regime</Label>
                        <p className="text-sm text-gray-500">Higher rates, more deductions</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Quick Tax Preview
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="text-gray-600">Estimated Tax (New Regime)</p>
                      <p className="font-semibold text-green-600 text-lg">₹{Math.max(0, (formData.annualIncome[0] - 300000) * 0.05).toLocaleString()}</p>
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="text-gray-600">Estimated Tax (Old Regime)</p>
                      <p className="font-semibold text-red-600 text-lg">₹{Math.max(0, (formData.annualIncome[0] - 250000) * 0.05).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-700">What are your tax goals? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {[
                      'Save more tax',
                      'Simplify filing process',
                      'Get investment guidance',
                      'Stay compliant with deadlines',
                      'Understand tax implications',
                      'Plan for next year'
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={() => toggleGoal(goal)}
                        />
                        <Label htmlFor={goal} className="text-sm flex-1">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Expected Benefits</h3>
                  </div>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      Personalized tax optimization recommendations
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      Automated compliance tracking and reminders
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      AI-powered investment guidance for tax savings
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      Simplified filing with pre-filled forms
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={loading}
                className={`${step === 1 ? 'ml-auto' : ''} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg flex items-center space-x-2`}
              >
                <span>{loading ? 'Saving...' : (step === 3 ? 'Complete Setup' : 'Next')}</span>
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
