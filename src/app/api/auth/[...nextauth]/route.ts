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
      if (account?.provider === "github") {
        const email = profile?.email;
      }
      if (account?.provider === "google" && profile?.email) {
        const email = profile.email;
        let user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              email: profile.email,
              username: profile.name || "",
              provider: "google",
              providerId: account.id as string,
              profile: {
                create: {
                  firstName: profile.name,
                  avatarUrl: profile.image,
                },
              },
            },
          });
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token) {
        console.log(token);
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/auth")) {
    //     return url;
    //   }
    //   return baseUrl + "/confirm-email";
    // },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/confirm-email",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
