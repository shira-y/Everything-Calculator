"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore, CalculatorDefinition } from '@/store/calculatorStore';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { Save } from 'lucide-react'; // Import Save icon
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

const CalculatorPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentCalculator, setCalculator } = useCalculatorStore(); // Get currentCalculator from store
  const queryClient = useQueryClient(); // Initialize query client

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

  const handleSaveCalculator = async () => {
    if (!currentCalculator) {
      showError("No calculator to save. Please generate one first.");
      return;
    }

    setIsLoading(true);
    const savingToastId = showLoading(`Saving "${currentCalculator.name}" to library...`);

    try {
      const { id, name, description, inputs, formula, outputLabel } = currentCalculator;
      const { error } = await supabase
        .from('calculators')
        .insert({ id, name, description, inputs, formula, output_label: outputLabel });

      if (error) {
        throw new Error(error.message);
      }

      showSuccess(`"${currentCalculator.name}" saved to library!`);
      queryClient.invalidateQueries({ queryKey: ['predefinedCalculators'] }); // Invalidate cache to refresh library
    } catch (error: any) {
      console.error("Failed to save calculator:", error);
      showError(`Failed to save calculator: ${error.message || 'Unknown error'}`);
    } finally {
      dismissToast(savingToastId);
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
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleGenerate} className="w-full sm:flex-1" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Calculator"}
          </Button>
          {currentCalculator && (
            <Button
              onClick={handleSaveCalculator}
              className="w-full sm:flex-1"
              variant="outline"
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" /> Save to Library
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatorPrompt;