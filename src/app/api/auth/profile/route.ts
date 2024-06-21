import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userParams = req.nextUrl.searchParams.get("user");
  console.log(userParams);
  if (!userParams) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  try {
    const userFound = await prisma.user.findUnique({
      where: { username: userParams },
      include: {
        profile: true,
      },
    });
    if (!userFound) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userFound, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
