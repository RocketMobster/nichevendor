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
}

export default function ProductIconPicker({ onSelect }: ProductIconPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex gap-4 flex-wrap">
      {ICONS.map(({ name, component: Icon }) => (
        <button
          key={name}
          className={`w-16 h-16 flex items-center justify-center rounded-xl border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-400 ${selected === name ? "border-orange-500 bg-orange-50 shadow-lg" : "border-gray-200 bg-white hover:border-orange-300"}`}
          onClick={() => { setSelected(name); onSelect && onSelect(name); }}
          aria-label={name}
          title={name + " icon"}
        >
          <Icon className={`w-10 h-10 ${selected === name ? "text-orange-600" : "text-orange-500"}`} />
        </button>
      ))}
      {selected && (
        <div className="text-xs text-gray-500 mt-2 w-full">Selected: {selected}</div>
      )}
    </div>
  );
}
