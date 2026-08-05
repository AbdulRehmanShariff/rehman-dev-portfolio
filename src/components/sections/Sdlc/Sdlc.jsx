import React from 'react';
import {
  ClipboardList,
  Network,
  Code2,
  Bug,
  GitBranch,
  Rocket,
  RefreshCw,
  ArrowRight,
  Workflow,
  BarChart3
} from 'lucide-react';
import { Container, Section, Heading, Badge } from '../../ui';
import { sdlcData } from '../../../data/sdlcData';
import './Sdlc.css';

export const Sdlc = () => {
  const getStageIcon = (iconName) => {
    switch (iconName) {
      case 'ClipboardList':
        return <ClipboardList size={20} />;
      case 'Network':
        return <Network size={20} />;
      case 'Code2':
        return <Code2 size={20} />;
      case 'Bug':
        return <Bug size={20} />;
      case 'GitBranch':
        return <GitBranch size={20} />;
      case 'Rocket':
        return <Rocket size={20} />;
      case 'RefreshCw':
        return <RefreshCw size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <Section id="sdlc" padding="lg" bg="secondary" className="sdlc-section">
      <Container size="xl">
        {/* Header */}
        <div className="sdlc__header">
          <Badge variant="primary" size="md">
            {sdlcData.header.badge}
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            {sdlcData.header.title}
          </Heading>
          <p className="sdlc__subtitle">{sdlcData.header.subtitle}</p>
        </div>

        {/* 7 SDLC Stages Horizontal/Vertical Timeline */}
        <div className="sdlc__timeline">
          {sdlcData.stages.map((stage) => (
            <div key={stage.step} className="sdlc__card">
              <div className="sdlc__card-header">
                <span className="sdlc__card-step">PHASE {stage.step}</span>
                <div className="sdlc__card-icon">
                  {getStageIcon(stage.icon)}
                </div>
              </div>

              <div>
                <h3 className="sdlc__card-title">{stage.title}</h3>
                <p className="sdlc__card-desc">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid: How I Build My Projects & Real Portfolio Statistics Panel */}
        <div className="sdlc__bottom-grid">
          {/* How I Build My Projects Node Flow */}
          <div className="sdlc__flow-card">
            <div className="sdlc__flow-title">
              <Workflow size={22} color="var(--color-primary)" />
              <span>How I Build My Projects</span>
            </div>

            <div className="sdlc__flow-nodes">
              {sdlcData.workflowFlow.map((node, idx) => (
                <React.Fragment key={idx}>
                  <div className="sdlc__flow-node">{node}</div>
                  {idx < sdlcData.workflowFlow.length - 1 && (
                    <ArrowRight size={14} className="sdlc__flow-arrow" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Real Portfolio Statistics Panel */}
          <div className="sdlc__stats-card">
            <div className="sdlc__flow-title">
              <BarChart3 size={22} color="var(--color-secondary)" />
              <span>Engineering Telemetry</span>
            </div>

            <div className="sdlc__stats-grid">
              {sdlcData.stats.map((stat, idx) => (
                <div key={idx} className="sdlc__stat-box">
                  <div className="sdlc__stat-val">{stat.value}</div>
                  <div className="sdlc__stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Sdlc;
