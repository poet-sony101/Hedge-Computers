import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in to admin." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const fileEntry = formData.get("file");

    if (!fileEntry || typeof fileEntry === "string") {
      return NextResponse.json(
        { error: "No file provided in upload request" },
        { status: 400 }
      );
    }

    const file = fileEntry as File;
    const rawName = file.name || "photo.jpg";
    const fileType = file.type || "image/jpeg";

    // Extract buffer from File
    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Uploaded file is empty" },
        { status: 400 }
      );
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

    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const filename = `product-${uniqueSuffix}${cleanExt}`;

    // 1. Prioritize Cloud Storage (Supabase Storage) when configured
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const storagePath = `products/${filename}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("device-photos")
          .upload(storagePath, buffer, {
            contentType: fileType,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from("device-photos")
            .getPublicUrl(storagePath);

          if (urlData?.publicUrl) {
            return NextResponse.json(
              { success: true, url: urlData.publicUrl },
              { status: 201 }
            );
          }
        }
        console.warn("[Supabase Storage] Upload returned error:", uploadError);
      } catch (storageErr) {
        console.warn("[Supabase Storage] Upload exception:", storageErr);
      }
    }

    // 2. Local disk write (used for local development)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json(
        { success: true, url: publicUrl },
        { status: 201 }
      );
    } catch (diskWriteError) {
      console.warn(
        "Disk write failed (expected on serverless read-only filesystem), falling back to data URL:",
        diskWriteError
      );

      // 3. Fallback: Base64 Data URL so user is NEVER blocked on serverless
      const mimeType = fileType.startsWith("image/")
        ? fileType
        : "image/jpeg";
      const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
      return NextResponse.json(
        { success: true, url: base64Url },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Upload fatal error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process and upload image",
      },
      { status: 500 }
    );
  }
}
