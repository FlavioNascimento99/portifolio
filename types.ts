export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  subtitle?: string;
  techStack: string[];
  media?: ProjectMedia[];
  link?: string;
  access?: ProjectAccess;
  color: string; // Tailwind color class for bg
}

export interface ProjectAccess {
  kind: 'private';
  note: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  logo?: string;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export enum SectionType {
  ABOUT = 'about',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact'
}
