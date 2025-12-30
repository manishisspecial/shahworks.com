import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Target, Eye, Heart, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Shah Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hi! We&apos;re Shah Works—a team of developers, designers, and dreamers who love building 
            things that matter. We&apos;re here to help your business grow, one line of code at a time.
          </p>
        </div>
      </Section>

      {/* Story Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
              It all started with a simple idea: what if building websites and apps didn&apos;t have to be 
              complicated? What if you could work with a team that actually listens, understands your business, 
              and builds exactly what you need—not what they think you need?
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
              That&apos;s what we set out to do, and that&apos;s what we&apos;ve been doing ever since. 
              We&apos;ve worked with startups just getting started, established businesses looking to grow, 
              and everyone in between. What they all have in common? They wanted a partner, not just a vendor.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Today, we&apos;re still that same team—passionate about what we do, committed to doing it right, 
              and always ready to roll up our sleeves and get to work. We&apos;re not just building websites; 
              we&apos;re building relationships, and we&apos;re building the future, one project at a time.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We want to make great technology accessible to everyone. Whether you&apos;re a small startup 
              or a growing business, you deserve tools that work beautifully and help you succeed. 
              That&apos;s what we&apos;re here to build for you.
            </p>
          </Card>

          <Card>
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We see a world where every business, no matter how big or small, has access to amazing 
              digital tools. Where technology isn&apos;t a barrier—it&apos;s a superpower. 
              And we&apos;re here to help make that happen, one project at a time.
            </p>
          </Card>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Quality First
            </h3>
            <p className="text-gray-600">
              We never compromise on quality. Every project is delivered to the
              highest standards.
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Client Focus
            </h3>
            <p className="text-gray-600">
              Your success is our success. We&apos;re committed to your growth and
              satisfaction.
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Innovation
            </h3>
            <p className="text-gray-600">
              We stay ahead of the curve, using the latest technologies and best
              practices.
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Transparency
            </h3>
            <p className="text-gray-600">
              Clear communication and honest feedback throughout the entire
              process.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Ready to transform your digital presence? Get in touch and let&apos;s
            discuss your project.
          </p>
          <Button
            href="/contact"
            variant="secondary"
            className="bg-white text-primary-600 hover:bg-gray-50"
          >
            Start a Conversation
          </Button>
        </div>
      </Section>
    </div>
  );
}

