import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageAssignments = [
  {
    productHandle: 'tower-lineman-safety-harness',
    imageUrl: '/images/products/WH-TLSH-1.jpg',
    alt: 'Tower Lineman Safety Harness - Professional grade safety equipment for electrical workers'
  },
  {
    productHandle: 'oil-rigging-chemical-safety-harness', 
    imageUrl: '/images/products/WH-ORFF-CSFH-1.jpg',
    alt: 'Oil Rigging Chemical Safety Harness - Flash fire and chemical resistant protection'
  },
  {
    productHandle: 'rescue-command-tactical-harness',
    imageUrl: '/images/products/WH-RCH-21-1.jpg', 
    alt: 'Rescue Command Tactical Harness - Advanced tactical vest with integrated safety system'
  },
  {
    productHandle: 'professional-riggers-belt',
    imageUrl: '/images/products/WH-WRB-1.jpg',
    alt: 'Professional Riggers Belt - Heavy-duty 7000-lb rated rigging belt'
  }
];

async function main() {
  console.log('🖼️  Assigning legacy images to products...');
  
  for (const assignment of imageAssignments) {
    try {
      // Find the product
      const product = await prisma.product.findUnique({
        where: { handle: assignment.productHandle }
      });
      
      if (!product) {
        console.log(`❌ Product not found: ${assignment.productHandle}`);
        continue;
      }
      
      // Create the image record
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: assignment.imageUrl,
          alt: assignment.alt,
          sort: 0
        }
      });
      
      console.log(`✅ Assigned image to: ${product.title}`);
      
    } catch (error) {
      console.log(`❌ Error assigning image to ${assignment.productHandle}:`, error.message);
    }
  }
  
  console.log('\n🎉 Legacy image assignment completed!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
