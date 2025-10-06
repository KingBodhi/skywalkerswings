#!/usr/bin/env node
/**
 * Seed script for SkyFox swing & harness catalog.
 *
 * Creates/upserts collections and products derived from the
 * "SkyFox Swings" requirements list supplied by the client.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const collections = [
  {
    title: 'Harnesses',
    handle: 'harnesses',
    description:
      'Premium body support systems engineered for aerial performance and safety.'
  },
  {
    title: 'Swings',
    handle: 'swings',
    description:
      'Aerial and yoga swings designed for comfort, control, and crowd-pleasing visuals.'
  },
  {
    title: 'Rigging & Hardware',
    handle: 'rigging-hardware',
    description:
      'Load-rated straps, connectors, and hardware required for safe aerial installations.'
  },
  {
    title: 'Bungee & Motion Systems',
    handle: 'bungee-motion',
    description:
      'Dynamic motion kits and components that add bounce and rotation to the experience.'
  },
  {
    title: 'Bags & Storage',
    handle: 'bags-storage',
    description:
      'Purpose-built storage solutions that protect SkyFox gear in transit and on site.'
  },
  {
    title: 'Ambience & Extras',
    handle: 'ambience-extras',
    description:
      'Finishing touches and complementary gear to elevate the full SkyFox installation.'
  }
];

const products = [
  {
    title: 'Standard Black Harness',
    status: 'ACTIVE',
    price: 29500,
    collectionHandle: 'harnesses',
    description:
      'Flagship SkyFox harness built in reinforced black nylon with secure body-contouring support for everyday aerial performances.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HAR-STD-BLK',
        price: 29500,
        color: 'Black',
        size: 'Adjustable',
        isDefault: true,
        inventory: 12
      }
    ]
  },
  {
    title: 'Deluxe Faux Fur Harness',
    status: 'ACTIVE',
    price: 34500,
    collectionHandle: 'harnesses',
    description:
      'Lux finish harness wrapped in plush faux fur panels, configurable in multiple colorways for themed performances.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HAR-DLX-FUR',
        price: 34500,
        color: 'Custom',
        size: 'Adjustable',
        isDefault: true,
        inventory: 10
      }
    ]
  },
  {
    title: 'Standard Swing with Spreader Bar',
    status: 'ACTIVE',
    price: 32000,
    collectionHandle: 'swings',
    description:
      'Classic SkyFox swing with integrated spreader bar for stable seated acts and secure aerial positioning.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-SWG-STD-SPR',
        price: 32000,
        color: 'Black',
        size: 'Standard',
        isDefault: true,
        inventory: 15
      }
    ]
  },
  {
    title: 'Deluxe Swing with Faux Fur',
    status: 'ACTIVE',
    price: 45000,
    collectionHandle: 'swings',
    description:
      'Premium swing outfitted with faux fur seat and trim, available in curated color selections for high-impact visuals.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-SWG-DLX-FUR',
        price: 45000,
        color: 'Custom',
        size: 'Standard',
        isDefault: true,
        inventory: 10
      }
    ]
  },
  {
    title: 'Acro Yoga Swing',
    status: 'ACTIVE',
    price: 28000,
    collectionHandle: 'swings',
    description:
      'Multi-loop aerial yoga swing tailored for acro conditioning, inversions, and choreographed flow work.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-SWG-ACRO',
        price: 28000,
        color: 'Midnight',
        size: 'One Size',
        isDefault: true,
        inventory: 18
      }
    ]
  },
  {
    title: 'SkyFox Bungee Cord Set',
    status: 'ACTIVE',
    price: 36000,
    collectionHandle: 'bungee-motion',
    description:
      'Matched bungee cord kit engineered for SkyFox rigs, delivering responsive lift and rebound dynamics.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-BNG-SET',
        price: 36000,
        size: 'Standard Kit',
        isDefault: true,
        inventory: 8
      }
    ]
  },
  {
    title: 'Storage & Transportation Bag',
    status: 'ACTIVE',
    price: 12000,
    collectionHandle: 'bags-storage',
    description:
      'Heavy-duty travel bag sized for SkyFox swings and harnesses, with padded panels to safeguard gear on the move.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-BAG-TRNS',
        price: 12000,
        size: 'One Size',
        isDefault: true,
        inventory: 20
      }
    ]
  },
  {
    title: 'Padded Traditional Swing with Boards',
    status: 'ACTIVE',
    price: 38000,
    collectionHandle: 'swings',
    description:
      'Traditional board swing upgraded with SkyFox padding, available with color-custom upholstery and integrated spreader bar.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-SWG-PAD-BRD',
        price: 38000,
        color: 'Custom',
        size: 'Standard Board',
        isDefault: true,
        inventory: 12
      }
    ]
  },
  {
    title: 'Adjustable 1,000 lb Suspension Strap',
    status: 'ACTIVE',
    price: 7500,
    collectionHandle: 'rigging-hardware',
    description:
      'Load-rated adjustable strap pair engineered for aerial setups up to 1,000 lb working load.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-STR-1000-S',
        price: 7500,
        size: 'Small',
        isDefault: true,
        inventory: 30
      },
      {
        sku: 'SW-STR-1000-L',
        price: 8900,
        size: 'Large',
        inventory: 24
      }
    ]
  },
  {
    title: 'Adjustable 5,000 lb Suspension Strap',
    status: 'ACTIVE',
    price: 12500,
    collectionHandle: 'rigging-hardware',
    description:
      'Industrial-grade adjustable strap pair rated for 5,000 lb loads, ideal for premium permanent installations.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-STR-5000-S',
        price: 12500,
        size: 'Small',
        isDefault: true,
        inventory: 16
      },
      {
        sku: 'SW-STR-5000-L',
        price: 14900,
        size: 'Large',
        inventory: 12
      }
    ]
  },
  {
    title: 'Aluminum Suspension Swivel',
    status: 'ACTIVE',
    price: 8900,
    collectionHandle: 'rigging-hardware',
    description:
      '360° aircraft-grade aluminum swivel to eliminate line twist and deliver smooth aerial rotation.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HDW-SWVL',
        price: 8900,
        size: 'Single',
        isDefault: true,
        inventory: 25
      }
    ]
  },
  {
    title: 'Suspension Spring 300 lb',
    status: 'ACTIVE',
    price: 6900,
    collectionHandle: 'rigging-hardware',
    description:
      'Shock-absorbing inline spring rated to 300 lb for gentle motion and load buffering.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HDW-SPR300',
        price: 6900,
        size: 'Single',
        isDefault: true,
        inventory: 30
      }
    ]
  },
  {
    title: 'Aluminum Locking Carabiner',
    status: 'ACTIVE',
    price: 2900,
    collectionHandle: 'rigging-hardware',
    description:
      'Auto-lock aluminum carabiner selected for SkyFox aerial rigs with smooth gate action and high load rating.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HDW-CBNR',
        price: 2900,
        size: 'Single',
        isDefault: true,
        inventory: 50
      }
    ]
  },
  {
    title: 'Threaded Suspension Locking Ring',
    status: 'ACTIVE',
    price: 1900,
    collectionHandle: 'rigging-hardware',
    description:
      'Threaded quick-link ring providing redundant locking security for suspension rigs.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HDW-QLINK',
        price: 1900,
        size: 'Single',
        isDefault: true,
        inventory: 50
      }
    ]
  },
  {
    title: 'Swing Saddle Bag with Multi Pouch',
    status: 'ACTIVE',
    price: 12900,
    collectionHandle: 'bags-storage',
    description:
      'Modular saddle bag that mounts to SkyFox swings, adding quick-access storage pouches for props and tools.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-BAG-SDL',
        price: 12900,
        size: 'One Size',
        isDefault: true,
        inventory: 18
      }
    ]
  },
  {
    title: 'LED Fluorescent Light Tubing',
    status: 'ACTIVE',
    price: 15900,
    collectionHandle: 'ambience-extras',
    description:
      'Battery-powered LED tubing (batteries sold separately) for illuminating SkyFox rigs with vibrant glow.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-LED-TUBE',
        price: 15900,
        size: '4 ft',
        isDefault: true,
        inventory: 22
      }
    ]
  },
  {
    title: 'Yoga Mat Roll-Up with Carry Handle',
    status: 'ACTIVE',
    price: 4900,
    collectionHandle: 'ambience-extras',
    description:
      'Supportive mat ideal for floor warmups and acro prep, finished with a roll-up carry handle for travel.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-YGA-MAT',
        price: 4900,
        color: 'Charcoal',
        size: 'Standard',
        isDefault: true,
        inventory: 40
      }
    ]
  },
  {
    title: 'Large Hat Storage Bag',
    status: 'ACTIVE',
    price: 8900,
    collectionHandle: 'bags-storage',
    description:
      'Oversized storage bag tailored for dramatic costume headwear and accessories.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-BAG-HAT',
        price: 8900,
        size: 'Large',
        isDefault: true,
        inventory: 20
      }
    ]
  },
  {
    title: 'Tree Anchor Strap',
    status: 'ACTIVE',
    price: 10900,
    collectionHandle: 'rigging-hardware',
    description:
      'Protective tree anchor strap that creates secure overhead rigging points without damaging bark.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-STR-TREE',
        price: 10900,
        size: 'Adjustable',
        isDefault: true,
        inventory: 18
      }
    ]
  },
  {
    title: 'Spreader Bar',
    status: 'ACTIVE',
    price: 15900,
    collectionHandle: 'rigging-hardware',
    description:
      'Replacement spreader bar compatible with SkyFox swing systems for balanced load distribution.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HDW-SPRDR',
        price: 15900,
        size: 'Standard',
        isDefault: true,
        inventory: 15
      }
    ]
  },
  {
    title: 'Full Body Harness (PVC/Faux Leather)',
    status: 'ACTIVE',
    price: 49900,
    collectionHandle: 'harnesses',
    description:
      'Full-coverage SkyFox harness constructed in reinforced PVC or faux leather for immersive themed builds.',
    images: ['/images/skyfox-placeholder.png'],
    variants: [
      {
        sku: 'SW-HAR-FULL',
        price: 49900,
        color: 'Black',
        size: 'Adjustable',
        isDefault: true,
        inventory: 8
      }
    ]
  }
];



function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function upsertCollections() {
  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { handle: collection.handle },
      create: {
        title: collection.title,
        handle: collection.handle,
        description: collection.description,
        status: 'ACTIVE'
      },
      update: {
        title: collection.title,
        description: collection.description,
        status: 'ACTIVE'
      }
    });
  }
}

async function ensureProductImages(productRecord, productConfig) {
  if (!Array.isArray(productConfig.images) || productConfig.images.length === 0) {
    return;
  }

  for (const [index, url] of productConfig.images.entries()) {
    const existing = await prisma.productImage.findFirst({
      where: {
        productId: productRecord.id,
        url
      }
    });

    if (!existing) {
      await prisma.productImage.create({
        data: {
          productId: productRecord.id,
          url,
          alt: `${productConfig.title} placeholder image`,
          sort: index
        }
      });
    }
  }
}

async function upsertProducts() {
  for (const product of products) {
    const handle = slugify(product.title);
    const collection = await prisma.collection.findUnique({
      where: { handle: product.collectionHandle }
    });

    if (!collection) {
      throw new Error(`Collection ${product.collectionHandle} not found for product ${product.title}`);
    }

    const createdProduct = await prisma.product.upsert({
      where: { handle },
      create: {
        title: product.title,
        handle,
        description: product.description,
        status: product.status || 'DRAFT'
      },
      update: {
        title: product.title,
        description: product.description,
        status: product.status || 'DRAFT'
      }
    });

    await prisma.collectionProduct.upsert({
      where: {
        productId_collectionId: {
          productId: createdProduct.id,
          collectionId: collection.id
        }
      },
      update: {},
      create: {
        productId: createdProduct.id,
        collectionId: collection.id
      }
    });

    await ensureProductImages(createdProduct, product);

    for (const [index, variant] of product.variants.entries()) {
      const variantRecord = await prisma.variant.upsert({
        where: { sku: variant.sku },
        create: {
          productId: createdProduct.id,
          sku: variant.sku,
          price: variant.price ?? product.price ?? 0,
          compareAt: variant.compareAt ?? null,
          color: variant.color ?? null,
          size: variant.size ?? null,
          weightG: variant.weightG ?? null,
          dims: variant.dims ?? null,
          isDefault: index === 0 ? true : Boolean(variant.isDefault)
        },
        update: {
          price: variant.price ?? product.price ?? 0,
          compareAt: variant.compareAt ?? null,
          color: variant.color ?? null,
          size: variant.size ?? null,
          weightG: variant.weightG ?? null,
          dims: variant.dims ?? null,
          isDefault: index === 0 ? true : Boolean(variant.isDefault)
        }
      });

      if (variant.inventory !== undefined) {
        await prisma.inventoryLevel.upsert({
          where: { variantId: variantRecord.id },
          update: { quantity: variant.inventory },
          create: {
            variantId: variantRecord.id,
            quantity: variant.inventory,
            reserved: 0
          }
        });
      }
    }
  }
}

async function main() {
  try {
    await upsertCollections();
    await upsertProducts();
    console.log('✅ SkyFox swing catalog seeded successfully.');
  } catch (error) {
    console.error('❌ Failed to seed SkyFox swing catalog:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
