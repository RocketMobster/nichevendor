import { useState } from "react";
import { StarIcon, GiftIcon, UserIcon, HomeIcon } from "@heroicons/react/24/solid";

const ICONS = [
  { name: "Star", component: StarIcon },
  { name: "Gift", component: GiftIcon },
  { name: "User", component: UserIcon },
  { name: "Home", component: HomeIcon },
  // Add more icons as needed
];

interface ProductIconPickerProps {
  onSelect?: (iconName: string) => void;
  selected?: string | null;
  clearImage?: () => void;
  color?: string;
}

export default function ProductIconPicker({ onSelect, selected, clearImage, color = "#ea580c" }: ProductIconPickerProps) {
  const [internalSelected, setInternalSelected] = useState<string | null>(null);
  const isControlled = typeof selected !== 'undefined';
  const currentSelected = isControlled ? selected : internalSelected;

  return (
    <div className="flex gap-4 flex-wrap">
      {ICONS.map(({ name, component: Icon }) => (
        <button
          type="button"
          key={name}
          className={`w-16 h-16 flex items-center justify-center rounded-xl border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-400 ${currentSelected === name ? "border-orange-500 bg-orange-50 shadow-lg" : "border-gray-200 bg-white hover:border-orange-300"}`}
          onClick={() => {
            clearImage && clearImage();
            if (isControlled) {
              onSelect && onSelect(name);
            } else {
              setInternalSelected(name);
              onSelect && onSelect(name);
            }
          }}
          aria-label={name}
          title={name + " icon"}
        >
          <Icon className={`w-10 h-10`} style={{ color: currentSelected === name ? color : "#ea580c" }} />
        </button>
      ))}
      <div className="text-xs text-gray-500 mt-2 w-full" style={{ minHeight: 20, height: 20, lineHeight: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {currentSelected ? (
          <span style={{ minWidth: 120, display: 'inline-block' }}>{`Selected: ${currentSelected}`}</span>
        ) : (
          <span style={{ minWidth: 120, display: 'inline-block', visibility: 'hidden' }}>Selected: Home</span>
        )}
      </div>
    </div>
  );
}
