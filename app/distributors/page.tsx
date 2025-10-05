import Section from "../../components/Section";
import Link from "next/link";

export default function Page(){
  return (<>
    <Section center title="Distributors" subtitle="We partner with specialists across application classes.">
      <div className="mx-auto max-w-3xl text-neutral-700 dark:text-neutral-300 space-y-4">
        <p>We are building a focused distributor network for three product families. If your organization serves these communities and values safety, training, and long-term support, we’d love to talk.</p>
        <div className="pt-4">
          <Link href="/licensing" className="inline-flex items-center rounded-xl bg-accent-500 hover:bg-accent-600 px-6 py-3 text-white font-semibold transition-colors">Apply via Licensing</Link>
        </div>
      </div>
    </Section>
    <Section>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-neutral-100"><img src="/images/apps/military.svg" alt="Military" className="h-full w-full object-cover"/></div>
          <div className="p-6"><div className="font-display font-bold text-primary-600">Military & Tactical</div><p className="text-sm text-neutral-600">Low-signature, posture-protective designs for high-mobility operations.</p></div>
        </div>
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-neutral-100"><img src="/images/apps/construction.svg" alt="Construction" className="h-full w-full object-cover"/></div>
          <div className="p-6"><div className="font-display font-bold text-primary-600">Construction & Industrial</div><p className="text-sm text-neutral-600">Jobsite-ready fall protection designed to mitigate suspension trauma.</p></div>
        </div>
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-neutral-100"><img src="/images/apps/recreation.svg" alt="Recreation" className="h-full w-full object-cover"/></div>
          <div className="p-6"><div className="font-display font-bold text-primary-600">Recreation & Sports</div><p className="text-sm text-neutral-600">Ergonomic, circulation-conscious designs for recreational and adventure use.</p></div>
        </div>
      </div>
    </Section>
  </>);
}
