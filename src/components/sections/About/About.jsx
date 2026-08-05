import React from 'react';
import { ShieldCheck, Cpu, Target, Sparkles } from 'lucide-react';
import { Container, Section, Heading, Card, Badge } from '../../ui';
import { aboutData } from '../../../data/aboutData';
import './About.css';

export const About = () => {
  const getCardIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={20} />;
      case 'Cpu':
        return <Cpu size={20} />;
      case 'Target':
        return <Target size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  return (
    <Section id="about" padding="lg" bg="secondary" className="about-section">
      <Container size="xl">
        <div className="about__header">
          <Badge variant="primary" size="md">
            Story & Philosophy
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            {aboutData.sectionTitle}
          </Heading>
          <p className="about__subtitle">{aboutData.subtitle}</p>
        </div>

        <div className="about__grid">
          {/* Left Side: Large Visual Card */}
          <div className="about__visual-card">
            <div className="about__visual-content-wrapper">
              <div className="about__visual-header">
                <Heading level={3}>{aboutData.visualCard.title}</Heading>
                <Badge variant="secondary">{aboutData.visualCard.badge}</Badge>
              </div>

              <div className="about__image-container">
                <img
                  src="/about_workspace.jpg"
                  alt="AI & Software Engineering Workspace"
                  className="about__profile-img"
                />
              </div>
            </div>

            <div className="about__stats-grid">
              {aboutData.visualCard.stats.map((stat, idx) => (
                <div key={idx} className="about__stat-item">
                  <div className="about__stat-value">{stat.value}</div>
                  <div className="about__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Information Cards */}
          <div className="about__right">
            <div className="about__intro-card">
              {aboutData.introduction.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ marginBottom: pIdx === 0 ? 'var(--space-4)' : 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about__info-cards">
              {aboutData.cards.map((card) => (
                <Card key={card.id} hoverable className="about__info-card">
                  <div className="about__info-card-header">
                    <div className="about__info-card-title">
                      <div className="about__info-card-icon">
                        {getCardIcon(card.icon)}
                      </div>
                      <span>{card.title}</span>
                    </div>
                    <Badge variant="outline" size="sm">
                      {card.badge}
                    </Badge>
                  </div>
                  <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                    {card.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
