"use client";
import { useState } from "react";
import { ScanButton } from "@/components/ScanButton";
import { ImagePreview } from "@/components/ImagePreview";
import { ScanResults } from "@/components/ScanResults";

export default function Home() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [results, setResults] = useState<null | {
    total: string;
    date: string;
    items: Array<{ name: string; price: string }>;
  }>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScannedImage(reader.result as string);
        setResults({
          total: "$42.50",
          date: "2024-01-20",
          items: [
            { name: "Milk", price: "$4.99" },
            { name: "Bread", price: "$3.50" },
            { name: "Eggs", price: "$6.99" },
            { name: "Coffee", price: "$12.99" },
            { name: "Fruits", price: "$14.03" },
          ],
        });
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
              {results && <ScanResults results={results} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
