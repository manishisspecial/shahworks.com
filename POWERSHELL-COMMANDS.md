# PowerShell Commands for GitHub Setup

Quick reference for PowerShell-compatible commands (Windows).

## 🔒 Security Checks

### Check for .env files in git
```powershell
git ls-files | Select-String "\.env"
```
**Expected:** Should return nothing (empty)

### Check for sensitive patterns
```powershell
git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" | Select-String -NotMatch "YOUR_API_KEY_HERE|admin123|DEMO_CREDENTIALS"
```
**Expected:** Should return nothing or only safe patterns

### Run automated security check
```powershell
powershell -ExecutionPolicy Bypass -File .\SECURITY-CHECK.ps1
```

## 📋 Git Commands

### Check status
```powershell
git status
```

### Review changes
```powershell
git diff
```

### Stage all files
```powershell
git add .
```

### Commit changes
```powershell
git commit -m "Your commit message"
```

### Push to GitHub
```powershell
# First time
git remote add origin <your-github-repo-url>
git push -u origin main

# Subsequent pushes
git push origin main
```

## 🧪 Testing Commands

### Build project
```powershell
npm run build
```

### Run dev server
```powershell
npm run dev
```

### Check if .env.local exists
```powershell
Test-Path .env.local
```

## 📝 Quick Pre-Push Checklist

Run these commands in order:

```powershell
# 1. Security check
powershell -ExecutionPolicy Bypass -File .\SECURITY-CHECK.ps1

# 2. Build test
npm run build

# 3. Check git status
git status

# 4. Review changes
git diff

# 5. If all good, stage and commit
git add .
git commit -m "Your message"
git push origin main
```

## ⚠️ Common Issues

### "grep is not recognized"
**Solution:** Use `Select-String` instead of `grep`
```powershell
# Wrong (Linux/Mac)
git ls-files | grep "\.env"

# Correct (PowerShell)
git ls-files | Select-String "\.env"
```

### "ExecutionPolicy" error
**Solution:** Run with bypass flag
```powershell
powershell -ExecutionPolicy Bypass -File .\SECURITY-CHECK.ps1
```

### "git grep" not working
**Solution:** Use `Select-String` for filtering
```powershell
git grep -i "pattern" -- "*.ts" | Select-String -NotMatch "exclude"
```

