"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import GenericCalculator from "@/components/GenericCalculator";
import CalculatorViewSwitcher from "@/components/CalculatorViewSwitcher";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl space-y-8">
        <h1 className="text-5xl font-extrabold text-blue-800 dark:text-blue-300 mb-6 text-center leading-tight">
          Everything Calculator
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-prose">
          Instantly generate any calculator with natural language, or use one from our library.
        </p>

        <CalculatorViewSwitcher />
        <Separator className="my-8" />
        <GenericCalculator />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;