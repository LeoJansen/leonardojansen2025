import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string | null;
};

type ClientsProps = {
  heading: string;
  intro: string;
  viewProjectLabel: string;
  sourceCodeLabel: string;
  projects: Project[];
};

const Clients = ({
  heading,
  intro,
  viewProjectLabel,
  sourceCodeLabel,
  projects,
}: ClientsProps) => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold">{heading}</h2>
        <p className="mb-12 text-center text-xl text-gray-600">{intro}</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg bg-[#797979] shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                width={500}
                height={300}
                className="h-auto w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-gray-600">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`${project.id}-${tech}-${index}`}
                      className="rounded-full bg-[#797979] px-3 py-1 text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                    >
                      {viewProjectLabel}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-600 transition-colors hover:text-gray-800"
                    >
                      {sourceCodeLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
