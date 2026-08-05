import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { AppRouter } from './routes/AppRouter';

export function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
