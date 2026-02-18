# Same Day Solutions POS API Integration

This document explains how to configure and use the Same Day Solutions POS Partner API integration.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Same Day Solutions POS API Configuration
SAME_DAY_SOLUTIONS_API_URL=https://api.samedaysolution.in
SAME_DAY_SOLUTIONS_API_KEY=pk_live_YOUR_API_KEY_HERE
SAME_DAY_SOLUTIONS_API_SECRET=sk_live_YOUR_API_SECRET_HERE
```

**Important:** 
- Replace `YOUR_API_KEY_HERE` and `YOUR_API_SECRET_HERE` with your actual credentials from Same Day Solutions
- Never commit `.env.local` to version control (it's already in `.gitignore`)

## API Authentication

The integration uses HMAC-SHA256 signature authentication as required by the Same Day Solutions API:

1. **Headers Required:**
   - `x-api-key`: Your public API key
   - `x-signature`: HMAC-SHA256 signature
   - `x-timestamp`: Current Unix timestamp in milliseconds

2. **Signature Generation:**
   ```
   signature = HMAC_SHA256(api_secret, JSON.stringify(body) + timestamp)
   ```

All authentication is handled automatically by the `lib/pos-api.ts` utility.

## API Endpoints Used

### 1. Get POS Transactions
- **Endpoint:** `POST /api/partner/pos-transactions`
- **Our Route:** `/api/pos/transactions` (GET)
- **Description:** Fetches transactions with filtering and pagination

### 2. Create Export Job
- **Endpoint:** `POST /api/partner/pos-transactions/export`
- **Our Route:** `/api/pos/export` (POST)
- **Description:** Creates an async export job (CSV, Excel, PDF, or ZIP)

### 3. Check Export Status
- **Endpoint:** `GET /api/partner/export-status/{job_id}`
- **Our Route:** `/api/pos/export?jobId={jobId}` (GET)
- **Description:** Checks the status of an export job and returns download URL when ready

## Status Mapping

The API uses different status values than our frontend. Here's the mapping:

| API Status | Frontend Status |
|-----------|----------------|
| `AUTHORIZED` | `pending` |
| `CAPTURED` | `success` |
| `FAILED` | `failed` |
| `REFUNDED` | `refunded` |
| `VOIDED` | `failed` |

## Payment Mode Mapping

| API Payment Mode | Frontend Payment Method |
|-----------------|------------------------|
| `CARD` | `card` |
| `UPI` | `upi` |
| `NFC` | `card` |

## Features

### Transaction Viewing
- Real-time transaction data from POS machines
- Filter by date range, status, payment method, terminal ID
- Search by transaction ID, reference number, terminal ID
- Pagination support (default: 50 per page)

### Export Functionality
- Async export job creation
- Automatic polling for job completion
- Direct download when ready
- Supports CSV, Excel, PDF, and ZIP formats

### Summary Statistics
- Total revenue (from successful transactions)
- Total transaction count
- Success/failed counts
- Calculated from API summary data

## Troubleshooting

### "API credentials not configured" Error
- Ensure `.env.local` exists with all three variables
- Restart the Next.js dev server after adding environment variables
- Check that variable names match exactly (case-sensitive)

### "Failed to fetch transactions" Error
- Verify your API key and secret are correct
- Check that your IP address is whitelisted (contact Same Day Solutions)
- Ensure the API base URL is correct
- Check network connectivity

### Export Job Timeout
- Large date ranges may take longer to process
- Default timeout is 60 seconds
- Try reducing the date range if exports timeout frequently

### Rate Limiting
- API rate limit: 100 requests/minute
- If you hit the limit, wait 60 seconds before retrying

## Testing

1. **Health Check:**
   ```bash
   curl https://api.samedaysolution.in/pos-health
   ```

2. **Test Transaction Fetch:**
   - Log into admin dashboard
   - Set date range filters
   - Click "Refresh"

3. **Test Export:**
   - Set date range
   - Click "Export CSV"
   - Wait for job to complete (status updates shown)

## Support

For API issues or questions:
- Contact Same Day Solutions support
- Check API documentation in Postman collection
- Review error messages in browser console and server logs

