"use client";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Shah Works transformed our online presence. The website they built not only looks stunning but has significantly increased our conversions. Highly professional team!",
    author: "Rajesh Kumar",
    role: "CEO, TechStart India",
  },
  {
    quote:
      "Working with Shah Works was a game-changer. They understood our vision and delivered a web application that exceeded our expectations. Fast, reliable, and innovative.",
    author: "Priya Sharma",
    role: "Founder, GrowthLabs",
  },
  {
    quote:
      "The attention to detail and quality of work is exceptional. Shah Works doesn't just build websites, they build solutions that drive business growth. Worth every penny.",
    author: "Amit Patel",
    role: "Director, Digital Ventures",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Don&apos;t Just Take Our Word For It
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here&apos;s what people who&apos;ve worked with us have to say. Real feedback from real clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <Quote className="w-8 h-8 text-primary-600 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

