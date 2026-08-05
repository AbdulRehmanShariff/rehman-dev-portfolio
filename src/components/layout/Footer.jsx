import React from 'react';
import { Container } from '../ui/Container/Container';
import { BrandLogo } from '../common/BrandLogo/BrandLogo';
import { navLinks, socialLinks } from '../../data/navData';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container size="xl">
        <div className="footer__content">
          <div>
            <div className="footer__brand-title">
              <BrandLogo />
            </div>
            <p className="footer__brand-desc">
              Python Developer | AI & ML Engineer building AI-powered software and modern web applications.
            </p>
          </div>

          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.path} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Rehman Shariff. Designed & Developed by Rehman Shariff.</p>
          <ul className="footer__links">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
