# Shah Works - Premium Agency Website with POS Admin Dashboard

A high-end, world-class agency website built with Next.js, TypeScript, and Tailwind CSS, featuring a comprehensive POS transaction monitoring admin dashboard integrated with Same Day Solutions API.

## 🚀 Features

### Main Website
- 🎨 Premium, modern UI design
- ⚡ Built with Next.js 14 (App Router)
- 💎 TypeScript for type safety
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🚀 Optimized for performance

### Admin Dashboard
- 🔐 Secure login system
- 📊 Real-time POS transaction monitoring
- 💳 Transaction filtering and search
- 📥 CSV/Excel/PDF/ZIP export functionality
- 🖥️ POS terminal management
- 📈 Transaction statistics and analytics
- 🔍 Advanced filtering (date, status, payment method, terminal)
- ✅ API integration testing tools

## 📋 Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Same Day Solutions POS API credentials (for admin dashboard)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd shahworks.com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   SAME_DAY_SOLUTIONS_API_URL=https://api.samedaysolution.in
   SAME_DAY_SOLUTIONS_API_KEY=pk_live_YOUR_API_KEY_HERE
   SAME_DAY_SOLUTIONS_API_SECRET=sk_live_YOUR_API_SECRET_HERE
   ```
   
   **Important:** 
   - Replace `YOUR_API_KEY_HERE` and `YOUR_API_SECRET_HERE` with your actual credentials
   - Never commit `.env.local` to version control (already in `.gitignore`)
   - See `.env.example` for reference

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📖 Usage

### Main Website
- Navigate to `http://localhost:3000` to view the main website
- Browse through pages: Home, About, Services, Contact, etc.

### Admin Dashboard

1. **Access the admin dashboard:**
   - Go to `http://localhost:3000/admin/login`
   - **Default credentials:**
     - Username: `admin`
     - Password: `admin123`
   
   ⚠️ **Security Note:** Change these credentials in production! (See `contexts/AdminAuthContext.tsx`)

2. **View transactions:**
   - Set date range filters
   - Apply status, payment method, or terminal filters
   - Use search to find specific transactions
   - Click on any transaction to view details

3. **Export data:**
   - Set your desired date range
   - Click "Export CSV" button
   - Wait for processing (status updates shown)
   - File downloads automatically when ready

4. **Manage POS terminals:**
   - Navigate to "POS Terminals" in sidebar
   - View all assigned machines
   - Search and filter by status
   - See machine details (terminal ID, serial, retailer info)

5. **Test API integration:**
   - Click "Test API" button on dashboard
   - View comprehensive test results
   - Or visit `http://localhost:3000/api/pos/test` directly

## 🧪 Testing API Integration

### Quick Test
Visit `http://localhost:3000/api/pos/test` to test all APIs at once.

### Detailed Testing
See [HOW-TO-TEST-API.md](./HOW-TO-TEST-API.md) for comprehensive testing guide.

## 📁 Project Structure

```
shahworks.com/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard
│   │   ├── login/               # Login page
│   │   ├── page.tsx             # Dashboard (transactions)
│   │   ├── terminals/           # POS terminals page
│   │   ├── activity/            # Activity log (placeholder)
│   │   ├── settings/            # Settings (placeholder)
│   │   └── help/                # Help page
│   ├── api/                      # API routes
│   │   └── pos/                 # POS API endpoints
│   │       ├── transactions/    # GET transactions
│   │       ├── machines/        # GET POS machines
│   │       ├── export/          # POST/GET export jobs
│   │       └── test/            # GET API test endpoint
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── services/                 # Services page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                    # React components
│   ├── admin/                   # Admin dashboard components
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── POSTransactionTable.tsx
│   │   ├── TransactionStats.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionDetailModal.tsx
│   ├── home/                    # Home page sections
│   ├── ui/                      # Reusable UI components
│   └── Navigation.tsx           # Navigation component
├── contexts/                     # React contexts
│   ├── AdminAuthContext.tsx     # Admin authentication
│   ├── ThemeContext.tsx         # Theme management
│   └── ChatbotContext.tsx       # Chatbot state
├── lib/                          # Utility libraries
│   └── pos-api.ts               # Same Day Solutions API client
├── public/                       # Static assets
├── .env.example                 # Environment variables template
├── HOW-TO-TEST-API.md           # API testing guide
└── README-API-INTEGRATION.md    # API integration documentation
```

## 🔧 Build for Production

```bash
npm run build
npm start
```

## 📚 API Integration

This project integrates with **Same Day Solutions POS Partner API** for transaction monitoring.

### Integrated APIs
- ✅ Health Check (`GET /pos-health`)
- ✅ Get POS Transactions (`POST /api/partner/pos-transactions`)
- ✅ Get POS Machines (`GET /api/partner/pos-machines`)
- ✅ Create Export Job (`POST /api/partner/pos-transactions/export`)
- ✅ Check Export Status (`GET /api/partner/export-status/{job_id}`)

### Authentication
Uses HMAC-SHA256 signature authentication. All authentication is handled automatically by `lib/pos-api.ts`.

### Documentation
- [API Integration Guide](./README-API-INTEGRATION.md) - Detailed API documentation
- [Testing Guide](./HOW-TO-TEST-API.md) - How to test all APIs

## 🛡️ Security Notes

1. **Environment Variables:**
   - Never commit `.env.local` to version control
   - Use `.env.example` as a template
   - Keep API credentials secure

2. **Admin Credentials:**
   - Default login: `admin` / `admin123`
   - **Change these in production!** (Update `contexts/AdminAuthContext.tsx`)
   - Consider implementing proper authentication (JWT, OAuth, etc.)

3. **API Security:**
   - IP whitelisting may be required (contact Same Day Solutions)
   - API credentials are server-side only
   - HMAC signatures prevent request tampering

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Crypto:** crypto-js (for HMAC signatures)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues related to:
- **API Integration:** See [HOW-TO-TEST-API.md](./HOW-TO-TEST-API.md)
- **API Credentials:** Contact Same Day Solutions support
- **General Issues:** Check browser console and server logs

## 🎯 Roadmap

- [ ] Implement proper authentication system (JWT/OAuth)
- [ ] Add activity log functionality
- [ ] Enhance settings page
- [ ] Add transaction analytics charts
- [ ] Implement real-time transaction updates
- [ ] Add multi-user support with roles

---

**Built with ❤️ for Shah Works**
