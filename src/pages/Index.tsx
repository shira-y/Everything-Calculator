"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import GenericCalculator from "@/components/GenericCalculator";
import CalculatorViewSwitcher from "@/components/CalculatorViewSwitcher";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-background p-4 sm:p-6 lg:p-8"> {/* Changed background */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl space-y-8">
        <h1 className="text-5xl font-extrabold text-foreground mb-6 text-center leading-tight"> {/* Changed text color */}
          Everything Calculator
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-prose"> {/* Changed text color */}
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