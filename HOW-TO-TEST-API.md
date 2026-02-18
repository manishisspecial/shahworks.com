# How to Test All APIs - Complete Guide

This comprehensive guide will help you verify that **ALL** Same Day Solutions POS APIs are working correctly.

## 🚀 Quick Test (Recommended - Tests All APIs at Once)

### Method 1: Use the Comprehensive Test Endpoint

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open the test endpoint in your browser:**
   ```
   http://localhost:3000/api/pos/test
   ```

3. **Check the response:**
   - ✅ **Success**: You'll see a JSON response with `"success": true` and test results for:
     - Health Check API
     - Transactions API
     - POS Machines API
   - ❌ **Failure**: You'll see error messages and troubleshooting steps

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "All API integrations are working! ✅",
  "checks": {
    "environmentVariables": {
      "apiUrl": true,
      "apiKey": true,
      "apiSecret": true
    }
  },
  "results": {
    "healthCheck": {
      "status": "✅ Passed",
      "data": { "status": "healthy", ... }
    },
    "transactions": {
      "status": "✅ Passed",
      "apiConnected": true,
      "transactionsFound": true,
      "totalRecords": 150
    },
    "machines": {
      "status": "✅ Passed",
      "apiConnected": true,
      "machinesFound": true,
      "totalMachines": 5
    }
  }
}
```

---

## 📋 Individual API Testing

### API 1: Health Check (Public - No Auth Required)

**Endpoint:** `GET /pos-health`

**Test via Browser:**
```
http://localhost:3000/api/pos/test
```
Look for `results.healthCheck.status: "✅ Passed"`

**Test via Direct API Call:**
```bash
curl https://api.samedaysolution.in/pos-health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "pos-partner-api",
  "version": "1.0.0",
  "timestamp": "2026-02-18T10:00:00.000Z"
}
```

---

### API 2: Get POS Transactions

**Endpoint:** `POST /api/partner/pos-transactions`  
**Our Route:** `GET /api/pos/transactions`

#### Test via Admin Dashboard:
1. Login: `http://localhost:3000/admin/login` (admin/admin123)
2. Set date range (e.g., last 7 days)
3. Click "Refresh"
4. ✅ **Success**: Transactions appear in table, summary cards show numbers

#### Test via Browser Console:
```javascript
// Open browser console (F12) on admin dashboard
fetch('/api/pos/transactions?startDate=2026-02-11&endDate=2026-02-18')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Transactions API:', data.success);
    console.log('Total:', data.summary?.totalTransactions);
    console.log('Records:', data.data?.length);
  })
```

#### Test via cURL:
```bash
# Note: This requires authentication, so use the dashboard or test endpoint instead
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "transactionId": "260217042251974E883523117",
      "amount": 15.00,
      "status": "success",
      "paymentMethod": "card",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 50,
    "total_records": 150,
    "has_next": true
  },
  "summary": {
    "totalAmount": 15000.00,
    "totalTransactions": 150,
    "successCount": 120,
    "failedCount": 5
  }
}
```

---

### API 3: Get POS Machines

**Endpoint:** `GET /api/partner/pos-machines`  
**Our Route:** `GET /api/pos/machines`

#### Test via Admin Dashboard:
1. Go to: `http://localhost:3000/admin/terminals`
2. ✅ **Success**: POS machines appear in cards/grid
3. Try search and filters

#### Test via Browser Console:
```javascript
fetch('/api/pos/machines?page=1&limit=10')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Machines API:', data.success);
    console.log('Total Machines:', data.pagination?.total);
    console.log('Machines:', data.data);
  })
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "terminal_id": "29196333",
      "device_serial": "2841154268",
      "machine_model": "Razorpay POS",
      "status": "active",
      "retailer_name": "Example Retailer",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 5,
    "has_next_page": false
  }
}
```

---

### API 4: Create Export Job

**Endpoint:** `POST /api/partner/pos-transactions/export`  
**Our Route:** `POST /api/pos/export`

#### Test via Admin Dashboard:
1. Set date range (e.g., last 30 days)
2. Click "Export CSV" button
3. Watch status updates:
   - "Creating export job..." ✅
   - "Processing export..." ✅
   - "Downloading..." ✅
4. ✅ **Success**: CSV file downloads automatically

#### Test via Browser Console:
```javascript
fetch('/api/pos/export', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    format: 'csv',
    date_from: '2026-02-01',
    date_to: '2026-02-28'
  })
})
  .then(r => r.json())
  .then(data => {
    console.log('✅ Export Job Created:', data.success);
    console.log('Job ID:', data.data?.job_id);
    // Save job_id to check status
    window.exportJobId = data.data?.job_id;
  })
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "Export job created. Use the job_id to check status.",
    "job_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "format": "csv",
    "status": "QUEUED",
    "remaining_exports_today": 9
  }
}
```

---

### API 5: Check Export Status

**Endpoint:** `GET /api/partner/export-status/{job_id}`  
**Our Route:** `GET /api/pos/export?jobId={jobId}`

