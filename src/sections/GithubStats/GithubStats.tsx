// src/sections/GithubStats.tsx

import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import GithubStatsClient from './GithubStatsClient';

export interface GithubStatsData {
  publicRepos: number;
  recentActivity: number;
  totalCommits: number;
  yearsOnGithub: number;
  daysOnGithub: number;
  codingDays: number;
  linesOfCode: number;
  filesCreated: number;
  appsCreated: number;
}

export interface GithubStatsProps {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['githubStats'];
}

export type GithubStatsDictionary = GithubStatsProps['dictionary'];

async function getStats(): Promise<GithubStatsData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/github-stats`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Falha ao buscar estatísticas');
      return null;
    }
    const data = (await res.json()) as Partial<GithubStatsData>;

    return {
      publicRepos: data.publicRepos ?? 0,
      recentActivity: data.recentActivity ?? 0,
      totalCommits: data.totalCommits ?? 0,
      yearsOnGithub: data.yearsOnGithub ?? 0,
      daysOnGithub: data.daysOnGithub ?? 0,
      codingDays: data.codingDays ?? 0,
      linesOfCode: data.linesOfCode ?? 0,
      filesCreated: data.filesCreated ?? 0,
      appsCreated: data.appsCreated ?? 0,
    };
  } catch (error) {
    console.error('Erro ao conectar com a API interna:', error);
    return null;
  }
}

export default async function GithubStats({ dictionary, locale }: GithubStatsProps) {
  const stats = await getStats();

  if (!stats) {
    return null;
  }

  return <GithubStatsClient stats={stats} dictionary={dictionary} locale={locale} />;
}