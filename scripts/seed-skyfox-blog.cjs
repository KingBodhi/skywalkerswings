#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const posts = require(path.resolve(__dirname, '../data/blog-posts.json'));

const prisma = new PrismaClient();

(async () => {
  const slugs = posts.map((post) => post.slug);

  console.log('🧹 Removing legacy blog posts...');
  await prisma.blogPost.deleteMany({
    where: {
      slug: { notIn: slugs }
    }
  });

  console.log('📝 Upserting SkyFox blog library...');
  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        featuredImage: post.featuredImage,
        status: post.status,
        author: post.author,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTime: post.readTime,
        featuredImage: post.featuredImage,
        status: post.status,
        author: post.author,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null
      }
    });
    console.log(`✓ ${post.slug}`);
  }

  await prisma.$disconnect();
  console.log('✅ SkyFox blog library synced.');
})().catch(async (err) => {
  console.error('❌ Blog seeding failed:', err);
  await prisma.$disconnect();
  process.exit(1);
});
