import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface UserSubmission {
  id: string;
  position: string;
  location: string;
  company: string;
  baseSalary: number;
  totalComp: number;
  experience: number;
  benefits: string[];
  additionalNotes: string;
  submittedAt: string;
  selfEmployed: 'yes' | 'no';
  clinicalHoursPerWeek?: number;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.adminSubmissions, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        onLogout();
      } else {
        setError('Failed to fetch submissions');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.adminDeleteSubmission(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        onLogout();
      } else {
        alert('Failed to delete submission');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Community Submissions ({submissions.length})</h5>
        </div>
        <div className="card-body p-0">
          {submissions.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No submissions found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Position</th>
                    <th>Location</th>
                    <th>Base Salary</th>
                    <th>Total Comp</th>
                    <th>Experience</th>
                    <th>Benefits</th>
                    <th>Submitted</th>
                    <th>Practice Owner</th>
                    <th>Clinical Hours/Week</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td><strong>{submission.position}</strong></td>
                      <td>{submission.location}</td>
                      <td className="text-success fw-bold">
                        {formatCurrency(submission.baseSalary)}
                      </td>
                      <td className="text-success fw-bold">
                        {formatCurrency(submission.totalComp)}
                      </td>
                      <td>{submission.experience} yrs</td>
                      <td>
                        {submission.benefits.length > 0 ? (
                          <span className="badge bg-info">
                            {submission.benefits.length} benefits
                          </span>
                        ) : (
                          <span className="text-muted">None</span>
                        )}
                      </td>
                      <td className="text-muted small">
                        {formatDate(submission.submittedAt)}
                      </td>
                      <td>
                        {submission.selfEmployed === 'yes' && (
                          <span className="text-success fw-bold">Yes</span>
                        )}
                        {submission.selfEmployed === 'no' && (
                          <span className="text-danger fw-bold">No</span>
                        )}
                      </td>
                      <td>{submission.clinicalHoursPerWeek || '-'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(submission.id)}
                          disabled={deleteLoading === submission.id}
                        >
                          {deleteLoading === submission.id ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            <i className="bi bi-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 