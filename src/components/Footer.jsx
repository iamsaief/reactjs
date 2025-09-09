import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto mt-50 max-w-4xl border-t border-gray-300/10 py-6 text-center text-gray-300">
      <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
        Build with <Heart className="h-4 w-4" /> by{" "}
        <a
          href="https://www.linkedin.com/in/saiefalemon/"
          className="hover:underline"
        >
          Saief Al Emon
        </a>
      </p>
    </footer>
  );
}
