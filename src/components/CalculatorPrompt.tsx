"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore, CalculatorDefinition } from '@/store/calculatorStore';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client'; // Import supabase client

const CalculatorPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setCalculator = useCalculatorStore((state) => state.setCalculator);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showError("Please enter a prompt to generate a calculator.");
      return;
    }

    setIsLoading(true);
    const loadingToastId = showLoading("Generating your calculator...");

    try {
      const { data, error } = await supabase.functions.invoke('generate-calculator', {
        body: { prompt },
      });

      if (error) {
        throw new Error(error.message);
      }

      const generatedCalculator: CalculatorDefinition = {
        ...data,
        id: data.id || `generated-${Date.now()}`, // Ensure an ID is present
        outputValue: 0, // Reset output value for new calculators
      };
      
      setCalculator(generatedCalculator);
      showSuccess("Calculator generated successfully!");
      setPrompt('');
    } catch (error: any) {
      console.error("Calculator generation failed:", error);
      showError(`Failed to generate calculator: ${error.message || 'Unknown error'}`);
    } finally {
      dismissToast(loadingToastId);
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <Button onClick={handleGenerate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Calculator"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CalculatorPrompt;