# GitHub Setup Guide

This guide will help you push your project to GitHub safely.

## 🚀 Quick Start

### Step 1: Verify Everything is Ready

1. **Check sensitive files are ignored:**
   ```bash
   git status
   # Should NOT show .env.local
   ```

2. **Review what will be committed:**
   ```bash
   git status
   git diff
   ```

3. **Run final build test:**
   ```bash
   npm run build
   # Should complete without errors
   ```

### Step 2: Stage Your Changes

```bash
# Add all new and modified files
git add .

# Review what's staged
git status
```

### Step 3: Commit Your Changes

```bash
git commit -m "feat: Add POS admin dashboard with Same Day Solutions API integration

- Integrated all 5 POS APIs (health, transactions, machines, export)
- Built comprehensive admin dashboard with transaction monitoring
- Added POS terminals management page
- Implemented CSV/Excel/PDF/ZIP export functionality
- Added API testing endpoint and comprehensive documentation
- Updated README with setup instructions"
```

### Step 4: Push to GitHub

```bash
# If this is your first push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main

# For subsequent pushes
git push origin main
```

## 📋 Pre-Push Checklist

Before pushing, ensure:

- [ ] `.env.local` is NOT in git (check with `git ls-files | grep env`)
- [ ] No API keys/secrets in code
- [ ] Build succeeds: `npm run build`
- [ ] README.md is updated
- [ ] All documentation files are included

## 🔒 Security Reminders

1. **Never commit:**
   - `.env.local`
   - `.env`
   - Any file with API keys or secrets
   - `node_modules/`
   - `.next/` build folder

2. **Always check:**
   ```powershell
   # PowerShell: Before committing, check for sensitive data
   git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" | Select-String -NotMatch "YOUR_API_KEY_HERE|admin123"
   
   # Or using findstr (Windows native):
   git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" | findstr /V "YOUR_API_KEY_HERE admin123"
   ```

3. **If you accidentally committed sensitive data:**
   - Remove it immediately
   - Use `git filter-branch` or BFG Repo-Cleaner
   - Change the exposed credentials

## 📁 Files to Include

These files should be committed:

✅ **Code files:**
- All `.ts`, `.tsx`, `.js`, `.jsx` files
- `package.json`, `package-lock.json`
- `tsconfig.json`, `next.config.js`
- `tailwind.config.ts`

✅ **Documentation:**
- `README.md`
- `README-API-INTEGRATION.md`
- `HOW-TO-TEST-API.md`
- `CONTRIBUTING.md`
- `PRE-PUSH-CHECKLIST.md`

✅ **Configuration:**
- `.gitignore`
- `.github/` folder (PR templates, etc.)

❌ **Files to NEVER commit:**
- `.env.local`
- `.env`
- `node_modules/`
- `.next/`
- `.vercel/`
- Any file with credentials

## 🎯 Repository Structure on GitHub

Your GitHub repo should look like:

```
shahworks.com/
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── app/
│   ├── admin/
│   ├── api/
│   └── ...
├── components/
├── contexts/
├── lib/
├── public/
├── .gitignore
├── CONTRIBUTING.md
├── HOW-TO-TEST-API.md
├── PRE-PUSH-CHECKLIST.md
├── README.md
├── README-API-INTEGRATION.md
├── package.json
└── ...
```

## 📝 Environment Variables Setup

For other developers/cloning:

1. **Create `.env.example`** (template):
   ```env
   SAME_DAY_SOLUTIONS_API_URL=https://api.samedaysolution.in
   SAME_DAY_SOLUTIONS_API_KEY=pk_live_YOUR_API_KEY_HERE
   SAME_DAY_SOLUTIONS_API_SECRET=sk_live_YOUR_API_SECRET_HERE
   ```

2. **In README.md**, instruct users to:
   - Copy `.env.example` to `.env.local`
   - Fill in their actual credentials

## 🔍 Verify Before Pushing

Run these commands:

```powershell
# 1. Check for .env files (should return nothing)
git ls-files | Select-String "\.env"

# 2. Check for sensitive patterns (PowerShell)
git grep -i "password\|secret" -- "*.ts" "*.tsx" | Select-String -NotMatch "YOUR_API_KEY_HERE|admin123"

# 3. Check what's staged
git status

# 4. Review changes
git diff --staged
```

## ✅ Final Verification

Before pushing, make sure:

1. ✅ Build succeeds: `npm run build`
2. ✅ No `.env` files tracked
3. ✅ No sensitive data in code
4. ✅ Documentation is complete
5. ✅ All files are properly staged
6. ✅ Commit message is descriptive

## 🚀 Push Command

```bash
git push origin main
```

## 📖 After Pushing

1. **Verify on GitHub:**
   - Check all files are present
   - Verify `.env.local` is NOT visible
   - Review README displays correctly

2. **Add repository description:**
   - "Premium agency website with POS transaction monitoring admin dashboard"

3. **Add topics/tags:**
   - `nextjs`
   - `typescript`
   - `pos-system`
   - `admin-dashboard`
   - `api-integration`

4. **Update repository settings:**
   - Add collaborators if needed
   - Set up branch protection (optional)
   - Enable issues (optional)

---

**You're all set! 🎉**

