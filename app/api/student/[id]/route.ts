import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: any, { params }: any) {
  const { id } = await params;
  try {
    const deletedPost = await prisma.student.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Student has been deleted");
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Student Delete Error", error }, { status: 500 });
  }
}

export async function GET(request: any, { params }: any) {
  try {
    const { id } = await params;

    const post = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Get fonksiyon hata" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
}

export async function PATCH(request: any, { params }: any) {
  try {
    const { newFullName: fullname, newCity: city, newEmail: email } = await request.json();

    const { id } = await params;

    const updatedPost = await prisma.student.update({
      where: {
        id,
      },
      data: {
        fullname,
        city,
        email,
      },
    });

    return NextResponse.json({ updatedPost, message: "Student Updated" });
  } catch (error) {
    return NextResponse.json({ message: "Student Update Error", error }, { status: 500 });
  }
}
