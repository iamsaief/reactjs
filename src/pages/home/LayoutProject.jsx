import { Link } from "react-router";
import { projectRoutesData } from "../../routes";
import { ExternalLink, Github } from "lucide-react";

const projectsData = projectRoutesData.filter((route) => route.metadata);

export const LayoutProject = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3">
        {projectsData?.map((project, index) => {
          const {
            id,
            path,
            metadata: { name, year, status, technologies, link, sourceCode },
          } = project;

          return (
            <div
              key={id}
              className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/20 rounded-lg p-6 hover:bg-gray-800/50 hover:border-gray-600/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                {/* <Link to={path} className="absolute inset-0" /> */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                      <Link to={path} className="hover:underline">
                        {name}
                      </Link>
                    </h3>
                    <span className="text-sm text-gray-400">{year}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        status === "Completed" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-700/40 text-gray-300 text-xs rounded border border-gray-600/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ml-6 flex gap-1">
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-gray-700/50 rounded-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                  <Link
                    to={sourceCode}
                    className="text-gray-400 hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-gray-700/50 rounded-lg"
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
                      className="lucide lucide-github-icon lucide-github w-5 h-5"
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
