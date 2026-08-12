export interface SkillItem {
  name: string;
  level: number; // 0–100 proficiency
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  detail: string;
  location: string;
  period: string;
}

export const PROFILE = {
  name: 'Sonam Yadav',
  title: 'Full-Stack Software Developer',
  tagline:
    'Building performant, maintainable web applications with clean architecture and thoughtful system design.',
  summary:
    'Full-stack Software Developer skilled in frontend frameworks and backend APIs, with experience in database integration and system design. Focused on performance optimization, writing clean, maintainable code for real-world applications.',
  email: 'sonamyadav.7198@gmail.com',
  phone: '+91-7415561101',
  location: 'Bhopal, India',
  linkedin: 'https://www.linkedin.com/in/sonam-yadav-71645420a/',
  github: 'https://github.com/Sonamyadav6768',
  resume: 'Sonam_Yadav_Resume.pdf',
};

export const STATS = [
  { value: '1+', label: 'Years Experience' },
  { value: '25+', label: 'UI Components Built' },
  { value: '20+', label: 'REST APIs Integrated' },
  { value: '8.99', label: 'CGPA / 10' },
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Programming',
    icon: 'code',
    items: [
      { name: 'Java', level: 85 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    category: 'Frontend',
    icon: 'monitor',
    items: [
      { name: 'Angular', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 90 },
      { name: 'Bootstrap', level: 85 },
      { name: 'RxJS', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    items: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'Spring Boot', level: 75 },
      { name: 'JDBC', level: 75 },
    ],
  },
  {
    category: 'Databases',
    icon: 'database',
    items: [
      { name: 'SQL', level: 85 },
      { name: 'MongoDB', level: 80 },
    ],
  },
  {
    category: 'Tools & Cloud',
    icon: 'cloud',
    items: [
      { name: 'Git', level: 88 },
      { name: 'GitLab', level: 82 },
      { name: 'Postman', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'AWS (EC2, S3)', level: 75 },
    ],
  },
  {
    category: 'AI',
    icon: 'sparkles',
    items: [
      { name: 'Generative AI', level: 78 },
      { name: 'Agentic AI', level: 72 },
      { name: 'Prompt Engineering', level: 80 },
    ],
  },
  {
    category: 'Concepts',
    icon: 'layers',
    items: [
      { name: 'OOP', level: 90 },
      { name: 'DBMS', level: 85 },
      { name: 'System Design Patterns', level: 78 },
      { name: 'Microservices', level: 75 },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'IIFE Tech',
    role: 'Associate Software Developer',
    location: 'Bhopal, India',
    period: 'June 2025 – Present',
    summary:
      'Built DataRisk Manager, an enterprise data & risk management platform adopted by 5+ internal teams — containerized with Docker and deployed on AWS.',
    stack: ['Angular', 'TypeScript', 'REST APIs', 'Docker', 'AWS (EC2, S3)', 'HTML5', 'CSS3'],
    highlights: [
      'Developed DataRisk Manager, an enterprise application for internal data and risk management, adopted by 5+ internal teams.',
      'Built 10+ interactive dashboards for managing systems, sources, controls, contracts, and data lineage, reducing manual reporting effort by 30%.',
      'Integrated frontend modules with 20+ REST APIs, enabling real-time data handling and cutting page load times by 25%.',
      'Containerized the application using Docker and deployed it on AWS (EC2, S3), reducing deployment time by 40%.',
      'Created 25+ reusable and responsive UI components using Angular, TypeScript, HTML, and CSS, accelerating feature delivery by 20%.',
      'Improved internal workflow efficiency by 35% through data tracking, monitoring, and reporting features.',
    ],
  },
  {
    company: 'Biz2X',
    role: 'Associate Software Developer',
    location: 'Noida, India',
    period: 'Aug 2024 – May 2025',
    summary:
      'Engineered a single-page loan management dashboard and an EMI payment history module, refactoring legacy code into a modular, scalable architecture.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'JavaScript', 'SQL'],
    highlights: [
      'Engineered a single-page loan management dashboard, reducing workflow complexity and improving efficiency by 40%.',
      'Refactored legacy code into a modular architecture, increasing maintainability and scalability by 80%.',
      'Centralized loan data access, boosting user engagement by 50% and reducing retrieval time by 60%.',
      'Developed an EMI Payment History module covering 1,000+ transactions, reducing manual tracking effort by 45%.',
      'Implemented a dual-loan workflow, optimizing processing for 3+ loan types and improving system throughput by 30%.',
      'Resolved 50+ production bugs and optimized application performance by 25% through code refactoring and debugging.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Lakshmi Narain College of Technology, Bhopal',
    degree: 'B.Tech in Computer Science and Engineering',
    detail: 'CGPA: 8.99 / 10',
    location: 'Madhya Pradesh, India',
    period: '2020 – 2024',
  },
];

export const CERTIFICATIONS = [
  'Completed Angular Framework training with hands-on experience in end-to-end application development.',
  'Certified in Full-Stack Web Development, covering frontend, backend, and database integration.',
  'Secured Runner-Up position among 20+ teams in a team hackathon.',
];
