import React from 'react';
import {
  Mail,
  FileText,
  ArrowRight,
  ChevronDown,
  MapPin,
  GraduationCap,
  Briefcase,
  FolderGit2
} from 'lucide-react';
import { Container, Section, Badge, Button } from '../../ui';
import { profileData } from '../../../data/profileData';
import { RESUME_PATH, RESUME_FILENAME } from '../../../constants/resumeConstants';
import './Hero.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Hero = () => {
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Github':
        return <GithubIcon size={18} />;
      case 'Linkedin':
        return <LinkedinIcon size={18} />;
      case 'Mail':
        return <Mail size={18} />;
      default:
        return null;
    }
  };

  const getHighlightIcon = (id) => {
    switch (id) {
      case 'degree':
        return <GraduationCap size={14} />;
      case 'internships':
        return <Briefcase size={14} />;
      case 'projects':
        return <FolderGit2 size={14} />;
      case 'location':
        return <MapPin size={14} />;
      default:
        return null;
    }
  };

  return (
    <Section id="hero" padding="none" bg="primary" className="hero">
      <Container size="xl">
        <div className="hero__grid">
          {/* Left Column */}
          <div className="hero__left">
            {/* Professional Introduction Tag */}
            <div className="hero__greeting hero__animate-item hero__animate-item--delay-1">
              <span className="hero__greeting-tag">{profileData.greeting}</span>
            </div>

            {/* Full Name */}
            <h1 className="hero__name hero__animate-item hero__animate-item--delay-2">
              {profileData.name}
            </h1>

            {/* Professional Title */}
            <div className="hero__title hero__animate-item hero__animate-item--delay-3">
              {profileData.title}
            </div>

            {/* Professional Summary */}
            <div className="hero__summary hero__animate-item hero__animate-item--delay-4">
              {profileData.summary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="hero__actions hero__animate-item hero__animate-item--delay-5">
              <Button
                as="a"
                href={profileData.actions.primary.href}
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
              >
                {profileData.actions.primary.label}
              </Button>

              <Button
                as="a"
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                variant="secondary"
                size="lg"
                iconLeft={FileText}
              >
                {profileData.actions.secondary.label}
              </Button>

              <Button
                as="a"
                href={profileData.actions.ghost.href}
                variant="ghost"
                size="lg"
                iconLeft={Mail}
              >
                {profileData.actions.ghost.label}
              </Button>
            </div>

            {/* Slim Information Row */}
            <div className="hero__info-row hero__animate-item hero__animate-item--delay-6">
              {profileData.highlights.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="hero__info-item">
                    {getHighlightIcon(item.id)}
                    <span>{item.label}</span>
                  </div>
                  {index < profileData.highlights.length - 1 && (
                    <span className="hero__info-divider" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Social Links */}
            <div className="hero__socials hero__animate-item hero__animate-item--delay-7">
              {profileData.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image & Orbit Badges */}
          <div className="hero__right hero__animate-item hero__animate-item--delay-5">
            <div className="hero__image-wrapper">
              <img
                src="/rehman_profile.png"
                alt="Rehman Shariff - AI & ML Engineer"
                className="hero__profile-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/profile.jpg';
                }}
              />

              {/* Orbiting Technology Badges around photo */}
              <div className="hero__orbit-badges" aria-label="Core Technology Orbit">
                {profileData.techBadges.map((tech, idx) => (
                  <Badge
                    key={tech}
                    variant="default"
                    size="sm"
                    className={`hero__orbit-badge hero__orbit-${idx}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Explore Indicator */}
        <a href="#about" className="hero__scroll-indicator" aria-label="Scroll to Explore">
          <span>Scroll to Explore</span>
          <ChevronDown size={14} className="hero__scroll-icon" />
        </a>
      </Container>
    </Section>
  );
};

export default Hero;
