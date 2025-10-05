import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding legacy products from WillHammer Industries...');

  // Read the legacy products data
  const dataPath = path.join(__dirname, '..', 'data', 'legacy-products.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Create collections first
  console.log('📁 Creating collections...');
  const collections = [];
  for (const collectionData of data.collections) {
    const collection = await prisma.collection.upsert({
      where: { handle: collectionData.handle },
      update: collectionData,
      create: collectionData
    });
    collections.push(collection);
    console.log(`✅ Collection: ${collection.title}`);
  }

  // Create products
  console.log('📦 Creating products...');
  for (const productData of data.products) {
    const { variants, features, ...productInfo } = productData;
    
    const product = await prisma.product.upsert({
      where: { handle: productData.handle },
      update: {
        ...productInfo,
        description: productInfo.description
      },
      create: {
        ...productInfo,
        description: productInfo.description
      }
    });

    // Create variants for this product
    for (const variantData of variants) {
      await prisma.variant.upsert({
        where: { sku: variantData.sku },
        update: {
          ...variantData,
          productId: product.id
        },
        create: {
          ...variantData,
          productId: product.id,
          inventory: {
            create: {
              quantity: Math.floor(Math.random() * 50) + 10, // Random stock 10-59
              location: 'warehouse-a'
            }
          }
        }
      });
    }

    // Assign to appropriate collection
    const collectionMapping = {
      'tower-lineman-safety-harness': 'construction',
      'oil-rigging-chemical-safety-harness': 'construction', 
      'rescue-command-tactical-harness': 'rescue',
      'fall-master-tech-harness': 'construction',
      'elite-rappelling-harness': 'recreation',
      'professional-riggers-belt': 'construction',
      'construction-duty-belt': 'construction',
      'rope-deployment-bag-300': 'rescue',
      'tactical-escape-belt': 'military'
    };

    const collectionHandle = collectionMapping[product.handle];
    if (collectionHandle) {
      const collection = collections.find(c => c.handle === collectionHandle);
      if (collection) {
        await prisma.collectionProduct.upsert({
          where: {
            productId_collectionId: {
              productId: product.id,
              collectionId: collection.id
            }
          },
          update: {},
          create: {
            productId: product.id,
            collectionId: collection.id
          }
        });
      }
    }

    console.log(`✅ Product: ${product.title} (${variants.length} variants)`);
  }

  console.log('🎉 Legacy product seeding completed!');
  console.log(`📊 Created ${data.products.length} products across ${data.collections.length} collections`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding legacy products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
