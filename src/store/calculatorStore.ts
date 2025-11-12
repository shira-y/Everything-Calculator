import { create } from 'zustand';
import { evaluate } from 'mathjs'; // Import evaluate from mathjs

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
        const scope: { [key: string]: number | string } = {};
        state.currentCalculator.inputs.forEach(input => {
          // Only add number inputs to the scope for math evaluation
          if (input.type === 'number') {
            scope[input.id] = parseFloat(input.value as string || '0');
          }
        });

        let result: number | string;
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
          // Use mathjs for general formula evaluation
          result = evaluate(state.currentCalculator.formula, scope);
        }

        // Ensure result is a number if it's a mathematical calculation
        if (typeof result === 'number') {
          result = parseFloat(result.toFixed(2)); // Round to 2 decimal places for display
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