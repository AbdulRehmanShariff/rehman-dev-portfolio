import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Container, Section, Heading, Badge, Button } from '../../ui';
import { projectsData } from '../../../data/projectsData';
import './Projects.css';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects = () => {
  return (
    <Section id="projects" padding="lg" bg="primary" className="projects-section">
      <Container size="xl">
        <div className="projects__header">
          <Badge variant="primary" size="md">
            Engineering Case Studies
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Featured Software Systems
          </Heading>
          <p className="projects__subtitle">
            Architectural case studies demonstrating deep learning computer vision, automated candidate NLP screening, secure digital voting platforms, and relational database systems.
          </p>
        </div>

        <div className="projects__list">
          {projectsData.map((project, index) => {
            const isAlternateRight = index % 2 !== 0;

            return (
              <article
                key={project.id}
                className={`projects__card ${
                  isAlternateRight ? 'projects__card--alternate-right' : ''
                }`}
              >
                {/* Image Column */}
                <div className="projects__image-col">
                  <div className="projects__image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="projects__img"
                      loading="lazy"
                    />
                    <div className="projects__badges-overlay">
                      <Badge variant="primary" size="sm">
                        {project.type}
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="projects__content-col">
                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__description">{project.shortDescription}</p>

                  {/* Engineering Metrics Grid */}
                  <div className="projects__metrics-grid">
                    <div className="projects__metric-item">
                      <span className="projects__metric-lbl">Dev Time</span>
                      <span className="projects__metric-val">{project.metrics.devTime}</span>
                    </div>
                    <div className="projects__metric-item">
                      <span className="projects__metric-lbl">Role</span>
                      <span className="projects__metric-val">{project.metrics.role}</span>
                    </div>
                    <div className="projects__metric-item">
                      <span className="projects__metric-lbl">Team</span>
                      <span className="projects__metric-val">{project.metrics.teamSize}</span>
                    </div>
                    <div className="projects__metric-item">
                      <span className="projects__metric-lbl">Version</span>
                      <span className="projects__metric-val">{project.metrics.version}</span>
                    </div>
                  </div>

                  {/* Key Features Checklist */}
                  <div className="projects__features-list">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="projects__feature-item">
                        <CheckCircle size={14} className="projects__feature-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Chips */}
                  <div className="projects__tech-row">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="projects__actions">
                    <Button
                      as={Link}
                      to={`/projects/${project.id}`}
                      variant="primary"
                      size="md"
                      iconRight={ArrowRight}
                    >
                      Read Case Study
                    </Button>

                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                      iconLeft={GithubIcon}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Projects;
