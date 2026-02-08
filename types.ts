export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  color: string; // Tailwind color class for bg
}

export interface Skill {
  category: string;
  items: string[];
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
