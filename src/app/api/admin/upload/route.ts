import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized. Please log in to admin." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const fileEntry = formData.get("file");

    if (!fileEntry || typeof fileEntry === "string") {
      return NextResponse.json({ error: "No file provided in upload request" }, { status: 400 });
    }

    const file = fileEntry as File;
    const rawName = file.name || "photo.jpg";
    const fileType = file.type || "image/jpeg";

    // Extract buffer from File
    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (buffer.length === 0) {
      return NextResponse.json({ error: "Uploaded file is empty" }, { status: 400 });
    }

    // Determine clean file extension
    let cleanExt = path.extname(rawName).toLowerCase();
    if (!cleanExt || cleanExt === ".") {
      if (fileType.includes("png")) cleanExt = ".png";
      else if (fileType.includes("webp")) cleanExt = ".webp";
      else if (fileType.includes("svg")) cleanExt = ".svg";
      else if (fileType.includes("heic")) cleanExt = ".heic";
      else cleanExt = ".jpg";
    }

    // Attempt to write file to public/uploads on disk
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      const filename = `product-${uniqueSuffix}${cleanExt}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl }, { status: 201 });
    } catch (diskWriteError) {
      console.warn("Disk write failed, falling back to base64 data URL:", diskWriteError);
      // Fallback: If disk is read-only or locked, return base64 Data URL so the upload NEVER fails
      const mimeType = fileType.startsWith("image/") ? fileType : "image/jpeg";
      const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ success: true, url: base64Url }, { status: 201 });
    }
  } catch (error) {
    console.error("Upload fatal error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process and upload image to disk",
      },
      { status: 500 }
    );
  }
}
