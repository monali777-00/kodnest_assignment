export interface Stipend {
  salary: string;
  salaryValue1: number;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
  large_stipend_text?: boolean;
}

export interface LocationDetail {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
}

export interface ApplicationStatusMessage {
  to_show: boolean;
  message: string;
  type: string;
}

export interface Internship {
  id: number;
  title: string;
  employment_type: string;
  company_name: string;
  company_url?: string;
  company_logo: string;
  work_from_home: boolean;
  location_names: string[];
  locations: LocationDetail[];
  start_date: string;
  duration: string;
  stipend: Stipend;
  posted_on: string;
  postedOnDateTime: number;
  application_deadline: string;
  profile_name: string;
  part_time: boolean;
  is_ppo: boolean;
  ppo_label_value: string;
  office_days: string | null;
  labels?: Array<{ label_value: string[]; label_mobile: string[]; label_app: string[] }>;
  is_active?: boolean;
  expires_at?: string;
}

export interface APIResponse {
  internships_meta: Record<string, Internship>;
  internship_ids: number[];
}

export interface FilterState {
  profile: string;
  location: string;
  workFromHome: boolean;
  partTime: boolean;
  ppo: boolean;
  duration: number | null; // Max duration in months, or exactly X months. Let's do max or dropdown value.
  minStipend: number;
  experience: string; // Years of experience: "", "0", "1", "2", "3", "5", etc.
}
