import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Container/Container';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { BrandLogo } from '../common/BrandLogo/BrandLogo';
import { navLinks } from '../../data/navData';
import './Navbar.css';

export const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="navbar">
        <Container size="xl" className="navbar__container">
          <a href="/" className="navbar__brand" aria-label="Rehman Shariff Home">
            <BrandLogo />
          </a>

          <nav aria-label="Primary Navigation">
            <ul className="navbar__desktop-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.path} className="navbar__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <div className="hide-on-mobile">
              <ThemeToggle />
            </div>
            <button
              className="navbar__menu-btn"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
};

export default Navbar;
