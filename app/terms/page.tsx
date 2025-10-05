import Section from "../../components/Section";

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">Terms of Service</h1>
          <p className="text-lg text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>

            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">Product Safety</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              All safety equipment must be used in accordance with manufacturer instructions and 
              applicable safety standards. Proper training and inspection are required.
            </p>

            <h2 className="font-display text-2xl font-bold text-primary-600 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              In no event shall Skywalker Unlimited be liable for any direct, indirect, punitive, 
              incidental, special, or consequential damages.
            </p>

            <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 mt-8">
              <h3 className="font-display text-xl font-bold text-danger-800 mb-3">Safety Equipment Disclaimer</h3>
              <p className="text-danger-700">
                This safety equipment is designed for use by trained professionals only. 
                Improper use can result in serious injury or death. Users must be properly 
                trained and equipment must be inspected before each use.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}