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
};

export function useInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

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
          .filter(Boolean);
        
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

      return true;
    });
  }, [internships, filters]);

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
    updateFilter,
    resetFilters,
  };
}
