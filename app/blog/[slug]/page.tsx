import Section from "../../../components/Section";
import Link from "next/link";

// Force dynamic rendering for individual blog posts
export const dynamic = 'force-dynamic';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  readTime: string | null;
  featuredImage: string | null;
  author: string;
  publishedAt: string | null;
  createdAt: string;
};

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    // Server-side: use full URL in production, localhost in development
    // Client-side: use relative URLs
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
      ? (process.env.NODE_ENV === 'production'
          ? 'https://skyfoxswings.com'
          : 'http://localhost:3001')
      : '';

    const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function Page({ params }:{ params:{ slug:string }}) {
  const post = await getPost(params.slug);
  if(!post) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
        <Section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold text-primary-600 mb-4">Article Not Found</h1>
            <p className="text-neutral-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-primary-600 transition-colors">Home</Link>
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="text-neutral-500 hover:text-primary-600 transition-colors">Blog</Link>
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-neutral-900 font-medium">{post.title}</span>
            </div>
          </nav>

          <article className="card overflow-hidden">
            {/* Hero Image */}
            {post.featuredImage && (
              <div className="aspect-[21/9] bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Article Content */}
            <div className="p-8 lg:p-12">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6">
                {post.category && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                )}
                {post.readTime && (
                  <span className="text-neutral-500 text-sm">{post.readTime}</span>
                )}
                {post.publishedAt && (
                  <span className="text-neutral-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-600 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-neutral-800 mb-8 leading-relaxed border-l-4 border-accent-500 pl-6 font-medium">
                  {post.excerpt}
                </p>
              )}

              {/* Article Body with forced dark text */}
              <div className="prose prose-lg max-w-none
                [&_p]:!text-gray-900 [&_p]:!leading-relaxed [&_p]:!mb-6
                [&_h1]:!text-blue-800 [&_h1]:!font-bold [&_h1]:!text-4xl [&_h1]:!mt-8 [&_h1]:!mb-4
                [&_h2]:!text-blue-800 [&_h2]:!font-bold [&_h2]:!text-3xl [&_h2]:!mt-8 [&_h2]:!mb-4
                [&_h3]:!text-blue-800 [&_h3]:!font-bold [&_h3]:!text-2xl [&_h3]:!mt-6 [&_h3]:!mb-3
                [&_h4]:!text-gray-900 [&_h4]:!font-bold [&_h4]:!text-xl [&_h4]:!mt-6 [&_h4]:!mb-3
                [&_li]:!text-gray-900 [&_li]:!leading-relaxed [&_li]:!mb-2
                [&_ul]:!text-gray-900 [&_ul]:!my-6 [&_ul]:!pl-8
                [&_ol]:!text-gray-900 [&_ol]:!my-6 [&_ol]:!pl-8
                [&_strong]:!text-blue-800 [&_strong]:!font-semibold
                [&_b]:!text-blue-800 [&_b]:!font-semibold
                [&_a]:!text-amber-600 [&_a]:!underline [&_a]:hover:!text-amber-700
                [&_blockquote]:!border-l-amber-500 [&_blockquote]:!border-l-4 [&_blockquote]:!pl-6 [&_blockquote]:!my-6 [&_blockquote]:!italic [&_blockquote]:!text-blue-800 [&_blockquote]:!bg-slate-50 [&_blockquote]:!p-6 [&_blockquote]:!rounded-lg
                [&_blockquote_p]:!text-blue-800 [&_blockquote_p]:!mb-0
                [&_code]:!bg-slate-100 [&_code]:!text-amber-600 [&_code]:!px-2 [&_code]:!py-1 [&_code]:!rounded [&_code]:!text-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-600 font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
