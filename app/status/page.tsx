import Section from "@/components/Section";
import { prisma } from "@/lib/prisma";
export default async function Page(){
  const products = await prisma.product.count();
  const collections = await prisma.collection.count();
  return (<Section title="Status" center subtitle="Prisma connection check">
    <div className="mx-auto max-w-md card p-6 text-sm">
      <div>Products in DB: {products}</div>
      <div>Collections in DB: {collections}</div>
    </div>
  </Section>);
}
