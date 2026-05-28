import React from 'react';
import styles from './FilterSidebar.module.css';
import { FilterState } from '../../types';
import { formatStipend } from '../../utils/formatters';

interface FilterSidebarProps {
  filters: FilterState;
  profiles: string[];
  locations: string[];
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

export default function FilterSidebar({
  filters,
  profiles,
  locations,
  updateFilter,
  resetFilters,
}: FilterSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <svg
            className={styles.icon}
            width="18"
            height="18"
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
        </h3>
        <button className={styles.clearBtn} onClick={resetFilters}>
          Clear All
        </button>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="profile-select">Profile</label>
        <select
          id="profile-select"
          className={styles.select}
          value={filters.profile}
          onChange={(e) => updateFilter('profile', e.target.value)}
        >
          <option value="">e.g. Marketing, Web Design</option>
          {profiles.map((prof) => (
            <option key={prof} value={prof}>
              {prof}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="location-select">Location</label>
        <select
          id="location-select"
          className={styles.select}
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
        >
          <option value="">e.g. Delhi, remote</option>
          <option value="Work from home">Work from home</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.sliderHeader}>
          <label className={styles.label}>Minimum Stipend</label>
          <span className={styles.sliderValue}>
            {filters.minStipend === 0 ? 'Any' : `${formatStipend(filters.minStipend)}`}
          </span>
        </div>
        <input
          type="range"
          className={styles.slider}
          min="0"
          max="30000"
          step="2000"
          value={filters.minStipend}
          onChange={(e) => updateFilter('minStipend', parseInt(e.target.value, 10))}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label} htmlFor="duration-select">Max Duration (Months)</label>
        <select
          id="duration-select"
          className={styles.select}
          value={filters.duration || ''}
          onChange={(e) =>
            updateFilter(
              'duration',
              e.target.value ? parseInt(e.target.value, 10) : null
            )
          }
        >
          <option value="">Choose Duration</option>
          <option value="1">1 Month</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
          <option value="4">4 Months</option>
          <option value="5">5 Months</option>
          <option value="6">6 Months</option>
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.workFromHome}
            onChange={(e) => updateFilter('workFromHome', e.target.checked)}
          />
          Work from home
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.partTime}
            onChange={(e) => updateFilter('partTime', e.target.checked)}
          />
          Part-time
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.ppo}
            onChange={(e) => updateFilter('ppo', e.target.checked)}
          />
          Job offer (PPO)
        </label>
      </div>
    </aside>
  );
}
