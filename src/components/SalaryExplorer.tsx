import React, { useState, useEffect } from 'react';
import blsData from '../data/bls_dentists.json';

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

const SalaryExplorer: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>(blsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'area' | 'annual_mean_wage' | 'hourly_mean_wage'>('annual_mean_wage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  const filteredAndSortedData = data
    .filter(item => 
      item.area.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: 'area' | 'annual_mean_wage' | 'hourly_mean_wage') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h2
  className="mb-2"
  style={{
    fontFamily: `'Inter', 'Helvetica Neue', 'Source Sans Pro', Arial, sans-serif`,
    fontWeight: 600,
    color: '#1a4fa3',
    letterSpacing: '0.01em',
    fontSize: '2.1rem',
    marginBottom: '0.5rem',
  }}
>
  U.S. Bureau of Labor Statistics — Dentist Compensation Data
</h2>
<p
  className="text-muted mb-3"
  style={{
    fontFamily: `'Inter', 'Helvetica Neue', 'Source Sans Pro', Arial, sans-serif`,
    fontWeight: 500,
    fontSize: '1.05rem',
    color: '#495057',
    marginBottom: '1.2rem',
  }}
>
  Authoritative salary and compensation figures for U.S. dentists, sourced directly from the BLS.
</p>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive salary-explorer">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('area')}
              >
                Location
                {sortBy === 'area' && (
                  <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                )}
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('hourly_mean_wage')}
              >
                Hourly Mean
                {sortBy === 'hourly_mean_wage' && (
                  <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                )}
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('annual_mean_wage')}
              >
                Annual Mean
                {sortBy === 'annual_mean_wage' && (
                  <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                )}
              </th>
              <th>10th Percentile</th>
              <th>25th Percentile</th>
              <th>50th Percentile</th>
              <th>75th Percentile</th>
              <th>90th Percentile</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <strong>{item.area}</strong>
                </td>
                <td className="text-success fw-bold">
                  {formatHourly(item.hourly_mean_wage)}
                </td>
                <td className="text-success fw-bold">
                  {formatCurrency(item.annual_mean_wage)}
                </td>
                <td>{formatCurrency(item.percentiles["10"] * 2080)}</td>
                <td>{formatCurrency(item.percentiles["25"] * 2080)}</td>
                <td className="text-primary fw-bold">
                  {formatCurrency(item.percentiles["50"] * 2080)}
                </td>
                <td>{formatCurrency(item.percentiles["75"] * 2080)}</td>
                <td>{formatCurrency(item.percentiles["90"] * 2080)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info">
            <h5>Data Source</h5>
            <p className="mb-0">
              This data is sourced from the Bureau of Labor Statistics (BLS) Occupational Employment and Wage Statistics (OEWS) program. 
              The data represents mean wages and percentile distributions for General Dentists (29-1021) across different geographic areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryExplorer; 