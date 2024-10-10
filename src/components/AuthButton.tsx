'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}