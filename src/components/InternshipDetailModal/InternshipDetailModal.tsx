import React, { useState } from 'react';
import styles from './InternshipDetailModal.module.css';
import { Internship } from '../../types';

interface InternshipDetailModalProps {
  internship: Internship | null;
  onClose: () => void;
}

export default function InternshipDetailModal({ internship, onClose }: InternshipDetailModalProps) {
  const [applied, setApplied] = useState(false);
  const [whyHire, setWhyHire] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!internship) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (whyHire.trim().length >= 10 && confirmed) {
      setApplied(true);
    }
  };

  const getProfileDetails = (profile: string) => {
    const defaultData = {
      responsibilities: [
        'Collaborate with team members to deliver business objectives.',
        'Write clean, structured, and modular code/documentation.',
        'Perform market research and support operational work streams.',
        'Assist in building features and resolving critical issues.',
      ],
      skills: ['Analytical Skills', 'Communication', 'Problem Solving', 'Detail Oriented'],
      requirements: 'Graduate or pursuing graduation in a relevant field. Passionate about learning and development.',
    };

    const dataMap: Record<string, typeof defaultData> = {
      'Data Science': {
        responsibilities: [
          'Pre-process and clean raw structured/unstructured dataset inputs.',
          'Build, train, and validate predictive statistical models.',
          'Analyze product user behavior and run A/B testing insights.',
          'Present findings using dashboards (Tableau/PowerBI) to senior leaders.',
        ],
        skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Pandas/NumPy'],
        requirements: 'Knowledge of Python/R and database systems. Familiarity with machine learning algorithms.',
      },
      'Android App Development': {
        responsibilities: [
          'Collaborate with developers to build client-side features in Kotlin/Java.',
          'Write modular and scalable Android components following MVVM patterns.',
          'Integrate RESTful services and local databases (Room/SQLite).',
          'Debug and optimize rendering speeds and layout UI components.',
        ],
        skills: ['Kotlin', 'Java', 'Android SDK', 'REST APIs', 'Git'],
        requirements: 'Demonstrated experience in Android development. Portfolio of built apps is a strong plus.',
      },
      'Administration': {
        responsibilities: [
          'Coordinate database structures and manage corporate schedules.',
          'Format and document company workflows and internal wikis.',
          'Maintain regular communication channels across internal groups.',
          'Prepare status reports and support onboarding protocols.',
        ],
        skills: ['MS Office Suite', 'Google Workspace', 'Organizing', 'Scheduling'],
        requirements: 'Strong operational efficiency, excellent written and verbal communication.',
      },
      'Business Analytics': {
        responsibilities: [
          'Conduct competitive intelligence and market trend studies.',
          'Translate business requirements into analytical functional drafts.',
          'Identify operational bottlenecks using data indicators.',
          'Draft executive summary reviews and KPI performance models.',
        ],
        skills: ['SQL', 'Excel Macros', 'Data Analysis', 'Tableau', 'PowerPoint'],
        requirements: 'Strong mathematical background. Critical thinking capability and data modeling.',
      },
    };

    // Find custom data or match substring, otherwise return default
    const matchedKey = Object.keys(dataMap).find((k) =>
      profile.toLowerCase().includes(k.toLowerCase())
    );

    return matchedKey ? dataMap[matchedKey] : defaultData;
  };

  const details = getProfileDetails(internship.profile_name);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h3 className={styles.title}>{internship.title}</h3>
            <span className={styles.company}>{internship.company_name}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close details">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {!applied ? (
          <div className={styles.content}>
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>
                  {internship.work_from_home ? 'Remote (WFH)' : internship.location_names.join(', ')}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>{internship.duration}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Stipend</span>
                <span className={styles.metaValue}>{internship.stipend?.salary || 'Unpaid'}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Apply By</span>
                <span className={styles.metaValue}>{internship.application_deadline}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Key Responsibilities</h4>
              <ul className={styles.list}>
                {details.responsibilities.map((resp, i) => (
                  <li key={i} className={styles.listItem}>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Skills Required</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                {details.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: '#f1f5f9',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Who Can Apply</h4>
              <p className={styles.text}>{details.requirements}</p>
              {internship.office_days && (
                <p className={styles.text} style={{ marginTop: '4px', fontWeight: 600, color: 'var(--primary)' }}>
                  Office Schedule: {internship.office_days}
                </p>
              )}
            </div>

            <form className={styles.applyForm} onSubmit={handleApply}>
              <h4 className={styles.sectionTitle}>Apply for Internship</h4>
              <div className={styles.filterGroup} style={{ gap: '6px' }}>
                <label className={styles.checkboxLabel} style={{ fontWeight: 600 }}>
                  Why should we hire you for this role? (Minimum 10 characters)
                </label>
                <textarea
                  className={styles.textarea}
                  value={whyHire}
                  onChange={(e) => setWhyHire(e.target.value)}
                  placeholder="Mention your relevant projects, achievements, and availability..."
                  required
                />
              </div>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  required
                />
                I confirm that the location preference and profile match my qualifications.
              </label>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={whyHire.trim().length < 10 || !confirmed}
              >
                Submit Application
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successState}>
            <svg
              className={styles.successIcon}
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h4 className={styles.successTitle}>Application Submitted!</h4>
            <p className={styles.successText}>
              Your response has been saved. We have forwarded your profile and cover letter details to{' '}
              <strong>{internship.company_name}</strong>.
            </p>
            <button className={styles.okBtn} onClick={onClose}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
