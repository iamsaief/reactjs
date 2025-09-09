import { ChevronRight, File, FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="flex"
          >
            <ChevronRight className={`size-4 text-gray-400`} />
          </motion.span>
        )}

        {/* Folder or File icon */}
        {node.nodes ? (
          <span
            className={`text-blue-400 ${node.nodes.length === 0 ? "ml-5" : ""}`}
          >
            {isOpen && node.nodes.length > 0 ? (
              <FolderOpen className="size-5" />
            ) : (
              <FolderClosed className="size-5" />
            )}
          </span>
        ) : (
          <File className="ml-5 size-5 text-gray-500" />
        )}

        {/* Node name */}
        {node.name}
      </button>

      {/* Recursively render children if open */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="flex flex-col justify-end overflow-hidden pl-4"
          >
            {node.nodes?.map((child) => (
              <RecursiveFileTreeItem node={child} key={child.name} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function RecursiveFileTreeDemo() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Recursive File Tree</h1>
      <ul>
        {nodes.map((node) => (
          <RecursiveFileTreeItem node={node} key={node.name} />
        ))}
      </ul>
    </>
  );
}

const nodes = [
  {
    name: "Movies",
    nodes: [
      {
        name: "Action",
        nodes: [
          {
            name: "2000s",
            nodes: [{ name: "Gladiator.mp4" }, { name: "The-Dark-Knight.mp4" }],
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
        nodes: [{ name: "2000s", nodes: [{ name: "American-Beauty.mp4" }] }],
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
];
