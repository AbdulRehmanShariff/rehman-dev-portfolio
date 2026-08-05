import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  Compass,
  FileText,
  CheckCircle,
  ExternalLink,
  Target,
  Download,
  BookOpen,
  Zap,
  MapPin,
  Calendar
} from 'lucide-react';
import { Container, Section, Heading, Badge, Button, ResumeModal } from '../../ui';
import { careerJourneyData } from '../../../data/careerJourneyData';
import { educationData } from '../../../data/educationData';
import { experienceData } from '../../../data/experienceData';
import { certificatesData } from '../../../data/certificatesData';
import { RESUME_PATH, RESUME_FILENAME } from '../../../constants/resumeConstants';
import './CareerJourney.css';

export const CareerJourney = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <Section id="career" padding="lg" bg="primary" className="career-section">
      <Container size="xl">
        {/* Header */}
        <div className="career__header">
          <Badge variant="primary" size="md">
            Professional Identity & Growth
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Career Journey & Engineering Profile
          </Heading>
          <p className="career__subtitle">
            A comprehensive overview of academic foundation, practical engineering internships, skill progression, and career vision.
          </p>
        </div>

        {/* SUB-SECTION 1: Career Journey Timeline */}
        <div className="career__sub-block">
          <div className="career__block-title">
            <Compass size={24} color="var(--color-primary)" />
            <span>Engineering Growth Timeline</span>
          </div>

          <div className="career__timeline">
            {careerJourneyData.map((item, index) => (
              <div key={index} className="career__timeline-item">
                <div className="career__timeline-node" />
                <div className="career__timeline-header">
                  <span className="career__timeline-year">{item.year}</span>
                  <Badge variant="outline" size="sm">
                    {item.category}
                  </Badge>
                </div>
                <h3 className="career__timeline-item-title">{item.title}</h3>
                <p className="career__timeline-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTION 2: Education */}
        <div className="career__sub-block">
          <div className="career__block-title">
            <GraduationCap size={24} color="var(--color-primary)" />
            <span>Academic Background</span>
          </div>

          <div className="career__edu-list">
            {educationData.map((edu, idx) => (
              <div key={idx} className="career__edu-card">
                <div className="career__edu-header">
                  <div>
                    <h3 className="career__edu-degree">{edu.degree} in {edu.field}</h3>
                    <div className="career__edu-college">{edu.institution}</div>
                    {edu.location && (
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                        📍 {edu.location}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Badge variant="primary" size="md">{edu.scoreLabel || `${edu.cgpa} CGPA`}</Badge>
                    <Badge variant="secondary" size="md">{edu.honor}</Badge>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-3)' }}>
                  {edu.description}
                </p>

                <div style={{ marginTop: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    RELEVANT COURSEWORK
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {edu.courses.map((c) => (
                      <Badge key={c} variant="default" size="sm">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTION 3: Internships & Practical Experience (Fresher Profile) */}
        <div id="experience" className="career__sub-block" style={{ scrollMarginTop: '100px' }}>
          <div className="career__block-title">
            <Briefcase size={24} color="var(--color-secondary)" />
            <span>Internships & Practical Experience</span>
          </div>

          <div className="career__intern-grid">
            {experienceData.map((exp) => (
              <div key={exp.id} className="career__intern-card">
                <div className="career__intern-header">
                  <div>
                    <h3 className="career__intern-role">{exp.role}</h3>
                    <div className="career__intern-company">{exp.company}</div>
                  </div>
                  <Badge variant="outline" size="sm">{exp.period}</Badge>
                </div>

                <div className="career__intern-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} /> {exp.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={13} /> {exp.period}
                  </span>
                </div>

                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                  {exp.description}
                </p>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div style={{ marginTop: 'var(--space-3)' }}>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                      KEY RESPONSIBILITIES & LEARNINGS
                    </span>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '18px', margin: 0, fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} style={{ marginBottom: '4px' }}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: 'var(--space-4)' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    TECHNOLOGIES APPLIED
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {exp.technologies.map((t) => (
                      <Badge key={t} variant="primary" size="sm">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTION 4: Verified Certifications */}
        <div className="career__sub-block">
          <div className="career__block-title">
            <Award size={24} color="var(--color-warning)" />
            <span>Verified Certifications & Licenses</span>
          </div>

          <div className="career__cert-grid">
            {certificatesData.map((cert) => (
              <div key={cert.id} className="career__cert-card">
                <div>
                  <h3 className="career__cert-title">{cert.title}</h3>
                  <div className="career__cert-issuer">{cert.issuer} • {cert.issueDate}</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Credential ID: {cert.credentialId}
                  </div>
                  {cert.description && (
                    <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 'var(--leading-relaxed)' }}>
                      {cert.description}
                    </p>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-4)' }}>
                    {cert.skills.map((s) => (
                      <Badge key={s} variant="outline" size="sm">{s}</Badge>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <Button
                      as="a"
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                      iconLeft={ExternalLink}
                    >
                      {cert.secondaryLink ? 'Completion Cert (Page 2)' : 'View Credential'}
                    </Button>

                    {cert.secondaryLink && (
                      <Button
                        as="a"
                        href={cert.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="sm"
                        iconLeft={ExternalLink}
                      >
                        Offer Letter (Page 1)
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTIONS 5 & 6: Core Technical Competencies & Career Readiness */}
        <div className="career__sub-block">
          <div className="career__two-col-grid">
            {/* Core Technical Competencies */}
            <div className="career__info-card">
              <div className="career__block-title" style={{ marginBottom: 'var(--space-2)' }}>
                <Zap size={22} color="var(--color-primary)" />
                <span>Core Technical Competencies</span>
              </div>

              <div className="career__list-item">
                <CheckCircle size={16} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>Python Backend & API Engineering</strong>: Building RESTful endpoints with Flask microservices, request routing, and MySQL/SQLite database integration.</span>
              </div>
              <div className="career__list-item">
                <CheckCircle size={16} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>AI & Computer Vision</strong>: Data preprocessing, TensorFlow/Keras neural networks, and real-time video frame processing with OpenCV.</span>
              </div>
              <div className="career__list-item">
                <CheckCircle size={16} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>Full-Stack Web UIs</strong>: Developing responsive user interfaces using React.js, JavaScript, HTML5, CSS3, and design systems.</span>
              </div>
              <div className="career__list-item">
                <CheckCircle size={16} color="var(--color-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>SDLC & Version Control</strong>: Practicing Git/GitHub branch workflows, structured issue tracking, and writing clean modular code.</span>
              </div>
            </div>

            {/* Career Readiness & Target Roles */}
            <div className="career__info-card">
              <div className="career__block-title" style={{ marginBottom: 'var(--space-2)' }}>
                <Target size={22} color="var(--color-secondary)" />
                <span>Career Readiness & Target Roles</span>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
                  TARGET FULL-TIME ROLES
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <Badge variant="primary" size="sm">Python Developer</Badge>
                  <Badge variant="secondary" size="sm">Software Engineer</Badge>
                  <Badge variant="outline" size="sm">AI / ML Engineer</Badge>
                  <Badge variant="default" size="sm">Full Stack Developer</Badge>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                <div>
                  <strong>Availability</strong>: Immediate Joiner | Bengaluru (Open for Remote & Onsite)
                </div>
                <div>
                  <strong>Academic Credential</strong>: B.E in AI & ML (KNSIT / VTU, 2022–2026 Batch)
                </div>
                <div>
                  <strong>Practical Experience</strong>: 3 Industry Internships (QSpiders, Verilegal.in, LearnX Wipro)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-SECTION 9: Resume Action CTA */}
        <div className="career__resume-cta">
          <FileText size={44} color="var(--color-primary)" />
          <Heading level={3}>Ready to review the complete resume?</Heading>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px' }}>
            Download a structured PDF resume or inspect the live preview directly within the browser.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button
              onClick={() => setShowResumeModal(true)}
              variant="primary"
              size="md"
              iconLeft={BookOpen}
            >
              View Resume
            </Button>
            <Button
              as="a"
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              variant="secondary"
              size="md"
              iconLeft={Download}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* Reusable Interactive PDF Viewer Modal */}
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
        />
      </Container>
    </Section>
  );
};

export default CareerJourney;
