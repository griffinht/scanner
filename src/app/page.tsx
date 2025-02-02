"use client";
import { useState } from "react";
import { ScanButton } from "@/components/ScanButton";
import { ImagePreview } from "@/components/ImagePreview";
import { ReceiptAnalysis } from "@/components/ReceiptAnalysis";
import { type ReceiptData, getMockResults } from "./mockResults";
import { ReceiptCarousel } from "@/components/ReceiptCarousel";

export default function Home() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [currentReceiptIndex, setCurrentReceiptIndex] = useState(0);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setScannedImage(reader.result as string);
        const newReceipt = getMockResults();
        setReceipts([...receipts, newReceipt]);
        console.log(receipts)
        setCurrentReceiptIndex(receipts.length - 1);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      <main className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Receipt Scanner</h1>
        
        <div className="flex flex-col items-center gap-4">
          <ScanButton 
            hasImage={scannedImage !== ""} 
            onCapture={handleImageCapture} 
          />

          <div className="w-full">
            <ImagePreview imageUrl={scannedImage} />
            {receipts.length > 0 && receipts[currentReceiptIndex] && (
              <>
                <ReceiptCarousel 
                  receipts={receipts} 
                  currentIndex={currentReceiptIndex}
                  onIndexChange={setCurrentReceiptIndex}
                />
                <ReceiptAnalysis 
                  items={receipts[currentReceiptIndex].items}
                  total={receipts[currentReceiptIndex].total}
                  totalSavings={receipts[currentReceiptIndex].totalSavings}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
