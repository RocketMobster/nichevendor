Here's a **first-draft Product Requirements Document (PRD)** for **NicheVendor CRM**, formatted for development planning and stakeholder alignment:

---

# 📄 Product Requirements Document (PRD)

**Product Name:** NicheVendor CRM
**Version:** 0.1 (MVP Draft)
**Prepared By:** RocketMobster Software
**Date:** July 12, 2025

---

## 🧭 1. Purpose

NicheVendor CRM is a mobile-first app tailored for artists, crafters, and small business vendors who attend conventions, craft fairs, expos, and local events. The app helps users manage event preparation, inventory, sales tracking, custom orders, and booth planning from a centralized, easy-to-use dashboard.

---

## 🎯 2. Goals and Objectives

* Streamline event prep with checklists and inventory tracking
* Log and track real-time sales for each event
* Manage product inventory with low-stock alerts
* Record and follow up on custom orders and preorders
* Visually plan booth layouts for reuse at different events
* Build a lightweight, plugin-friendly platform to scale with user needs

---

## 👤 3. Target Users

* Independent artists
* Resin/plush/soap/candle creators
* Indie comic and print sellers
* TTRPG merch vendors
* Local market or pop-up shop entrepreneurs

---

## 💼 4. Key Features (MVP Scope)

### A. **Dashboard**

* Next event preview (date, location)
* Alerts: low-stock items, pending orders
* Sales snapshot from last event
* Quick-access icons: Inventory, Events, Sales, Orders, Planner, More

---

### B. **Event Management**

* Add/edit events (name, date, location, booth number, notes)
* Assign products to each event
* Auto-generated packing checklist with toggles
* Event-specific sales totals and item breakdowns

---

### C. **Inventory System**

* Add/edit/delete products (name, category, image, price, stock)
* Variants (size, color, etc.)
* Low-stock alerts
* Searchable/filterable product list

---

### D. **Sales Logging**

* Manual entry sales UI (quick sale interface)
* Product selector with quantity toggles
* Sale total calculator with payment type
* Per-event sales summary
* Export to CSV/PDF

---

### E. **Order Manager**

* Custom order form (customer name, item, notes, price, deadline, paid/unpaid)
* Status toggle: pending, completed, delivered
* Optional contact info (email/SMS follow-up)
* Order list filtered by status or event

---

### F. **Booth Layout Planner**

* Add, remove, label layout items (e.g., Table, Print Rack, Banner)
* Upload photo of actual booth setup
* Save layouts per event

---

### G. **Settings**

* Export/import app data
* Toggle dark/light mode
* Plugin enablement (placeholder for future features)

---

## 🧪 5. Non-Functional Requirements

* **Performance:** Fast load times even on low-end Android/iOS devices
* **Accessibility:** Touch-friendly with high-contrast UI option
* **Data Sync (optional for MVP):** LocalStorage with future Firebase/Supabase integration
* **Offline-First:** App must work without internet; sync when online

---

## 🛠️ 6. Tech Stack (MVP Suggestion)

* **Frontend:** React + Tailwind CSS
* **State Management:** Context API or Zustand
* **Backend (future-ready):** Firebase or Supabase
* **Storage (MVP):** LocalStorage or IndexedDB
* **Export Tools:** jsPDF or SheetJS (XLS/CSV)

---

## 🧱 7. User Stories

| User Story ID | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| US-01         | As a vendor, I want to track all my upcoming events so I can prepare ahead of time.                      |
| US-02         | As a vendor, I want to check off a packing list for each event to make sure I don’t forget key supplies. |
| US-03         | As a vendor, I want to add and categorize my products to manage stock and pricing.                       |
| US-04         | As a vendor, I want to log sales quickly during a show and view summaries afterward.                     |
| US-05         | As a vendor, I want to record customer orders with deadlines and delivery status.                        |
| US-06         | As a vendor, I want to sketch out and save my booth setup for re-use.                                    |

---

## 🧪 8. Future Enhancements (Post-MVP)

* Plugin Marketplace (POS integrations, print-on-demand tools)
* AI-powered event profit predictor
* Import public convention schedules via API
* QR code scanning for product sales and inventory
* Sync across devices via cloud storage

---

## 🚧 9. Constraints & Considerations

* No login/account system required for MVP
* Focus on mobile-first UX (90% of users on phones)
* Monetization not included in MVP
* All features must be usable offline, with optional sync upgrades later

---

## ✅ 10. Success Metrics

* User can add and prepare for at least 1 event
* Inventory and sales can be added without crashing
* Sales summaries generate correct totals
* Users report 80%+ satisfaction with app flow during testing

---
