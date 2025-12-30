"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import {
  Globe,
  Code,
  Layers,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "We build websites that don&apos;t just look good—they work hard for your business. Fast loading, mobile-friendly, and designed to turn visitors into customers.",
    benefit: "Watch your online presence grow and leads start rolling in.",
  },
  {
    icon: Code,
    title: "Web Applications",
    description:
      "Need something more powerful? We create custom web apps that grow with you. Think of it as your business&apos;s digital backbone—reliable, scalable, and built just for you.",
    benefit: "Work smarter, not harder. Let technology handle the heavy lifting.",
  },
  {
    icon: Layers,
    title: "Software Solutions",
    description:
      "From the first idea to launch day, we&apos;re with you every step of the way. We listen, we understand, and we build exactly what you need—no more, no less.",
    benefit: "Finally, software that actually solves your problems.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "First impressions matter. We design interfaces that people actually enjoy using. Beautiful, intuitive, and built to convert—because good design is good business.",
    benefit: "Delight your users, and they&apos;ll keep coming back.",
  },
];

export default function Services() {
  return (
    <Section id="services" className="bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here&apos;s what we can do for you. Think of us as your digital partners, ready to bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {service.description}
                </p>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {service.benefit}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

