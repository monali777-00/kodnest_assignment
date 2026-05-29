'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import InternshipCard from '../components/InternshipCard/InternshipCard';
import InternshipDetailModal from '../components/InternshipDetailModal/InternshipDetailModal';
import { useInternships } from '../hooks/useInternships';
import { Internship } from '../types';
import styles from './page.module.css';

export default function Home() {
  const {
    filteredInternships,
    profiles,
    locations,
    loading,
    error,
    filters,
    activeTab,
    setActiveTab,
    updateFilter,
    resetFilters,
  } = useInternships();

  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  return (
    <>
      <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.layoutContainer}>
            {/* Backdrop for mobile filters drawer */}
            {isFilterMobileOpen && (
              <div
                className={styles.filterBackdrop}
                onClick={() => setIsFilterMobileOpen(false)}
              />
            )}

            {/* Left Sidebar Filter Section */}
            <div className={`${styles.sidebarWrapper} ${isFilterMobileOpen ? styles.showMobileFilters : ''}`}>
              <FilterSidebar
                filters={filters}
                profiles={profiles}
                locations={locations}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                onClose={() => setIsFilterMobileOpen(false)}
                activeTab={activeTab}
              />
            </div>

            {/* Right Listings Section */}
            <div className={styles.resultsColumn}>
              {loading && (
                <div className={styles.loaderContainer}>
                  <div className={styles.spinner} />
                  <p className={styles.loaderText}>Loading internships...</p>
                </div>
              )}

              {error && (
                <div className={styles.errorContainer}>
                  <h4 className={styles.errorTitle}>Oops! Something went wrong</h4>
                  <p className={styles.errorText}>{error}</p>
                  <button className={styles.retryBtn} onClick={() => window.location.reload()}>
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && (
                <>
                  {activeTab === 'courses' && (
                    <div className={styles.coursesContainer}>
                      <h3 className={styles.statsHeader}>Featured Certification Programs</h3>
                      <div className={styles.coursesGrid}>
                        {[
                          { title: 'Full Stack Web Development', duration: '6 Months', rating: '4.8 ★', jobs: '25,000+ Jobs', color: '#008BDC' },
                          { title: 'Data Science & Machine Learning', duration: '5 Months', rating: '4.7 ★', jobs: '15,000+ Jobs', color: '#10b981' },
                          { title: 'Digital Marketing Specialist', duration: '3 Months', rating: '4.6 ★', jobs: '8,000+ Jobs', color: '#f59e0b' },
                          { title: 'UI/UX Design Masterclass', duration: '4 Months', rating: '4.9 ★', jobs: '10,000+ Jobs', color: '#ef4444' },
                        ].map((c, i) => (
                          <div key={i} className={styles.courseCard}>
                            <div className={styles.courseHeader} style={{ borderLeft: `4px solid ${c.color}` }}>
                              <h4>{c.title}</h4>
                              <span className={styles.courseRating}>{c.rating}</span>
                            </div>
                            <div className={styles.courseDetails}>
                              <div className={styles.courseDetailItem}><span>Duration:</span> {c.duration}</div>
                              <div className={styles.courseDetailItem}><span>Job Openings:</span> {c.jobs}</div>
                            </div>
                            <button className={styles.courseEnrollBtn} onClick={() => alert('Enrollment module coming soon!')}>
                              Learn More
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'post-resume' && (
                    <div className={styles.resumeContainer}>
                      <h3 className={styles.statsHeader}>Resume Builder & Upload</h3>
                      <div className={styles.resumeUploadCard}>
                        <div className={styles.resumeUploadIcon}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <h4>Drag & drop your resume file here</h4>
                        <p>Supports PDF, DOC, DOCX up to 5MB</p>
                        <button className={styles.resumeUploadBtn} onClick={() => alert('Upload module coming soon!')}>
                          Choose File
                        </button>
                      </div>
                    </div>
                  )}

                  {(activeTab === 'internships' || activeTab === 'jobs') && (
                    <>
                      <div className={styles.resultsHeaderRow}>
                        <h3 className={styles.statsHeader}>
                          {filteredInternships.length}{' '}
                          <span className={styles.statsCount}>
                            {activeTab === 'jobs'
                              ? filteredInternships.length === 1 ? 'job' : 'jobs'
                              : filteredInternships.length === 1 ? 'internship' : 'internships'}
                          </span>{' '}
                          matching your criteria
                        </h3>

                        <button
                          className={styles.mobileFilterToggleBtn}
                          onClick={() => setIsFilterMobileOpen(true)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                          </svg>
                          Filters
                        </button>
                      </div>

                      {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                          <InternshipCard
                            key={internship.id}
                            internship={internship}
                            onViewDetails={handleViewDetails}
                          />
                        ))
                      ) : (
                        <div className={styles.emptyState}>
                          <svg
                            className={styles.emptyIcon}
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          <h4 className={styles.emptyTitle}>
                            {activeTab === 'jobs' ? 'No matching jobs' : 'No matching internships'}
                          </h4>
                          <p className={styles.emptyText}>
                            We couldn't find any opportunities matching your current filters. Try resetting them!
                          </p>
                          <button className={styles.resetBtn} onClick={resetFilters}>
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Detail Drawer Overlay */}
      <InternshipDetailModal internship={selectedInternship} onClose={handleCloseModal} />
    </>
  );
}
