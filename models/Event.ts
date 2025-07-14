export interface Event {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  boothNumber?: string;
  notes?: string;
  products: string[]; // Array of product IDs assigned to this event
  checklistItems: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  name: string;
  isChecked: boolean;
}
