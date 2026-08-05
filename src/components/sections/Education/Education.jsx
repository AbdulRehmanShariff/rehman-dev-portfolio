import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, Star } from 'lucide-react';
import { Container, Section, Heading, Badge } from '../../ui';
import { educationData } from '../../../data/educationData';
import './Education.css';

export const Education = () => {
  return (
    <Section id="education" padding="lg" bg="secondary" className="education-section">
      <Container size="xl">
        <div className="education__header">
          <Badge variant="secondary" size="md">
            Academic Background
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Education & Qualifications
          </Heading>
          <p className="education__subtitle">
            Academic foundation in Artificial Intelligence, Computer Science, and Engineering.
          </p>
        </div>

        <div className="education__grid">
          {educationData.map((edu) => (
            <div key={edu.id} className="education__card">
              <div className="education__card-top">
                <div className="education__institution-row">
                  <div className="education__icon-box">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <div className="education__institution">{edu.institution}</div>
                    <div className="education__degree">{edu.degree}</div>
                  </div>
                </div>

                <div className="education__meta">
                  <Badge variant="primary" size="sm">
                    <Award size={12} style={{ marginRight: '4px' }} />
                    {edu.gpa}
                  </Badge>
                  <div className="education__meta-item" style={{ marginTop: '6px' }}>
                    <Calendar size={13} />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="education__meta-item">
                    <MapPin size={13} />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>

              {edu.courses && edu.courses.length > 0 && (
                <div className="education__courses-block">
                  <div className="education__block-title">Key Coursework</div>
                  <div className="education__course-tags">
                    {edu.courses.map((course) => (
                      <Badge key={course} variant="outline" size="sm">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <div className="education__achievements-block">
                  <div className="education__block-title">Academic Highlights & Honors</div>
                  <ul className="education__achievement-list">
                    {edu.achievements.map((ach, idx) => (
                      <li key={idx} className="education__achievement-item">
                        <Star size={14} className="education__achievement-star" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Education;
