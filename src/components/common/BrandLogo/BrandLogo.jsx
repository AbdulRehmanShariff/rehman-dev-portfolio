import React from 'react';
import './BrandLogo.css';

export const BrandLogo = ({ className = '' }) => {
  return (
    <span className={`brand-logo ${className}`}>
      <span className="brand-logo__name">Rehman</span>
      <span className="brand-logo__accent">&nbsp;.dev</span>
    </span>
  );
};

export default BrandLogo;
