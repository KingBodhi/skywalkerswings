import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'ACTIVE',
        publishedAt: {
          lte: new Date()
        }
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        readTime: true,
        featuredImage: true,
        author: true,
        publishedAt: true,
        createdAt: true
      },
      orderBy: { publishedAt: 'desc' }
    });

    return Response.json(posts);
  } catch (error) {
    console.error('Public blog posts fetch error:', error);
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}