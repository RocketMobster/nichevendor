"use client";

/**
 * @file modernStyle.tsx
 * @description Add this component to _app.tsx to apply the modern styling
 */

const ModernStyle = () => {
  return (
    <style jsx global>{`
      /* Base font and color styles */
      body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #1f2937;
        background-color: #f9fafb;
      }

      /* Form elements styling */
      input, select, textarea {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease-in-out;
      }
      
      input:focus, select:focus, textarea:focus {
        border-color: #fb923c;
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        outline: none;
      }

      /* Button hover effects */
      button:not([disabled]):hover {
        transform: translateY(-1px);
      }

      button:not([disabled]):active {
        transform: translateY(0);
      }

      /* Custom scrollbars */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background: #fdba74;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #fb923c;
      }
      
      /* Form field focus rings */
      *:focus-visible {
        outline: 2px solid #fb923c;
        outline-offset: 2px;
      }
      
      /* Table styling */
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
      th {
        background-color: #f9fafb;
        text-align: left;
        color: #4b5563;
        font-weight: 500;
        padding: 0.75rem 1.5rem;
        border-bottom: 1px solid #e5e7eb;
      }
      
      td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #f3f4f6;
      }
      
      tr:last-child td {
        border-bottom: none;
      }
      
      tr:hover {
        background-color: #fff7ed;
      }
      
      /* Badge styles */
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.625rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      
      .badge-primary {
        background-color: #ffedd5;
        color: #9a3412;
      }
      
      .badge-secondary {
        background-color: #f3f4f6;
        color: #1f2937;
      }
      
      .badge-success {
        background-color: #dcfce7;
        color: #15803d;
      }
      
      .badge-warning {
        background-color: #fef3c7;
        color: #a16207;
      }
      
      .badge-danger {
        background-color: #fee2e2;
        color: #b91c1c;
      }
    `}</style>
  );
};

export default ModernStyle;
