import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <Section className="bg-gradient-to-br from-primary-50 dark:from-primary-900/20 via-white dark:via-gray-900 to-indigo-50 dark:to-indigo-900/20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your privacy matters to us. We&apos;re committed to being transparent about how we collect, use, and protect your information.
          </p>
        </div>
      </Section>

      <Section className="bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert max-w-none">
          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              We Respect Your Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At Shah Works, we take your privacy seriously. This policy explains what information we collect, why we collect it, and how we use it. We&apos;ve written it in plain language because we believe you should understand what&apos;s happening with your data.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              When you work with us or visit our website, we might collect:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• <strong>Contact Information:</strong> Your name, email, phone number, and address when you reach out to us</li>
              <li>• <strong>Project Information:</strong> Details about your project, business, and requirements</li>
              <li>• <strong>Website Usage:</strong> How you interact with our website (we use this to make it better)</li>
              <li>• <strong>Technical Data:</strong> Your IP address, browser type, and device information</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              We only collect what we need to provide you with great service. Nothing more, nothing less.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Communicate with you about your project</li>
              <li>• Provide the services you&apos;ve requested</li>
              <li>• Send you important updates about your project</li>
              <li>• Improve our website and services</li>
              <li>• Respond to your questions and support requests</li>
              <li>• Send you marketing communications (only if you&apos;ve opted in, and you can unsubscribe anytime)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              We never sell your information to third parties. That&apos;s not who we are.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. How We Share Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We might share your information with:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• <strong>Service Providers:</strong> Trusted partners who help us run our business (like hosting providers, payment processors, or email services). They&apos;re bound by confidentiality agreements.</li>
              <li>• <strong>Legal Requirements:</strong> If we&apos;re required by law to share information</li>
              <li>• <strong>With Your Consent:</strong> If you explicitly ask us to share something</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              We&apos;re careful about who we work with, and we only share what&apos;s necessary.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We take security seriously. We use industry-standard measures to protect your information:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Encrypted connections (HTTPS) for data transmission</li>
              <li>• Secure servers and databases</li>
              <li>• Regular security updates and monitoring</li>
              <li>• Limited access to your information (only people who need it)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              That said, no system is 100% secure. We do our best, but we can&apos;t guarantee absolute security. We&apos;ll let you know if there&apos;s ever a security breach that affects your data.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Cookies & Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Our website uses cookies and similar technologies to:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Remember your preferences</li>
              <li>• Understand how you use our site</li>
              <li>• Improve your experience</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              You can control cookies through your browser settings. Some features might not work as well if you disable cookies, but that&apos;s your choice.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Access the information we have about you</li>
              <li>• Correct any inaccurate information</li>
              <li>• Request that we delete your information</li>
              <li>• Opt out of marketing communications</li>
              <li>• Object to how we&apos;re using your data</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Just reach out to us, and we&apos;ll help you exercise these rights. We&apos;re here for you.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We keep your information for as long as we need it to provide you with services or as required by law. When we no longer need it, we&apos;ll securely delete it. If you&apos;re a client, we might keep some information longer for legal or business purposes (like tax records), but we&apos;ll only keep what&apos;s necessary.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Third-Party Links
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our website might contain links to other websites. We&apos;re not responsible for their privacy practices, so please check their privacy policies if you&apos;re concerned. We only link to sites we trust, but it&apos;s always good to be aware.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our services are not intended for children under 18. We don&apos;t knowingly collect information from children. If you believe we&apos;ve accidentally collected information from a child, please let us know, and we&apos;ll delete it immediately.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We might update this policy from time to time. If we make significant changes, we&apos;ll notify you by email or through a notice on our website. The &quot;Last updated&quot; date at the bottom will tell you when this policy was last revised.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions about this privacy policy or how we handle your information, we&apos;d love to hear from you. We&apos;re committed to being transparent and helpful.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You can reach us at:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6 mt-4">
              <li>• Email: <a href="mailto:hello@shahworks.com" className="text-primary-600 dark:text-primary-400 hover:underline">hello@shahworks.com</a></li>
              <li>• Phone: <a href="tel:+919090702707" className="text-primary-600 dark:text-primary-400 hover:underline">+91 9090702707</a></li>
              <li>• Address: E Block, Shiv Ram Park, Nangloi, New Delhi-110041</li>
            </ul>
          </Card>

          <Card>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}

