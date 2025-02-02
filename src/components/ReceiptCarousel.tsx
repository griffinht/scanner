"use client";

import { useState } from "react";
import { ReceiptData } from "@/app/mockResults";
import { Receipt } from "./Receipt";

interface ReceiptCarouselProps {
  receipts: ReceiptData[];
}

export function ReceiptCarousel({ receipts }: ReceiptCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (receipts.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? receipts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === receipts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <Receipt {...receipts[currentIndex]} />
      
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
        <button
          onClick={handlePrevious}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Previous receipt"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Next receipt"
        >
          →
        </button>
      </div>
      
      <div className="text-center mt-2 text-sm text-gray-500">
        Receipt {currentIndex + 1} of {receipts.length}
      </div>
    </div>
  );
}