
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, Save, TrendingUp, AlertCircle } from 'lucide-react';

const TaxCalculatorPage = () => {
  const [income, setIncome] = useState([800000]);
  const [regime, setRegime] = useState('new');
  const [deductions, setDeductions] = useState({
    section80C: 0,
    section80D: 0,
    homeLoanInterest: 0,
    section80E: 0,
    section80G: 0
  });

  // Tax calculation logic
  const calculateTax = (income: number, regime: string) => {
    if (regime === 'new') {
      // New regime tax slabs
      let tax = 0;
      if (income > 300000) tax += Math.min(income - 300000, 300000) * 0.05;
      if (income > 600000) tax += Math.min(income - 600000, 300000) * 0.10;
      if (income > 900000) tax += Math.min(income - 900000, 300000) * 0.15;
      if (income > 1200000) tax += Math.min(income - 1200000, 300000) * 0.20;
      if (income > 1500000) tax += (income - 1500000) * 0.30;
      return tax;
    } else {
      // Old regime tax slabs
      let tax = 0;
      if (income > 250000) tax += Math.min(income - 250000, 250000) * 0.05;
      if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
      if (income > 1000000) tax += (income - 1000000) * 0.30;
      
      // Apply deductions for old regime
      const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
      const taxableIncome = Math.max(0, income - totalDeductions);
      
      if (taxableIncome > 250000) tax = Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
      
      return tax;
    }
  };

  const newRegimeTax = calculateTax(income[0], 'new');
  const oldRegimeTax = calculateTax(income[0], 'old');
  const currentTax = regime === 'new' ? newRegimeTax : oldRegimeTax;
  const savings = Math.abs(newRegimeTax - oldRegimeTax);
  const betterRegime = newRegimeTax < oldRegimeTax ? 'new' : 'old';

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calculator className="h-8 w-8 mr-3 text-blue-600" />
            Tax Calculator
          </h1>
          <p className="text-gray-600">Calculate and compare your tax liability under different regimes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Income & Deductions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="income" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="income">Income Details</TabsTrigger>
                    <TabsTrigger value="deductions">Deductions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="income" className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">
                        Annual Income: ₹{income[0].toLocaleString()}
                      </Label>
                      <Slider
                        value={income}
                        onValueChange={setIncome}
                        max={5000000}
                        min={100000}
                        step={50000}
                        className="mt-4"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>₹1L</span>
                        <span>₹50L</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Tax Regime</Label>
                      <RadioGroup
                        value={regime}
                        onValueChange={setRegime}
                        className="mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">New Tax Regime (FY 2023-24)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="old" id="old" />
                          <Label htmlFor="old">Old Tax Regime</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deductions" className="space-y-6">
                    {regime === 'old' ? (
                      <>
                        <div>
                          <Label htmlFor="section80C">Section 80C (PPF, ELSS, etc.)</Label>
                          <Input
                            id="section80C"
                            type="number"
                            placeholder="Max ₹1,50,000"
                            value={deductions.section80C}
                            onChange={(e) => handleDeductionChange('section80C', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="section80D">Section 80D (Health Insurance)</Label>
                          <Input
                            id="section80D"
                            type="number"
                            placeholder="Max ₹25,000"
                            value={deductions.section80D}
                            onChange={(e) => handleDeductionChange('section80D', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="homeLoan">Home Loan Interest</Label>
                          <Input
                            id="homeLoan"
                            type="number"
                            placeholder="Max ₹2,00,000"
                            value={deductions.homeLoanInterest}
                            onChange={(e) => handleDeductionChange('homeLoanInterest', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="section80E">Section 80E (Education Loan)</Label>
                          <Input
                            id="section80E"
                            type="number"
                            placeholder="No limit"
                            value={deductions.section80E}
                            onChange={(e) => handleDeductionChange('section80E', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="section80G">Section 80G (Donations)</Label>
                          <Input
                            id="section80G"
                            type="number"
                            placeholder="50% or 100% deduction"
                            value={deductions.section80G}
                            onChange={(e) => handleDeductionChange('section80G', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Deductions in New Regime</h3>
                        <p className="text-gray-600">
                          The new tax regime offers lower tax rates but doesn't allow most deductions and exemptions.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Tax Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Tax Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">New Regime</p>
                    <p className="text-2xl font-bold text-blue-600">₹{newRegimeTax.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Old Regime</p>
                    <p className="text-2xl font-bold text-orange-600">₹{oldRegimeTax.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">You Save</p>
                  <p className="text-2xl font-bold text-green-600">₹{savings.toLocaleString()}</p>
                  <Badge variant={betterRegime === 'new' ? 'default' : 'secondary'} className="mt-2">
                    {betterRegime === 'new' ? 'New Regime Better' : 'Old Regime Better'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Current Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Your Tax Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Tax ({regime === 'new' ? 'New' : 'Old'} Regime)</p>
                  <p className="text-3xl font-bold text-purple-600">₹{currentTax.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Effective Rate: {((currentTax / income[0]) * 100).toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Calculation
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>

            {/* Tax Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Gross Income</span>
                    <span>₹{income[0].toLocaleString()}</span>
                  </div>
                  {regime === 'old' && (
                    <>
                      <div className="flex justify-between">
                        <span>Total Deductions</span>
                        <span>₹{Object.values(deductions).reduce((sum, val) => sum + val, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Taxable Income</span>
                        <span>₹{Math.max(0, income[0] - Object.values(deductions).reduce((sum, val) => sum + val, 0)).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Income Tax</span>
                    <span>₹{currentTax.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculatorPage;
