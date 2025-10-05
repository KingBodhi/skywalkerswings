"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  readTime: string | null;
  featuredImage: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'ARCHIVED';
  author: string;
  publishedAt: string | null;
  createdAt: string;
};

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogPost();
  }, [params.id]);

  async function fetchBlogPost() {
    try {
      const response = await fetch(`/api/admin/blog/${params.id}`);
      if (response.ok) {
        const postData = await response.json();
        setPost(postData);
        setFeaturedImage(postData.featuredImage ? [postData.featuredImage] : []);
      } else {
        console.error('Failed to fetch blog post');
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      router.push('/admin/blog');
    } finally {
      setLoading(false);
    }
  }

  async function savePost() {
    if (!post || !post.title || !post.slug) {
      alert('Please fill in required fields');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          featuredImage: featuredImage[0] || null
        })
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        alert('Blog post updated successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update blog post');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">❌</div>
          <div className="font-semibold text-primary-600 mb-2">Blog post not found</div>
          <div className="text-neutral-600 mb-4">The requested blog post could not be found.</div>
          <Link
            href="/admin/blog"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600">Edit Blog Post</h1>
          <p className="text-neutral-600">Update safety insights and company content</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
            <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Post Content</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({
                    ...post,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                  })}
                  placeholder="Enter blog post title"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => setPost({...post, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  placeholder="blog-post-url-slug"
                  className="admin-input"
                  required
                />
                <div className="text-sm text-neutral-500 mt-1">
                  URL: /blog/{post.slug || 'post-slug'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={post.excerpt || ''}
                  onChange={(e) => setPost({...post, excerpt: e.target.value})}
                  placeholder="Brief description of the post..."
                  rows={3}
                  className="admin-textarea"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={post.category || ''}
                  onChange={(e) => setPost({...post, category: e.target.value})}
                  placeholder="e.g. Technology, Safety, Training"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={post.readTime || ''}
                  onChange={(e) => setPost({...post, readTime: e.target.value})}
                  placeholder="e.g. 5 min read"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Content *
                </label>
                <textarea
                  value={post.content}
                  onChange={(e) => setPost({...post, content: e.target.value})}
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="admin-textarea"
                  required
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Supports HTML formatting
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-primary-600 mb-4">Publish Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Status
                </label>
                <select
                  value={post.status}
                  onChange={(e) => setPost({...post, status: e.target.value as any})}
                  className="admin-select"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setPost({...post, publishedAt: e.target.value ? new Date(e.target.value).toISOString() : null})}
                  className="admin-input"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Leave empty to publish immediately
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost({...post, author: e.target.value})}
                  placeholder="Author name"
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-primary-600 mb-4">Featured Image</h3>

            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              maxFiles={1}
            />
            <div className="text-sm text-neutral-500 mt-2">
              Upload a featured image for this blog post
            </div>
          </div>

          {/* Post Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-primary-600 mb-4">Post Info</h3>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-primary-600">Created:</span>
                <br />
                {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
              </div>
              <div>
                <span className="font-semibold text-primary-600">Post ID:</span>
                <br />
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{post.id}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          href="/admin/blog"
          className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors font-medium"
        >
          Cancel
        </Link>
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          className="border border-primary-600 text-primary-600 px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors font-medium"
        >
          Preview
        </Link>
        <button
          onClick={savePost}
          disabled={saving || !post.title || !post.slug}
          className="bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}