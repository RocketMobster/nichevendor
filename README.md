# NicheVendor CRM

**Version:** 0.7.0  
**Prepared By:** RocketMobster Software  
**Date:** July 12, 2025  

## � About NicheVendor CRM

NicheVendor CRM is a mobile-first app built for artists, crafters, and indie business vendors who attend conventions, expos, and craft fairs. It helps vendors prep for events, track inventory, record sales, manage custom orders, and plan booth layouts from a centralized dashboard.

![NicheVendor CRM](https://via.placeholder.com/800x400?text=NicheVendor+CRM+Screenshot)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nichevendor.git

# Navigate to the project directory
cd nichevendor

# Install dependencies
npm install

# Start the development server
npm run dev
```

After starting the server, you can access the application at [http://localhost:3000](http://localhost:3000).

## 👥 Target Audience

- Artists (prints, pins, stickers, comics)  
- Crafters (soap, candles, resin, plush)  
- Local vendors & con sellers  

---

## 🔑 Key Features

- 📊 **Dashboard**: Event previews, alerts, sales snapshots
- 📅 **Event Manager**: Event schedule, packing checklists, inventory assignment
- 📦 **Inventory System**: Product management with variants and alerts
- 💸 **Sales Tracker**: Quick-sale interface with payment logging and reporting
- 🧾 **Order Manager**: Custom order tracking with status management
- 🧰 **Booth Layout Planner**: Visual layout planning for event booths
- ⚙️ **Settings**: Data import/export, appearance options

---

## ⚙️ Technical Stack (MVP)

- **Frontend:** React + Tailwind  
- **State:** Context API or Zustand  
- **Data:** LocalStorage or IndexedDB  
- **Export Tools:** jsPDF, SheetJS  
- **Backend (Future):** Firebase/Supabase  

---

## ✅ User Stories

- US-01: Track upcoming events  
- US-02: Prepare & check off packing lists  
- US-03: Manage product inventory  
- US-04: Log quick sales during events  
- US-05: Record and track custom orders  
- US-06: Design and reuse booth setups  

---

## 🔭 Future Features (Post-MVP)

- POS plugin integration  
- Cloud sync with login  
- AI profit predictor  
- Convention schedule API  
- QR-based sales  

---

## 🚧 Constraints

- MVP is offline-first  
- No login required  
- Mobile-first layout  
- Focus on simplicity and reliability  

---

## 📈 Success Metrics

- Event prep and sale logging work end-to-end  
- Product and order management stable  
- 80%+ user satisfaction during testing  

---

## 📚 Documentation

All code in this project follows strict documentation standards to ensure maintainability and ease of onboarding for new team members. See [Documentation Guide](./docs/DOCUMENTATION_GUIDE.md) for more details.

Key documentation principles:
- All files, components, and functions are documented with JSDoc comments
- Interfaces and types have property descriptions
- Complex logic includes explanatory inline comments
- Documentation is updated alongside code changes

We use ESLint with JSDoc plugins to help maintain documentation quality.

---