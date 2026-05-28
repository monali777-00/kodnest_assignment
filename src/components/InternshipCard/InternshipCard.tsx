import React, { useState } from 'react';
import styles from './InternshipCard.module.css';
import { Internship } from '../../types';

interface InternshipCardProps {
  internship: Internship;
  onViewDetails: (internship: Internship) => void;
}

export default function InternshipCard({ internship, onViewDetails }: InternshipCardProps) {
  const [imgError, setImgError] = useState(false);
  const companyLetter = internship.company_name ? internship.company_name.charAt(0) : 'I';

  // Construct logo URL dynamically
  const logoUrl = internship.company_logo
    ? `https://internshala.com/uploads/logo/images/${internship.company_logo}`
    : null;

  return (
    <div className={styles.card} onClick={() => onViewDetails(internship)}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          {internship.is_active && (
            <span className={`${styles.badge} ${styles.badgeTrending}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Actively hiring
            </span>
          )}
          <h4 className={styles.title}>{internship.title}</h4>
          <span className={styles.company}>{internship.company_name}</span>
        </div>

        <div className={styles.logoWrapper}>
          {logoUrl && !imgError ? (
            <img
              src={logoUrl}
              alt={internship.company_name}
              className={styles.logoImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={styles.logoLetter}>{companyLetter}</span>
          )}
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>
            <svg className={styles.detailIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location
          </span>
          <span className={styles.detailValue}>
            {internship.work_from_home ? 'Work From Home' : internship.location_names.join(', ')}
          </span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>
            <svg className={styles.detailIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Start Date
          </span>
          <span className={styles.detailValue}>{internship.start_date}</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>
            <svg className={styles.detailIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Duration
          </span>
          <span className={styles.detailValue}>{internship.duration}</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>
            <svg className={styles.detailIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
            Stipend
          </span>
          <span className={styles.detailValue}>
            {internship.stipend?.salary || 'Unspecified'}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.actions}>
          {internship.is_ppo && (
            <span className={`${styles.badge} ${styles.ppoBadge}`}>
              {internship.ppo_label_value || 'PPO'}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <span className={styles.postLabel}>
            <svg className={styles.postIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 15 15" />
            </svg>
            {internship.posted_on}
          </span>
          <button
            className={styles.viewDetailsBtn}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(internship);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
