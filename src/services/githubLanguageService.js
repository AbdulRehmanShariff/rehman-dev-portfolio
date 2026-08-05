/**
 * GitHub Language Analytics Service
 * Dynamic calculation of language usage, colors, and percentages from GitHub REST API
 */

export const LANGUAGE_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  'Jupyter Notebook': '#da5b0b',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584'
};

export const getLanguageColor = (langName) => {
  return LANGUAGE_COLORS[langName] || '#6366f1';
};

export const calculateLanguageDistribution = (repos) => {
  if (!repos || repos.length === 0) return [];

  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / (total || 1)) * 100),
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.count - a.count);
};
