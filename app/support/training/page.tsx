
import Section from "@/components/Section";
import Link from "next/link";

export default function SafetyTrainingPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <nav className="text-sm text-neutral-600 mb-6">
              <Link href="/support" className="hover:text-primary-600">Support</Link>
              <span className="mx-2">→</span>
              <span>Safety Training</span>
            </nav>
            
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">
              Safety Training
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Comprehensive training resources for fall protection equipment
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-8">
              <h3 className="font-display text-xl font-bold text-primary-600 mb-3">Content Coming Soon</h3>
              <p className="text-primary-700">
                We're developing comprehensive content for this section. 
                For immediate assistance, please contact our safety experts.
              </p>
            </div>

            <div className="text-center">
              <Link 
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
