"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import CalculatorPrompt from "@/components/CalculatorPrompt";
import GenericCalculator from "@/components/GenericCalculator";
import CalculatorLibrary from "@/components/CalculatorLibrary"; // Import the new component
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
        <Separator className="my-8" />
        <CalculatorLibrary /> {/* Include the CalculatorLibrary component */}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;