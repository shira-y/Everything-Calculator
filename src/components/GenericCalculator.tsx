"use client";

import React from 'react';
import { useCalculatorStore, CalculatorInput } from '@/store/calculatorStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const GenericCalculator = () => {
  const { currentCalculator, updateInputValue, calculateOutput } = useCalculatorStore();

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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{currentCalculator.name}</CardTitle>
        <CardDescription>{currentCalculator.description}</CardDescription>
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
          <Input
            type="text"
            value={currentCalculator.outputValue}
            readOnly
            className="w-full bg-muted font-mono text-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericCalculator;