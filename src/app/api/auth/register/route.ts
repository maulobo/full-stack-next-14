import { NextRequest, NextResponse } from "next/server";
import db from "../../../../libs/db";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("esta primera data", data);

    if (!data.email || !data.username || !data.password) {
      return NextResponse.json(
        { message: "Email, username y password son requeridos" },
        { status: 400 }
      );
    }

    // if (data.password.length < 8) {
    //   return NextResponse.json(
    //     { message: "Tu contraseña debe tener al menos 8 caracteres" },
    //     { status: 400 }
    //   );
    // }

    const mailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (mailFound)
      return NextResponse.json(
        {
          message: "El email ya existe",
        },
        { status: 400 }
      );

    const usernameFound = await db.user.findUnique({
      where: { username: data.username },
    });

    if (usernameFound)
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
        },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const emailConfirmationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        provider: "credentials",
        providerId: "1",
        emailConfirmed: false,
        emailConfirmationToken: emailConfirmationToken,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });

    const { password: _, ...user } = newUser;

    const userBack = {
      username: data.username,
      email: data.email,
    };

    // Enviar correo de confirmación

    const confirmationUrl = `http://localhost:3000/api/confirm-email?token=${emailConfirmationToken}`;

    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "maurolobo.ml@gmail.com",
        subject: "Confirma tu email en Acme",
        react: EmailTemplate({ firstName: data.username, confirmationUrl }),
        text: "",
      });

      if (emailError) {
        console.error("Error enviando el correo:", emailError);
        return NextResponse.json(
          {
            message:
              "Usuario creado, pero ocurrió un error al enviar el correo de confirmación",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(userBack);
    } catch (error) {
      console.error("Error enviando el correo de confirmación:", error);
      return NextResponse.json(
        {
          message:
            "Usuario creado, pero ocurrió un error al enviar el correo de confirmación",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creando usuario:", error);
    return NextResponse.json(
      {
        message: "Error creando usuario",
      },
      { status: 500 }
    );
  }
}
