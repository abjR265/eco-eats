import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db"; // Make sure this connects properly
import { users } from "@/db/schema"; // Your Drizzle users table
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs"; // For comparing password hashes

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        // Find user from database
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        if (!user || typeof user.passwordhash !== "string") {
          return null;
        }

        // Compare password entered vs hashed password
        const isValid = await compare(credentials.password, user.passwordhash);

        if (!isValid) {
          return null;
        }

        // Successful login
        return {
          id: String(user.id),
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Customize login page path if needed
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; email: string };
        token.id = u.id;
        token.email = u.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
