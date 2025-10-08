"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewJobPostingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState({
    title: '',
    slug: '',
    department: '',
    location: '',
    type: 'FULL_TIME',
    salaryRange: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    status: 'DRAFT'
  });

  async function createJob() {
    if (!job.title || !job.slug || !job.department) {
      alert('Please fill in required fields (Title, Department)');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });

      if (res.status === 409) {
        const conflict = await res.json();
        alert(conflict.message || 'Another job already uses this URL slug.');
        return;
      }

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        alert(errorBody?.message || 'Failed to create job posting');
        return;
      }

      const result = await res.json();
      if (result.success) {
        router.push('/admin/careers');
      } else {
        alert(result.message || 'Failed to create job posting');
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
          href="/admin/careers"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600">Post New Job</h1>
          <p className="text-neutral-600">Create a new career opportunity</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
            <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Job Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={job.title}
                  onChange={(e) => setJob({
                    ...job,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                  })}
                  placeholder="e.g. Safety Engineer, Account Manager"
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
                  value={job.slug}
                  onChange={(e) => setJob({...job, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  placeholder="job-title-slug"
                  className="admin-input"
                  required
                />
                <div className="text-sm text-neutral-500 mt-1">
                  URL: /careers/{job.slug || 'job-slug'}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={job.department}
                    onChange={(e) => setJob({...job, department: e.target.value})}
                    placeholder="e.g. Engineering, Sales, Marketing"
                    className="admin-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => setJob({...job, location: e.target.value})}
                    placeholder="e.g. Remote, New York, NY"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={job.type}
                    onChange={(e) => setJob({...job, type: e.target.value})}
                    className="admin-select"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="REMOTE">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-600 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={job.salaryRange}
                    onChange={(e) => setJob({...job, salaryRange: e.target.value})}
                    placeholder="e.g. $60,000 - $80,000"
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Job Description
                </label>
                <textarea
                  value={job.description}
                  onChange={(e) => setJob({...job, description: e.target.value})}
                  placeholder="Describe the role and what makes it exciting..."
                  rows={6}
                  className="admin-textarea"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Key Responsibilities
                </label>
                <textarea
                  value={job.responsibilities}
                  onChange={(e) => setJob({...job, responsibilities: e.target.value})}
                  placeholder="• Responsibility 1&#10;• Responsibility 2&#10;• Responsibility 3"
                  rows={6}
                  className="admin-textarea"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Use bullet points (•) for better formatting
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Requirements & Qualifications
                </label>
                <textarea
                  value={job.requirements}
                  onChange={(e) => setJob({...job, requirements: e.target.value})}
                  placeholder="• Required skill 1&#10;• Required skill 2&#10;• Preferred qualification"
                  rows={6}
                  className="admin-textarea"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Include both required and preferred qualifications
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">
                  Benefits & Perks
                </label>
                <textarea
                  value={job.benefits}
                  onChange={(e) => setJob({...job, benefits: e.target.value})}
                  placeholder="• Health insurance&#10;• 401(k) matching&#10;• Flexible work hours"
                  rows={4}
                  className="admin-textarea"
                />
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
                  value={job.status}
                  onChange={(e) => setJob({...job, status: e.target.value})}
                  className="admin-select"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <div className="text-sm text-neutral-500 mt-1">
                  Only active jobs are visible to candidates
                </div>
              </div>
            </div>
          </div>

          {/* Job Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg font-bold text-primary-600 mb-4">Preview</h3>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-neutral-500">Position</div>
                <div className="font-semibold text-primary-600">
                  {job.title || 'Job Title'}
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Department</div>
                <div className="text-neutral-700">
                  {job.department || 'Department'}
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Location</div>
                <div className="text-neutral-700">
                  {job.location || 'Location'}
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Type</div>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                  {job.type.replace('_', ' ')}
                </span>
              </div>
              {job.salaryRange && (
                <div>
                  <div className="text-sm text-neutral-500">Salary</div>
                  <div className="text-neutral-700">{job.salaryRange}</div>
                </div>
              )}
            </div>
          </div>

          {/* Help */}
          <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200">
            <h3 className="font-display text-lg font-bold text-accent-600 mb-4">💡 Tips</h3>

            <div className="space-y-3 text-sm text-accent-700">
              <div>• Use clear, descriptive job titles</div>
              <div>• Include salary range for better candidates</div>
              <div>• List both required and preferred skills</div>
              <div>• Highlight company culture and benefits</div>
              <div>• Keep descriptions concise but informative</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Link
          href="/admin/careers"
          className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors font-medium"
        >
          Cancel
        </Link>
        <button
          onClick={createJob}
          disabled={loading || !job.title || !job.department}
          className="bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Job Posting'}
        </button>
      </div>
    </div>
  );
}
