const { PrismaClient } = require('@prisma/client');
const updates = require('./blog-updates');

async function main() {
  const prisma = new PrismaClient();
  try {
    for (const update of updates) {
      const data = {
        content: update.content,
        excerpt: update.excerpt
      };
      await prisma.blogPost.update({
        where: { slug: update.slug },
        data
      });
      console.log(`Updated ${update.slug}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
