import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    });

    if (!post) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return Response.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    // Check if slug already exists (excluding current post)
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id: params.id }
      }
    });

    if (existing) {
      return Response.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    // Update the blog post
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        readTime,
        featuredImage,
        status,
        publishedAt: publishAt ? new Date(publishAt) : status === 'PUBLISHED' ? new Date() : null
      }
    });

    console.log('Blog post updated:', {
      postId: post.id,
      title: post.title,
      updatedBy: session.email,
      status: post.status
    });

    return Response.json(post);
  } catch (error) {
    console.error('Blog post update error:', error);
    return Response.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!session || session.role !== 'ADMIN') {
      return Response.json({ error: 'Admin access required' }, { status: 401 });
    }

    await prisma.blogPost.delete({
      where: { id: params.id }
    });

    console.log('Blog post deleted:', {
      postId: params.id,
      deletedBy: session.email
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return Response.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}