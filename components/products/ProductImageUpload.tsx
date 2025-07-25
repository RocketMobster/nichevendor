import { useRef, useState } from "react";

interface ProductImageUploadProps {
  onImageSelect?: (imageData: string) => void;
}

export default function ProductImageUpload({ onImageSelect }: ProductImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      onImageSelect && onImageSelect(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        className="w-16 h-16 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-orange-500 relative"
        onClick={() => inputRef.current?.click()}
        title={preview ? "Click to change image" : "Upload Image"}
        style={{ width: 64, height: 64, minWidth: 64, minHeight: 64, maxWidth: 64, maxHeight: 64 }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Product preview"
              className="object-cover rounded-xl"
              style={{ width: 64, height: 64, minWidth: 64, minHeight: 64, maxWidth: 64, maxHeight: 64, background: '#fff', objectFit: 'cover', aspectRatio: '1/1' }}
            />
            <span className="absolute bottom-1 right-1 bg-white bg-opacity-80 rounded px-1 text-xs text-orange-500 border border-orange-200">Change</span>
          </>
        ) : (
          <span className="text-xs">Upload Image</span>
        )}
      </button>
      {preview && <span className="text-xs text-gray-500">Image will be cropped to 64x64</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
