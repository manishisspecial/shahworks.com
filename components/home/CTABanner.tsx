"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <Section className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Build Something Great?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Let&apos;s chat! We&apos;d love to hear about your project and see how we can help bring your vision to life. 
          No pressure, just a friendly conversation about what you&apos;re looking to build.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/contact"
            variant="secondary"
            className="group bg-white text-primary-600 hover:bg-gray-50"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            href="/services"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10"
          >
            Explore Services
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

