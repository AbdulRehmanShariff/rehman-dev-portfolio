import React, { useState } from 'react';
import {
  Code2,
  BrainCircuit,
  Server,
  Layout,
  Database,
  Terminal,
  Cpu,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Container, Section, Heading, Badge } from '../../ui';
import { skillsData } from '../../../data/skillsData';
import './Skills.css';

export const Skills = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(skillsData.categories[0].id);

  const activeCategory =
    skillsData.categories.find((cat) => cat.id === selectedCategoryId) ||
    skillsData.categories[0];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={20} />;
      case 'BrainCircuit':
        return <BrainCircuit size={20} />;
      case 'Server':
        return <Server size={20} />;
      case 'Layout':
        return <Layout size={20} />;
      case 'Database':
        return <Database size={20} />;
      case 'Terminal':
        return <Terminal size={20} />;
      case 'Cpu':
        return <Cpu size={20} />;
      case 'BookOpen':
        return <BookOpen size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <Section id="skills" padding="lg" bg="secondary" className="skills-section">
      <Container size="xl">
        <div className="skills__header">
          <Badge variant="primary" size="md">
            {skillsData.header.badge}
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            {skillsData.header.title}
          </Heading>
          <p className="skills__subtitle">{skillsData.header.subtitle}</p>
        </div>

        {/* Dashboard 2-Column Layout */}
        <div className="skills__dashboard">
          {/* Left Column: Categories List */}
          <div className="skills__categories-grid" role="tablist" aria-label="Technology Categories">
            {skillsData.categories.map((cat) => {
              const isActive = cat.id === activeCategory.id;

              return (
                <div
                  key={cat.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  className={`skills__category-card ${
                    isActive ? 'skills__category-card--active' : ''
                  }`}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCategoryId(cat.id);
                    }
                  }}
                >
                  <div className="skills__category-header">
                    <div className="skills__category-title-wrap">
                      <div className="skills__category-icon">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="skills__category-title">{cat.title}</span>
                    </div>
                    <Badge variant={isActive ? 'primary' : 'outline'} size="sm">
                      {cat.techs.length} Techs
                    </Badge>
                  </div>

                  <div className="skills__category-chips-preview">
                    {cat.techs.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 'var(--font-xs)',
                          color: 'var(--text-muted)',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {cat.techs.length > 3 && (
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                        +{cat.techs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Category Detail Panel */}
          <div className="skills__detail-panel" role="tabpanel" tabIndex={0}>
            <div className="skills__detail-header">
              <div>
                <h3 className="skills__detail-title">{activeCategory.title}</h3>
                <Badge variant="secondary" size="sm" style={{ marginTop: '4px' }}>
                  {activeCategory.badge}
                </Badge>
              </div>
              <div className="skills__category-icon" style={{ width: '48px', height: '48px' }}>
                {getCategoryIcon(activeCategory.icon)}
              </div>
            </div>

            <p className="skills__detail-desc">{activeCategory.description}</p>

            {/* Tech Chips */}
            <div className="skills__tech-chips-block">
              <div className="skills__block-label">Technologies & Tools</div>
              <div className="skills__tech-chips">
                {activeCategory.techs.map((tech) => (
                  <span key={tech} className="skills__tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Typical Use Cases */}
            <div className="skills__tech-chips-block">
              <div className="skills__block-label">Applied Use Cases</div>
              <div className="skills__use-cases-grid">
                {activeCategory.useCases.map((uc, idx) => (
                  <div key={idx} className="skills__use-case-item">
                    <CheckCircle2 size={14} className="skills__bullet-icon" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Projects & Engineering Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div className="skills__block-label" style={{ marginBottom: '6px' }}>Demonstrated In</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeCategory.exampleProjects.map((p, idx) => (
                    <span key={idx} style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                      • {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="skills__block-label" style={{ marginBottom: '6px' }}>Engineering Concepts</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {activeCategory.related.map((r, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Skills;
