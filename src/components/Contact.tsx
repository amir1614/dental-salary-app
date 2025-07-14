import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-4">Get in Touch</h1>
            <p className="lead text-secondary">Have questions, suggestions, or want to collaborate? I'd love to hear from you!</p>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <i className="bi bi-envelope text-primary" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title text-center mb-3">Email</h5>
                  <p className="card-text text-center text-muted mb-3">
                    The best way to reach me directly
                  </p>
                  <div className="text-center">
                    <a 
                      href="mailto:amir.musa.ali09@gmail.com" 
                      className="btn btn-outline-primary"
                    >
                      amir.musa.ali09@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <i className="bi bi-person text-primary" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title text-center mb-3">About Me</h5>
                  <p className="card-text text-center text-muted">
                    High school student passionate about dental technology and creating innovative solutions for the healthcare industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-5">
            <div className="card-body p-5">
              <h3 className="text-primary mb-4">What I'm Looking For</h3>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">
                    <i className="bi bi-lightbulb me-2"></i>
                    Feedback & Suggestions
                  </h5>
                  <p className="text-muted">
                    How can dental.fyi better serve the dental community? What features would you like to see?
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">
                    <i className="bi bi-handshake me-2"></i>
                    Collaborations
                  </h5>
                  <p className="text-muted">
                    Interested in dental technology, data analysis, or healthcare innovation? Let's connect!
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">
                    <i className="bi bi-graph-up me-2"></i>
                    Data Partnerships
                  </h5>
                  <p className="text-muted">
                    Dental organizations, schools, or professionals interested in contributing to salary transparency.
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <h5 className="text-primary">
                    <i className="bi bi-code-slash me-2"></i>
                    Technical Mentorship
                  </h5>
                  <p className="text-muted">
                    Experienced developers or healthcare tech professionals willing to mentor a young developer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="text-primary mb-4">Frequently Asked Questions</h3>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      How accurate is the salary data?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      The platform combines official Bureau of Labor Statistics data with community submissions. 
                      BLS data provides authoritative benchmarks, while community submissions offer real-time market insights.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                      Is my salary information private?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes! All submissions are anonymous. We only collect salary and demographic information, 
                      never personal identifying details.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                      How can I contribute to the project?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can contribute by submitting your salary data, providing feedback on features, 
                      or reaching out for potential collaborations in dental technology.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <h4 className="text-primary mb-3">Ready to Connect?</h4>
            <p className="text-muted mb-4">
              Whether you have questions, suggestions, or just want to say hello, 
              I'm always excited to hear from the dental community!
            </p>
            <a 
              href="mailto:amir.musa.ali09@gmail.com" 
              className="btn btn-primary btn-lg"
            >
              <i className="bi bi-envelope me-2"></i>
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 