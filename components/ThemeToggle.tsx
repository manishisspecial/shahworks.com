"use client";

import { useTheme, type ColorScheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { mode, colorScheme, toggleMode, setColorScheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorSchemes: { value: ColorScheme; name: string; color: string }[] = [
    { value: "blue", name: "Blue", color: "bg-blue-500" },
    { value: "indigo", name: "Indigo", color: "bg-indigo-500" },
    { value: "emerald", name: "Emerald", color: "bg-emerald-500" },
    { value: "purple", name: "Purple", color: "bg-purple-500" },
  ];

  return (
    <div className="relative flex items-center gap-2">
      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      >
        {mode === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      {/* Color Scheme Picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Change color scheme"
        >
          <Palette className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {showColorPicker && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowColorPicker(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[160px]"
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                  Color Scheme
                </div>
                <div className="space-y-1">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.value}
                      onClick={() => {
                        setColorScheme(scheme.value);
                        setShowColorPicker(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                        colorScheme === scheme.value
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${scheme.color} ${
                          colorScheme === scheme.value
                            ? "ring-2 ring-primary-500 dark:ring-primary-400"
                            : ""
                        }`}
                      />
                      <span>{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

