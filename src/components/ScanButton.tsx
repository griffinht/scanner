"use client";
import { ChangeEvent } from "react";

interface ScanButtonProps {
  hasImage: boolean;
  onCapture: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ScanButton({ hasImage, onCapture }: ScanButtonProps) {
  return (
    <label className="w-full">
      <div className="bg-blue-500 text-white py-3 px-6 rounded-lg text-center cursor-pointer hover:bg-blue-600">
        {hasImage ? "Scan Another Receipt" : "Scan Receipt"}
      </div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onCapture}
      />
    </label>
  );
}