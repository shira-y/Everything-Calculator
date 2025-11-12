"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCalculatorStore } from '@/store/calculatorStore';
import { fetchPredefinedCalculators } from '@/data/predefinedCalculators'; // Import the fetch function
import { showSuccess, showError } from '@/utils/toast';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

const CalculatorLibrary = () => {
  const setCalculator = useCalculatorStore((state) => state.setCalculator);

  const { data: predefinedCalculators, isLoading, isError, error } = useQuery<any[], Error>({
    queryKey: ['predefinedCalculators'],
    queryFn: fetchPredefinedCalculators,
  });

  const handleSelectCalculator = (calculatorId: string) => {
    const selectedCalculator = predefinedCalculators?.find(calc => calc.id === calculatorId);
    if (selectedCalculator) {
      setCalculator({ ...selectedCalculator, outputValue: 0 }); // Reset output value when selecting
      showSuccess(`Loaded "${selectedCalculator.name}" from the library.`);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50 text-center">Ready-to-Use Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[120px]">
              <CardHeader>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    showError(`Failed to load calculators: ${error?.message || 'Unknown error'}`);
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center text-destructive">
        <h2 className="text-2xl font-bold mb-6">Error Loading Calculators</h2>
        <p>There was an error fetching the calculator library. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50 text-center">Ready-to-Use Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {predefinedCalculators?.map((calculator) => (
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
      {predefinedCalculators?.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No calculators found in the library. Add some via Supabase!</p>
      )}
    </div>
  );
};

export default CalculatorLibrary;