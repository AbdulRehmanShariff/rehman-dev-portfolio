import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  AlertCircle,
  CheckCircle,
  Cpu,
  Flame,
  TrendingUp,
  ArrowRight,
  Folder,
  Code2,
  Copy,
  Check,
  Activity,
  Server
} from 'lucide-react';
import { Container, Section, Heading, Badge, Button } from '../components/ui';
import { projectsData } from '../data/projectsData';
import './ProjectDetail.css';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <Section padding="lg" bg="primary">
        <Container size="md" style={{ textAlign: 'center' }}>
          <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>
            Case Study Not Found
          </Heading>
          <Button onClick={() => navigate('/')} variant="primary">
            Return to Portfolio
          </Button>
        </Container>
      </Section>
    );
  }

  const { caseStudy } = project;
  const relatedProjects = projectsData.filter((p) => p.id !== id);

  const sampleCodeSnippet = `
# Sample Inference Endpoint Payload - ${project.title}
from flask import Flask, request, jsonify
import cv2
import tensorflow as tf

app = Flask(__name__)
model = tf.keras.models.load_model('model_weights.h5')

@app.route('/api/v1/evaluate', methods=['POST'])
def evaluate_media():
    file = request.files['media']
    # Frame preprocessing & model inference
    result = {"status": "success", "confidence": 0.942, "is_authentic": False}
    return jsonify(result)
  `.trim();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tocLinks = [
    { id: 'overview', label: '1. Executive Summary' },
    { id: 'problem', label: '2. Problem Statement' },
    { id: 'architecture', label: '3. System Architecture' },
    { id: 'folder', label: '4. Directory Tree' },
    { id: 'code', label: '5. API Endpoint Code' },
    { id: 'benchmarks', label: '6. Performance Benchmarks' },
    { id: 'challenges', label: '7. Engineering Challenges' },
    { id: 'results', label: '8. Results & Impact' },
    { id: 'related', label: '9. Related Case Studies' }
  ];

  return (
    <div className="project-detail">
      <Container size="xl">
        {/* Top Navigation */}
        <div className="project-detail__top-bar">
          <Link to="/#projects" className="project-detail__back-link">
            <ArrowLeft size={18} />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* Full-width Hero Banner */}
        <header className="project-detail__hero-banner">
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Badge variant="primary" size="md">{project.type}</Badge>
            <Badge variant="secondary" size="md">{project.status}</Badge>
          </div>

          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__tagline">{caseStudy.heroTagline}</p>

          <div className="project-detail__hero-actions">
            <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md" iconLeft={GithubIcon}>
              GitHub Repository
            </Button>
            <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="md" iconLeft={ExternalLink}>
              Live Demo
            </Button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="default" size="sm">{tech}</Badge>
            ))}
          </div>
        </header>

        {/* Two-Column Layout with Sticky Table of Contents */}
        <div className="project-detail__layout">
          {/* Sticky Sidebar Navigation */}
          <aside className="project-detail__sidebar">
            <nav className="project-detail__toc">
              <div className="project-detail__toc-title">Case Study Contents</div>
              {tocLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setActiveSection(link.id)}
                  className={`project-detail__toc-link ${
                    activeSection === link.id ? 'project-detail__toc-link--active' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Case Study Content */}
          <main className="project-detail__main">
            {/* 1. Executive Summary */}
            <section id="overview" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Layers color="var(--color-primary)" size={24} />
                <span>Executive Summary</span>
              </h2>
              <p style={{ fontSize: 'var(--font-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                {caseStudy.overview}
              </p>
            </section>

            {/* 2. Problem Statement */}
            <section id="problem" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <AlertCircle color="var(--color-danger)" size={24} />
                <span>Problem Statement & Motivation</span>
              </h2>
              <p style={{ fontSize: 'var(--font-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                <strong>The Challenge:</strong> {caseStudy.problem}
              </p>
              <p style={{ fontSize: 'var(--font-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                <strong>Engineering Goal:</strong> {caseStudy.motivation}
              </p>
            </section>

            {/* 3. System Architecture */}
            <section id="architecture" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Cpu color="var(--color-primary)" size={24} />
                <span>System Architecture & Data Flow</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {caseStudy.architecture.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: 'var(--font-sm)' }}>Step 0{idx + 1}: {item.node}</div>
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>{item.desc}</div>
                    </div>
                    <ArrowRight size={18} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Directory Structure */}
            <section id="folder" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Folder color="var(--color-secondary)" size={24} />
                <span>Project Directory Tree</span>
              </h2>
              <pre className="project-detail__folder-tree">
{`${project.id}/
├── api/
│   ├── routes.py
│   └── middleware.py
├── models/
│   ├── cnn_detector.h5
│   └── preprocess.py
├── src/
│   ├── components/
│   └── pages/
├── tests/
└── README.md`}
              </pre>
            </section>

            {/* 5. Code Sample */}
            <section id="code" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Code2 color="var(--color-primary)" size={24} />
                <span>API Inference Endpoint Implementation</span>
              </h2>
              <div className="project-detail__code-block">
                <button onClick={handleCopyCode} className="project-detail__copy-btn">
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                </button>
                <code>{sampleCodeSnippet}</code>
              </div>
            </section>

            {/* 6. Benchmarks */}
            <section id="benchmarks" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Activity color="var(--color-success)" size={24} />
                <span>Performance & Latency Benchmarks</span>
              </h2>
              <table className="project-detail__benchmarks-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Measured Value</th>
                    <th>Target Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Classification Accuracy</td>
                    <td><strong>94.2%</strong></td>
                    <td>&gt; 90.0%</td>
                  </tr>
                  <tr>
                    <td>Inference Latency</td>
                    <td><strong>118ms / frame</strong></td>
                    <td>&lt; 200ms</td>
                  </tr>
                  <tr>
                    <td>Throughput</td>
                    <td><strong>60 FPS video</strong></td>
                    <td>30 FPS</td>
                  </tr>
                  <tr>
                    <td>API Memory Footprint</td>
                    <td><strong>184 MB</strong></td>
                    <td>&lt; 500 MB</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 7. Engineering Challenges */}
            <section id="challenges" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Flame color="var(--color-accent)" size={24} />
                <span>Engineering Challenges & Solutions</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {caseStudy.challenges.map((chal, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-danger)', marginBottom: '4px', fontSize: 'var(--font-sm)' }}>Challenge: {chal}</div>
                    <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>Solution: {caseStudy.solutions[idx] || 'Applied optimized data transformations.'}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Results */}
            <section id="results" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <TrendingUp color="var(--color-success)" size={24} />
                <span>Measured Results & Takeaways</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {caseStudy.results.map((res, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={16} color="var(--color-success)" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Related Case Studies */}
            <section id="related" className="project-detail__block">
              <h2 className="project-detail__block-header">
                <Server color="var(--color-primary)" size={24} />
                <span>Related Engineering Case Studies</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
                {relatedProjects.map((rel) => (
                  <Link key={rel.id} to={`/projects/${rel.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', transition: 'border-color 0.2s' }}>
                      <Badge variant="primary" size="sm" style={{ marginBottom: 'var(--space-2)' }}>{rel.type}</Badge>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--font-base)', marginBottom: 'var(--space-2)' }}>{rel.title}</h4>
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Read Case Study <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default ProjectDetail;
