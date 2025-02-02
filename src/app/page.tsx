"use client";
import { useState } from "react";
import { ScanButton } from "@/components/ScanButton";
import { ImagePreview } from "@/components/ImagePreview";
import { ScanResults } from "@/components/ScanResults";
import { ReceiptAnalysis } from "@/components/ReceiptAnalysis";
import { type ReceiptData, getMockResults } from "./mockResults";

export default function Home() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [results, setResults] = useState<ReceiptData | null>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setScannedImage(reader.result as string);
        
        setResults(getMockResults());
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
            hasImage={!!scannedImage} 
            onCapture={handleImageCapture} 
          />

          {scannedImage && (
            <div className="w-full">
              <ImagePreview imageUrl={scannedImage} />
              {results && (
                <>
                  <ScanResults results={results} />
                  <ReceiptAnalysis 
                    items={results.items}
                    total={results.total}
                    totalSavings={results.totalSavings}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
