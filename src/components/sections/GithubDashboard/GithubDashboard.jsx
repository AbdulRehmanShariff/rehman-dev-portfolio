import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Calendar,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Terminal,
  Activity,
  Mail,
  CircleDot
} from 'lucide-react';
import { Container, Section, Heading, Badge, Button } from '../../ui';
import { githubConfig } from '../../../data/githubConfig';
import { useGithubData } from '../../../hooks/useGithubData';
import './GithubDashboard.css';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const getCaseStudyUrl = (repoName) => {
  const name = repoName.toLowerCase();
  if (name.includes('deepfake')) return '/projects/deepfake-detection-system';
  if (name.includes('criminal')) return '/projects/criminal-data-management';
  if (name.includes('media') || name.includes('authenticity')) return '/projects/media-authenticity-platform';
  return '/projects/deepfake-detection-system';
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

export const GithubDashboard = () => {
  const { username, featuredRepos, refreshIntervalMs } = githubConfig;
  const { data, isLoading, error, refetch } = useGithubData(username, featuredRepos, refreshIntervalMs);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  // Filter and Sort Repositories dynamically
  const filteredRepos = useMemo(() => {
    if (!data?.allRepos) return [];

    let list = data.allRepos.filter((repo) => {
      const query = searchTerm.toLowerCase();
      const nameMatch = repo.name.toLowerCase().includes(query);
      const descMatch = (repo.description || '').toLowerCase().includes(query);
      const langMatch = (repo.language || '').toLowerCase().includes(query);
      const topicMatch = (repo.topics || []).some((t) => t.toLowerCase().includes(query));

      return nameMatch || descMatch || langMatch || topicMatch;
    });

    switch (sortBy) {
      case 'stars':
        return list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'language':
        return list.sort((a, b) => (a.language || '').localeCompare(b.language || ''));
      case 'newest':
        return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'updated':
      default:
        return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
  }, [data, searchTerm, sortBy]);

  return (
    <Section id="github" padding="lg" bg="primary" className="github-section">
      <Container size="xl">
        {/* Header Title */}
        <div className="github__header">
          <Badge variant="primary" size="md">
            Live Engineering Ecosystem
          </Badge>
          <Heading level={2} gradient style={{ marginTop: 'var(--space-3)' }}>
            GitHub Engineering Dashboard
          </Heading>
          <p className="github__subtitle">
            Authentic live analytics, repository performance telemetry, and language statistics dynamically sourced from <strong>@{username}</strong>.
          </p>

          {/* Live Sync Status Bar */}
          <div className="github__status-bar">
            <div className="github__status-item">
              <span className="github__status-dot" />
              <span>Portfolio Live</span>
            </div>
            <span className="github__status-divider">|</span>
            <div className="github__status-item">
              <span>GitHub API Connected</span>
            </div>
            <span className="github__status-divider">|</span>
            <div className="github__status-item">
              <RefreshCw size={12} style={{ animation: 'spin 10s linear infinite' }} />
              <span>Auto-sync (5m)</span>
            </div>
          </div>
        </div>

        {/* LOADING STATE: Skeleton Loaders */}
        {isLoading && (
          <div className="github__skeleton-container">
            <div className="github__skeleton-card" style={{ height: '140px' }}>
              <div className="github__skeleton-line" style={{ width: '40%' }} />
              <div className="github__skeleton-line" style={{ width: '70%' }} />
            </div>
            <div className="github__repos-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="github__skeleton-card" style={{ height: '240px' }}>
                  <div className="github__skeleton-line" style={{ width: '50%' }} />
                  <div className="github__skeleton-line" style={{ width: '85%' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR STATE: Clean Fallback Notice */}
        {!isLoading && error && (
          <div className="github__error-card">
            <AlertCircle size={44} color="var(--color-danger)" />
            <Heading level={3}>GitHub Integration Notice</Heading>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px' }}>{error}</p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button onClick={refetch} variant="primary" iconLeft={RefreshCw}>
                Retry API Sync
              </Button>
              <Button
                as="a"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                iconLeft={GithubIcon}
              >
                Open GitHub Profile
              </Button>
            </div>
          </div>
        )}

        {/* LIVE REAL GITHUB DATA */}
        {!isLoading && !error && data && (
          <>
            {/* SECTION 1: PROFILE HEADER */}
            <div className="github__profile-card">
              <div className="github__profile-left">
                <img
                  src={data.profile.avatar_url}
                  alt={data.profile.name || data.profile.login}
                  className="github__avatar-img"
                />
                <div>
                  <div className="github__user-name">
                    {data.profile.name || data.profile.login}
                  </div>
                  <div className="github__user-handle">@{data.profile.login}</div>
                  {data.profile.bio && (
                    <p className="github__user-bio">{data.profile.bio}</p>
                  )}
                  <div className="github__user-meta">
                    {data.profile.created_at && (
                      <span className="github__user-meta-item">
                        <Calendar size={12} />
                        Joined {formatDate(data.profile.created_at)}
                      </span>
                    )}
                    {data.profile.email && (
                      <span className="github__user-meta-item">
                        <Mail size={12} />
                        {data.profile.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="github__profile-stats-row">
                <div className="github__profile-stat">
                  <div className="github__profile-stat-val">{data.profile.public_repos}</div>
                  <div className="github__profile-stat-lbl">Public Repos</div>
                </div>
                <div className="github__profile-stat">
                  <div className="github__profile-stat-val">{data.profile.followers}</div>
                  <div className="github__profile-stat-lbl">Followers</div>
                </div>
                <div className="github__profile-stat">
                  <div className="github__profile-stat-val">{data.profile.following}</div>
                  <div className="github__profile-stat-lbl">Following</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    as="a"
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    iconLeft={GithubIcon}
                  >
                    GitHub Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* SECTION 2: LIVE ENGINEERING STATS GRID */}
            <div className="github__stats-grid">
              <div className="github__stat-card">
                <div className="github__stat-header">
                  <span className="github__stat-lbl">Repositories</span>
                  <div className="github__stat-icon">
                    <FolderGit2 size={18} />
                  </div>
                </div>
                <div className="github__stat-val">{data.profile.public_repos}</div>
              </div>

              <div className="github__stat-card">
                <div className="github__stat-header">
                  <span className="github__stat-lbl">Total Stars</span>
                  <div className="github__stat-icon">
                    <Star size={18} />
                  </div>
                </div>
                <div className="github__stat-val">{data.totals.totalStars}</div>
              </div>

              <div className="github__stat-card">
                <div className="github__stat-header">
                  <span className="github__stat-lbl">Total Forks</span>
                  <div className="github__stat-icon">
                    <GitFork size={18} />
                  </div>
                </div>
                <div className="github__stat-val">{data.totals.totalForks}</div>
              </div>

              <div className="github__stat-card">
                <div className="github__stat-header">
                  <span className="github__stat-lbl">Primary Language</span>
                  <div className="github__stat-icon">
                    <Code2 size={18} />
                  </div>
                </div>
                <div className="github__stat-val" style={{ fontSize: 'var(--font-lg)' }}>
                  {data.totals.primaryLanguage}
                </div>
              </div>
            </div>

            {/* SECTION 3: CONTRIBUTION HEATMAP */}
            <div className="github__contribution-block">
              <div className="github__block-title" style={{ marginBottom: 'var(--space-4)' }}>
                <Calendar size={22} color="var(--color-primary)" />
                <span>Contributions in the Last Year</span>
              </div>
              <div className="github__contribution-img-wrap">
                <img
                  src={`https://ghchart.rshah.org/${username}`}
                  alt={`GitHub Contribution Graph for ${username}`}
                  className="github__contribution-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* CHARTS GRID */}
            <div className="github__charts-grid">
              {/* LANGUAGE ANALYTICS */}
              <div className="github__chart-card">
                <div className="github__chart-title">
                  <Code2 size={20} color="var(--color-primary)" />
                  <span>Language Analytics</span>
                </div>
                <div style={{ width: '100%', height: 260 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data.languages}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {data.languages.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-surface)',
                          borderColor: 'var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* FRAMEWORK ANALYTICS */}
              <div className="github__chart-card">
                <div className="github__chart-title">
                  <Terminal size={20} color="var(--color-secondary)" />
                  <span>Framework & Library Usage</span>
                </div>
                <div style={{ width: '100%', height: 260 }}>
                  {data.frameworks.length > 0 ? (
                    <ResponsiveContainer>
                      <BarChart data={data.frameworks} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} width={90} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                          }}
                        />
                        <Bar dataKey="count" fill="var(--color-secondary)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '60px' }}>
                      Framework telemetry mapping active.
                    </div>
                  )}
                </div>
              </div>

              {/* REPOSITORY GROWTH TIMELINE */}
              <div className="github__chart-card github__chart-card--full">
                <div className="github__chart-title">
                  <Activity size={20} color="var(--color-primary)" />
                  <span>Repository Growth Timeline</span>
                </div>
                <div style={{ width: '100%', height: 240 }}>
                  <ResponsiveContainer>
                    <LineChart data={data.timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="period" stroke="var(--text-muted)" fontSize={12} />
                      <YAxis stroke="var(--text-muted)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-surface)',
                          borderColor: 'var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-primary)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="repositories"
                        stroke="var(--color-primary)"
                        strokeWidth={3}
                        dot={{ r: 4, fill: 'var(--color-primary)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* FEATURED REPOSITORIES */}
            <div className="github__section-block">
              <div className="github__chart-title" style={{ marginBottom: 'var(--space-6)' }}>
                <BookOpen size={22} color="var(--color-primary)" />
                <span>Featured Repositories</span>
              </div>

              <div className="github__repos-grid">
                {data.featuredRepos.map((repo) => (
                  <div key={repo.id} className="github__repo-card">
                    <div>
                      <div className="github__repo-name">{repo.name}</div>
                      <p className="github__repo-desc">
                        {repo.description || 'No description provided.'}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="github__repo-topics">
                          {repo.topics.slice(0, 4).map((t) => (
                            <Badge key={t} variant="outline" size="sm">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="github__repo-meta">
                        {repo.language && (
                          <div className="github__repo-meta-item">
                            <Code2 size={13} color="var(--color-primary)" />
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                              {repo.language}
                            </span>
                          </div>
                        )}
                        <div className="github__repo-meta-item">
                          <Star size={13} color="var(--color-warning)" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="github__repo-meta-item">
                          <GitFork size={13} />
                          <span>{repo.forks_count}</span>
                        </div>
                        <div className="github__repo-meta-item">
                          <CircleDot size={13} />
                          <span>{repo.open_issues_count}</span>
                        </div>
                        <div className="github__repo-meta-item">
                          <Clock size={13} />
                          <span>Updated {formatDate(repo.updated_at)}</span>
                        </div>
                      </div>

                      <div className="github__repo-actions">
                        <Button
                          as="a"
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="sm"
                          iconLeft={ExternalLink}
                          style={{ flex: 1 }}
                        >
                          View Repository
                        </Button>
                        <Button
                          as={Link}
                          to={getCaseStudyUrl(repo.name)}
                          variant="ghost"
                          size="sm"
                          iconRight={ArrowRight}
                        >
                          Case Study
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REPOSITORY CATALOG WITH FIXED METADATA COLUMN */}
            <div className="github__section-block">
              <div className="github__chart-title" style={{ marginBottom: 'var(--space-6)' }}>
                <FolderGit2 size={22} color="var(--color-primary)" />
                <span>All Repositories Catalog</span>
              </div>

              {/* Search & Sort Toolbar */}
              <div className="github__toolbar">
                <div className="github__search-wrap">
                  <Search size={16} className="github__search-icon" />
                  <input
                    type="text"
                    placeholder="Search by repository name, language, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="github__search-input"
                  />
                </div>

                <div className="github__sort-wrap">
                  <SlidersHorizontal size={14} />
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="github__select"
                  >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Most Stars</option>
                    <option value="name">Repository Name</option>
                    <option value="language">Primary Language</option>
                    <option value="newest">Newest Created</option>
                    <option value="oldest">Oldest Created</option>
                  </select>
                </div>
              </div>

              {/* Repositories Catalog Feed */}
              <div className="github__feed-list">
                {filteredRepos.map((repo) => (
                  <div key={repo.id} className="github__feed-item">
                    {/* Left Column: Repo Name, Tech Badge, Description */}
                    <div className="github__feed-left">
                      <div className="github__feed-reponame">
                        <span>{repo.name}</span>
                        {repo.language && (
                          <Badge variant="primary" size="sm">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      {repo.description && (
                        <p className="github__feed-desc">{repo.description}</p>
                      )}
                    </div>

                    {/* Dedicated Fixed-Width Right Column: Aligned Stars, Forks, Date, & Button */}
                    <div className="github__feed-right">
                      <div className="github__feed-stats-row">
                        <span className="github__feed-stat-chip" title="Stars">
                          <Star size={13} color="var(--color-warning)" /> {repo.stargazers_count || 0}
                        </span>
                        <span className="github__feed-stat-chip" title="Forks">
                          <GitFork size={13} color="var(--text-muted)" /> {repo.forks_count || 0}
                        </span>
                      </div>

                      <div className="github__feed-date-block">
                        <span className="github__feed-date-lbl">Updated</span>
                        <span className="github__feed-date-val">{formatDate(repo.updated_at)}</span>
                      </div>

                      <Button
                        as="a"
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        iconLeft={ExternalLink}
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Repository
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
};

export default GithubDashboard;
