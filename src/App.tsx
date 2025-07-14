import React, { useState, useEffect } from 'react';
import SalaryExplorer from './components/SalaryExplorer';
import SalarySubmission from './components/SalarySubmission';
import About from './components/About';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { API_ENDPOINTS } from './config/api';
import blsData from './data/bls_dentists.json';

interface SalaryData {
  area: string;
  hourly_mean_wage: number;
  annual_mean_wage: number;
  percentiles: {
    "10": number;
    "25": number;
    "50": number;
    "75": number;
    "90": number;
  };
}

interface UserSubmission {
  id: string;
  position: string;
  location: string;
  company: string;
  employmentType: string;
  baseSalary: number;
  totalComp: number;
  experience: number;
  benefits: string[];
  additionalNotes: string;
  submittedAt: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'explorer' | 'submit' | 'about' | 'contact' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user submissions from backend
  useEffect(() => {
    fetchUserSubmissions();
  }, []);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const fetchUserSubmissions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.submissions);
      if (response.ok) {
        const data = await response.json();
        setUserSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatHourly = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is handled by filtering the displayed data
  };

  const filteredBLSData = blsData.filter(item =>
    item.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUserData = userSubmissions.filter(item =>
    item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHomePage = () => (
    <section className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3 text-primary">Find Dentist Salaries</h1>
        <p className="lead mb-4 text-secondary">Transparent salary data for dentists, by dentists. Compare compensation, benefits, and more.</p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="row g-2 justify-content-center mb-5">
          <div className="col-auto">
            <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Search by city, state, or company" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary btn-lg px-4">Search</button>
          </div>
        </form>
      </div>

      {/* BLS Data Section */}
      <div className="mb-5">
        <h2 className="text-primary mb-4">Official BLS Salary Data</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Location</th>
                <th>Hourly Mean</th>
                <th>Annual Mean</th>
                <th>Median (50th %)</th>
                <th>75th Percentile</th>
                <th>90th Percentile</th>
              </tr>
            </thead>
            <tbody>
              {filteredBLSData.map((item, index) => (
                <tr key={`bls-${index}`}>
                  <td><strong>{item.area}</strong></td>
                  <td className="text-success fw-bold">{formatHourly(item.hourly_mean_wage)}</td>
                  <td className="text-success fw-bold">{formatCurrency(item.annual_mean_wage)}</td>
                  <td className="text-primary fw-bold">{formatCurrency(item.percentiles["50"] * 2080)}</td>
                  <td>{formatCurrency(item.percentiles["75"] * 2080)}</td>
                  <td>{formatCurrency(item.percentiles["90"] * 2080)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Submissions Section */}
      <div className="mb-5">
        <h2 className="text-primary mb-4">Community Salary Data</h2>
        {userSubmissions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Employment Type</th>
                  <th>Company</th>
                  <th>Base Salary</th>
                  <th>Total Comp</th>
                  <th>Experience</th>
                  <th>Benefits</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.position}</strong></td>
                    <td>{item.location}</td>
                    <td>
                      <span className={`badge ${item.employmentType === 'Self-Employed' ? 'bg-warning' : 'bg-success'}`}>
                        {item.employmentType}
                      </span>
                    </td>
                    <td>{item.company || 'N/A'}</td>
                    <td className="text-success fw-bold">{formatCurrency(item.baseSalary)}</td>
                    <td className="text-success fw-bold">{formatCurrency(item.totalComp)}</td>
                    <td>{item.experience} yrs</td>
                    <td>
                      {item.benefits.length > 0 ? (
                        <span className="badge bg-info me-1">
                          {item.benefits.length} benefits
                        </span>
                      ) : (
                        <span className="text-muted">None listed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">No community submissions yet. Be the first to share your salary data!</p>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('submit')}
            >
              Submit Your Data
            </button>
          </div>
        )}
      </div>


    </section>
  );

  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#" onClick={() => setCurrentPage('home')}>dental.fyi</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('home')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'explorer' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('explorer')}
                >
                  BLS Data
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'submit' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('submit')}
                >
                  Submit Data
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('about')}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('contact')}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentPage('admin')}
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'explorer' && <SalaryExplorer />}
      {currentPage === 'submit' && <SalarySubmission onSubmissionSuccess={fetchUserSubmissions} />}
      {currentPage === 'about' && <About />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'admin' && (
        isAdminLoggedIn ? (
          <AdminDashboard onLogout={() => {
            setIsAdminLoggedIn(false);
            setCurrentPage('home');
          }} />
        ) : (
          <AdminLogin onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            setCurrentPage('admin');
          }} />
        )
      )}

      {/* Footer */}
      <footer className="bg-light text-center py-3 border-top mt-auto">
        <span className="text-secondary">&copy; {new Date().getFullYear()} dental.fyi &mdash; All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
