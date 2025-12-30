import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <div className="pt-20">
      <Section className="bg-gradient-to-br from-primary-50 dark:from-primary-900/20 via-white dark:via-gray-900 to-indigo-50 dark:to-indigo-900/20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We believe in transparency and clear communication. Here&apos;s everything you need to know about working with us.
          </p>
        </div>
      </Section>

      <Section className="bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert max-w-none">
          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Shah Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing and using our services, you&apos;re agreeing to these terms. We&apos;ve tried to keep this as simple and clear as possible, but if you have any questions, feel free to reach out to us. We&apos;re here to help!
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We provide web development, software solutions, and digital design services. Each project is unique, and we work closely with you to understand your needs and deliver exactly what you&apos;re looking for.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We&apos;re committed to delivering high-quality work that meets your expectations. If something isn&apos;t right, we&apos;ll work with you to make it perfect.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. Project Agreements
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Before we start any work, we&apos;ll provide you with a detailed project proposal that outlines:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• What we&apos;ll be building for you</li>
              <li>• Timeline and milestones</li>
              <li>• Pricing and payment terms</li>
              <li>• What&apos;s included (and what&apos;s not)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Once you approve the proposal, that becomes our agreement. We&apos;ll stick to it, and we expect the same from you. Fair is fair!
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. Payment Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We typically work with a payment structure that makes sense for both of us:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Initial deposit to get started (usually 30-50%)</li>
              <li>• Milestone payments as we progress</li>
              <li>• Final payment upon project completion</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              All payments are due within the timeframe specified in your project agreement. We accept various payment methods, and we&apos;ll send you invoices that are clear and easy to understand.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Once you&apos;ve paid in full, the work we create for you is yours. You own it, and you can do whatever you want with it. We&apos;re proud of what we build, so we might ask to showcase it in our portfolio, but we&apos;ll always ask for your permission first.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We retain the right to use any general knowledge, skills, and techniques we&apos;ve developed (which is pretty standard in our industry).
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Revisions & Changes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We want you to love what we create! That&apos;s why we include reasonable revisions in our proposals. If you need changes beyond what we&apos;ve agreed on, we&apos;ll discuss it with you first and agree on any additional costs.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Major changes to the project scope might affect the timeline and cost, but we&apos;ll always be upfront about that. No surprises!
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Timeline & Delays
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We work hard to meet deadlines, and we&apos;ll keep you updated on our progress. Sometimes things happen that are out of our control (like waiting for content from you, third-party delays, or technical issues), and that might affect timelines.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We&apos;ll communicate with you if there are any delays and work together to find solutions. Good communication is key to a successful project!
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Cancellation & Refunds
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We hope it never comes to this, but if you need to cancel a project, here&apos;s how it works:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• You&apos;ll be responsible for payment for work completed up to the cancellation date</li>
              <li>• Any deposits are non-refundable (they help us cover initial planning and setup costs)</li>
              <li>• We&apos;ll hand over any completed work to you</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              If we need to cancel (which is extremely rare), we&apos;ll refund any payments for work not yet completed.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Our Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We promise to:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Deliver work that meets professional standards</li>
              <li>• Communicate clearly and regularly</li>
              <li>• Respect your deadlines (as long as you respect ours)</li>
              <li>• Keep your information confidential</li>
              <li>• Be honest and transparent about everything</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Your Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              To help us do our best work, we need you to:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-6">
              <li>• Provide accurate information and content when needed</li>
              <li>• Give timely feedback on our work</li>
              <li>• Make payments as agreed</li>
              <li>• Let us know if something isn&apos;t working for you</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We&apos;re professionals, and we stand behind our work. However, our liability is limited to the amount you&apos;ve paid us for the specific project. We&apos;re not responsible for indirect damages or losses that might result from using our work.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              11. Changes to These Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We might update these terms from time to time. If we make significant changes, we&apos;ll let you know. The terms that apply to your project are the ones that were in place when we started working together.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              12. Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If anything here is unclear, or if you have questions, please don&apos;t hesitate to reach out. We&apos;re here to help, and we believe in building relationships, not just websites.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You can contact us at <a href="mailto:hello@shahworks.com" className="text-primary-600 dark:text-primary-400 hover:underline">hello@shahworks.com</a> or call us at <a href="tel:+919090702707" className="text-primary-600 dark:text-primary-400 hover:underline">+91 9090702707</a>.
            </p>
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

