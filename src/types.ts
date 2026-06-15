export interface RobloxGame {
  id: string;
  title: string;
  description: string;
  plays: string;
  genre: string;
  techStacked: string[];
  luaSnippet: string;
  gamePlayInstructions: string;
  visualThumbnailUrl?: string;
  url?: string;
}

export interface FullStackProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  visualThumbnailUrl?: string;
  databaseSchema?: {
    table: string;
    columns: { name: string; type: string; desc: string }[];
  }[];
}

export interface ResearchPaper {
  title: string;
  journal: string;
  abstract: string;
  date: string;
  keywords: string[];
  findings: string;
}

export interface CourseTaught {
  id: string;
  code: string;
  title: string;
  level: 'Undergraduate' | 'Graduate' | 'Corporate Training';
  description: string;
  semester: string;
  syllabus: string[];
  activeStudents: number;
}

export interface ESPLesson {
  id: string;
  topic: string;
  targetProfession: string; // e.g. "Software Engineers", "Information Security Officers"
  objectives: string[];
  vocabularyList: { word: string; definition: string; example: string }[];
  interactiveQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  skillsVerified: string[];
  description: string;
  certType: 'Technical' | 'Educational' | 'Academic';
}

export interface MSITProject {
  title: string;
  description: string;
  techStack: string[];
  findings?: string;
  visualThumbnailUrl?: string;
}

export interface MSITSubject {
  code: string;
  title: string;
  description: string;
  year: 'First Year' | 'Second Year';
  semester: 'First Semester' | 'Second Semester' | 'Summer' | 'Residency';
  rating?: string; // e.g. "1.0", "1.2", or "—"
  projects: MSITProject[];
}

