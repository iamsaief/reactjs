import { Link } from "react-router";
import { projectRoutesData } from "../../routes";
import { ExternalLink, Github } from "lucide-react";

const projectsData = projectRoutesData.filter((route) => route.metadata);
const sortedProjectsData = projectsData.sort((a, b) =>
  a.metadata.name.localeCompare(b.metadata.name),
);

export const LayoutProject = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-3">
        {sortedProjectsData?.map((project, index) => {
          const {
            id,
            path,
            metadata: { name, year, status, technologies, link, sourceCode },
          } = project;

          return (
            <div
              key={id}
              className="group animate-fade-in rounded-lg border border-gray-700/20 bg-gray-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-gray-800/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between gap-1">
                {/* <Link to={path} className="absolute inset-0" /> */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-blue-300">
                      <Link to={path} className="hover:underline">
                        {name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">{year}</span>
                      <span
                        className={`rounded-[6px] border px-2 py-1 text-xs leading-none ${
                          status === "Completed"
                            ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                            : "border-yellow-500/30 bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded border border-gray-600/20 bg-gray-700/40 px-2 py-1 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-1">
                  <Link
                    to={path}
                    className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-700/50 hover:text-blue-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                  <Link
                    to={sourceCode}
                    className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-700/50 hover:text-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-github-icon lucide-github h-5 w-5"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
