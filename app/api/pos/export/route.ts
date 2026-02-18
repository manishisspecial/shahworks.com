import { NextRequest, NextResponse } from "next/server";
import { createExportJob, checkExportStatus } from "@/lib/pos-api";

export const dynamic = "force-dynamic";

/**
 * POST /api/pos/export
 * Create an export job (supports csv, excel, pdf, zip formats)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format, date_from, date_to, status, terminal_id } = body;

    if (!format || !date_from || !date_to) {
      return NextResponse.json(
        {
          success: false,
          error: "format, date_from, and date_to are required",
        },
        { status: 400 }
      );
    }

    // Map our status to API status
    const statusMap: Record<string, string | null> = {
      success: "CAPTURED",
      failed: "FAILED",
      pending: "AUTHORIZED",
      refunded: "REFUNDED",
    };

    const apiResponse = await createExportJob({
      format: format as "csv" | "excel" | "pdf" | "zip",
      date_from: new Date(date_from).toISOString(),
      date_to: new Date(date_to + "T23:59:59.999Z").toISOString(),
      status: status ? statusMap[status] || null : null,
      terminal_id: terminal_id || null,
    });

    return NextResponse.json(apiResponse, { status: 202 });
  } catch (error: any) {
    console.error("Export job creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create export job",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/pos/export?jobId=xxx
 * Check export job status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          error: "jobId is required",
        },
        { status: 400 }
      );
    }

    const apiResponse = await checkExportStatus(jobId);
    return NextResponse.json(apiResponse);
  } catch (error: any) {
    console.error("Export status check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to check export status",
      },
      { status: 500 }
    );
  }
}

