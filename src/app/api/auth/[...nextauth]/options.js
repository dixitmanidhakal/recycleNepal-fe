import { login } from '@/services/routes/auth';
import CredentialsProvider from 'next-auth/providers/credentials';



export const option = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials ;
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
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
