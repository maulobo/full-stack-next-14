// route.ts para confirmación de email
import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/error?error=Token de confirmación faltante", request.url)
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        emailConfirmationToken: token,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/error?error=Token de confirmación inválido", request.url)
      );
    }

    await prisma.user.update({
      where: {
        emailConfirmationToken: token,
      },
      data: {
        emailConfirmed: true,
        emailConfirmationToken: null,
      },
    });

    return NextResponse.redirect(new URL("/confirmed-email", request.url));
  } catch (error) {
    console.error("Error confirmando email:", error);
    return NextResponse.redirect(
      new URL("/auth/error?error=Error confirmando email", request.url)
    );
  }
}
