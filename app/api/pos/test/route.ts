import { NextRequest, NextResponse } from "next/server";
import { fetchPOSTransactions, fetchPOSMachines, checkHealth } from "@/lib/pos-api";

export const dynamic = "force-dynamic";

/**
 * GET /api/pos/test
 * Test endpoint to verify API integration — checks health, transactions, and machines
 */
export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const apiUrl = process.env.SAME_DAY_SOLUTIONS_API_URL;
    const apiKey = process.env.SAME_DAY_SOLUTIONS_API_KEY;
    const apiSecret = process.env.SAME_DAY_SOLUTIONS_API_SECRET;

    const checks = {
      environmentVariables: {
        apiUrl: !!apiUrl,
        apiKey: !!apiKey && apiKey !== "pk_live_YOUR_API_KEY_HERE",
        apiSecret: !!apiSecret && apiSecret !== "sk_live_YOUR_API_SECRET_HERE",
      },
      apiUrl: apiUrl || "Not set (defaulting to https://api.samedaysolution.in)",
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + "..." : "Not set",
    };

    // If credentials are not configured, return early
    if (!checks.environmentVariables.apiKey || !checks.environmentVariables.apiSecret) {
      return NextResponse.json({
        success: false,
        message: "API credentials not configured",
        checks,
        instructions: [
          "1. Create a .env.local file in the project root",
          "2. Add the following variables:",
          "   SAME_DAY_SOLUTIONS_API_URL=https://api.samedaysolution.in",
          "   SAME_DAY_SOLUTIONS_API_KEY=pk_live_YOUR_ACTUAL_KEY",
          "   SAME_DAY_SOLUTIONS_API_SECRET=sk_live_YOUR_ACTUAL_SECRET",
          "3. Restart the Next.js dev server",
        ],
      });
    }

    const results: Record<string, any> = {};

    // 1. Health check (no auth required)
    try {
      const healthResponse = await checkHealth();
      results.healthCheck = {
        status: "✅ Passed",
        data: healthResponse,
      };
    } catch (err: any) {
      results.healthCheck = {
        status: "❌ Failed",
        error: err.message,
      };
    }

    // 2. Test transactions API (last 7 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    try {
      const txnResponse = await fetchPOSTransactions({
        date_from: startDate.toISOString(),
        date_to: endDate.toISOString(),
        page: 1,
        page_size: 5,
      });

      results.transactions = {
        status: "✅ Passed",
        apiConnected: true,
        transactionsFound: txnResponse.data.length > 0,
        totalRecords: txnResponse.pagination.total_records,
        summary: txnResponse.summary,
        sampleCount: txnResponse.data.length,
      };
    } catch (err: any) {
      results.transactions = {
        status: "❌ Failed",
        error: err.message,
      };
    }

    // 3. Test POS machines API
    try {
      const machinesResponse = await fetchPOSMachines({ page: 1, limit: 5 });
      results.machines = {
        status: "✅ Passed",
        apiConnected: true,
        machinesFound: machinesResponse.data.length > 0,
        totalMachines: machinesResponse.pagination.total,
        sampleCount: machinesResponse.data.length,
        sampleData: machinesResponse.data.map((m) => ({
          terminal_id: m.terminal_id,
          machine_model: m.machine_model,
          status: m.status,
          retailer_name: m.retailer_name,
        })),
      };
    } catch (err: any) {
      results.machines = {
        status: "❌ Failed",
        error: err.message,
      };
    }

    const allPassed = Object.values(results).every(
      (r: any) => r.status?.includes("✅")
    );

    return NextResponse.json({
      success: allPassed,
      message: allPassed
        ? "All API integrations are working! ✅"
        : "Some API checks failed — see details below",
      checks,
      results,
      nextSteps: allPassed
        ? [
            "✅ API credentials are configured correctly",
            "✅ Health check passed",
            "✅ Transactions API is working",
            "✅ POS Machines API is working",
            "✅ You can now use the admin dashboard",
          ]
        : [
            "Review the failed checks above",
            "Verify your API credentials",
            "Check if your IP is whitelisted",
            "Contact Same Day Solutions support if issues persist",
          ],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Test failed",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
