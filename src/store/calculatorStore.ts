import { create } from 'zustand';

export type CalculatorInput = {
  id: string;
  label: string;
  type: 'number' | 'text';
  value: string | number;
};

export type CalculatorDefinition = {
  id: string;
  name: string;
  description: string;
  inputs: CalculatorInput[];
  formula: string; // This will be evaluated to get the output
  outputLabel: string;
  outputValue: string | number;
};

interface CalculatorState {
  currentCalculator: CalculatorDefinition | null;
  setCalculator: (calculator: CalculatorDefinition) => void;
  updateInputValue: (inputId: string, value: string | number) => void;
  calculateOutput: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  currentCalculator: null,
  setCalculator: (calculator) => set({ currentCalculator: calculator }),
  updateInputValue: (inputId, value) => {
    set((state) => {
      if (!state.currentCalculator) return state;

      const updatedInputs = state.currentCalculator.inputs.map((input) =>
        input.id === inputId ? { ...input, value } : input
      );

      return {
        currentCalculator: {
          ...state.currentCalculator,
          inputs: updatedInputs,
        },
      };
    });
    get().calculateOutput(); // Recalculate output after input changes
  },
  calculateOutput: () => {
    set((state) => {
      if (!state.currentCalculator) return state;

      try {
        // This is a placeholder for actual formula evaluation.
        // In a real scenario, you'd use a library like math.js or expr-eval.
        // For now, we'll do a very simple mock calculation.
        let result: number | string = 'Error';
        if (state.currentCalculator.formula === 'sum') {
          const numbers = state.currentCalculator.inputs
            .filter(input => input.type === 'number')
            .map(input => parseFloat(input.value as string || '0'));
          result = numbers.reduce((acc, num) => acc + num, 0);
        } else if (state.currentCalculator.formula === 'product') {
          const numbers = state.currentCalculator.inputs
            .filter(input => input.type === 'number')
            .map(input => parseFloat(input.value as string || '1'));
          result = numbers.reduce((acc, num) => acc * num, 1);
        } else {
          // Default to just showing input values concatenated or similar
          result = state.currentCalculator.inputs.map(input => input.value).join(', ');
        }

        return {
          currentCalculator: {
            ...state.currentCalculator,
            outputValue: result,
          },
        };
      } catch (error) {
        console.error("Error evaluating formula:", error);
        return {
          currentCalculator: {
            ...state.currentCalculator,
            outputValue: "Calculation Error",
          },
        };
      }
    });
  },
}));