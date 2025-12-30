"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

function Stat({ value, label, suffix = "", delay = 0 }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {value}
        {suffix && <span className="text-primary-600">{suffix}</span>}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Stat value="150" suffix="+" label="Projects Delivered" delay={0} />
          <Stat value="100" suffix="+" label="Happy Clients" delay={0.1} />
          <Stat value="8" suffix="+" label="Years Experience" delay={0.2} />
          <Stat value="98" suffix="%" label="Client Satisfaction" delay={0.3} />
        </div>
      </div>
    </section>
  );
}

