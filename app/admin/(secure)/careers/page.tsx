"use client";
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export default function CareersAdminPage() {
  const { data: jobs, error, mutate } = useSWR('/api/admin/careers', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredJobs = (jobs || []).filter((job: any) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  async function deleteJob(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutate();
      } else {
        alert('Failed to delete job posting');
      }
    } catch (error) {
      alert('Network error');
    }
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-danger-50 border border-danger-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-danger-800 mb-2">Error Loading Jobs</h2>
          <p className="text-danger-700 mb-4">
            {error.message || 'Failed to load job postings. Please check your connection and try again.'}
          </p>
          <button
            onClick={() => mutate()}
            className="bg-danger-600 hover:bg-danger-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Career Opportunities</h1>
          <p className="text-neutral-600">Manage job postings and recruitment</p>
        </div>
        <Link 
          href="/admin/careers/new"
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
        >
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">{jobs?.length || 0}</div>
          <div className="text-neutral-600">Total Jobs</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-success-600 mb-2">
            {jobs?.filter((j: any) => j.status === 'ACTIVE').length || 0}
          </div>
          <div className="text-neutral-600">Active</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-warning-600 mb-2">
            {jobs?.filter((j: any) => j.status === 'DRAFT').length || 0}
          </div>
          <div className="text-neutral-600">Draft</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-accent-600 mb-2">
            {jobs?.filter((j: any) => j.type === 'REMOTE').length || 0}
          </div>
          <div className="text-neutral-600">Remote</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search job postings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select w-auto"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        {filteredJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-primary-600">Position</th>
                  <th className="px-6 py-4 text-left font-semibold text-primary-600">Department</th>
                  <th className="px-6 py-4 text-left font-semibold text-primary-600">Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-primary-600">Status</th>
                  <th className="px-6 py-4 text-right font-semibold text-primary-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredJobs.map((job: any) => (
                  <tr key={job.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-primary-600">{job.title}</div>
                        <div className="text-sm text-neutral-500">{job.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-700">{job.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        job.status === 'ACTIVE' 
                          ? 'bg-success-100 text-success-700' 
                          : job.status === 'DRAFT'
                          ? 'bg-warning-100 text-warning-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/careers/${job.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/careers/${job.slug}`}
                          target="_blank"
                          className="text-accent-600 hover:text-accent-700 font-medium"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteJob(job.id, job.title)}
                          className="text-danger-600 hover:text-danger-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💼</div>
            <div className="font-semibold text-primary-600 mb-2">No job postings</div>
            <div className="text-neutral-600 mb-4">
              {searchTerm ? 'No jobs match your search terms' : 'Create your first job posting to get started'}
            </div>
            <Link 
              href="/admin/careers/new"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Post First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
