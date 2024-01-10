import { login, loginRoute } from "@/services/routes/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import handleRequest from "@/services/apiHandler";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await login({ email, password });

        if (!user) {
          return null;
        }
        return user.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      // sessionStorage.setItem("token", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
