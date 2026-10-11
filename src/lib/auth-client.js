import { createAuthClient } from "better-auth/react"; // যদি React / Next.js হয়

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
});

export const { useSession, signIn, signOut, signUp } = authClient;