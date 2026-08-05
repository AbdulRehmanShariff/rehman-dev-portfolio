import React from 'react';
import { Calendar, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import { Container, Section, Heading, Badge } from '../../ui';
import { experienceData } from '../../../data/experienceData';
import './Experience.css';

export const Experience = () => {
  return (
    <Section id="experience" padding="lg" bg="primary" className="experience-section">
      <Container size="xl">
        <div className="experience__header">
          <Badge variant="primary" size="md">
            Learning Journey
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Internship Experience
          </Heading>
          <p className="experience__subtitle">
            Building practical software engineering skills through internships, collaboration, and real-world development.
          </p>
        </div>

        <div className="experience__timeline">
          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`experience__item ${
                  isEven ? 'experience__item--left' : 'experience__item--right'
                }`}
              >
                <div className="experience__node" aria-hidden="true">
                  <Briefcase size={18} />
                </div>

                <div className="experience__item-inner">
                  <div className="experience__card">
                    <div className="experience__card-header">
                      <div>
                        <div className="experience__company">{item.company}</div>
                        <div className="experience__role">{item.role}</div>
                      </div>
                      <div className="experience__meta">
                        <div className="experience__meta-item">
                          <Calendar size={13} />
                          <span>{item.duration}</span>
                        </div>
                        <div className="experience__meta-item">
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="experience__description">{item.description}</p>

                    {item.achievements && item.achievements.length > 0 && (
                      <div className="experience__achievements">
                        <div className="experience__achievements-title">Key Contributions</div>
                        <ul className="experience__achievement-list">
                          {item.achievements.map((ach, idx) => (
                            <li key={idx} className="experience__achievement-item">
                              <CheckCircle2 size={13} className="experience__achievement-bullet" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="experience__tech-list">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Experience;
