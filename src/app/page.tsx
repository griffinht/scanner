"use client";
import { useState } from "react";
import { ScanButton } from "@/components/ScanButton";
import { ImagePreview } from "@/components/ImagePreview";
import { Receipt } from "@/components/Receipt";
import { ReceiptAnalysis } from "@/components/ReceiptAnalysis";
import { type ReceiptData, getMockResults } from "./mockResults";

export default function Home() {
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setScannedImages(prev => [...prev, reader.result as string]);
        setReceipts(prev => [...prev, getMockResults()]);
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
            hasImage={scannedImages.length > 0} 
            onCapture={handleImageCapture} 
          />

          {scannedImages.map((image, index) => (
            <div key={index} className="w-full">
              <ImagePreview imageUrl={image} />
              {receipts[index] && (
                <>
                  <Receipt {...receipts[index]} />
                  <ReceiptAnalysis 
                    items={receipts[index].items}
                    total={receipts[index].total}
                    totalSavings={receipts[index].totalSavings}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
