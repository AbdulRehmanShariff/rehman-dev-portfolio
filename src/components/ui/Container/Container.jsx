import React from 'react';
import './Container.css';

export const Container = ({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`ui-container ui-container--${size} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
