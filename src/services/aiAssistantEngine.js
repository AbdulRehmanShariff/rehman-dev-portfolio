/**
 * Intelligent Local Knowledge Base & Intent Engine for Rehman Shariff's Portfolio
 * Fully updated with authentic data: KNSIT VTU 7.6 CGPA, 3 Real Internships, 6 GitHub Repos, Certifications & Direct Contact info.
 */

const cleanText = (str) => (str ? str.replace(/\*\*/g, '') : '');

class AiAssistantEngine {
  constructor() {
    this.context = {
      lastTopic: null,
      lastProjectId: null,
    };
  }

  setContext(topic, projectId = null) {
    this.context.lastTopic = topic;
    if (projectId) this.context.lastProjectId = projectId;
  }

  processQuery(userInput) {
    const rawInput = userInput.trim();
    const input = rawInput.toLowerCase();

    // 1. GREETINGS & ABOUT ME
    if (this.matchesAny(input, ['hi', 'hello', 'hey', 'greetings', 'who are you', 'tell me about yourself', 'about', 'bio', 'intro'])) {
      this.setContext('about');
      return {
        text: cleanText(`Hello! 👋 I'm Rehman Shariff's Portfolio AI Assistant.\n\nRehman is a graduating B.E. Engineer in Artificial Intelligence & Machine Learning (2022–2026 Batch, 7.6 CGPA) from K N S Institute Of Technology, Bengaluru (VTU Affiliated).\n\nHe has completed 3 industry internships (Verilegal.in, QSpiders Hebbal, and LearnX Wipro) and built 20+ software projects specializing in Python, Deep Learning, Computer Vision, and Full Stack Development.\n\nHow can I help you explore his portfolio today?`),
        suggestions: [
          'Tell me about yourself',
          'Education & VTU CGPA',
          '3 Internship experiences',
          'Deepfake Detection AI',
          'All 6 GitHub Projects',
          'Certifications',
          'Why hire Rehman?',
          'Contact & WhatsApp'
        ]
      };
    }

    // 2. EDUCATION & ACADEMICS
    if (this.matchesAny(input, ['education', 'degree', 'college', 'university', 'cgpa', 'vtu', 'knsit', 'kns', 'pu', 'puc', 'school', 'marks', 'academic'])) {
      this.setContext('education');
      return {
        text: cleanText(`🎓 Academic Background of Rehman Shariff:\n\n1. Bachelor of Engineering (B.E) in Artificial Intelligence & Machine Learning (2022 – 2026 Batch, 2026 Passout Graduate)\n   • College: K N S Institute Of Technology, Bengaluru (VTU Affiliated)\n   • Aggregate Score: 7.6 CGPA (First Class Distinction)\n   • Core Focus: AI & ML, Deep Learning, Computer Vision, NLP, DSA, DBMS, Software Engineering\n\n2. 2nd PU (Pre-University Education) (2019 – 2021 Batch, 2021 Passout)\n   • College: Vidhyanidhi PU Independent College, Bengaluru\n   • Stream: PCMC (Physics, Chemistry, Mathematics, Computer Science)\n   • Score: 61%`),
        suggestions: ['3 Internship experiences', 'Certifications', 'Deepfake Detection AI', 'Contact & WhatsApp']
      };
    }

    // 3. INTERNSHIPS & EXPERIENCE
    if (this.matchesAny(input, ['internship', 'experience', 'work', 'job', 'company', 'verilegal', 'qspiders', 'wipro', 'learnx', 'hebbal', 'practical'])) {
      this.setContext('experience');
      return {
        text: cleanText(`💼 Practical Industry Internships (3 Completed):\n\n1. Full Stack Developer Intern — Verilegal.in (May 2025 – August 2025 | Bengaluru)\n   • Developed responsive React.js web UIs, built Flask REST APIs, and designed MySQL relational database schemas.\n\n2. Python with Data Science Intern — QSpiders (Jan 22, 2026 – May 7, 2026 | Hebbal, Bengaluru)\n   • Worked on Python programming, Data Analysis, SQL/MySQL database querying, OOP design patterns, and SDLC best practices (USN: 1KN22AI039).\n\n3. Artificial Intelligence Trainee — LearnX Powered by Wipro (July 2025 – September 2025 | Online)\n   • Trained in Machine Learning fundamentals, TensorFlow, Keras deep neural networks, OpenCV image processing, and model performance evaluation.`),
        suggestions: ['Education & VTU CGPA', 'Certifications', 'All 6 GitHub Projects', 'Why hire Rehman?']
      };
    }

    // 4. CERTIFICATIONS & LICENSES
    if (this.matchesAny(input, ['certificate', 'certifications', 'license', 'qspiders cert', 'wipro cert', 'learnx cert', 'vtu degree'])) {
      this.setContext('certifications');
      return {
        text: cleanText(`📜 Verified Certifications & Licenses:\n\n1. Python with Data Science Internship & Completion Certificate\n   • Issuer: QSpiders (Test Yantra Software Solutions Pvt. Ltd.) | May 2026\n   • Credentials: CIN U72200KA2007PTC044701 | USN 1KN22AI039\n   • Features official 2-page Completion Certificate & Offer Letter.\n\n2. Artificial Intelligence Training Completion Certificate\n   • Issuer: LearnNex (Powered by Wipro DICE ID) | September 2025 (Code: LNA001)\n\n3. AI Internship Completion & AI Excellence Certificates\n   • Issuer: LearnNex (Powered by Wipro DICE ID) | September 2025 (Code: LNA001)\n\n4. B.E Artificial Intelligence & Machine Learning Degree\n   • Issuer: K N S Institute Of Technology (VTU Affiliated, 7.6 CGPA) | 2026`),
        suggestions: ['3 Internship experiences', 'Deepfake Detection AI', 'Contact & WhatsApp']
      };
    }

    // 5. DEEPFAKE DETECTION AI (PROJECT 1 & 5)
    if (this.matchesAny(input, ['deepfake', 'fake detection', 'deep learning project', 'cnn', 'opencv', 'keras', 'video detection'])) {
      this.setContext('project', 'deepfake-detection-system');
      return {
        text: cleanText(`🛡️ Deepfake Detection System Using Deep Learning\n\n• Problem: Rapid spread of synthetic media and deepfakes posing grave verification challenges.\n• Solution: Engineered a deep learning frame-by-frame analysis system utilizing Convolutional Neural Networks (CNN) and OpenCV for face tracking & spatial anomaly inspection.\n• Key Features: Real-time confidence score prediction, facial feature extraction, sub-120ms frame evaluation speed, and RESTful Flask API integrated with web frontend.\n• Tech Stack: Python, TensorFlow, Keras, OpenCV, Flask, React.js.`),
        suggestions: ['Smart Resume Screening', 'Secure Digital Election', 'Criminal Data Management', 'Contact & WhatsApp']
      };
    }

    // 6. SMART RESUME SCREENING (PROJECT 2)
    if (this.matchesAny(input, ['resume screening', 'candidate ranking', 'resume parser', 'nlp', 'job match'])) {
      this.setContext('project', 'smart-resume-screening-candidate-ranking-system');
      return {
        text: cleanText(`📄 Smart Resume Screening & Candidate Ranking System\n\n• Problem: Manual resume screening is slow, subjective, and prone to recruiter fatigue.\n• Solution: Built an automated NLP-driven resume parser that extracts skills, experience, and education from candidate PDFs/docs and ranks candidates against job descriptions.\n• Key Features: Automated keyword matching, candidate fit scoring, TF-IDF vectorization, and clean reporting dashboard.\n• Tech Stack: Python, Scikit-learn, NLTK/SpaCy, Flask, SQLite.`),
        suggestions: ['Deepfake Detection AI', 'Secure Digital Election', 'Show Python & AI skills']
      };
    }

    // 7. SECURE DIGITAL ELECTION (PROJECT 3)
    if (this.matchesAny(input, ['election', 'voting', 'secure election', 'digital election', 'e-voting'])) {
      this.setContext('project', 'secure-digital-election-platform');
      return {
        text: cleanText(`🗳️ Secure Digital Election Platform\n\n• Problem: Traditional voting lacks instant verification and real-time auditability.\n• Solution: Developed a secure web-based digital voting platform with voter authentication, encrypted vote casting, and real-time election tallying.\n• Key Features: Role-based admin controls, fraud prevention validation, real-time result chart visualizations.\n• Tech Stack: Python, Flask, MySQL, JavaScript, HTML5/CSS3.`),
        suggestions: ['Criminal Data Management', 'AI Study Assistant', 'Contact & WhatsApp']
      };
    }

    // 8. CRIMINAL DATA MANAGEMENT (PROJECT 4)
    if (this.matchesAny(input, ['criminal', 'database', 'law enforcement', 'suspect', 'sqlite', 'tkinter'])) {
      this.setContext('project', 'criminal-data-management');
      return {
        text: cleanText(`📁 Criminal Data Management System\n\n• Problem: Paper-based criminal records delay law enforcement operations.\n• Solution: Created a desktop record management system with normalized SQLite database tables, multi-parameter search indexing, and suspect mugshot file storage.\n• Key Features: Sub-second suspect record retrieval, CRUD operations, audit logs, and clean desktop GUI.\n• Tech Stack: Python, Tkinter, SQLite, SQL Indexing.`),
        suggestions: ['Deepfake Detection AI', 'Education & VTU CGPA', 'Contact & WhatsApp']
      };
    }

    // 9. ALL PROJECTS / GITHUB REPOS
    if (this.matchesAny(input, ['project', 'projects', 'github', 'repos', 'repository', 'builds', 'work', 'code', 'portfolio projects'])) {
      this.setContext('projects');
      return {
        text: cleanText(`💻 Rehman Shariff's Featured 6 GitHub Repositories:\n\n1. Deepfake Detection System Using Deep Learning (CNN + OpenCV + Flask)\n2. Smart Resume Screening & Candidate Ranking System (NLP + Python + Flask)\n3. Secure Digital Election Platform (Python + Flask + MySQL)\n4. Criminal Data Management System (Python + SQLite + Tkinter)\n5. Deepfake Video Detection Pipeline (Computer Vision + Deep Learning)\n6. AI Study Assistant / Face Detection System (OpenCV + Python)\n\nAll repositories feature complete source code and detailed documentation on GitHub (@AbdulRehmanShariff).`),
        suggestions: ['Deepfake Detection AI', '3 Internship experiences', 'Why hire Rehman?']
      };
    }

    // 10. SKILLS & TECHNOLOGIES
    if (this.matchesAny(input, ['skill', 'skills', 'tech', 'stack', 'languages', 'python', 'machine learning', 'ai', 'backend', 'frontend', 'sql', 'mysql', 'react'])) {
      this.setContext('skills');
      return {
        text: cleanText(`🛠️ Core Technical Expertise of Rehman Shariff:\n\n• Programming Languages: Python, JavaScript, SQL, HTML5, CSS3\n• Artificial Intelligence & ML: TensorFlow, Keras, OpenCV, Scikit-learn, NumPy, Pandas\n• Backend Engineering: Flask, REST API Development, Python Microservices\n• Frontend Engineering: React.js, JavaScript (ES6+), Vanilla CSS Design Systems\n• Databases & Version Control: MySQL, SQLite, Git, GitHub, VS Code\n• Practices: SDLC, Clean Code Modularity, Unit Testing, Agile Workflows`),
        suggestions: ['Education & VTU CGPA', '3 Internship experiences', 'Why hire Rehman?']
      };
    }

    // 11. WHY HIRE REHMAN
    if (this.matchesAny(input, ['why hire', 'why should i hire', 'hire', 'candidate', 'strengths', 'value', 'fresher', 'summary'])) {
      this.setContext('whyhire');
      return {
        text: cleanText(`🌟 Why Hire Rehman Shariff?\n\n1. Strong AI & Python Specialization: Solid hands-on experience developing deep learning models, computer vision pipelines, and Python backend APIs.\n2. 3 Practical Industry Internships: Real workplace experience at Verilegal.in, QSpiders Hebbal, and LearnX Wipro.\n3. Verified Academic Credentials: B.E in AI & Machine Learning from VTU with 7.6 CGPA.\n4. Fast Learning Agility & Clean Code: Committed to writing modular, maintainable code following SDLC standards.\n5. Immediate Availability: Ready for immediate onboarding as Python Developer, Software Engineer, or AI/ML Engineer in Bengaluru or Remote.`),
        suggestions: ['Contact & WhatsApp', 'Education & VTU CGPA', '3 Internship experiences', 'All 6 GitHub Projects']
      };
    }

    // 12. CONTACT & WHATSAPP
    if (this.matchesAny(input, ['contact', 'email', 'phone', 'mobile', 'whatsapp', 'linkedin', 'github', 'reach', 'connect', 'location', 'address', 'bengaluru'])) {
      this.setContext('contact');
      return {
        text: cleanText(`📬 Direct Contact Information for Rehman Shariff:\n\n• Email: rehmanshariff996@gmail.com\n• WhatsApp Direct Chat: +91 90360 69732 (Pre-filled chat available in Contact section)\n• LinkedIn Profile: linkedin.com/in/rehman-shariff-8a8071305\n• GitHub Account: github.com/AbdulRehmanShariff\n• Primary Location: Bengaluru, Karnataka, India\n• Status: Available for Immediate Start (Open for Onsite & Remote)`),
        suggestions: ['Why hire Rehman?', 'Education & VTU CGPA', '3 Internship experiences']
      };
    }

    // 13. TARGET ROLES & AVAILABILITY
    if (this.matchesAny(input, ['role', 'roles', 'job', 'position', 'seeking', 'looking for', 'joining', 'immediate', 'available'])) {
      this.setContext('roles');
      return {
        text: cleanText(`🎯 Target Roles & Joining Availability:\n\n• Target Roles: Python Developer, Software Engineer, AI/ML Engineer, Full Stack Developer\n• Availability: Immediate Joiner\n• Preferred Location: Bengaluru, India (Open for Remote, Hybrid, or Onsite)\n• Qualification: 2026 B.E AI & ML Graduate (7.6 CGPA, KNSIT VTU)`),
        suggestions: ['Contact & WhatsApp', 'Why hire Rehman?', 'All 6 GitHub Projects']
      };
    }

    // DEFAULT FALLBACK
    return {
      text: cleanText(`I can answer any questions about Rehman Shariff's portfolio! You can ask me about his B.E AI & ML degree (7.6 CGPA), 3 internships (QSpiders, Verilegal, LearnX Wipro), 6 GitHub projects (Deepfake Detection AI, Resume Screener, Election Platform), Certifications, or Direct Contact & WhatsApp details.`),
      suggestions: [
        'Tell me about yourself',
        'Education & VTU CGPA',
        '3 Internship experiences',
        'Deepfake Detection AI',
        'All 6 GitHub Projects',
        'Certifications',
        'Why hire Rehman?',
        'Contact & WhatsApp'
      ]
    };
  }

  matchesAny(input, keywords) {
    return keywords.some(kw => input.includes(kw));
  }
}

export const aiEngine = new AiAssistantEngine();
export default aiEngine;
