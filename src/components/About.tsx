import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-4">About dental.fyi</h1>
            <p className="lead text-secondary">Transparency in dental compensation, one submission at a time.</p>
          </div>

          <div className="card shadow-sm mb-5">
            <div className="card-body p-5">
              <h2 className="text-primary mb-4">The Story</h2>
              <p className="mb-4">
                Hi! I'm Amir, a high school student with a passion for both dentistry and technology. 
                While exploring career paths in healthcare, I noticed something interesting: there was no 
                comprehensive platform for dentists to share and compare salary information, unlike other 
                professions that have sites like levels.fyi.
              </p>
              
              <p className="mb-4">
                This gap in the market got me thinking - why shouldn't dental professionals have the same 
                level of transparency and data-driven insights that tech workers enjoy? The dental field is 
                evolving rapidly with new technologies, and compensation should reflect these advancements.
              </p>

              <p className="mb-4">
                So I built dental.fyi - a platform that combines official Bureau of Labor Statistics data 
                with community-driven salary submissions. The goal is to create a comprehensive resource 
                that helps dental professionals make informed career decisions and understand their market value.
              </p>

              <div className="alert alert-info">
                <h5 className="alert-heading">Why This Matters</h5>
                <p className="mb-0">
                  Transparency in compensation leads to better career decisions, fairer pay, and a more 
                  informed dental workforce. Whether you're a recent graduate, experienced practitioner, 
                  or considering a career change, having access to real salary data can make all the difference.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-graph-up text-primary" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title">Data-Driven Insights</h5>
                  <p className="card-text text-muted">
                    Combine official BLS statistics with real community submissions for comprehensive salary insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-people text-primary" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title">Community-Driven</h5>
                  <p className="card-text text-muted">
                    Built by the dental community, for the dental community. Share your experience to help others.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-check text-primary" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title">Privacy-First</h5>
                  <p className="card-text text-muted">
                    Your data is protected. Share salary information anonymously and securely.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-lightning text-primary" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="card-title">Always Evolving</h5>
                  <p className="card-text text-muted">
                    Continuously updated with new features and data to serve the dental community better.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <h3 className="text-primary mb-3">Join the Movement</h3>
            <p className="text-muted mb-4">
              Help build the most comprehensive dental salary database. Share your experience, 
              explore the data, and contribute to transparency in dental compensation.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary btn-lg">
                Submit Your Data
              </button>
              <button className="btn btn-outline-primary btn-lg">
                Explore Salaries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 