export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  techStack: string[];
  impact: string;
  githubUrl: string;
  demoUrl?: string;
  category: 'Business' | 'Product' | 'Sales' | 'Finance';
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
    change: string;
  }[];
}

export interface Skill {
  name: string;
  category: 'Análisis' | 'Datos' | 'Negocio';
  level: number; // 1-5 or 0-100
  iconName: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  metricsMoved: {
    label: string;
    value: string;
  }[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}
