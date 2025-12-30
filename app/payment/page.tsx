"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "bank">("card");
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="pt-20">
        <Section className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your payment. We&apos;ve received your transaction and will send you a confirmation email shortly.
            </p>
            <Button href="/" variant="primary">
              Return to Home
            </Button>
          </Card>
        </Section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Section className="bg-gradient-to-br from-primary-50 dark:from-primary-900/20 via-white dark:via-gray-900 to-indigo-50 dark:to-indigo-900/20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Secure Payment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your payment is secure and encrypted. We use industry-standard security to protect your information.
          </p>
        </div>
      </Section>

      <Section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Your payment is secured with 256-bit SSL encryption
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Amount *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9090702707"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Payment Method *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "upi"
                        ? "border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 text-2xl">📱</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "bank"
                        ? "border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 text-2xl">🏦</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Based on Method */}
              {paymentMethod === "card" && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    required
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        For bank transfers, please use the following details:
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p><strong>Account Name:</strong> Shah Works</p>
                        <p><strong>Account Number:</strong> [Provided upon request]</p>
                        <p><strong>IFSC Code:</strong> [Provided upon request]</p>
                        <p><strong>Bank Name:</strong> [Provided upon request]</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                        Please contact us at <a href="mailto:hello@shahworks.com" className="text-primary-600 dark:text-primary-400 hover:underline">hello@shahworks.com</a> for bank transfer details.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Acceptance */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-primary-600 dark:text-primary-400 border-gray-300 dark:border-gray-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "Processing Payment..."
                ) : (
                  <>
                    <Lock className="mr-2 w-4 h-4" />
                    Pay Securely
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Your Security is Our Priority
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All payments are processed through secure, encrypted channels. We never store your full card details on our servers. Your financial information is handled by trusted payment processors who comply with the highest security standards.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}

