#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function loadPosts() {
  const filePath = path.resolve(__dirname, '../data/blog-posts.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normaliseDate(date) {
  return new Date(date);
}

(async () => {
  const connectionString = process.env.DEPLOY_DATABASE_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Set DEPLOY_DATABASE_URL (or DATABASE_URL) to your deployment database connection string.');
    process.exit(1);
  }

  const posts = loadPosts();

  const client = new Client({ connectionString });
  await client.connect();
  await client.query('BEGIN');
  try {
    await client.query('DELETE FROM "BlogPost";');
    for (const post of posts) {
      await client.query(
        'INSERT INTO "BlogPost" ("id", "title", "slug", "excerpt", "content", "category", "readTime", "featuredImage", "status", "author", "publishedAt", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',
        [
          post.id,
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.category,
          post.readTime,
          post.featuredImage,
          post.status,
          post.author,
          normaliseDate(post.publishedAt),
          normaliseDate(post.createdAt),
          normaliseDate(post.updatedAt)
        ]
      );
    }
    await client.query('COMMIT');
    console.log('✅ Deployment blog posts updated.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to update deployment blog posts.');
    console.error(err);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