#### Test via Browser Console:
```javascript
// Use job_id from previous export
const jobId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

fetch(`/api/pos/export?jobId=${jobId}`)
  .then(r => r.json())
  .then(data => {
    console.log('✅ Export Status:', data.success);
    console.log('Status:', data.data?.job?.status);
    console.log('File URL:', data.data?.job?.file_url);
    
    if (data.data?.job?.status === 'COMPLETED') {
      console.log('✅ Export ready! Download URL:', data.data.job.file_url);
    }
  })
```

**Expected Response (Processing):**
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "status": "PROCESSING",
      "format": "csv",
      "file_url": null,
      "created_at": "2026-02-18T10:00:00.000Z"
    }
  }
}
```

**Expected Response (Completed):**
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "status": "COMPLETED",
      "format": "csv",
      "file_url": "https://sameday-pos-exports.s3.ap-south-1.amazonaws.com/...",
      "file_size_bytes": 45670,
      "record_count": 150,
      "completed_at": "2026-02-18T10:00:15.000Z"
    }
  }
}
```

---

## ✅ Complete Testing Checklist

Use this checklist to verify **ALL** APIs are working:

### Environment Setup
- [ ] `.env.local` file exists in project root
- [ ] `SAME_DAY_SOLUTIONS_API_URL` is set
- [ ] `SAME_DAY_SOLUTIONS_API_KEY` is set (not placeholder)
- [ ] `SAME_DAY_SOLUTIONS_API_SECRET` is set (not placeholder)
- [ ] Dev server restarted after adding env variables

### API 1: Health Check
- [ ] Test endpoint shows `healthCheck.status: "✅ Passed"`
- [ ] Health check returns `"status": "healthy"`

### API 2: Transactions
- [ ] Test endpoint shows `transactions.status: "✅ Passed"`
- [ ] Can fetch transactions via dashboard
- [ ] Transactions appear in table
- [ ] Summary cards show correct numbers
- [ ] Filters work (date, status, payment method)
- [ ] Search functionality works
- [ ] Pagination works (if many transactions)

### API 3: POS Machines
- [ ] Test endpoint shows `machines.status: "✅ Passed"`
- [ ] Can access `/admin/terminals` page
- [ ] POS machines appear in cards/grid
- [ ] Search works (terminal ID, serial, model)
- [ ] Status filter works
- [ ] Pagination works (if many machines)

### API 4: Export Job Creation
- [ ] Can create export job via "Export CSV" button
- [ ] Export job returns `job_id`
- [ ] Status shows "Creating export job..." then "Processing..."
- [ ] No errors during job creation

### API 5: Export Status Check
- [ ] Can check export job status
- [ ] Status updates correctly (QUEUED → PROCESSING → COMPLETED)
- [ ] File URL provided when COMPLETED
- [ ] File downloads successfully

### UI Integration
- [ ] Dashboard loads without errors
- [ ] POS Terminals page loads without errors
- [ ] No errors in browser console (F12)
- [ ] No errors in server terminal
- [ ] "Test API" button works on dashboard

---

## 🔍 Detailed Testing Steps

### Step 1: Verify Environment Setup

```bash
# Windows PowerShell
Get-Content .env.local

# Should show:
# SAME_DAY_SOLUTIONS_API_URL=https://api.samedaysolution.in
# SAME_DAY_SOLUTIONS_API_KEY=pk_live_abc123...
# SAME_DAY_SOLUTIONS_API_SECRET=sk_live_xyz789...
```

**Important:** Make sure there are NO placeholder values like `YOUR_API_KEY_HERE`!

### Step 2: Run Comprehensive Test

1. **Open:** `http://localhost:3000/api/pos/test`
2. **Check all three results:**
   - ✅ `healthCheck.status: "✅ Passed"`
   - ✅ `transactions.status: "✅ Passed"`
   - ✅ `machines.status: "✅ Passed"`

### Step 3: Test Transactions API via Dashboard

1. Login: `http://localhost:3000/admin/login`
2. Set date range: Last 7 days
3. Click "Refresh"
4. **Verify:**
   - Transactions appear in table
   - Summary cards show numbers (not all zeros)
   - No error messages

### Step 4: Test POS Machines API

1. Go to: `http://localhost:3000/admin/terminals`
2. **Verify:**
   - Machines appear in cards
   - Summary shows Active/Inactive/Maintenance counts
   - Search works
   - Filters work

### Step 5: Test Export Functionality

1. On dashboard, set date range (last 30 days)
2. Click "Export CSV"
3. **Watch for:**
   - "Creating export job..." ✅
   - "Processing export..." ✅
   - "Downloading..." ✅
   - CSV file downloads ✅

### Step 6: Test Export Status (Manual)

1. Create an export job (Step 5)
2. Open browser console (F12)
3. Run:
   ```javascript
   // Replace with actual job_id from previous step
   fetch('/api/pos/export?jobId=YOUR_JOB_ID')
     .then(r => r.json())
     .then(console.log)
   ```
4. **Verify:** Status shows QUEUED, PROCESSING, or COMPLETED

---

## 🐛 Common Issues & Solutions

### Issue 1: "API credentials not configured"

**Symptoms:**
- Test endpoint shows credentials not set
- Dashboard shows error

**Solution:**
1. Create `.env.local` in project root
2. Add all three variables
3. **Restart dev server** (critical!)

### Issue 2: "Invalid API key" or 401 Unauthorized

**Symptoms:**
- 401 error in console
- "Failed to fetch" messages

**Solutions:**
- Double-check API key and secret
- Ensure no extra spaces in `.env.local`
- Verify correct environment (live vs test)

### Issue 3: "IP address not authorized"

**Symptoms:**
- 401 error with "IP address not authorized"

**Solution:**
- Contact Same Day Solutions support
- Provide your current IP address
- Ask them to whitelist it

### Issue 4: Health Check Fails

**Symptoms:**
- `healthCheck.status: "❌ Failed"`

**Possible Causes:**
- API server is down
- Network connectivity issues
- Wrong API URL

**Solution:**
- Check: `https://api.samedaysolution.in/pos-health` directly
- Verify network connection
- Contact Same Day Solutions if server is down

### Issue 5: Transactions API Returns Empty

**Symptoms:**
- API connects but returns 0 transactions

**Possible Causes:**
- Date range has no transactions
- All transactions filtered out
- No transactions exist yet

**Solution:**
- Try wider date range
- Remove all filters
- Check Same Day Solutions portal for transactions

### Issue 6: POS Machines API Returns Empty

**Symptoms:**
- API connects but returns 0 machines

**Possible Causes:**
- No machines assigned to your account
- All machines filtered out

**Solution:**
- Contact Same Day Solutions to verify machine assignments
- Try removing filters

### Issue 7: Export Job Fails or Times Out

**Symptoms:**
- Export stuck on "Processing..."
- Error after 60 seconds

**Solutions:**
- Try smaller date range
- Check export job status manually
- Contact support if issue persists

---

## 📊 Success Indicators

You'll know **ALL APIs are working** when:

✅ Test endpoint (`/api/pos/test`) returns `"success": true`  
✅ All three API checks pass (health, transactions, machines)  
✅ Dashboard shows real transaction data  
✅ POS Terminals page shows real machine data  
✅ Summary cards display actual numbers  
✅ Export functionality works end-to-end  
✅ No error messages in console or logs  
✅ All filters and search work correctly  

---

## 🎯 Quick Test Script

Copy and paste this into your browser console (F12) on the admin dashboard:

```javascript
// Test all APIs at once
async function testAllAPIs() {
  console.log('🧪 Testing All APIs...\n');
  
  // 1. Test endpoint (comprehensive)
  const test = await fetch('/api/pos/test').then(r => r.json());
  console.log('1️⃣ Test Endpoint:', test.success ? '✅' : '❌', test.message);
  
  // 2. Transactions
  const txn = await fetch('/api/pos/transactions?startDate=2026-02-11&endDate=2026-02-18')
    .then(r => r.json());
  console.log('2️⃣ Transactions API:', txn.success ? '✅' : '❌', `(${txn.data?.length || 0} records)`);
  
  // 3. Machines
  const machines = await fetch('/api/pos/machines?page=1&limit=10')
    .then(r => r.json());
  console.log('3️⃣ Machines API:', machines.success ? '✅' : '❌', `(${machines.data?.length || 0} machines)`);
  
  // 4. Export (create job)
  const exportJob = await fetch('/api/pos/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      format: 'csv',
      date_from: '2026-02-01',
      date_to: '2026-02-18'
    })
  }).then(r => r.json());
  console.log('4️⃣ Export Job:', exportJob.success ? '✅' : '❌', exportJob.data?.job_id || '');
  
  if (exportJob.success && exportJob.data?.job_id) {
    // 5. Check export status
    setTimeout(async () => {
      const status = await fetch(`/api/pos/export?jobId=${exportJob.data.job_id}`)
        .then(r => r.json());
      console.log('5️⃣ Export Status:', status.success ? '✅' : '❌', status.data?.job?.status || '');
    }, 2000);
  }
  
  console.log('\n✅ All tests completed!');
}

testAllAPIs();
```

---

## 📞 Getting Help

If you're still having issues:

1. **Check test endpoint** - `http://localhost:3000/api/pos/test` provides detailed diagnostics
2. **Review browser console** - Look for specific error messages
3. **Check server logs** - Terminal output shows detailed errors
4. **Contact Same Day Solutions** - For API credential or IP whitelist issues
5. **Review API documentation** - Check `README-API-INTEGRATION.md`

---

**Note:** The first time you test, you may see 0 transactions/machines if:
- Your date range has no data
- No machines are assigned yet
- All results are filtered out

This is normal - the important thing is that the API **connection works without errors**! ✅
