import React from "react";

const TermsOfService: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 text-slate-800">
    <h1 className="text-4xl font-bold mb-6 text-blue-700">BuffByte Terms of Service</h1>
    <p className="mb-4">Last updated: August 26, 2025</p>
    <p className="mb-6">Welcome to BuffByte! By accessing or using our platform, you agree to these Terms of Service ("Terms"). Please read them carefully.</p>
    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of BuffByte</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>You must be at least 13 years old to use BuffByte.</li>
      <li>You agree to provide accurate information when creating an account.</li>
      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
      <li>You may not use BuffByte for any unlawful or prohibited purpose.</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Content & Intellectual Property</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>You retain ownership of content you submit for analysis.</li>
      <li>By submitting content, you grant BuffByte a license to process and analyze it for platform features.</li>
      <li>BuffByte’s platform, design, and analytics are protected by copyright and intellectual property laws.</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Privacy</h2>
    <p className="mb-6">Your use of BuffByte is also governed by our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>.</p>
    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Termination</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>We may suspend or terminate your account if you violate these Terms or misuse the platform.</li>
      <li>You may delete your account at any time.</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimers & Limitation of Liability</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>BuffByte is provided "as is" without warranties of any kind.</li>
      <li>We are not liable for any damages resulting from your use of BuffByte.</li>
      <li>Analytics and insights are provided for informational purposes only.</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
    <p className="mb-6">We may update these Terms. Changes will be posted on this page with a revised date.</p>
    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
    <p className="mb-6">For questions about these Terms, contact <a href="mailto:support@buffbyte.com" className="text-blue-600 underline">support@buffbyte.com</a>.</p>
  </div>
);

export default TermsOfService;
