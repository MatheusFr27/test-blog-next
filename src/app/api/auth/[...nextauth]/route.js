import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                },
            },

            async authorize(credentials, req) {
                const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                })

                const user = await response.json()
                
                if (user && response.ok) {
                    return user.user
                }

                return null

            }
        })
    ],
    pages: {
        signIn: '/posts',
        signOut: '/auth/login',
    }
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST,
    authOptions
}

