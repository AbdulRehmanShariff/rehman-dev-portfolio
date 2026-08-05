/**
 * Production GitHub REST API Service
 * Interacts directly with GitHub API v3 for username: AbdulRehmanShariff
 */

const CACHE_PREFIX = 'gh_live_cache_';
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

const getCachedData = (key) => {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() > parsed.expiry) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
};

const setCachedData = (key, value, ttl = DEFAULT_TTL_MS) => {
  try {
    const payload = {
      value,
      expiry: Date.now() + ttl,
    };
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
};

export const fetchGithubProfile = async (username, forceRefresh = false) => {
  const cacheKey = `user_profile_${username}`;
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user '@${username}' not found.`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again shortly.');
    }
    throw new Error(`Failed to fetch GitHub profile (Status: ${response.status})`);
  }

  const data = await response.json();
  setCachedData(cacheKey, data);
  return data;
};

export const fetchGithubRepos = async (username, forceRefresh = false) => {
  const cacheKey = `user_repos_${username}`;
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories (Status: ${response.status})`);
  }

  const repos = await response.json();
  const publicRepos = repos.filter((r) => !r.fork);

  // Compute language stats dynamically
  const languageCounts = {};
  publicRepos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const totalLangRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0);
  const languageColors = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C++': '#f34b7d',
    C: '#555555',
    Java: '#b07219',
    Jupyter: '#da5b0b',
    Shell: '#89e051',
  };

  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / (totalLangRepos || 1)) * 100),
      color: languageColors[name] || '#6366f1',
    }))
    .sort((a, b) => b.count - a.count);

  const result = {
    repos: publicRepos,
    languages,
  };

  setCachedData(cacheKey, result);
  return result;
};
