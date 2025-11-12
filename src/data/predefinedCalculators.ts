import { CalculatorDefinition } from '@/store/calculatorStore';

export const predefinedCalculators: CalculatorDefinition[] = [
  {
    id: 'sum-two-numbers',
    name: 'Sum Two Numbers',
    description: 'Calculates the sum of two input numbers.',
    inputs: [
      { id: 'a', label: 'Number A', type: 'number', value: 0 },
      { id: 'b', label: 'Number B', type: 'number', value: 0 },
    ],
    formula: 'a + b', // Changed to mathjs-compatible formula
    outputLabel: 'Sum',
    outputValue: 0,
  },
  {
    id: 'product-two-numbers',
    name: 'Product of Two Numbers',
    description: 'Calculates the product of two input numbers.',
    inputs: [
      { id: 'x', label: 'Factor X', type: 'number', value: 1 },
      { id: 'y', label: 'Factor Y', type: 'number', value: 1 },
    ],
    formula: 'x * y', // Changed to mathjs-compatible formula
    outputLabel: 'Product',
    outputValue: 1,
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculates simple interest based on principal, rate, and time.',
    inputs: [
      { id: 'principal', label: 'Principal Amount', type: 'number', value: 1000 },
      { id: 'rate', label: 'Annual Rate (%)', type: 'number', value: 5 },
      { id: 'time', label: 'Time (Years)', type: 'number', value: 1 },
    ],
    formula: 'principal * (rate / 100) * time',
    outputLabel: 'Simple Interest',
    outputValue: 0,
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculates Body Mass Index (BMI) based on weight and height.',
    inputs: [
      { id: 'weight', label: 'Weight (kg)', type: 'number', value: 70 },
      { id: 'height', label: 'Height (m)', type: 'number', value: 1.75 },
    ],
    formula: 'weight / (height * height)',
    outputLabel: 'BMI',
    outputValue: 0,
  },
];