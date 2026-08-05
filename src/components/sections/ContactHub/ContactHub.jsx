import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Container, Section, Heading, Badge, Button } from '../../ui';
import './ContactHub.css';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsappIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ContactHub = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Python Developer',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Hello Rehman, I reviewed your software portfolio and would like to discuss an engineering opportunity with you!'
  );
  const whatsappUrl = `https://wa.me/919036069732?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent('Engineering Opportunity Inquiry - Rehman Shariff Portfolio');
  const emailBody = encodeURIComponent(
    'Hello Rehman,\n\nI reviewed your portfolio and was impressed by your projects, internships, and AI/ML background. We would like to discuss a potential role with you.\n\nBest regards,'
  );
  const emailUrl = `mailto:rehmanshariff996@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const fillSamplePythonInquiry = () => {
    setFormData({
      name: 'Tech Talent Acquisition',
      email: 'recruiter@techcompany.com',
      roleType: 'Python Developer',
      message: 'Hi Rehman, We reviewed your portfolio and project repositories. We have an entry-level Python Developer role open in Bengaluru. Are you available for an interview call?'
    });
  };

  const fillSampleAiInquiry = () => {
    setFormData({
      name: 'AI Engineering Manager',
      email: 'hiring@ai-innovations.io',
      roleType: 'AI / ML Engineer',
      message: 'Hello Rehman, I inspected your Deepfake Detection System case study. We are hiring AI/ML Engineers with TensorFlow & OpenCV experience. Let us connect!'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // Activated FormSubmit token endpoint: e3ef482ecc2b591abe0c977d9b0a4f6c
      const response = await fetch('https://formsubmit.co/ajax/e3ef482ecc2b591abe0c977d9b0a4f6c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          roleType: formData.roleType,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name} (${formData.roleType})`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', roleType: 'Python Developer', message: '' });
      } else {
        window.open(`mailto:rehmanshariff996@gmail.com?subject=Inquiry from ${formData.name}&body=${formData.message}`, '_self');
        setIsSubmitted(true);
      }
    } catch {
      window.open(`mailto:rehmanshariff996@gmail.com?subject=Inquiry from ${formData.name}&body=${formData.message}`, '_self');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <Section id="contact" padding="lg" bg="secondary" className="contact-section">
      <Container size="xl">
        {/* Header */}
        <div className="contact__header">
          <Badge variant="primary" size="md">
            Let's Connect
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            Get In Touch & Hire Me
          </Heading>
          <p className="contact__subtitle">
            Currently open for full-time <strong>Software Engineer</strong>, <strong>Python Developer</strong>, and <strong>AI/ML Engineer</strong> opportunities in Bengaluru or Remote.
          </p>
        </div>

        <div className="contact__layout">
          {/* Left Column: Direct Reach-Out Cards */}
          <div className="contact__info-cards">
            {/* WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__info-card"
            >
              <div className="contact__info-icon" style={{ color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
                <WhatsappIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="contact__info-label">Direct WhatsApp Chat</div>
                <div className="contact__info-val">+91 90360 69732</div>
              </div>
              <ExternalLink size={14} color="var(--text-muted)" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/rehman-shariff-8a8071305"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__info-card"
            >
              <div className="contact__info-icon" style={{ color: '#0a66c2', backgroundColor: 'rgba(10, 102, 194, 0.15)' }}>
                <LinkedinIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="contact__info-label">LinkedIn Profile</div>
                <div className="contact__info-val">rehman-shariff-8a8071305</div>
              </div>
              <ExternalLink size={14} color="var(--text-muted)" />
            </a>

            {/* Email Card */}
            <a href={emailUrl} className="contact__info-card">
              <div className="contact__info-icon">
                <Mail size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="contact__info-label">Direct Email Inquiry</div>
                <div className="contact__info-val">rehmanshariff996@gmail.com</div>
              </div>
              <ExternalLink size={14} color="var(--text-muted)" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/AbdulRehmanShariff"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__info-card"
            >
              <div className="contact__info-icon">
                <GithubIcon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="contact__info-label">GitHub Account</div>
                <div className="contact__info-val">@AbdulRehmanShariff</div>
              </div>
              <ExternalLink size={14} color="var(--text-muted)" />
            </a>

            {/* Location Card */}
            <div className="contact__info-card" style={{ cursor: 'default' }}>
              <div className="contact__info-icon">
                <MapPin size={22} />
              </div>
              <div>
                <div className="contact__info-label">Primary Location</div>
                <div className="contact__info-val">Bengaluru, Karnataka, India</div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="contact__avail-card">
              <div className="contact__avail-dot" />
              <div className="contact__avail-text">
                <strong>Available for Immediate Opportunities</strong>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                  2026 Passout Graduate • B.E in Artificial Intelligence & Machine Learning
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="contact__form-card">
            <div className="contact__form-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={20} color="var(--color-primary)" />
                <span>Send Direct Inquiry</span>
              </div>

              {/* Sample Autofill Presets */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={fillSamplePythonInquiry}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--color-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Click to fill sample Python Developer inquiry text"
                >
                  <Sparkles size={11} /> Sample Python
                </button>
                <button
                  type="button"
                  onClick={fillSampleAiInquiry}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Click to fill sample AI Engineer inquiry text"
                >
                  <Sparkles size={11} /> Sample AI
                </button>
              </div>
            </div>

            {isSubmitted && (
              <div className="contact__success-msg">
                <CheckCircle2 size={20} />
                <span>Message Sent Successfully! Thank you for reaching out, Rehman will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <label className="contact__form-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hiring Manager / Recruiter Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact__input"
                />
              </div>

              <div className="contact__form-group">
                <label className="contact__form-label">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="contact__input"
                />
              </div>

              <div className="contact__form-group">
                <label className="contact__form-label">Opportunity Role Type</label>
                <select
                  value={formData.roleType}
                  onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                  className="contact__select"
                >
                  <option value="Python Developer">Python Developer</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Other Project Inquiry">Other Engineering Inquiry</option>
                </select>
              </div>

              <div className="contact__form-group">
                <label className="contact__form-label">Message</label>
                <textarea
                  required
                  placeholder="Write your message or role details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact__textarea"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                iconLeft={isSubmitting ? Loader2 : Send}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Inquiry Message'}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactHub;
