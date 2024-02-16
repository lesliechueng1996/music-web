import type { NextAuthOptions, User } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { getManagerByUsername } from '@/dao/manager-dao';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;
        const manager = await getManagerByUsername(username);
        if (!manager) {
          return null;
        }

        const isMatch = await compare(password, manager.password);
        if (!isMatch) {
          return null;
        }

        return {
          id: manager.id,
          username: manager.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};

export async function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
