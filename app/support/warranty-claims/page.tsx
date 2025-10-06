import Section from "../../../components/Section";
import Link from "next/link";

export default function WarrantyClaimsPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <nav className="text-sm text-neutral-600 mb-6">
              <Link href="/support" className="hover:text-primary-600">Support</Link>
              <span className="mx-2">→</span>
              <span>Warranty Claims</span>
            </nav>
            
            <h1 className="font-display text-5xl font-bold text-primary-600 mb-6">
              Warranty Claims
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              File warranty claims and get support for covered equipment issues.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-success-50 border border-success-200 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold text-success-800 mb-4">3-Year Warranty Coverage</h2>
              <p className="text-success-700 mb-6">
                All SkyFox equipment includes comprehensive warranty coverage. Our claims process will include:
              </p>
              <ul className="space-y-2 text-success-700">
                <li>• Online warranty registration</li>
                <li>• Claims submission portal</li>
                <li>• Status tracking system</li>
                <li>• Expedited replacement process</li>
                <li>• Technical evaluation services</li>
              </ul>
            </div>

            <div className="text-center">
              <Link 
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Start Warranty Claim
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
