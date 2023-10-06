import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            phone: string,
            email: string
            avatar: string,
            onBoarding: boolean,
            description: string
        },
        tokens: {
            accessToken: string,
            refreshToken: string,
            expriesIn: number
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            _id: string,
            name: string,
            phone: string,
            email: string
            avatar: string,
            onBoarding: boolean,
            description: string
        },
        tokens: {
            accessToken: string,
            refreshToken: string,
            expriesIn: number
        }
    }
}