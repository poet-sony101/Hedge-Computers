import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/heic",
  "image/svg+xml",
];

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image file is too large (maximum 10MB)" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|avif|heic|svg)$/i)) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload a JPG, PNG, WebP, or GIF image." },
        { status: 400 }
      );
    }

    // Prepare upload directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate safe unique filename
    const originalExt = path.extname(file.name) || ".jpg";
    const cleanExt = originalExt.toLowerCase();
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
      { error: "Failed to process and upload image" },
      { status: 500 }
    );
  }
}
