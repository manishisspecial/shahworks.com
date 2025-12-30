"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Shield, Zap, Award, HeadphonesIcon } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust",
    description:
      "We&apos;re not here for quick wins—we&apos;re here for the long haul. When we say we&apos;ll do something, we do it. No surprises, no excuses, just honest work.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "We move fast, but we never cut corners. You&apos;ll see progress quickly, and you&apos;ll love what you see. Time is money, and we respect both.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We&apos;re perfectionists (in a good way). Every detail matters, every line of code is intentional. We&apos;re proud of our work, and you will be too.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    description:
      "Launch day isn&apos;t goodbye—it&apos;s just the beginning. We&apos;re here when you need us, whether that&apos;s fixing a bug or adding a new feature.",
  },
];

export default function WhyShahWorks() {
  return (
    <Section id="why-us" className="bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Us?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          It&apos;s not just about what we build—it&apos;s about how we build it, and who we are while we&apos;re doing it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

