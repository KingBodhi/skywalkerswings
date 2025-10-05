const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const updates = require('./blog-updates');

async function main() {
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true, title: true }
    });
    const map = new Map(posts.map((p) => [p.slug, p.title]));
    const payload = updates.map((u) => ({
      slug: u.slug,
      title: map.get(u.slug) || '',
      imagePrompt: u.imagePrompt
    }));
    const outPath = path.join('data', 'blog-image-prompts.json');
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
    console.log(`Wrote ${payload.length} prompts to ${outPath}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
