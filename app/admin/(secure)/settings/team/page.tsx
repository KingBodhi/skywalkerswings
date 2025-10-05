"use client";
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load team data: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export default function TeamSettingsPage() {
  const { data: teamMembers, error, mutate } = useSWR('/api/admin/team', fetcher);
  const [showCreateUser, setShowCreateUser] = useState(false);

  // Fallback data while API loads or if there's an error
  const members = teamMembers || [];
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR'
  });

  async function createUser() {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (res.ok) {
        setNewUser({ name: '', email: '', password: '', role: 'EDITOR' });
        setShowCreateUser(false);
        mutate();
        alert('User created successfully!');
      } else {
        const error = await res.text();
        alert('Failed to create user: ' + error);
      }
    } catch (error) {
      alert('Network error creating user');
    }
  }

  async function deleteUser(id: string, name: string) {
    if (!confirm(`Remove ${name} from the team? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        mutate();
        alert('User removed successfully');
      } else {
        alert('Failed to remove user');
      }
    } catch (error) {
      alert('Network error');
    }
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-danger-50 border border-danger-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-danger-800 mb-2">Error Loading Team</h2>
          <p className="text-danger-700 mb-4">
            {error.message || 'Failed to load team members. Please check authentication and try again.'}
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
      <div>
        <h1 className="font-display text-3xl font-bold text-primary-600 mb-2">Team & Permissions</h1>
        <p className="text-neutral-600">Manage admin users and access permissions</p>
      </div>

      {/* Team Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">{members.length}</div>
          <div className="text-neutral-600">Team Members</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-success-600 mb-2">
            {members.filter((m: any) => m.role === 'ADMIN').length}
          </div>
          <div className="text-neutral-600">Administrators</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-accent-600 mb-2">
            {members.filter((m: any) => m.role === 'EDITOR').length}
          </div>
          <div className="text-neutral-600">Editors</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {members.filter((m: any) => m.role === 'ADMIN' || m.role === 'EDITOR').length}
          </div>
          <div className="text-neutral-600">Active Users</div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Create New User</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="admin-input"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Email Address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="admin-input"
                  placeholder="user@skywalker.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="admin-input"
                  placeholder="Secure password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="admin-select"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCreateUser(false)}
                className="border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={createUser}
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-primary-600">Team Members</h2>
            <button
              onClick={() => setShowCreateUser(true)}
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Add User
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-neutral-900">User</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-900">Role</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-900">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-900">Created</th>
                <th className="px-6 py-4 text-right font-semibold text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {members.map((member: any) => (
                <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary-600 text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{member.name}</div>
                        <div className="text-sm text-neutral-600">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      member.role === 'ADMIN' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-success-100 text-success-700'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-600">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteUser(member.id, member.name)}
                      className="text-danger-600 hover:text-danger-700 font-medium"
                      disabled={member.role === 'ADMIN' && members.filter((m: any) => m.role === 'ADMIN').length === 1}
                    >
                      {member.role === 'ADMIN' && members.filter((m: any) => m.role === 'ADMIN').length === 1 
                        ? 'Last Admin' 
                        : 'Remove'
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <div className="font-semibold text-primary-600 mb-2">No team members found</div>
            <div className="text-neutral-600 mb-4">Add your first team member to get started</div>
            <button
              onClick={() => setShowCreateUser(true)}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Add First User
            </button>
          </div>
        )}
      </div>

      {/* Role Permissions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <h2 className="font-display text-xl font-bold text-primary-600 mb-6">Role Permissions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-primary-600 mb-4">Administrator</h3>
            <div className="space-y-2">
              {[
                'Full system access',
                'Manage team members',
                'Configure settings',
                'View all reports',
                'Manage products & inventory',
                'Process orders'
              ].map((permission, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-neutral-700">{permission}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-600 mb-4">Editor</h3>
            <div className="space-y-2">
              {[
                'Manage products & inventory',
                'Process orders',
                'View sales reports',
                'Manage collections',
                'Create blog posts'
              ].map((permission, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-neutral-700">{permission}</span>
                </div>
              ))}
              {[
                'Configure system settings',
                'Manage team members'
              ].map((permission, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-neutral-500">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
