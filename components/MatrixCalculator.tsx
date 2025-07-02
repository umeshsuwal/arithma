"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepByStepSolution from "@/components/StepByStepSolution";

type Matrix = number[][];

export default function MatrixCalculator() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply">("add");
  const [result, setResult] = useState<Matrix>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const resizeMatrices = () => {
    const createMatrix = (r: number, c: number): Matrix =>
      Array.from({ length: r }, () => Array(c).fill(0));
    setMatrixA(createMatrix(rows, cols));
    setMatrixB(createMatrix(rows, cols));
    setResult([]);
    setSteps([]);
  };

  const handleMatrixChange = (
    matrixSetter: React.Dispatch<React.SetStateAction<Matrix>>,
    r: number,
    c: number,
    value: string
  ) => {
    matrixSetter(prev => {
      const copy = [...prev];
      copy[r][c] = parseFloat(value) || 0;
      return copy;
    });
  };

  const compute = () => {
    let res: Matrix = [];
    let stepDetails: string[][] = [];

    if (operation === "add" || operation === "subtract") {
      res = matrixA.map((row, i) =>
        row.map((val, j) =>
          operation === "add"
            ? val + matrixB[i][j]
            : val - matrixB[i][j]
        )
      );

      stepDetails = matrixA.map((row, i) =>
        row.map((val, j) =>
          `C[${i+1}][${j+1}] = ${val} ${operation === "add" ? "+" : "-"} ${matrixB[i][j]} = ${operation === "add" ? val + matrixB[i][j] : val - matrixB[i][j]}`
        )
      );
    } 
    else if (operation === "multiply") {
      const rowsA = matrixA.length;
      const colsA = matrixA[0].length;
      const rowsB = matrixB.length;
      const colsB = matrixB[0].length;

      if (colsA !== rowsB) {
        alert("Multiplication not possible: columns of A must equal rows of B.");
        return;
      }

      res = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
      stepDetails = Array.from({ length: rowsA }, () => Array(colsB).fill(""));

      for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
          let sum = 0;
          let details = "";
          for (let k = 0; k < colsA; k++) {
            sum += matrixA[i][k] * matrixB[k][j];
            details += `${matrixA[i][k]}×${matrixB[k][j]}${k < colsA - 1 ? " + " : ""}`;
          }
          res[i][j] = sum;
          stepDetails[i][j] = `C[${i+1}][${j+1}] = ${details} = ${sum}`;
        }
      }
    }

    setResult(res);
    setSteps(stepDetails.flat());
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-center mb-1">Matrix Calculator</h1>
        <p className="text-center text-muted-foreground text-sm">
          Quickly perform addition, subtraction, and multiplication with detailed steps.
        </p>
      </motion.div>

      <Card>
        <CardContent className="flex flex-wrap gap-4 items-center justify-center py-4">
          <input 
            type="number" min={1} value={rows}
            onChange={e => setRows(parseInt(e.target.value) || 1)}
            className="border rounded px-2 py-1 w-16 text-center"
            placeholder="Rows"
          />
          <input 
            type="number" min={1} value={cols}
            onChange={e => setCols(parseInt(e.target.value) || 1)}
            className="border rounded px-2 py-1 w-16 text-center"
            placeholder="Cols"
          />
          <Button onClick={resizeMatrices}>Resize</Button>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2 flex-wrap">
        <Button 
          variant={operation === "add" ? "default" : "outline"} 
          onClick={() => setOperation("add")}
          className="px-6"
        >
          Addition
        </Button>
        <Button 
          variant={operation === "subtract" ? "default" : "outline"} 
          onClick={() => setOperation("subtract")}
          className="px-6"
        >
          Subtraction
        </Button>
        <Button 
          variant={operation === "multiply" ? "default" : "outline"} 
          onClick={() => setOperation("multiply")}
          className="px-6"
        >
          Multiplication
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-center">
        <MatrixInput 
          matrix={matrixA} 
          onChange={(r, c, val) => handleMatrixChange(setMatrixA, r, c, val)} 
          label="Matrix A"
        />

        <div className="text-center text-2xl font-bold">
          {operation === "add" ? "+" : operation === "subtract" ? "-" : "×"}
        </div>

        <MatrixInput 
          matrix={matrixB} 
          onChange={(r, c, val) => handleMatrixChange(setMatrixB, r, c, val)} 
          label="Matrix B"
        />
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={compute}>Compute</Button>
      </div>

      {result.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-center">Result Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <MatrixDisplay matrix={result}/>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold mt-6 mb-2 text-center">Step-by-Step Solution</h3>
          <StepByStepSolution steps={steps} />
        </motion.div>
      )}
    </div>
  );
}

// Input grid
function MatrixInput({ matrix, onChange, label }: {
  matrix: Matrix;
  onChange: (r: number, c: number, value: string) => void;
  label: string;
}) {
  return (
    <Card className="w-full max-w-xs mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, 3.5rem)` }}
        >
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                value={val}
                onChange={e => onChange(i, j, e.target.value)}
                className="border rounded p-2 w-14 h-12 text-center"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Output grid
function MatrixDisplay({ matrix }: { matrix: Matrix }) {
  return (
    <div 
      className="grid gap-1 justify-center"
      style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, 3.5rem)` }}
    >
      {matrix.map((row, i) =>
        row.map((val, j) => (
          <div 
            key={`${i}-${j}`} 
            className="p-2 border rounded text-center bg-muted w-14 h-12 flex items-center justify-center"
          >
            {val}
          </div>
        ))
      )}
    </div>
  );
}
