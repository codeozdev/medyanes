import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const body = await request.json();
    const { fullname, city, email } = body;

    const new_post = await prisma.student.create({
      data: {
        fullname,
        city,
        email,
      },
    });

    return NextResponse.json(new_post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Post fonksiyon hata: ", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.student.findMany();

    return NextResponse.json({ message: "Tum veriler cekildi", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Get fonksiyon hata" }, { status: 500 });
  }
}
