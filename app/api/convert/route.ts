import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    if (!formData || !formData.get("image")) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    const images = formData.getAll("image") as File[];
    if (
      images.some((image) => !["image/jpeg", "image/jpg"].includes(image.type))
    ) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 },
      );
    }

    const convertedImages = await Promise.all(
      images.map(async (image: File) => {
        const buffer = await image.arrayBuffer();
        try {
          const sharpImage = await sharp(buffer).toFormat("png").toBuffer();
          return sharpImage.toString("base64");
        } catch (error) {
          return null;
        }
      }),
    );

    return NextResponse.json(
      convertedImages.filter((result) => result !== null),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to convert images" },
      { status: 500 },
    );
  }
}
