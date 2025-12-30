"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "First things first—we get to know you! We&apos;ll chat about your goals, your audience, and what success means to you. No assumptions, just real conversations.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "This is where the magic starts. We create designs that look amazing AND work beautifully. Every pixel is intentional, every interaction is smooth.",
  },
  {
    icon: Code2,
    title: "Develop",
    description:
      "Time to bring it to life! We write clean, maintainable code that&apos;s built to last. Think of it as building a house—solid foundation, quality materials.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Launch day! We test everything thoroughly, optimize for performance, and then we&apos;re there to support you. Your success is our success.",
  },
];

export default function Process() {
  return (
    <Section id="process">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          How We Work
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Simple, transparent, and focused on you. Here&apos;s how we turn your idea into reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent -z-10" />
              )}

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-primary-600">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

