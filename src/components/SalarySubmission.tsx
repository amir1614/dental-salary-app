import React, { useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

interface SalarySubmission {
  position: string;
  location: string;
  baseSalary: number;
  totalComp: number;
  experience: number;
  benefits: string[];
  additionalNotes: string;
  selfEmployed: string; // 'yes' or 'no'
  clinicalHoursPerWeek: string;
}

interface SalarySubmissionProps {
  onSubmissionSuccess?: () => void;
}

const SalarySubmission: React.FC<SalarySubmissionProps> = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState<SalarySubmission>({
    position: '',
    location: '',
    baseSalary: 0,
    totalComp: 0,
    experience: 0,
    benefits: [],
    additionalNotes: '',
    selfEmployed: '',
    clinicalHoursPerWeek: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'baseSalary' || name === 'totalComp' || name === 'experience' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleBenefitChange = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!formData.selfEmployed) {
      setErrorMessage('Please answer whether you own or co-own a dental practice.');
      return;
    }
    if (!formData.clinicalHoursPerWeek) {
      setErrorMessage('Please select how many clinical hours you work per week.');
      return;
    }
    
    try {
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      console.log('Submitting payload:', submissionData);
      console.log('API endpoint:', API_ENDPOINTS.submissions);
      
      const response = await fetch(API_ENDPOINTS.submissions, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          position: '',
          location: '',
          baseSalary: 0,
          totalComp: 0,
          experience: 0,
          benefits: [],
          additionalNotes: '',
          selfEmployed: '',
          clinicalHoursPerWeek: '',
        });
        
        // Call the callback to refresh the data
        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error submitting data. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting data:', error);
      setErrorMessage(error.message || 'Error submitting data. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-success text-center">
              <h4 className="alert-heading">Thank you!</h4>
              <p>Your salary data has been submitted successfully. This helps other dentists make informed career decisions.</p>
              <button 
                className="btn btn-outline-success"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Submit Your Salary Data</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="alert alert-danger text-center mb-3">
                    {errorMessage}
                  </div>
                )}
                {/* Debug: Show selfEmployed value */}
                <div className="alert alert-info text-center mb-3">
                  Debug: Practice Owner value to be sent: <strong>{formData.selfEmployed}</strong>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="position" className="form-label">Position *</label>
                    <select 
                      className="form-select" 
                      id="position" 
                      name="position" 
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Position</option>
                      <option value="General Dentist">General Dentist</option>
                      <option value="Orthodontist">Orthodontist</option>
                      <option value="Pediatric Dentist">Pediatric Dentist</option>
                      <option value="Endodontist">Endodontist</option>
                      <option value="Periodontist">Periodontist</option>
                      <option value="Oral Surgeon">Oral Surgeon</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location" className="form-label">Location *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="location" 
                      name="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  {/* Removed company name field */}
                </div>

                <div className="mb-3">
                  <label className="form-label">Do you own or co-own a dental practice? *</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selfEmployed"
                        id="selfEmployedYes"
                        value="yes"
                        checked={formData.selfEmployed === 'yes'}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="selfEmployedYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selfEmployed"
                        id="selfEmployedNo"
                        value="no"
                        checked={formData.selfEmployed === 'no'}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="selfEmployedNo">No</label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="clinicalHoursPerWeek" className="form-label">How many clinical hours do you work per week? *</label>
                  <select
                    className="form-select"
                    id="clinicalHoursPerWeek"
                    name="clinicalHoursPerWeek"
                    value={formData.clinicalHoursPerWeek}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Fewer than 30 hrs">Fewer than 30 hrs</option>
                    <option value="30 – 35 hrs">30 – 35 hrs</option>
                    <option value="36 – 40 hrs">36 – 40 hrs</option>
                    <option value="More than 40 hrs">More than 40 hrs</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="experience" className="form-label">Years of Experience *</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="experience" 
                      name="experience"
                      min="0"
                      step="0.5"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="baseSalary" className="form-label">Base Salary *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="baseSalary" 
                        name="baseSalary"
                        min="0"
                        value={formData.baseSalary}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="totalComp" className="form-label">Total Compensation *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="totalComp" 
                        name="totalComp"
                        min="0"
                        value={formData.totalComp}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Benefits (select all that apply)</label>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="health"
                          checked={formData.benefits.includes('Health Insurance')}
                          onChange={() => handleBenefitChange('Health Insurance')}
                        />
                        <label className="form-check-label" htmlFor="health">
                          Health Insurance
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="dental"
                          checked={formData.benefits.includes('Dental Insurance')}
                          onChange={() => handleBenefitChange('Dental Insurance')}
                        />
                        <label className="form-check-label" htmlFor="dental">
                          Dental Insurance
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="retirement"
                          checked={formData.benefits.includes('Retirement Plan')}
                          onChange={() => handleBenefitChange('Retirement Plan')}
                        />
                        <label className="form-check-label" htmlFor="retirement">
                          Retirement Plan
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
                  <textarea 
                    className="form-control" 
                    id="additionalNotes" 
                    name="additionalNotes"
                    rows={3}
                    placeholder="Any additional information about your compensation package..."
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit Salary Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySubmission; 