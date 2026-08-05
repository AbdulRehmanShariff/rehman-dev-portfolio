import { useState, useEffect, useCallback } from 'react';
import { fetchGithubProfile, fetchGithubRepos } from '../services/githubService';
import { calculateLanguageDistribution } from '../services/githubLanguageService';
import { calculateFrameworkAnalytics, calculateRepositoryTimeline } from '../services/githubAnalytics';

const getFallbackDesc = (repoName, description) => {
  if (description && description.trim().length > 0 && !description.toLowerCase().includes('no description')) {
    return description;
  }
  const name = repoName.toLowerCase();
  if (name.includes('deepfake-detection-system-using-deep-learning')) {
    return 'Deepfake Detection System built using TensorFlow, Keras, and OpenCV to identify manipulated images, videos, audios and articles using deep learning techniques.';
  }
  if (name === 'deepfake-detection-system') {
    return 'A full-stack AI-powered Deepfake Video Detection System using React, Flask, TensorFlow, and Keras for image, video, and audio analysis with chatbot support.';
  }
  if (name.includes('criminal')) {
    return 'A Python/Tkinter application for managing criminal records with database integration. Features include record creation, modification, search capabilities, and criminal photo management.';
  }
  if (name.includes('resume')) {
    return 'An enterprise-grade AI-powered Resume Screening and Candidate Ranking System built with Flask, PostgreSQL, TensorFlow, Gemini AI, FAISS, and modern web technologies for intelligent recruitment automation.';
  }
  if (name.includes('election') || name.includes('polling')) {
    return 'SecurePoll is a modern, secure digital election platform built with Flask, SQLite, RSA cryptography, and blockchain-backed vote integrity. It features role-based authentication, secure voting, and election management.';
  }
  if (name.includes('study') || name.includes('assistant')) {
    return 'An intelligent AI Study Assistant that transforms uploaded documents into comprehensive summaries, interactive flashcards, multiple-choice quizzes, and a searchable AI chat.';
  }
  return 'Software application demonstrating structured code architecture, database persistence, and modern engineering practices.';
};

export const useGithubData = (username, featuredReposList = [], refreshIntervalMs = 300000) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (force = false) => {
    if (!username) {
      setIsLoading(false);
      setError('No GitHub username specified.');
      return;
    }

    setIsLoading((prev) => (prev ? true : force));
    setError(null);

    try {
      const [profile, repoData] = await Promise.all([
        fetchGithubProfile(username, force),
        fetchGithubRepos(username, force),
      ]);

      const rawRepos = repoData.repos;

      // Ensure every repo has its description populated
      const cleanRepos = rawRepos.map((r) => ({
        ...r,
        description: getFallbackDesc(r.name, r.description),
      }));

      // Target 6 key repositories with lengthy descriptions
      const targetRepoNames = featuredReposList && featuredReposList.length > 0
        ? featuredReposList
        : [
            'Deepfake-Detection-System-Using-Deep-Learning',
            'smart-resume-screening-candidate-ranking-system',
            'secure-digital-election-platform',
            'criminal-data-management',
            'Deepfake-Detection-System',
            'AI-Study-Assistant',
          ];

      const featured = [];
      targetRepoNames.forEach((fname) => {
        const found = cleanRepos.find(
          (r) =>
            r.name.toLowerCase() === fname.toLowerCase() ||
            r.name.toLowerCase().includes(fname.toLowerCase()) ||
            fname.toLowerCase().includes(r.name.toLowerCase())
        );
        if (found && !featured.some((f) => f.id === found.id)) {
          featured.push(found);
        }
      });

      // Fill up to 6 with longest description repos if any missing
      if (featured.length < 6) {
        const sortedByDescLen = [...cleanRepos]
          .filter((r) => !featured.some((f) => f.id === r.id))
          .sort((a, b) => (b.description || '').length - (a.description || '').length);

        featured.push(...sortedByDescLen.slice(0, 6 - featured.length));
      }

      // Calculate Languages & Frameworks Analytics
      const languages = calculateLanguageDistribution(cleanRepos);
      const frameworks = calculateFrameworkAnalytics(cleanRepos);
      const timeline = calculateRepositoryTimeline(cleanRepos);

      // Totals
      const totalStars = cleanRepos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      const totalForks = cleanRepos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
      const primaryLanguage = languages.length > 0 ? languages[0].name : 'N/A';

      // Sort recent repos by updated_at timestamp
      const recentRepos = [...cleanRepos].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

      setData({
        profile,
        allRepos: recentRepos,
        featuredRepos: featured,
        languages,
        frameworks,
        timeline,
        totals: {
          totalStars,
          totalForks,
          primaryLanguage,
          totalLanguages: languages.length,
        },
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Unable to connect to GitHub REST API.');
      setIsLoading(false);
    }
  }, [username, featuredReposList]);

  useEffect(() => {
    loadData(false);

    // Auto-refresh interval (5 minutes)
    const interval = setInterval(() => {
      loadData(true);
    }, refreshIntervalMs);

    return () => clearInterval(interval);
  }, [username, refreshIntervalMs, loadData]);

  return { data, isLoading, error, refetch: () => loadData(true) };
};
