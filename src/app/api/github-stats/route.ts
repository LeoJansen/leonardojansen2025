// Local: app/api/github-stats/route.ts

import { NextResponse } from 'next/server';

// Nome de usuário do GitHub pode ser configurado via variável de ambiente
const USERNAME = process.env.GITHUB_USERNAME || 'LeoJansen';

// URLs da API do GitHub
const GITHUB_API_URL = `https://api.github.com/users/${USERNAME}`;
const GITHUB_EVENTS_URL = `https://api.github.com/users/${USERNAME}/events/public`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${USERNAME}/repos`;

// Token de Acesso Pessoal (guarde no .env.local)
// Isso nos dá um limite de requisições muito maior
const GITHUB_PAT = process.env.GITHUB_PAT;
const { GITHUB_CODING_DAYS, GITHUB_LINES_OF_CODE, GITHUB_FILES_CREATED, GITHUB_APPS_CREATED } =
  process.env;

type GitHubEvent = {
  type: string;
  created_at?: string;
  payload?: {
    commits?: Array<Record<string, unknown>>;
  };
};

type GitHubRepo = {
  full_name: string;
  fork: boolean;
  default_branch: string | null;
  size: number;
};

type GitHubTreeResponse = {
  tree?: Array<{ type?: string }>;
  truncated?: boolean;
};

async function fetchAllRepos(headers: HeadersInit): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const url = `${GITHUB_REPOS_URL}?per_page=100&type=owner&sort=updated&page=${page}`;
    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      break;
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    const normalized = data.map((repo) => {
      const candidate = repo as Partial<GitHubRepo> & { name?: string };
      const fallbackName = typeof candidate.name === 'string' ? candidate.name : 'unknown';

      return {
        full_name:
          typeof candidate.full_name === 'string' ? candidate.full_name : `${USERNAME}/${fallbackName}`,
        fork: Boolean(candidate.fork),
        default_branch:
          typeof candidate.default_branch === 'string' ? candidate.default_branch : null,
        size: typeof candidate.size === 'number' ? candidate.size : 0,
      } satisfies GitHubRepo;
    });

    repos.push(...normalized);

    if (data.length < 100) {
      break;
    }

    page += 1;
  }

  return repos;
}

async function computeRepoAggregates(repos: GitHubRepo[], headers: HeadersInit) {
  const ownRepos = repos.filter((repo) => !repo.fork);

  if (ownRepos.length === 0) {
    return {
      linesOfCode: 0,
      filesCreated: 0,
      appsCreated: 0,
    };
  }

  let totalLanguageBytes = 0;
  let totalFiles = 0;

  const concurrency = 5;
  for (let i = 0; i < ownRepos.length; i += concurrency) {
    const batch = ownRepos.slice(i, i + concurrency);

    // Executamos em lote para evitar atingir limite de requisições
    await Promise.all(
      batch.map(async (repo) => {
        try {
          const languagesResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/languages`,
            {
              headers,
              next: { revalidate: 3600 },
            }
          );

          if (languagesResponse.ok) {
            const languages = (await languagesResponse.json()) as Record<string, number>;
            const repoBytes = Object.values(languages).reduce<number>((sum, value) => {
              return sum + (typeof value === 'number' ? value : 0);
            }, 0);
            totalLanguageBytes += repoBytes;
          }

          const branch = repo.default_branch ?? 'main';
          const treeResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/git/trees/${branch}?recursive=1`,
            {
              headers,
              next: { revalidate: 3600 },
            }
          );

          if (treeResponse.ok) {
            const tree = (await treeResponse.json()) as GitHubTreeResponse;
            if (Array.isArray(tree.tree)) {
              const filesInRepo = tree.tree.filter((node) => node?.type === 'blob').length;
              totalFiles += filesInRepo;
              if (tree.truncated) {
                totalFiles += Math.max(0, Math.round(repo.size));
              }
            } else if (tree.truncated) {
              totalFiles += Math.max(0, Math.round(repo.size));
            }
          }
        } catch (error) {
          console.warn('Falha ao calcular estatísticas do repositório:', error);
        }
      })
    );
  }

  const averageBytesPerLine = 50;
  const linesOfCode = Math.max(0, Math.round(totalLanguageBytes / averageBytesPerLine));

  return {
    linesOfCode,
    filesCreated: totalFiles,
    appsCreated: ownRepos.length,
  };
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'leonardojansen2025-portfolio',
    };

    if (GITHUB_PAT) {
      headers.Authorization = `Bearer ${GITHUB_PAT}`;
    }

    const [profileResponse, eventsResponse] = await Promise.all([
      fetch(GITHUB_API_URL, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(GITHUB_EVENTS_URL, {
        headers,
        next: { revalidate: 600 },
      }),
    ]);

    if (!profileResponse.ok) {
      throw new Error(`Falha ao buscar dados do perfil: ${profileResponse.statusText}`);
    }

    const profileData = await profileResponse.json();

    let recentActivity = 0;
    let totalCommits = 0;
    let codingDays = 0;

    if (eventsResponse.ok) {
      const events = await eventsResponse.json();

      if (Array.isArray(events)) {
        const typedEvents = events as GitHubEvent[];
        recentActivity = typedEvents.length;
        const uniqueDays = new Set<string>();
        totalCommits = typedEvents.reduce((total, event) => {
          if (event?.type !== 'PushEvent') {
            return total;
          }

          if (event?.created_at) {
            uniqueDays.add(event.created_at.split('T')[0] ?? '');
          }

          const commits = Array.isArray(event?.payload?.commits)
            ? event.payload.commits.length
            : 0;

          return total + commits;
        }, 0);

        uniqueDays.delete('');
        codingDays = uniqueDays.size;
      }
    }

    let repoAggregates = {
      linesOfCode: 0,
      filesCreated: 0,
      appsCreated: 0,
    };

    try {
      const repos = await fetchAllRepos(headers);
      repoAggregates = await computeRepoAggregates(repos, headers);
    } catch (error) {
      console.warn('Falha ao coletar repositórios:', error);
    }

    const accountCreatedAt = profileData?.created_at ? new Date(profileData.created_at) : null;
    const now = Date.now();
    const accountAgeMs = accountCreatedAt ? now - accountCreatedAt.getTime() : 0;
    const accountAgeDays = accountAgeMs > 0 ? Math.floor(accountAgeMs / (1000 * 60 * 60 * 24)) : 0;
    const yearsOnGithub = accountAgeDays > 0 ? Math.floor(accountAgeDays / 365) : 0;

    const parseEnvNumber = (value: string | undefined) => {
      if (!value) {
        return 0;
      }
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    };

    let { linesOfCode, filesCreated, appsCreated } = repoAggregates;

    const envLinesOfCode = parseEnvNumber(GITHUB_LINES_OF_CODE);
    const envFilesCreated = parseEnvNumber(GITHUB_FILES_CREATED);
    const envAppsCreated = parseEnvNumber(GITHUB_APPS_CREATED);
    const manualCodingDays = parseEnvNumber(GITHUB_CODING_DAYS);

    if (manualCodingDays > 0) {
      codingDays = manualCodingDays;
    }

    if (envLinesOfCode > 0) {
      linesOfCode = envLinesOfCode;
    }

    if (envFilesCreated > 0) {
      filesCreated = envFilesCreated;
    }

    if (envAppsCreated > 0) {
      appsCreated = envAppsCreated;
    }

    const stats = {
      publicRepos: profileData.public_repos,
      recentActivity,
      totalCommits,
       yearsOnGithub,
       daysOnGithub: accountAgeDays,
       codingDays,
       linesOfCode,
       filesCreated,
       appsCreated,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro na API do GitHub:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}