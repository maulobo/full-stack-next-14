// pages/api/resend-email.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { Resend } from "resend";
import crypto from "crypto";
import EmailTemplate from "@/app/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    // Leer el cuerpo de la solicitud
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

    if (user.emailConfirmed) {
      return NextResponse.json(
        { message: "Email is already confirmed" },
        { status: 400 }
      );
    }

    // Si pasó todos los ifs entonces creamos un nuevo token
    const emailConfirmationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { email },
      data: { emailConfirmationToken },
    });

    const confirmationUrl = `${baseURL}/confirm-email?token=${emailConfirmationToken}`;

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "maurolobo.ml@gmail.com", //CAMBIAR !!!! SOLO TEST
      subject: "Confirm your email",
      react: EmailTemplate({ firstName: user.username, confirmationUrl }),
      text: "Confirm your email",
    });

    return NextResponse.json(
      { message: "Confirmation email resent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resending email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
