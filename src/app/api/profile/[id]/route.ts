import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();
  const profileId = data.id;
  console.log(data);

  try {
    // Verify the profile ID exists before updating (optional)
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { message: "Profile not found for update" },
        {
          status: 404,
        }
      );
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data, // Update data (excluding the ID)
    });

    return NextResponse.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Error updating profile" },
      {
        status: 500, // Internal Server Error status code
      }
    );
  }
}
