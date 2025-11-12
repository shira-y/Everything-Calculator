"use client";

import React from 'react';
import { useCalculatorStore, CalculatorInput } from '@/store/calculatorStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, XCircle } from 'lucide-react'; // Import XCircle icon
import { showSuccess, showError } from '@/utils/toast';

const GenericCalculator = () => {
  const { currentCalculator, updateInputValue, calculateOutput, clearCalculator } = useCalculatorStore(); // Get clearCalculator

  if (!currentCalculator) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">No calculator generated yet. Type a prompt above!</p>
        </CardContent>
      </Card>
    );
  }

  const handleInputChange = (inputId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateInputValue(inputId, currentCalculator.inputs.find(input => input.id === inputId)?.type === 'number' ? parseFloat(value) || 0 : value);
  };

  const handleCopyOutput = async () => {
    if (currentCalculator?.outputValue) {
      try {
        await navigator.clipboard.writeText(String(currentCalculator.outputValue));
        showSuccess("Output copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy output:", err);
        showError("Failed to copy output.");
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{currentCalculator.name}</CardTitle>
          <CardDescription>{currentCalculator.description}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={clearCalculator} aria-label="Clear calculator">
          <XCircle className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCalculator.inputs.map((input: CalculatorInput) => (
            <div key={input.id} className="space-y-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type === 'number' ? 'number' : 'text'}
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <Label className="text-lg font-semibold">{currentCalculator.outputLabel}</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={currentCalculator.outputValue}
              readOnly
              className="flex-grow bg-muted font-mono text-lg"
            />
            <Button variant="outline" size="icon" onClick={handleCopyOutput} aria-label="Copy output">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericCalculator;