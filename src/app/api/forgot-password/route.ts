import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log("aca");
  try {
    const body = await req.json();
    const { email } = body;
    console.log("Received email:", email);

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    // Enviar el correo electrónico de restablecimiento de contraseña
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "maurolobo.ml@gmail.com",
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
      text: "",
    });

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in password reset request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
