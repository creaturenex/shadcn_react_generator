import FileUpload from "@/components/FileUpload";
import { BookText, GithubIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-4 font-[family-name:var(--font-geist-sans)]">

      <main className="flex-1 flex items-center justify-center overflow-auto mb-4">
        <FileUpload />
      </main>

      <footer className="w-full flex gap-6 flex-wrap items-center justify-center mt-auto">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
            <rect width="256" height="256" fill="none"></rect>
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"></line>
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"></line>
          </svg>
          Shadcn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.anthropic.com/en/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookText />
          Anthropic Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/creaturenex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          creaturenex
        </a>
      </footer>
    </div>
  );
}