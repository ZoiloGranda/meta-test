import { Photo } from "@/api/types/Photo";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`,
    );

    if (!response.ok) {
      throw new Error("Photo by id response was not ok");
    }
    const photo: Photo = await response.json();
    return NextResponse.json({ photo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Photo by id" },
      { status: 500 },
    );
  }
}
