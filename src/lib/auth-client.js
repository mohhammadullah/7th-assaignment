import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:"https://bazar-dor-three-lime.vercel.app"
    
});

export const { useSession, signIn, signOut, signUp } = authClient;
