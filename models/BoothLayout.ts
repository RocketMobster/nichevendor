export interface BoothLayout {
  id: string;
  name: string;
  eventId?: string; // Optional link to an event
  items: BoothLayoutItem[];
  imageUrl?: string; // Optional photo of actual booth setup
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoothLayoutItem {
  id: string;
  type: string; // e.g., "table", "banner", "print-rack"
  label: string;
  x: number; // Position X (percentage of canvas)
  y: number; // Position Y (percentage of canvas)
  width: number; // Width (percentage of canvas)
  height: number; // Height (percentage of canvas)
  rotation: number; // Rotation in degrees
}
