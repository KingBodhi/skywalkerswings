import Section from "../../../components/Section";
import Link from "next/link";

export default function TrainerResourcesPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <nav className="text-sm text-neutral-600 mb-6">
              <Link href="/support" className="hover:text-primary-600">Support</Link>
              <span className="mx-2">→</span>
              <span>Train-the-Trainer Materials</span>
            </nav>
            
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">
              Train-the-Trainer Materials
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Comprehensive resources for safety professionals who train others on fall protection equipment and procedures.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-4">Coming Soon</h2>
              <p className="text-primary-700 mb-6">
                We're developing comprehensive train-the-trainer materials including:
              </p>
              <ul className="space-y-2 text-primary-700">
                <li>• Instructor certification programs</li>
                <li>• Training presentation templates</li>
                <li>• Assessment and evaluation tools</li>
                <li>• Safety demonstration videos</li>
                <li>• Equipment inspection checklists</li>
              </ul>
            </div>

            <div className="text-center">
              <Link 
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Contact Our Training Team
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
