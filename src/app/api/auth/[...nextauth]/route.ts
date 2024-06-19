import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../libs/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userFound) throw new Error("User not found");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password as string
        );
        if (!matchPassword)
          throw new Error("Your Email or Password is incorrect");
        const userId = userFound.id.toString();

        if (!userFound.emailConfirmed)
          throw new Error("Your email is not confirmed");

        const objRes = {
          email: userFound.email,
          name: userFound.username,
          id: userId,
        };
        return objRes;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        const email = profile?.email;
        let user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              email: profile?.email as string,
              username: profile.name || "",
              provider: "google",
              providerId: "2",
              profile: {
                create: {},
              },
            },
          });
        }
        return true;
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
