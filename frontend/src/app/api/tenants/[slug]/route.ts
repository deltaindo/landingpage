import { getTenantBySlug } from "@/lib/getTenantData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!params.slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const tenant = await getTenantBySlug(params.slug);

    // Add CORS headers
    const response = NextResponse.json(tenant);
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=3600"
    );
    return response;
  } catch (error) {
    console.error(`Error fetching tenant: ${params.slug}`, error);
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }
}

// Optional: Add HEAD request for checking if tenant exists
export async function HEAD(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await getTenantBySlug(params.slug);
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
