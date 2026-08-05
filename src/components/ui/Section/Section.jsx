import React from 'react';
import './Section.css';

export const Section = ({
  id,
  children,
  padding = 'md',
  bg = 'primary',
  className = '',
  as: Component = 'section',
  ...props
}) => {
  return (
    <Component
      id={id}
      className={`ui-section ui-section--padding-${padding} ui-section--bg-${bg} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Section;
