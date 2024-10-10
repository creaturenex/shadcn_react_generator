'use client'

import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar";
import FileUpload from "@/components/FileUpload";
import AuthButton from "@/components/AuthButton";
import { BookText, GithubIcon } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow mx-auto p-4 overflow-auto">
        <div className="max-w-screen-lg mx-auto">
        <AuthButton />
      {loading ? (
        <p>Loading...</p>
      ) : session ? (
        <FileUpload />
      ) : (
        <p>Please sign in to access the content.</p>
      )}

        </div>
      </main>

      <footer className="w-full flex gap-4 flex-wrap items-center justify-center text-sm p-4 shadow-sm mt-auto">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-4 w-4">
            <rect width="256" height="256" fill="none"></rect>
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
          </svg>
          Shadcn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.anthropic.com/en/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookText className="h-4 w-4" />
          Anthropic Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/creaturenex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="h-4 w-4" />
          creaturenex
        </a>
      </footer>

    </div>
  );
}