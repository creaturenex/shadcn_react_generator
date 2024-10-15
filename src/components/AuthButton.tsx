'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("Session status:", status)
    console.log("Session data:", session)
  }, [status, session])

  if (status === "loading") {
    return <div>Loading authentication status...</div>
  }

  if (session) {
    return (
      <div className=" flex flex-row items-center justify-between gap-2">
        <p>Hi {session.user?.email}!</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <>
      <Button onClick={() => signIn('github')}>
        <GithubIcon className="mr-2" />
        Sign in
      </Button>
    </>
  )
}