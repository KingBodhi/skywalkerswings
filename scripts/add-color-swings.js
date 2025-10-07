const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

const PRICE = 49500; // cents
const DEFAULT_QUANTITY = 8;

const products = [
  {
    title: 'Candy Floss Swing',
    handle: 'candy-floss-swing',
    colorNote: 'Hot pink ostrich exterior with bright pink faux fur interior',
    description: `Candy Floss brings the showgirl energy—rich hot pink ostrich grain on the outside, flooded with neon-pink faux fur cushioning on the inside. Reinforced webbing and hidden steel attachment points keep the look fierce and the ride secure for extended aerial sets.`,
    sku: 'SW-SWG-CF-495',
    images: [
      { url: '/uploads/candy-floss-1.png', alt: 'Candy Floss swing with hot pink ostrich exterior' },
      { url: '/uploads/candy-floss-2.png', alt: 'Candy Floss swing with bright pink faux fur interior' }
    ]
  },
  {
    title: 'Blue Rainbow Swing',
    handle: 'blue-rainbow-swing',
    colorNote: 'Electric blue fluorescent exterior with frosty blue faux fur lining',
    description: `Blue Rainbow is engineered for high-voltage performers who want a clean fluorescent glow. The slick electric-blue shell wipes down easily, while the frosted sky-blue fur interior tempers the edge with plush comfort. Built on our steel-core carriage rated for dynamic swings and spins.`,
    sku: 'SW-SWG-BR-495',
    images: [
      { url: '/uploads/blue-rainbow-1.png', alt: 'Blue Rainbow swing with electric blue exterior' },
      { url: '/uploads/blue-rainbow-2.png', alt: 'Blue Rainbow swing with light blue faux fur interior' }
    ]
  },
  {
    title: 'HoneyBee Express Swing',
    handle: 'honeybee-express-swing',
    colorNote: 'Matte black exterior with high-impact yellow faux fur interior',
    description: `HoneyBee Express marries a stealth matte-black shell with a burst of honeycomb-yellow fur inside. The contrast pops under stage wash while the padded seat holds performers through drops and tempo changes. Reinforced suspension tabs and moisture-resistant textiles keep the rig road-ready.`,
    sku: 'SW-SWG-HB-495',
    images: [
      { url: '/uploads/honeybee-express-1.png', alt: 'HoneyBee Express swing with black exterior' },
      { url: '/uploads/honeybee-express-2.png', alt: 'HoneyBee Express swing with yellow faux fur interior' }
    ]
  },
  {
    title: 'Red Velvet Swing',
    handle: 'red-velvet-swing',
    colorNote: 'Crimson smooth exterior with matching plush faux fur core',
    description: `Red Velvet layers a deep crimson performance vinyl outside with lush tone-on-tone fur inside for seductive texture. The chassis is double-stitched, the seat is memory foam backed, and the finish resists scuffs even under heavy hardware. Ideal for sultry spotlight acts and VIP lounges alike.`,
    sku: 'SW-SWG-RV-495',
    images: [
      { url: '/uploads/red-velvet-1.png', alt: 'Red Velvet swing with crimson exterior' },
      { url: '/uploads/red-velvet-2.png', alt: 'Red Velvet swing with red faux fur interior' }
    ]
  },
  {
    title: 'Caramel Cream Swing',
    handle: 'caramel-cream-swing',
    colorNote: 'Warm khaki exterior with toasted brown faux fur interior',
    description: `Caramel Cream delivers earthy sophistication with a warm khaki shell and toasted mocha fur lining. The muted palette works beautifully for upscale lounges while the Skyfox frame stays true with full stainless hardware, concealed seams, and industrial bartack reinforcements.`,
    sku: 'SW-SWG-CC-495',
    images: [
      { url: '/uploads/caramel-cream-1.png', alt: 'Caramel Cream swing with khaki exterior' },
      { url: '/uploads/caramel-cream-2.png', alt: 'Caramel Cream swing with brown faux fur interior' }
    ]
  },
  {
    title: 'Kiwi Stars Swing',
    handle: 'kiwi-stars-swing',
    colorNote: 'Lime green glitter exterior with soft green faux fur interior',
    description: `Kiwi Stars was designed for neon jungle sets—sparkling lime glitter outside, gradient green fur inside. The seat cradles with high-density foam and keeps performers centered with anti-slip quilting. Stainless welded D-rings are rated to commercial load requirements for touring installs.`,
    sku: 'SW-SWG-KS-495',
    images: [
      { url: '/uploads/kiwi-stars-1.png', alt: 'Kiwi Stars swing with green glitter exterior' },
      { url: '/uploads/kiwi-stars-2.png', alt: 'Kiwi Stars swing with green faux fur interior' }
    ]
  },
  {
    title: 'Brandy Snap Swing',
    handle: 'brandy-snap-swing',
    colorNote: 'Midnight black exterior with leopard faux fur interior',
    description: `Brandy Snap leans into nightlife flair—a jet-black shell trimmed with chartered leopard faux fur. We reinforced the seat base with aircraft plywood and wrapped the edges in marine binding so the fierce look holds up under load. Perfect for speakeasy builds and signature VIP swings.`,
    sku: 'SW-SWG-BS-495',
    images: [
      { url: '/uploads/brandy-snap-1.png', alt: 'Brandy Snap swing with black exterior' },
      { url: '/uploads/brandy-snap-2.png', alt: 'Brandy Snap swing with leopard faux fur interior' }
    ]
  },
  {
    title: 'Orange Crush Swing',
    handle: 'orange-crush-swing',
    colorNote: 'Neon orange exterior with saturated orange faux fur interior',
    description: `Orange Crush is built to command the room. The fluorescent citrus shell glows under UV while the saturated fur interior keeps talent locked in with cushion and grip. UV-stable textiles, sealed seams, and double-lock stitching make this a go-to for immersive festival builds.`,
    sku: 'SW-SWG-OC-495',
    images: [
      { url: '/uploads/orange-crush-1.png', alt: 'Orange Crush swing with neon orange exterior' },
      { url: '/uploads/orange-crush-2.png', alt: 'Orange Crush swing with orange faux fur interior' }
    ]
  },
  {
    title: 'Purple Crush Swing',
    handle: 'purple-crush-swing',
    colorNote: 'Violet glitter exterior with deep plum faux fur interior',
    description: `Purple Crush amps the drama with a violet glitter shell that catches every lighting cue, balanced by a plush plum fur cushion. The swing ships with powder-coated steel rings, discreet zipper access for cleaning, and our usual redundant anchor stitching for pro-grade reliability.`,
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
  return `${base}\n\n• Finish: ${colorNote}\n• Price includes stainless hanging hardware set\n• Rated working load: 600 lb dynamic / 900 lb static\n• Made by hand in the Skyfox studio`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
