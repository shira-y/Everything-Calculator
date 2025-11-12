"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCalculatorStore } from '@/store/calculatorStore';
import { predefinedCalculators } from '@/data/predefinedCalculators';
import { showSuccess } from '@/utils/toast';

const CalculatorLibrary = () => {
  const setCalculator = useCalculatorStore((state) => state.setCalculator);

  const handleSelectCalculator = (calculatorId: string) => {
    const selectedCalculator = predefinedCalculators.find(calc => calc.id === calculatorId);
    if (selectedCalculator) {
      // Reset output value when selecting a new calculator
      setCalculator({ ...selectedCalculator, outputValue: 0 });
      showSuccess(`Loaded "${selectedCalculator.name}" from the library.`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50 text-center">Ready-to-Use Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {predefinedCalculators.map((calculator) => (
          <Card
            key={calculator.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
            onClick={() => handleSelectCalculator(calculator.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{calculator.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{calculator.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-gray-500 dark:text-gray-400">Click to use</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalculatorLibrary;