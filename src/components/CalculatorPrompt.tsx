"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore, CalculatorDefinition } from '@/store/calculatorStore';
import { showSuccess, showError } from '@/utils/toast';

const CalculatorPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const setCalculator = useCalculatorStore((state) => state.setCalculator);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showError("Please enter a prompt to generate a calculator.");
      return;
    }

    // This is a mock generation for now.
    // In Level 2, this would involve an API call to OpenAI via your Supabase backend.
    try {
      const mockCalculator: CalculatorDefinition = {
        id: 'mock-calc-1',
        name: 'Simple Sum Calculator',
        description: `This calculator adds two numbers. Generated from prompt: "${prompt}"`,
        inputs: [
          { id: 'num1', label: 'Number 1', type: 'number', value: 0 },
          { id: 'num2', label: 'Number 2', type: 'number', value: 0 },
        ],
        formula: 'sum', // Placeholder for actual formula
        outputLabel: 'Total Sum',
        outputValue: 0,
      };
      setCalculator(mockCalculator);
      showSuccess("Mock calculator generated successfully!");
      setPrompt('');
    } catch (error) {
      console.error("Mock generation failed:", error);
      showError("Failed to generate calculator. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Generate Your Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., 'Net worth calculator' or 'Calculate the sum of two numbers'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <Button onClick={handleGenerate} className="w-full">
          Generate Calculator
        </Button>
      </CardContent>
    </Card>
  );
};

export default CalculatorPrompt;