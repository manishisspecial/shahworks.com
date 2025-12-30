import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Globe,
  Code,
  Layers,
  Palette,
  Smartphone,
  Database,
  Cloud,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom websites built with modern technologies like Next.js, React, and TypeScript. We create fast, responsive, and SEO-optimized websites that convert visitors into customers.",
    features: [
      "Responsive design for all devices",
      "SEO optimization",
      "Fast loading times",
      "Content management systems",
      "E-commerce integration",
    ],
    benefit: "Boost your online presence and drive more leads with a professional website.",
  },
  {
    icon: Code,
    title: "Web Applications",
    description:
      "Scalable web applications that grow with your business. Built for performance, security, and exceptional user experience using cutting-edge technologies.",
    features: [
      "Custom web applications",
      "API development & integration",
      "Real-time features",
      "User authentication & authorization",
      "Cloud deployment",
    ],
    benefit: "Streamline operations and improve productivity with tailored solutions.",
  },
  {
    icon: Layers,
    title: "Software Solutions",
    description:
      "End-to-end software development tailored to your business needs. From concept to deployment, we build robust solutions that solve complex problems.",
    features: [
      "Full-stack development",
      "System architecture design",
      "Database design & optimization",
      "Third-party integrations",
      "Maintenance & support",
    ],
    benefit: "Solve complex problems with elegant, scalable solutions.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that users love. Our design process focuses on user research, conversion optimization, and creating delightful experiences.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design",
      "Design systems",
      "Usability testing",
    ],
    benefit: "Increase engagement and user satisfaction with thoughtful design.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Development",
    description:
      "Responsive and mobile-optimized solutions that work seamlessly across all devices. We ensure your digital product performs flawlessly on mobile.",
    features: [
      "Mobile-responsive design",
      "Progressive Web Apps (PWA)",
      "Touch-optimized interfaces",
      "Mobile performance optimization",
      "Cross-browser compatibility",
    ],
    benefit: "Reach your audience wherever they are with mobile-optimized experiences.",
  },
  {
    icon: Database,
    title: "Backend Development",
    description:
      "Robust backend systems that power your applications. We build secure, scalable APIs and databases that handle growth and maintain performance.",
    features: [
      "RESTful & GraphQL APIs",
      "Database design & optimization",
      "Server architecture",
      "Authentication & security",
      "Cloud infrastructure",
    ],
    benefit: "Build a solid foundation that scales with your business needs.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Deploy and scale your applications on cloud platforms. We help you leverage cloud infrastructure for reliability, scalability, and cost efficiency.",
    features: [
      "Cloud migration",
      "AWS, Vercel, Railway deployment",
      "CI/CD pipelines",
      "Monitoring & analytics",
      "Cost optimization",
    ],
    benefit: "Scale effortlessly with cloud infrastructure that grows with you.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Speed matters. We optimize your digital products for lightning-fast performance, improving user experience and search engine rankings.",
    features: [
      "Performance auditing",
      "Code optimization",
      "Image & asset optimization",
      "Caching strategies",
      "Core Web Vitals improvement",
    ],
    benefit: "Deliver fast, smooth experiences that keep users engaged.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Here&apos;s everything we can help you with. Think of this as our menu—pick what you need, 
            or let&apos;s create a custom solution just for you.
          </p>
          <Button href="/contact" variant="primary">
            Start Your Project
          </Button>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="h-full">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    What&apos;s Included:
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-primary-600">
                    {service.benefit}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let&apos;s discuss your project and find the perfect solution for your
            business needs.
          </p>
          <Button href="/contact" variant="primary">
            Contact Us Today
          </Button>
        </div>
      </Section>
    </div>
  );
}

