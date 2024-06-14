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

    const mailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log(mailFound);

    if (mailFound)
      return NextResponse.json(
        {
          message: "Mail already exist",
        },
        { status: 400 }
      );

    const usernameFound = await db.user.findUnique({
      where: { username: data.username },
    });

    if (usernameFound)
      return NextResponse.json(
        {
          message: "user already exist",
        },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user",
      },
      { status: 500 }
    );
  }
}
