"use client";
import { useState } from "react";
import { derivative, parse, simplify } from "mathjs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepByStepSolution from "@/components/StepByStepSolution";

export default function DerivativeCalculator() {
  const [expression, setExpression] = useState("");
  const [variable, _setVariable] = useState("x");
  const [steps, setSteps] = useState<string[]>([]);

  const calculateDerivative = () => {
    try {
      const stepsArr: string[] = [];
      const originalNode = parse(expression);
      stepsArr.push(`Original expression: ${originalNode.toString()}`);

      const derivativeNode = derivative(originalNode, variable);
      stepsArr.push(`Computed derivative: ${derivativeNode.toString()}`);

      const simplifiedNode = simplify(derivativeNode);
      stepsArr.push(`Simplified derivative: ${simplifiedNode.toString()}`);

      setSteps(stepsArr);
    } catch {
      setSteps(["Invalid expression or unable to compute."]);
    }
  };

  return (
    <>
    <h1 className="text-3xl font-bold text-center mb-2">Derivative Calculator</h1>
      <p className="text-center text-gray-600 mb-8">
        Enter your function below and see the step by step solution instantly
      </p>
    <Card className="max-w-xl mx-auto my-8 p-8 rounded-3xl shadow-xl bg-white">
      <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold">Function Input</h2>
          </div>
        <div className="mb-4">
          <Input
            placeholder="Enter function e.g. x^2 + 3*x + 1"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Quick Functions:</p>
          <div className="flex flex-wrap gap-2">
            {["sin(x)", "cos(x)", "tan(x)", "ln(x)", "e^x", "π", "x^2", "1/x"].map((fn) => (
              <button
                key={fn}
                className="px-3 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors"
                onClick={() => setExpression((prev) => prev + fn)}
              >
                {fn}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-3 text-lg font-semibold rounded-md transition-colors shadow"
          onClick={calculateDerivative}
        >
          Calculate Derivative
        </Button>

        {steps.length > 0 && <StepByStepSolution steps={steps} />}
      </CardContent>
    </Card>
    </>
  );
}
