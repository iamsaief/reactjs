import { ChevronRight, File, Folder } from "lucide-react";
import { useState } from "react";

export function RecursiveFileTreeItem({ node }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <li key={node.name}>
      {/* Row with icon + name */}
      <button
        className="flex items-center gap-1.5 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Expand/Collapse button if node has children */}
        {node.nodes && node.nodes.length > 0 && (
          <span className="">
            <ChevronRight
              className={`size-4 text-gray-400 ${isOpen ? "rotate-90" : ""}`}
            />
          </span>
        )}

        {/* Folder or File icon */}
        {node.nodes ? (
          <Folder
            className={`size-5 text-amber-400 ${node.nodes.length === 0 ? "ml-5" : ""}`}
          />
        ) : (
          <File className="ml-5 size-5 text-gray-500" />
        )}

        {/* Node name */}
        {node.name}
      </button>

      {/* Recursively render children if open */}
      {isOpen && (
        <ul className="pl-4">
          {node.nodes?.map((child) => (
            <RecursiveFileTreeItem node={child} key={child.name} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function RecursiveFileTree() {
  return (
    <div className="h-screen px-4 pt-14 pb-4 md:py-8">
      <div className="mx-auto max-h-full min-h-1/2 w-full max-w-sm overflow-y-auto rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Recursive File Tree</h1>
        <ul>
          {nodes.map((node) => (
            <RecursiveFileTreeItem node={node} key={node.name} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const nodes = [
  {
    name: "Home",
    nodes: [
      {
        name: "Movies",
        nodes: [
          {
            name: "Action",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "Gladiator.mp4" },
                  { name: "The-Dark-Knight.mp4" },
                ],
              },
              { name: "2010s", nodes: [] },
            ],
          },
          {
            name: "Comedy",
            nodes: [{ name: "2000s", nodes: [{ name: "Superbad.mp4" }] }],
          },
          {
            name: "Drama",
            nodes: [
              { name: "2000s", nodes: [{ name: "American-Beauty.mp4" }] },
            ],
          },
        ],
      },
      {
        name: "Music",
        nodes: [
          { name: "Rock", nodes: [] },
          { name: "Classical", nodes: [] },
        ],
      },
      { name: "Pictures", nodes: [] },
      {
        name: "Documents",
        nodes: [],
      },
      { name: "passwords.txt" },
    ],
  },
];
