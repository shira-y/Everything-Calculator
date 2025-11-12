import { CalculatorDefinition } from '@/store/calculatorStore';
import { supabase } from '@/integrations/supabase/client';

export const fetchPredefinedCalculators = async (): Promise<CalculatorDefinition[]> => {
  const { data, error } = await supabase
    .from('calculators')
    .select('id, name, description, inputs, formula, output_label');

  if (error) {
    console.error('Error fetching predefined calculators:', error);
    throw new Error('Failed to fetch predefined calculators.');
  }

  // Map the fetched data to CalculatorDefinition type, ensuring outputValue is initialized
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    inputs: item.inputs,
    formula: item.formula,
    outputLabel: item.output_label,
    outputValue: 0, // Initialize outputValue for fetched calculators
  }));
};

// You can optionally keep some initial data here for seeding if needed,
// but the primary source will now be Supabase.
// For now, we'll remove the hardcoded array as it will be fetched.