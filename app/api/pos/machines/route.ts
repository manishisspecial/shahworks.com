import { NextRequest, NextResponse } from "next/server";
import { fetchPOSMachines } from "@/lib/pos-api";

export const dynamic = "force-dynamic";

/**
 * GET /api/pos/machines
 * Fetch assigned POS machines from Same Day Solutions API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const status = searchParams.get("status") || null;
    const machineType = searchParams.get("machine_type") || null;
    const search = searchParams.get("search") || null;

    const apiResponse = await fetchPOSMachines({
      page,
      limit,
      status,
      machine_type: machineType,
      search,
    });

    if (apiResponse.success) {
      return NextResponse.json(apiResponse);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch POS machines",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching POS machines:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch POS machines",
      },
      { status: 500 }
    );
  }
}

