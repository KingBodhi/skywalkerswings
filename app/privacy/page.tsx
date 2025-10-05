import Section from "../../components/Section";

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">Privacy Policy</h1>
          <p className="text-lg text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">Information We Collect</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>

            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, and communicate with you.
            </p>

            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">Information Sharing</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mt-8">
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Contact Us</h3>
              <p className="text-primary-700">
                If you have questions about this privacy policy, please contact us at:
                <br />
                <strong>privacy@skywalker.com</strong> or <strong>1-800-SKYWALKER</strong>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}