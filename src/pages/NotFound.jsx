import React from 'react';
import { Container, Section, Heading, Button } from '../components/ui';

export const NotFound = () => {
  return (
    <Section padding="lg" bg="primary">
      <Container size="md" style={{ textAlign: 'center' }}>
        <Heading level={1} gradient style={{ marginBottom: 'var(--space-4)' }}>
          404
        </Heading>
        <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>
          Page Not Found
        </Heading>
        <p style={{ marginBottom: 'var(--space-8)' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Button as="a" href="/" variant="primary" size="lg">
          Back to Home
        </Button>
      </Container>
    </Section>
  );
};

export default NotFound;
