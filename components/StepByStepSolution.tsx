"use client";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  steps: string[];
}

export default function StepByStepSolution({ steps }: Props) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <AnimatePresence>
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ delay: idx * 0.25, type: "spring", stiffness: 100 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-purple-400 text-white rounded-full font-bold">
              {idx + 1}
            </div>
            <div className="flex-1 text-gray-700">{step}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
