import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAllPhones, createPhone } from "@/services/phoneService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const phones = await getAllPhones();
  return NextResponse.json({ phones });
}

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.name || !body.brand || !body.storage) {
      return NextResponse.json(
        { error: "Name, brand, and storage are required fields" },
        { status: 400 }
      );
    }

    const newPhone = await createPhone({
      name: body.name,
      slug: body.slug,
      brand: body.brand,
      category: body.category || "laptop",
      storage: body.storage,
      storageOptions: body.storageOptions || [body.storage],
      condition: body.condition || "USA Used",
      colors: body.colors || [],
      image: body.image || "/images/placeholder-laptop.svg",
      images: body.images || [body.image || "/images/placeholder-laptop.svg"],
      featured: !!body.featured,
      inStock: body.inStock !== false,
      tagline: body.tagline || "",
      overview: body.overview || "",
      priceNote: body.priceNote || "Price on daily request (market rate)",
      specs: body.specs || {},
    });

    return NextResponse.json({ phone: newPhone }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create phone listing" },
      { status: 500 }
    );
  }
}
