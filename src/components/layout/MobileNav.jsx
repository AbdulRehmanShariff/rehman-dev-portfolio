import React from 'react';
import { navLinks } from '../../data/navData';
import { ThemeToggle } from './ThemeToggle';
import './MobileNav.css';

export const MobileNav = ({ isOpen, onClose }) => {
  return (
    <div
      className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <nav aria-label="Mobile Navigation">
        <ul className="mobile-nav__list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.path}
                className="mobile-nav__link"
                onClick={onClose}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mobile-nav__footer">
        <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
          Theme Preference
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MobileNav;
