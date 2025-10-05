import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
        status: 'ACTIVE'
      }
    });

    if (!post) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Only return published posts
    if (post.publishedAt && post.publishedAt > new Date()) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return Response.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}