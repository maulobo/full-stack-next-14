import { NextRequest, NextResponse } from "next/server";
import db from "../../../../libs/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("esta primera data", data);

    if (!data.email || !data.username || !data.password) {
      return NextResponse.json(
        { message: "Email and username and password are required" },
        { status: 400 }
      );
    }

    if (data.password.length < 8) {
      return NextResponse.json(
        { message: "Your password es una verga" },
        { status: 400 }
      );
    }

    const mailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (mailFound)
      return NextResponse.json(
        {
          message: "Mail already exists",
        },
        { status: 400 }
      );

    const usernameFound = await db.user.findUnique({
      where: { username: data.username },
    });

    if (usernameFound)
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        provider: "credentials",
        providerId: "1",
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

    return NextResponse.json(userBack);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message: "Error creating user",
      },
      { status: 500 }
    );
  }
}
