import { useState, useEffect, useMemo } from 'react';
import { Internship, APIResponse, FilterState } from '../types';
import { parseDurationMonths } from '../utils/formatters';

const initialFilters: FilterState = {
  profile: '',
  location: '',
  workFromHome: false,
  partTime: false,
  ppo: false,
  duration: null,
  minStipend: 0,
  experience: '',
};

export function useInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeTab, setActiveTab] = useState<string>('internships');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/internships');
        if (!res.ok) {
          throw new Error('Failed to load internships');
        }
        const data: APIResponse = await res.json();
        
        // Convert map of internships to array using internship_ids for ordering
        const list = data.internship_ids
          .map(id => data.internships_meta[id])
          .filter(Boolean)
          .map((item, index) => {
            // Dynamically convert every 3rd item to a job for demonstration of the Jobs tab
            if (index % 3 === 0) {
              const experienceYears = (index % 4) + 1; // 1, 2, 3, or 4 years
              return {
                ...item,
                employment_type: 'job',
                experience: `${experienceYears} ${experienceYears === 1 ? 'Year' : 'Years'}`,
                job_experience: experienceYears,
                title: item.title
                  .replace(/internship/i, 'Engineer')
                  .replace(/intern/i, 'Developer')
                  .replace(/web development/i, 'Web Developer')
                  .replace(/software development/i, 'Software Engineer'),
                stipend: {
                  ...item.stipend,
                  salary: `₹ ${((experienceYears + 2) * 1.5).toFixed(1)} - ${((experienceYears + 4) * 2.0).toFixed(1)} LPA`,
                  salaryValue1: (experienceYears + 2) * 15000,
                }
              } as unknown as Internship;
            }
            return item;
          });
        
        setInternships(list);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute unique profiles dynamically
  const profiles = useMemo(() => {
    const set = new Set<string>();
    internships.forEach(item => {
      if (item.profile_name) set.add(item.profile_name);
    });
    return Array.from(set).sort();
  }, [internships]);

  // Compute unique locations dynamically
  const locations = useMemo(() => {
    const set = new Set<string>();
    internships.forEach(item => {
      item.location_names.forEach(loc => set.add(loc));
    });
    return Array.from(set).sort();
  }, [internships]);

  // Filtered list computed efficiently on state changes
  const filteredInternships = useMemo(() => {
    return internships.filter(item => {
      // 0. Filter by active tab (Internships vs Jobs)
      const isJob = item.employment_type === 'job';
      if (activeTab === 'internships' && isJob) {
        return false;
      }
      if (activeTab === 'jobs' && !isJob) {
        return false;
      }
      if (activeTab !== 'internships' && activeTab !== 'jobs') {
        // Safe placeholder for other tabs like 'courses' or 'post-resume'
        return false;
      }

      // 1. Profile filter
      if (filters.profile && item.profile_name !== filters.profile) {
        return false;
      }

      // 2. Location filter
      if (filters.location) {
        // If searching WFH specifically
        if (filters.location.toLowerCase() === 'work from home' && !item.work_from_home) {
          return false;
        }
        // General location matches
        if (filters.location.toLowerCase() !== 'work from home') {
          const hasLocation = item.location_names.some(
            loc => loc.toLowerCase().includes(filters.location.toLowerCase())
          );
          if (!hasLocation && !(item.work_from_home && filters.location.toLowerCase() === 'remote')) {
            return false;
          }
        }
      }

      // 3. Work from home checkbox
      if (filters.workFromHome && !item.work_from_home) {
        return false;
      }

      // 4. Part-time checkbox
      if (filters.partTime && !item.part_time) {
        return false;
      }

      // 5. PPO checkbox
      if (filters.ppo && !item.is_ppo) {
        return false;
      }

      // 6. Duration filter (max duration in months)
      if (filters.duration !== null) {
        const itemMonths = parseDurationMonths(item.duration);
        if (itemMonths > filters.duration) {
          return false;
        }
      }

      // 7. Min Stipend filter
      const stipendVal = item.stipend?.salaryValue1 || 0;
      if (stipendVal < filters.minStipend) {
        return false;
      }

      // 8. Years of Experience filter (only applies to Jobs tab)
      if (activeTab === 'jobs' && filters.experience) {
        const requiredExp = item.job_experience || (item.experience ? parseInt(item.experience, 10) : 0);
        const userExpLimit = parseInt(filters.experience, 10);
        // If job requires more experience than user selected, exclude it
        if (requiredExp > userExpLimit) {
          return false;
        }
      }

      return true;
    });
  }, [internships, filters, activeTab]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    internships,
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
  };
}
