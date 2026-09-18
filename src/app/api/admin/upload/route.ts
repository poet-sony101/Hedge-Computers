import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// Max file size: 25MB (client-side compression also reduces large gallery photos)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized. Please log in to admin." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided in upload request" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image file is too large (maximum 25MB)" },
        { status: 400 }
      );
    }

    // Flexible format check supporting mobile gallery formats (HEIC, HEIF, WebP, etc.)
    const isImageType =
      file.type.startsWith("image/") ||
      file.type === "application/octet-stream" ||
      file.name.match(/\.(jpg|jpeg|png|webp|gif|avif|heic|heif|svg|bmp|tiff)$/i);

    if (!isImageType) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload a photo or graphic (JPG, PNG, WebP, HEIC, SVG)." },
        { status: 400 }
      );
    }

    // Prepare upload directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Extract or infer extension
    let cleanExt = path.extname(file.name).toLowerCase();
    if (!cleanExt || cleanExt === ".") {
      if (file.type.includes("png")) cleanExt = ".png";
      else if (file.type.includes("webp")) cleanExt = ".webp";
      else if (file.type.includes("svg")) cleanExt = ".svg";
      else if (file.type.includes("heic")) cleanExt = ".heic";
      else cleanExt = ".jpg";
    }

    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const filename = `product-${uniqueSuffix}${cleanExt}`;
    const filePath = path.join(uploadsDir, filename);

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process and upload image to disk" },
      { status: 500 }
    );
  }
}
