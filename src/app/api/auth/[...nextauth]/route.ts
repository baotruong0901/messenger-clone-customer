import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt";


async function refreshToken(token: JWT): Promise<JWT> {

    const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            authorization: `Refresh ${token?.tokens?.refreshToken}`,
        },
    });
    const response = await res.json();

    return {
        ...token,
        tokens: response.tokens,
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const { email, password } = credentials

                const res = await fetch(process.env.BACKEND_URL + "/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if (res.status === 400) {
                    throw new Error('Invalid credentials');
                }

                const user = await res.json()
                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) return { ...token, ...user }

            if (new Date().getTime() < token.tokens.expriesIn) return token

            return await refreshToken(token)

        },

        async session({ token, session }) {

            session.user = token.user
            session.tokens = token.tokens

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };