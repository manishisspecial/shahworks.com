# PowerShell Security Check Script
# Run this before pushing to GitHub to verify no sensitive data is committed

Write-Host "Running Security Checks..." -ForegroundColor Cyan
Write-Host ""

# Check 1: Verify .env files are NOT tracked
Write-Host "1. Checking for .env files in git..." -ForegroundColor Yellow
$envFiles = git ls-files | Select-String "\.env"
if ($envFiles) {
    Write-Host "   [X] WARNING: .env files found in git!" -ForegroundColor Red
    $envFiles | ForEach-Object { Write-Host "      $_" -ForegroundColor Red }
    Write-Host "   [!] Remove these files from git before pushing!" -ForegroundColor Yellow
} else {
    Write-Host "   [OK] No .env files tracked by git" -ForegroundColor Green
}
Write-Host ""

# Check 2: Check for sensitive patterns in code
Write-Host "2. Checking for sensitive patterns in code..." -ForegroundColor Yellow
$sensitiveMatches = git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" "*.js" "*.jsx" 2>$null | Select-String -NotMatch "YOUR_API_KEY_HERE|YOUR_API_SECRET_HERE|admin123|DEMO_CREDENTIALS"
if ($sensitiveMatches) {
    Write-Host "   [!] Found potential sensitive data (review these):" -ForegroundColor Yellow
    $sensitiveMatches | ForEach-Object { Write-Host "      $_" -ForegroundColor Yellow }
} else {
    Write-Host "   [OK] No sensitive patterns found (excluding known safe patterns)" -ForegroundColor Green
}
Write-Host ""

# Check 3: Verify .env.local exists locally but is ignored
Write-Host "3. Checking .env.local status..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    $isTracked = git ls-files --error-unmatch .env.local 2>$null
    if ($isTracked) {
        Write-Host "   [X] WARNING: .env.local is tracked by git!" -ForegroundColor Red
        Write-Host "   [!] Remove it: git rm --cached .env.local" -ForegroundColor Yellow
    } else {
        Write-Host "   [OK] .env.local exists locally but is properly ignored" -ForegroundColor Green
    }
} else {
    Write-Host "   [i] .env.local does not exist (create it from .env.example)" -ForegroundColor Cyan
}
Write-Host ""

# Check 4: Verify .gitignore includes .env files
Write-Host "4. Checking .gitignore configuration..." -ForegroundColor Yellow
$gitignore = Get-Content .gitignore -ErrorAction SilentlyContinue
if ($gitignore -match "\.env") {
    Write-Host "   [OK] .gitignore properly excludes .env files" -ForegroundColor Green
} else {
    Write-Host "   [!] .gitignore may not exclude .env files" -ForegroundColor Yellow
}
Write-Host ""

# Summary
Write-Host "============================================================" -ForegroundColor Gray
Write-Host "Security Check Summary" -ForegroundColor Cyan
Write-Host ""
Write-Host "If all checks passed, you're safe to push!" -ForegroundColor Green
Write-Host "If any warnings or errors appear, fix them first." -ForegroundColor Yellow
Write-Host ""

