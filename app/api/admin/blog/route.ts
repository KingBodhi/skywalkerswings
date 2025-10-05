import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return Response.json(posts);
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, category, readTime, featuredImage, status, publishAt } = body;

    // Validate required fields
    if (!title || !slug) {
      return Response.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Check if slug already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existing) {
      return Response.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        readTime,
        featuredImage,
        status,
        author: session.email || 'WillRise Team',
        publishedAt: publishAt ? new Date(publishAt) : status === 'PUBLISHED' ? new Date() : null
      }
    });

    console.log('Blog post created:', {
      postId: post.id,
      title: post.title,
      author: session.email,
      status: post.status
    });

    return Response.json(post);
  } catch (error) {
    console.error('Blog post creation error:', error);
    return Response.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}