import Link from 'next/link';

import Section from '@/components/Section';
import blogPostsData from '@/data/blog-posts.json';

export const dynamic = 'force-dynamic';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  readTime: string | null;
  featuredImage: string | null;
  author: string;
  publishedAt: string | null;
  createdAt: string;
};

const blogPosts = blogPostsData as unknown as BlogPost[];

export default async function BlogPage() {
  const posts = blogPosts;
  const featuredPosts = posts.filter(post => post.slug === 'introducing-kinetic-fall-arrest').slice(0, 1);
  const regularPosts = posts.filter(post => post.slug !== 'introducing-kinetic-fall-arrest').slice(0, 11);

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      <Section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-display-1 font-bold text-primary-600 mb-4">
              Safety Insights & Research
            </h1>
            <p className="text-body-lg text-neutral-800 max-w-3xl mx-auto leading-relaxed">
              Expert insights on fall protection technology, industry standards, and safety best practices
              to keep your team protected on the job.
            </p>
          </div>

          {/* Featured Article */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold text-primary-600 mb-8">Featured Article</h2>
              <div className="card overflow-hidden lg:flex">
                <div className="lg:w-1/2 aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                  <img
                    src={featuredPosts[0].featuredImage || "/images/blog/kinetic.svg"}
                    alt={featuredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    {featuredPosts[0].category && (
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {featuredPosts[0].category}
                      </span>
                    )}
                    {featuredPosts[0].readTime && (
                      <span className="text-neutral-500 text-sm">{featuredPosts[0].readTime}</span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl font-bold text-primary-600 mb-4">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-neutral-800 mb-6 leading-relaxed text-lg">
                    {featuredPosts[0].excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPosts[0].slug}`}
                    className="inline-flex items-center text-accent-500 hover:text-accent-600 font-bold transition-colors"
                  >
                    Read Full Article
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Recent Articles */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-primary-600 mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group card overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                    <img
                      src={post.featuredImage || "/images/blog/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      {post.category && (
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="text-neutral-500 text-sm">{post.readTime}</span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-600 mb-3 group-hover:text-accent-500 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-neutral-800 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-accent-500 font-bold">
                      Read Article
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white p-8 lg:p-12 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Stay Updated on Safety</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest safety insights, industry updates, and product announcements delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}