import { RESUME_PATH } from '../constants/resumeConstants';

export const profileData = {
  greeting: "Python Developer | AI & ML Engineer",
  name: "Rehman Shariff",
  title: "Python Developer | AI & ML Engineer",
  summary: [
    "B.E. graduate in Artificial Intelligence & Machine Learning passionate about building AI-powered applications using Python, Flask, React, and TensorFlow. Seeking an opportunity to contribute, learn from experienced engineers, and grow as a Software Engineer."
  ],
  highlights: [
    { id: 'degree', label: 'B.E AI & ML' },
    { id: 'internships', label: '3 Internships' },
    { id: 'projects', label: '6 Projects' },
    { id: 'location', label: 'Bengaluru' }
  ],
  actions: {
    primary: { label: "Explore My Work", href: "#projects" },
    secondary: { label: "Download Resume", href: RESUME_PATH },
    ghost: { label: "Contact Me", href: "#contact" }
  },
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/AbdulRehmanShariff', icon: 'Github' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/rehman-shariff-8a8071305', icon: 'Linkedin' }
  ],
  techBadges: [
    'Python',
    'React',
    'Flask',
    'TensorFlow',
    'FastAPI',
    'Git'
  ]
};

export default profileData;
