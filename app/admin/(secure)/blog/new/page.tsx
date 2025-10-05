"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    readTime: '',
    status: 'DRAFT',
    publishAt: ''
  });
  const [featuredImage, setFeaturedImage] = useState<string[]>([]);

  async function createPost() {
    if (!post.title || !post.slug) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          featuredImage: featuredImage[0] || null
        })
      });
      
      if (res.ok) {
        const newPost = await res.json();
        router.push(`/admin/blog/${newPost.id}`);
      } else {
        alert('Failed to create blog post');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
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
          <h1 className="font-display text-3xl font-bold text-primary-600">Create New Blog Post</h1>
          <p className="text-neutral-600">Share safety insights and company updates</p>
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
                  value={post.excerpt}
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
                  value={post.category}
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
                  value={post.readTime}
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
                  onChange={(e) => setPost({...post, status: e.target.value})}
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
                  value={post.publishAt}
                  onChange={(e) => setPost({...post, publishAt: e.target.value})}
                  className="admin-input"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Leave empty to publish immediately
                </div>
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

          {/* SEO */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-primary-600 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Meta Description
                </label>
                <textarea
                  placeholder="Brief description for search engines..."
                  rows={3}
                  className="admin-textarea"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  160 characters recommended
                </div>
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
        <button
          onClick={createPost}
          disabled={loading || !post.title || !post.slug}
          className="bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </div>
  );
}
