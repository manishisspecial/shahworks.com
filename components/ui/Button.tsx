"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm";
  
  const variants = {
    primary:
      disabled
        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
    secondary:
      disabled
        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        : "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md",
    outline:
      disabled
        ? "border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-transparent"
        : "border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600 bg-transparent",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

