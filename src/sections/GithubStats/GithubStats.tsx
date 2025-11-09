// src/sections/GithubStats.tsx

import React from 'react';
import { getDictionary } from '@/i18n/getDictionary';

// --- Paleta "Cyber Tech / Neon Noir" ---
// Fundo: '#0A0A0A'
// Primário: '#9333EA'
// Destaque (Luz): '#A855F7'
// Texto Principal: '#F9FAFB'
// Texto Secundário: '#9CA3AF'
// Brilho: 'shadow-[0_0_15px_5px_rgba(147,51,234,0.3)]'
// ------------------------------------

interface GithubStatsData {
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

interface GithubStatsProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['githubStats'];
}

// Sub-componente para o Card de Estatística
const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-[#0A0A0A]/70 p-4 rounded-md border border-[#9333EA]/10">
    <p className="text-sm text-[#9CA3AF] mb-1">{label}</p>
    <p className="text-3xl font-mono font-bold text-[#F9FAFB]">
      {value}
    </p>
  </div>
);

// Função para buscar os dados da NOSSA API
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

// O componente principal (Async Server Component)
export default async function GithubStats({ dictionary }: GithubStatsProps) {
  const stats = await getStats();

  if (!stats) {
    return null;
  }

  return (
    <section 
      id="github-stats" 
      className="py-20"
    >
      <div
        className="
          max-w-md mx-auto p-6
          bg-[#0A0A0A]/50 backdrop-blur-sm 
          border border-[#9333EA]/30 rounded-lg
          shadow-[0_0_15px_5px_rgba(147,51,234,0.3)]  /* Nosso brilho neon */
        "
      >
        <h3 className="text-lg font-bold text-[#A855F7] mb-4">
          {dictionary.title}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            label={dictionary.repos}
            value={stats.publicRepos}
          />
          <StatCard
            label={dictionary.activity}
            value={stats.recentActivity}
          />
          <StatCard
            label={dictionary.commits}
            value={stats.totalCommits}
          />
          <StatCard
            label={dictionary.yearsOnGithub}
            value={stats.yearsOnGithub}
          />
          <StatCard
            label={dictionary.daysOnGithub}
            value={stats.daysOnGithub}
          />
          <StatCard
            label={dictionary.codingDays}
            value={stats.codingDays}
          />
          <StatCard
            label={dictionary.linesOfCode}
            value={stats.linesOfCode}
          />
          <StatCard
            label={dictionary.filesCreated}
            value={stats.filesCreated}
          />
          <StatCard
            label={dictionary.appsCreated}
            value={stats.appsCreated}
          />
        </div>
      </div>
    </section>
  );
}