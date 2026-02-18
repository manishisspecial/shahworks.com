# Pre-Push Checklist

Use this checklist before pushing to GitHub to ensure everything is ready:

## ✅ Security Checks

- [ ] **No `.env.local` file** - Should be in `.gitignore`
- [ ] **No API keys/secrets** in code files
- [ ] **No hardcoded passwords** (except demo credentials with clear notes)
- [ ] **No sensitive data** in any committed files
- [ ] Checked with: `git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" "*.js" "*.jsx"`

## ✅ Code Quality

- [ ] **Build successful**: `npm run build` completes without errors
- [ ] **No TypeScript errors**: All types are correct
- [ ] **No ESLint errors**: Run `npm run lint` (if configured)
- [ ] **No console errors** in browser
- [ ] **No unused imports** or dead code

## ✅ Documentation

- [ ] **README.md** is up to date
- [ ] **API documentation** is accurate (README-API-INTEGRATION.md)
- [ ] **Testing guide** is complete (HOW-TO-TEST-API.md)
- [ ] **Environment variables** documented in README
- [ ] **Setup instructions** are clear

## ✅ Testing

- [ ] **Main website** works (home, about, services, contact)
- [ ] **Admin dashboard** login works
- [ ] **Transactions page** loads and filters work
- [ ] **POS Terminals page** loads and displays machines
- [ ] **Export functionality** works (if API credentials set)
- [ ] **API test endpoint** works: `/api/pos/test`

## ✅ Git Status

- [ ] **No uncommitted sensitive files**
- [ ] **Meaningful commit messages**
- [ ] **No large files** (check with `git ls-files | xargs du -h | sort -h`)
- [ ] **No build artifacts** committed (`.next/`, `node_modules/`, etc.)

## ✅ Files to Verify

Run these commands to check:

```powershell
# PowerShell: Check for .env files (should show nothing)
git ls-files | Select-String "\.env"

# PowerShell: Check for sensitive patterns (review any matches)
git grep -i "password\|secret\|api.*key" -- "*.ts" "*.tsx" | Select-String -NotMatch "YOUR_API_KEY_HERE|YOUR_API_SECRET_HERE|admin123"

# Check what will be committed
git status

# Review changes
git diff
```

## ✅ Final Steps

1. **Review all changes**: `git status` and `git diff`
2. **Test one more time**: Run dev server and test key features
3. **Commit with clear message**: `git commit -m "Clear description"`
4. **Push to GitHub**: `git push origin main` (or your branch)

## 🚨 If You Find Issues

- **Sensitive data found?** 
  - Remove from code
  - Add to `.gitignore`
  - If already committed, use `git filter-branch` or BFG Repo-Cleaner

- **Build fails?**
  - Fix TypeScript/ESLint errors
  - Check dependencies are installed
  - Review error messages

- **Tests fail?**
  - Fix failing tests
  - Update test data if needed
  - Check API credentials if testing API integration

---

**Remember:** Once pushed to GitHub, sensitive data is hard to remove completely. Always check before pushing!

