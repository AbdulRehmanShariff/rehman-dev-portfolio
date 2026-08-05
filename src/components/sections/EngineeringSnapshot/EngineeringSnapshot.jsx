import React from 'react';
import {
  FolderGit2,
  FolderCode,
  Brain,
  Briefcase,
  Award,
  Layers,
  Calendar,
  Sparkles,
  Rocket,
  Code2,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Container, Section, Heading, Badge } from '../../ui';
import { useGithubData } from '../../../hooks/useGithubData';
import { githubConfig } from '../../../data/githubConfig';
import './EngineeringSnapshot.css';

export const EngineeringSnapshot = () => {
  const { data } = useGithubData(githubConfig.username, githubConfig.featuredRepos);

  const publicReposCount = data?.profile?.public_repos || 17;

  const handleCardClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const metricCards = [
    {
      id: 'repos',
      value: `${publicReposCount}`,
      label: 'GitHub Repositories',
      subtext: 'Live public repositories',
      targetId: 'github',
      icon: FolderGit2
    },
    {
      id: 'projects',
      value: '20+',
      label: 'Projects Built',
      subtext: 'Total software builds',
      targetId: 'projects',
      icon: FolderCode
    },
    {
      id: 'ai-projects',
      value: '2',
      label: 'AI & ML Projects',
      subtext: 'Deepfake & face detection',
      targetId: 'projects',
      icon: Brain
    },
    {
      id: 'internships',
      value: '3',
      label: 'Internship Experience',
      subtext: 'Verilegal, QSpiders & LearnX',
      targetId: 'career',
      icon: Briefcase
    },
    {
      id: 'certificates',
      value: '4',
      label: 'Certifications',
      subtext: 'Python, TensorFlow, OpenCV, SQL',
      targetId: 'career',
      icon: Award
    },
    {
      id: 'techs',
      value: '15+',
      label: 'Technologies',
      subtext: 'Languages, frameworks & tools',
      targetId: 'skills',
      icon: Layers
    },
    {
      id: 'journey',
      value: '2022',
      label: 'Programming Journey',
      subtext: '4 years active coding',
      targetId: 'career',
      icon: Calendar
    },
    {
      id: 'specialization',
      value: 'AI & ML',
      label: 'Specialization',
      subtext: 'Artificial Intelligence & ML',
      targetId: 'skills',
      icon: Sparkles
    }
  ];

  const highlightItems = [
    {
      title: 'Fast Learning Agility',
      desc: 'Rapidly learning new frameworks, technologies & engineering standards.',
      icon: Rocket
    },
    {
      title: 'Python & AI Focus',
      desc: 'Hands-on computer vision & deep learning with TensorFlow, Keras & OpenCV.',
      icon: Brain
    },
    {
      title: 'Practical Experience',
      desc: '3 practical software development & AI engineering internships completed.',
      icon: Briefcase
    },
    {
      title: 'Clean Code & SDLC',
      desc: 'Writing modular Python & React code following SDLC & Git version control.',
      icon: Code2
    },
    {
      title: 'Academic Background',
      desc: 'B.E in AI & Machine Learning from KNSIT (VTU Affiliated, 7.6 CGPA).',
      icon: Award
    }
  ];

  return (
    <Section id="snapshot" padding="lg" bg="primary" className="snapshot-section">
      <Container size="xl">
        {/* Header */}
        <div className="snapshot__header">
          <Badge variant="primary" size="md">
            Quick Overview
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Engineering Snapshot
          </Heading>
          <p className="snapshot__subtitle">
            A quick overview of my software engineering journey, practical experience, technical expertise, and project portfolio.
          </p>
        </div>

        {/* 8 Interactive Metric Cards Grid */}
        <div className="snapshot__grid">
          {metricCards.map((card) => {
            const IconComp = card.icon;

            return (
              <div
                key={card.id}
                className="snapshot__card"
                onClick={() => handleCardClick(card.targetId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.targetId);
                  }
                }}
              >
                <div className="snapshot__card-header">
                  <div className="snapshot__card-lbl">{card.label}</div>
                  <div className="snapshot__card-icon">
                    <IconComp size={20} />
                  </div>
                </div>
                <div>
                  <div className="snapshot__card-val">{card.value}</div>
                  <div className="snapshot__card-subtext" style={{ marginTop: '6px' }}>
                    <span>{card.subtext}</span>
                    <span className="snapshot__card-action">
                      View <ArrowUpRight size={12} style={{ display: 'inline' }} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlights Panel */}
        <div className="snapshot__highlights-panel">
          <div className="snapshot__highlights-header">
            <Zap size={22} color="var(--color-primary)" />
            <span>Engineering Highlights</span>
          </div>

          <div className="snapshot__highlights-grid">
            {highlightItems.map((item, idx) => {
              const IconComponent = item.icon;

              return (
                <div key={idx} className="snapshot__highlight-box">
                  <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <IconComponent size={16} color="var(--color-primary)" />
                    <span className="snapshot__highlight-title">{item.title}</span>
                  </div>
                  <p className="snapshot__highlight-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default EngineeringSnapshot;
