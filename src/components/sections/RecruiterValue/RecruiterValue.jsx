import React from 'react';
import {
  Brain,
  Code2,
  Database,
  Zap,
  CheckCircle2,
  FileText,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Container, Section, Heading, Badge, Button } from '../../ui';
import './RecruiterValue.css';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const RecruiterValue = () => {
  const pillars = [
    {
      id: 'ai-backend',
      title: 'AI & Backend Engineering',
      icon: Brain,
      description: 'Hands-on experience developing deep learning computer vision models in Python and serving them via RESTful Flask/FastAPI microservices.',
      bullets: [
        'TensorFlow, Keras & OpenCV pipelines',
        'RESTful API gateway design',
        'Model inference latency optimization'
      ]
    },
    {
      id: 'clean-code',
      title: 'Clean Code & SDLC Discipline',
      icon: Code2,
      description: 'Committed to writing self-documenting, modular Python & React code following standard SDLC practices and Git flow version control.',
      bullets: [
        'Modular, readable architecture',
        'Git branching & pull requests',
        'Comprehensive documentation'
      ]
    },
    {
      id: 'database-design',
      title: 'Database Architecture',
      icon: Database,
      description: 'Proficient in designing normalized relational database schemas in PostgreSQL & SQLite with thread-safe queries.',
      bullets: [
        'Normalized schema design',
        'SQL query indexing & sanitization',
        'Relational data persistence'
      ]
    },
    {
      id: 'agility',
      title: 'High Learning Agility',
      icon: Zap,
      description: 'Adaptable graduate eager to rapidly adopt company tech stacks, collaborate in engineering teams, and deliver production features.',
      bullets: [
        'Fast onboarding to new tools',
        'Cross-functional collaboration',
        'Strong problem-solving foundation'
      ]
    }
  ];

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="why-hire" padding="lg" bg="secondary" className="recruiter-section">
      <Container size="xl">
        {/* Header */}
        <div className="recruiter__header">
          <Badge variant="primary" size="md">
            Recruiter Value Proposition
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Why Hire Rehman Shariff?
          </Heading>
          <p className="recruiter__subtitle">
            A high-potential B.E AI & ML graduate delivering clean code, practical internship experience, and full-stack AI engineering capabilities.
          </p>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="recruiter__grid">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;

            return (
              <div key={pillar.id} className="recruiter__card">
                <div className="recruiter__card-icon">
                  <IconComponent size={24} />
                </div>

                <div>
                  <h3 className="recruiter__card-title">{pillar.title}</h3>
                  <p className="recruiter__card-desc" style={{ marginTop: 'var(--space-2)' }}>
                    {pillar.description}
                  </p>
                </div>

                <div className="recruiter__card-bullets">
                  {pillar.bullets.map((bText, idx) => (
                    <div key={idx} className="recruiter__bullet-item">
                      <CheckCircle2 size={13} color="var(--color-success)" />
                      <span>{bText}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recruiter Action Banner */}
        <div className="recruiter__banner">
          <div className="recruiter__banner-text">
            <h3 className="recruiter__banner-title">Ready to Discuss Engineering Opportunities?</h3>
            <p className="recruiter__banner-desc">
              Currently open for Full-Time Software Engineer, Python Backend Developer, and AI/ML Engineer roles. View verified resume or get in touch directly.
            </p>
          </div>

          <div className="recruiter__banner-actions">
            <Button
              onClick={() => handleScrollTo('career')}
              variant="primary"
              size="md"
              iconLeft={FileText}
            >
              View Resume & Certificates
            </Button>

            <Button
              as="a"
              href="mailto:rehmanshariff996@gmail.com"
              variant="secondary"
              size="md"
              iconLeft={Mail}
            >
              Direct Email Inquiry
            </Button>

            <Button
              as="a"
              href="https://github.com/AbdulRehmanShariff"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
              iconLeft={GithubIcon}
            >
              GitHub <ExternalLink size={12} style={{ marginLeft: 4 }} />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default RecruiterValue;
