import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../libs/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
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
          userFound.password
        );
        if (!matchPassword)
          throw new Error("Your Email or Password is incorrect");
        const userId = userFound.id.toString();

        const objRes = {
          email: userFound.email,
          name: userFound.username,
          id: userId,
        };
        return objRes;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Ruta de inicio de sesión
    signOut: "/auth/logout", // Ruta de cierre de sesión
    error: "/auth/error", // Ruta de error
    verifyRequest: "/auth/verify-request", // Ruta de verificación de solicitud
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
