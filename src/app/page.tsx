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
      <Navbar />

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
                  <div className={styles.resultsHeaderRow}>
                    <h3 className={styles.statsHeader}>
                      {filteredInternships.length}{' '}
                      <span className={styles.statsCount}>
                        {filteredInternships.length === 1 ? 'internship' : 'internships'}
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
                      <h4 className={styles.emptyTitle}>No matching internships</h4>
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
            </div>
          </div>
        </div>
      </main>

      {/* Floating Detail Drawer Overlay */}
      <InternshipDetailModal internship={selectedInternship} onClose={handleCloseModal} />
    </>
  );
}
