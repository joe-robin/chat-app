import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredientials() {
  const clientId = process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

  if (!clientId || clientId.length === 0)
    throw new Error("GOOGLE_CLIENT_ID Not Found");
  if (!clientSecret || clientSecret.length === 0)
    throw new Error("GOOGLE_CLIENT_SECRET Not Found");

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [GoogleProvider(getGoogleCredientials())],
};
