// projectsData.js
export const projects = [
  {
    id: 1,
    title: "Nome do Projeto",
    description: "Uma breve descrição do que o projeto faz e sua principal tecnologia.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "...", "..."],
    image: "/images/projeto-nome-da-imagem.png", // Imagem do projeto
    link: "https://www.link-para-o-projeto.com",
    github: "https://github.com/seu-usuario/nome-do-repo",
  },
  {
    id: 2,
    title: "Outro Projeto",
    description: "Descrição de uma colaboração open-source, de um projeto pessoal ou de um trabalho freelance.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/images/outra-imagem.png",
    link: "https://www.link-para-o-projeto.com",
    github: null, // Se não houver repositório público
  },
  // Adicione mais projetos aqui...
];