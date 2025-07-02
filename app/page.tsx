"use client"; // Must be first line

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-16">
      <motion.h1
        className="text-5xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Arithma
      </motion.h1>
      
      <p className="text-center max-w-2xl mb-10 text-lg">
        Arithma is your smart math toolkit. Instantly compute derivatives, integrals, 
        and matrix operations with beautiful step-by-step explanations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/derivative" className="block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl border border-purple-200 transition-transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">Derivative Calculator</h2>
            <p className="text-sm text-gray-600">
              Enter any function and see its derivative step by step.
            </p>
          </motion.div>
        </Link>

        <Link href="/integral" className="block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl border border-blue-200 transition-transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">Integral Calculator</h2>
            <p className="text-sm text-gray-600">
              Compute integrals with simplified explanations.
            </p>
          </motion.div>
        </Link>

        <Link href="/matrix" className="block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl border border-green-200 transition-transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">Matrix Calculator</h2>
            <p className="text-sm text-gray-600">
              Perform addition, subtraction, multiplication with step details.
            </p>
          </motion.div>
        </Link>
      </div>
    </main>
  );
}
