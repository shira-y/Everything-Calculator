"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import CalculatorPrompt from "@/components/CalculatorPrompt";
import GenericCalculator from "@/components/GenericCalculator";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 text-center leading-tight">
          Everything Calculator
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-prose">
          Instantly generate any calculator with natural language, or use one from our library.
        </p>

        <CalculatorPrompt />
        <Separator className="my-8" />
        <GenericCalculator />

        {/* Placeholder for "Library of ready-to-use calculators" */}
        <div className="w-full max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Ready-to-Use Calculators (Coming Soon!)</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This section will feature a library of pre-built calculators for common tasks.
          </p>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;