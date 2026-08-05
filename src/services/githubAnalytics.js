import { frameworkMap } from '../data/frameworkMap';

/**
 * Advanced Engineering Analytics Service
 * Processes real GitHub repository data into analytical insights
 */

export const calculateFrameworkAnalytics = (repos) => {
  if (!repos || repos.length === 0) return [];

  const frameworkCounts = {};

  repos.forEach((repo) => {
    // Check if repo exists in frameworkMap
    const repoFrameworks = frameworkMap[repo.name] || [];

    // Also scan repo.topics for frameworks (e.g. tensorflow, react, opencv)
    const topicFrameworks = (repo.topics || []).map((t) => {
      const lower = t.toLowerCase();
      if (lower.includes('tensor')) return 'TensorFlow';
      if (lower.includes('opencv')) return 'OpenCV';
      if (lower.includes('flask')) return 'Flask';
      if (lower.includes('fastapi')) return 'FastAPI';
      if (lower.includes('react')) return 'React';
      if (lower.includes('keras')) return 'Keras';
      if (lower.includes('sklearn') || lower.includes('scikit')) return 'Scikit-Learn';
      if (lower.includes('sqlite')) return 'SQLite';
      return null;
    }).filter(Boolean);

    const combined = Array.from(new Set([...repoFrameworks, ...topicFrameworks]));

    combined.forEach((fw) => {
      frameworkCounts[fw] = (frameworkCounts[fw] || 0) + 1;
    });
  });

  return Object.entries(frameworkCounts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculateRepositoryTimeline = (repos) => {
  if (!repos || repos.length === 0) return [];

  const timelineMap = {};

  // Sort repos by created_at ascending
  const sorted = [...repos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  let cumulativeCount = 0;
  sorted.forEach((repo) => {
    const date = new Date(repo.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });

    cumulativeCount += 1;
    timelineMap[monthYear] = {
      period: monthYear,
      repositories: cumulativeCount,
      stars: (timelineMap[monthYear]?.stars || 0) + (repo.stargazers_count || 0),
    };
  });

  return Object.values(timelineMap);
};
