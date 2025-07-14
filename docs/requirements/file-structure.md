# NicheVendor CRM - Recommended Project Structure

## Feature-Focused Folder Organization

```
/src
  /components
    /common                      # Shared UI components
      - Button.js                # Reusable button component
      - Card.js                  # Base card component
      - Modal.js                 # Reusable modal dialog
      - FormElements.js          # Input, Select, etc.
      - Navbar.js                # Top navigation bar
      - SidebarNav.js            # Side navigation menu
      
    /dashboard
      - DashboardCard.js         # Dashboard summary cards
      - AlertSection.js          # Displays various alerts
      - QuickStats.js            # Summary statistics display
      
    /inventory
      - ProductCard.js           # Product display card
      - ProductForm.js           # Add/edit product form
      - InventoryList.js         # List of inventory items
      - ProductFilters.js        # Category/search filters
      
    /events
      - EventItem.js             # Event list item
      - EventForm.js             # Add/edit event form
      - ChecklistItem.js         # Checklist item component
      - ProductSelector.js       # Assign products to events
      
    /sales
      - SalesEntryForm.js        # Quick sale entry form
      - PaymentSelector.js       # Payment method selection
      - SalesSummary.js          # Sales totals display
      
    /orders
      - OrderCard.js             # Order display component
      - OrderForm.js             # Custom order form
      - StatusToggle.js          # Order status selector
      
    /booth
      - BoothLayoutEditor.js     # Drag & drop layout editor
      - LayoutItem.js            # Individual booth item
      - LayoutControls.js        # Layout editor controls

  /pages                         # Main route pages
    - Dashboard.js               # Main dashboard page
    - Inventory.js               # Inventory management page
    - Events.js                  # Events list page
    - EventDetail.js             # Single event page
    - Sales.js                   # Sales tracking page
    - Orders.js                  # Order management page
    - BoothPlanner.js            # Booth layout planning page
    - Settings.js                # App settings page
  
  /hooks                         # Custom React hooks
    - useInventory.js            # Inventory data operations
    - useEventData.js            # Event data operations
    - useSales.js                # Sales tracking operations
    - useOrders.js               # Order management operations
    - useBoothLayout.js          # Booth layout operations
    - useLocalStorage.js         # Local storage operations
  
  /context                       # Context providers
    - AppDataContext.js          # Main data context
    - UIContext.js               # UI state management (theme, etc.)
  
  /services                      # Data and business logic
    - storageService.js          # IndexedDB operations
    - exportService.js           # Export to CSV/PDF
    - importService.js           # Import data 
  
  /utils                         # Helper functions
    - formatCurrency.js          # Currency formatting
    - dateUtils.js               # Date formatting and calculations
    - validation.js              # Input validation
    
  /models                        # Data models/types (TypeScript)
    - Product.ts                 # Product data model
    - Event.ts                   # Event data model
    - Sale.ts                    # Sales data model
    - Order.ts                   # Order data model
    - BoothLayout.ts             # Booth layout data model

  /assets                        # Static assets
    /icons                       # App icons
    /illustrations               # Illustrations and graphics

  App.js                         # Main app component
  index.js                       # Entry point
```
