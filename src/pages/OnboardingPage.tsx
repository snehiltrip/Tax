
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
import { Zap, Shield, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TaxGenie</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your tax optimization experience</p>
          <div className="mt-4">
            <Progress value={progressValue} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Step {step} of 3</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Personal Details'}
              {step === 2 && 'Income Information'}  
              {step === 3 && 'Tax Goals'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Employment Type</Label>
                  <RadioGroup
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, employmentType: value }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="salaried" id="salaried" />
                      <Label htmlFor="salaried">Salaried Employee</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business">Business Owner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="freelancer" id="freelancer" />
                      <Label htmlFor="freelancer">Freelancer</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="aadhaar">Last 4 digits of Aadhaar (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="aadhaar"
                      value={formData.aadhaarLastFour}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhaarLastFour: e.target.value }))}
                      placeholder="XXXX"
                      maxLength={4}
                      className="pr-10"
                    />
                    <Shield className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your data is encrypted and secure</p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label>Annual Income: ₹{(formData.annualIncome[0] / 100000).toFixed(1)}L</Label>
                  <Slider
                    value={formData.annualIncome}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, annualIncome: value }))}
                    max={2000000}
                    min={300000}
                    step={50000}
                    className="mt-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>₹3L</span>
                    <span>₹20L</span>
                  </div>
                </div>

                <div>
                  <Label>Preferred Tax Regime</Label>
                  <RadioGroup
                    value={formData.taxRegime}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, taxRegime: value }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new-regime" />
                      <Label htmlFor="new-regime">New Tax Regime (Lower rates, fewer deductions)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="old" id="old-regime" />
                      <Label htmlFor="old-regime">Old Tax Regime (Higher rates, more deductions)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Tax Preview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Estimated Tax (New Regime)</p>
                      <p className="font-semibold text-green-600">₹{Math.max(0, (formData.annualIncome[0] - 300000) * 0.05).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Estimated Tax (Old Regime)</p>
                      <p className="font-semibold text-red-600">₹{Math.max(0, (formData.annualIncome[0] - 250000) * 0.05).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label>What are your tax goals? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {[
                      'Save more tax',
                      'Simplify filing process',
                      'Get investment guidance',
                      'Stay compliant with deadlines',
                      'Understand tax implications',
                      'Plan for next year'
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={() => toggleGoal(goal)}
                        />
                        <Label htmlFor={goal} className="text-sm">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Expected Benefits</h3>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Personalized tax optimization recommendations</li>
                    <li>• Automated compliance tracking and reminders</li>
                    <li>• AI-powered investment guidance for tax savings</li>
                    <li>• Simplified filing with pre-filled forms</li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={loading}
                className={`${step === 1 ? 'ml-auto' : ''} bg-blue-600 hover:bg-blue-700`}
              >
                {loading ? 'Saving...' : (step === 3 ? 'Complete Setup' : 'Next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
