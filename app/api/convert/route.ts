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

    const resizeOption = formData.get("resizeOption") as string;
    const height = parseInt(formData.get("height") as string) || 0;
    const width = parseInt(formData.get("width") as string) || 0;
    const fitOption = formData.get("fitOption") as string;
    const quality = parseInt(formData.get("quality") as string) || 100;
    const strip = formData.get("strip") === "true";
    const autoOrient = formData.get("autoOrient") === "true";

    const fitMap: Record<string, "inside" | "cover" | "fill"> = {
      max: "inside",
      crop: "cover",
      scale: "fill",
    };

    const convertedImages = await Promise.all(
      images.map(async (image: File) => {
        const buffer = await image.arrayBuffer();
        try {
          let sharpImage = sharp(buffer);

          if (autoOrient) {
            const metadata = await sharpImage.metadata();
            if (metadata.orientation && metadata.orientation > 1) {
              const orientations: Record<number, number> = {
                3: 180,
                6: 90,
                8: -90,
              };
              const angle = orientations[metadata.orientation] || 0;
              if (angle !== 0) {
                sharpImage = sharpImage.rotate(angle);
              }
            }
          }

          if (resizeOption === "resize" && width > 0 && height > 0) {
            sharpImage = sharpImage.resize(width, height, {
              fit: fitMap[fitOption] || "inside",
            });
          }

          if (!strip) {
            sharpImage = sharpImage.withMetadata();
          }

          const result = await sharpImage.png({ quality }).toBuffer();

          return result.toString("base64");
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
