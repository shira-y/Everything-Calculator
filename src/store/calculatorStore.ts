import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { evaluate } from 'mathjs';

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
  formula: string;
  outputLabel: string;
  outputValue: string | number;
};

interface CalculatorState {
  currentCalculator: CalculatorDefinition | null;
  setCalculator: (calculator: CalculatorDefinition) => void;
  updateInputValue: (inputId: string, value: string | number) => void;
  calculateOutput: () => void;
  clearCalculator: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      currentCalculator: null,
      setCalculator: (calculator) => set({ currentCalculator: { ...calculator, outputValue: 0 } }), // Ensure outputValue is reset
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
        get().calculateOutput();
      },
      calculateOutput: () => {
        set((state) => {
          if (!state.currentCalculator) return state;

          try {
            const scope: { [key: string]: number | string } = {};
            state.currentCalculator.inputs.forEach(input => {
              if (input.type === 'number') {
                scope[input.id] = parseFloat(input.value as string || '0');
              }
            });

            let result: number | string = evaluate(state.currentCalculator.formula, scope);
            
            if (typeof result === 'number') {
              result = parseFloat(result.toFixed(2));
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
      clearCalculator: () => set({ currentCalculator: null }),
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);