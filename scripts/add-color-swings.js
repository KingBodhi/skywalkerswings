const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

const PRICE = 49500; // cents
const DEFAULT_QUANTITY = 8;

const BASE_DESCRIPTION = `Deluxe Faux Fur Swings wrap adult indulgence in engineered confidence, pairing plush, electric faux fur with aerospace-grade nylon webbing for a suspension experience that stays whisper-soft and unshakeably strong.

- Long-life comfort: premium nylon webbing outperforms polyester in both strength and hand-feel, holding its supple drape even after countless sessions.
- Engineered to reassure: every strand is rated at 3,500 lbs and anchored by six 1,000 lb webbing adjusters, so the swing locks into position without stretching or sagging.
- Redundant security: 18 precision stitch points are sewn to a 4,000 lb spec, distributing force evenly through the frame for calm, quiet motion.
- Certified performance: the build is tested to 5,000 lbs, yet we recommend a maximum 500 lb live load—up to two adults—to align with manufacturer guidance and keep every hang silky-smooth.
- Effortless installation: hardware integrates cleanly with SkyFox suspension systems, delivering a floating faux-fur haven that’s as easy to trust as it is to adore.`;

const products = [
  {
    title: 'Candy Floss: Deluxe Faux Fur Swing',
    handle: 'candy-floss-swing',
    colorNote: 'Hot pink ostrich exterior with bright pink faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-CF-495',
    images: [
      { url: '/uploads/candy-floss-1.png', alt: 'Candy Floss swing with hot pink ostrich exterior' },
      { url: '/uploads/candy-floss-2.png', alt: 'Candy Floss swing with bright pink faux fur interior' }
    ]
  },
  {
    title: 'Blue Rainbow: Deluxe Faux Fur Swing',
    handle: 'blue-rainbow-swing',
    colorNote: 'Electric blue fluorescent exterior with frosty blue faux fur lining',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-BR-495',
    images: [
      { url: '/uploads/blue-rainbow-1.png', alt: 'Blue Rainbow swing with electric blue exterior' },
      { url: '/uploads/blue-rainbow-2.png', alt: 'Blue Rainbow swing with light blue faux fur interior' }
    ]
  },
  {
    title: 'HoneyBee Express: Deluxe Faux Fur Swing',
    handle: 'honeybee-express-swing',
    colorNote: 'Matte black exterior with high-impact yellow faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-HB-495',
    images: [
      { url: '/uploads/honeybee-express-1.png', alt: 'HoneyBee Express swing with black exterior' },
      { url: '/uploads/honeybee-express-2.png', alt: 'HoneyBee Express swing with yellow faux fur interior' }
    ]
  },
  {
    title: 'Red Velvet: Deluxe Faux Fur Swing',
    handle: 'red-velvet-swing',
    colorNote: 'Crimson smooth exterior with matching plush faux fur core',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-RV-495',
    images: [
      { url: '/uploads/red-velvet-1.png', alt: 'Red Velvet swing with crimson exterior' },
      { url: '/uploads/red-velvet-2.png', alt: 'Red Velvet swing with red faux fur interior' }
    ]
  },
  {
    title: 'Caramel Cream: Deluxe Faux Fur Swing',
    handle: 'caramel-cream-swing',
    colorNote: 'Warm khaki exterior with toasted brown faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-CC-495',
    images: [
      { url: '/uploads/caramel-cream-1.png', alt: 'Caramel Cream swing with khaki exterior' },
      { url: '/uploads/caramel-cream-2.png', alt: 'Caramel Cream swing with brown faux fur interior' }
    ]
  },
  {
    title: 'Kiwi Stars: Deluxe Faux Fur Swing',
    handle: 'kiwi-stars-swing',
    colorNote: 'Lime green glitter exterior with soft green faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-KS-495',
    images: [
      { url: '/uploads/kiwi-stars-1.png', alt: 'Kiwi Stars swing with green glitter exterior' },
      { url: '/uploads/kiwi-stars-2.png', alt: 'Kiwi Stars swing with green faux fur interior' }
    ]
  },
  {
    title: 'Brandy Snap: Deluxe Faux Fur Swing',
    handle: 'brandy-snap-swing',
    colorNote: 'Midnight black exterior with leopard faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-BS-495',
    images: [
      { url: '/uploads/brandy-snap-1.png', alt: 'Brandy Snap swing with black exterior' },
      { url: '/uploads/brandy-snap-2.png', alt: 'Brandy Snap swing with leopard faux fur interior' }
    ]
  },
  {
    title: 'Orange Crush: Deluxe Faux Fur Swing',
    handle: 'orange-crush-swing',
    colorNote: 'Neon orange exterior with saturated orange faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-OC-495',
    images: [
      { url: '/uploads/orange-crush-1.png', alt: 'Orange Crush swing with neon orange exterior' },
      { url: '/uploads/orange-crush-2.png', alt: 'Orange Crush swing with orange faux fur interior' }
    ]
  },
  {
    title: 'Purple Crush: Deluxe Faux Fur Swing',
    handle: 'purple-crush-swing',
    colorNote: 'Violet glitter exterior with deep plum faux fur interior',
    description: BASE_DESCRIPTION,
    sku: 'SW-SWG-PC-495',
    images: [
      { url: '/uploads/purple-crush-1.png', alt: 'Purple Crush swing with purple glitter exterior' },
      { url: '/uploads/purple-crush-2.png', alt: 'Purple Crush swing with plum faux fur interior' }
    ]
  }
];

async function main() {
  try {
    const swingCollection = await prisma.collection.findUnique({ where: { handle: 'swings' } });
    if (!swingCollection) {
      throw new Error('Swings collection not found.');
    }

    for (const product of products) {
      console.log(`\nProcessing ${product.title}...`);
      const upsertedProduct = await prisma.product.upsert({
        where: { handle: product.handle },
        update: {
          title: product.title,
          description: buildDescription(product.description, product.colorNote),
          status: Status.ACTIVE,
        },
        create: {
          title: product.title,
          handle: product.handle,
          description: buildDescription(product.description, product.colorNote),
          status: Status.ACTIVE,
        }
      });

      await prisma.productImage.deleteMany({ where: { productId: upsertedProduct.id } });
      for (const [index, image] of product.images.entries()) {
        await prisma.productImage.create({
          data: {
            productId: upsertedProduct.id,
            url: image.url,
            alt: image.alt,
            sort: index
          }
        });
      }

      const variant = await prisma.variant.upsert({
        where: { sku: product.sku },
        update: {
          price: PRICE,
          color: product.colorNote,
          isDefault: true,
        },
        create: {
          productId: upsertedProduct.id,
          sku: product.sku,
          price: PRICE,
          isDefault: true,
          color: product.colorNote,
        }
      });

      await prisma.inventoryLevel.upsert({
        where: { variantId: variant.id },
        update: { quantity: DEFAULT_QUANTITY },
        create: { variantId: variant.id, quantity: DEFAULT_QUANTITY }
      });

      await prisma.collectionProduct.upsert({
        where: {
          productId_collectionId: {
            productId: upsertedProduct.id,
            collectionId: swingCollection.id,
          }
        },
        update: {},
        create: {
          productId: upsertedProduct.id,
          collectionId: swingCollection.id,
        }
      });

      console.log(`  ✓ ${product.title} synced.`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

function buildDescription(base, colorNote) {
  return `${base}\n- Finish: ${colorNote}`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
