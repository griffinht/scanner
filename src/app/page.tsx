"use client";
import { useState } from "react";
import { ScanButton } from "@/components/ScanButton";
import { ImagePreview } from "@/components/ImagePreview";
import { ScanResults } from "@/components/ScanResults";
import { ReceiptAnalysis } from "@/components/ReceiptAnalysis";

export default function Home() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [results, setResults] = useState<null | {
    storeInfo: {
      name: string;
      location: string;
      phone: string;
    };
    items: Array<{
      name: string;
      price: number;
      quantity?: string;
      pricePerUnit?: string;
      regularPrice?: number;
      savings?: number;
    }>;
    subtotal: number;
    totalSavings: number;
    netSales: number;
    tax: Array<{ rate: number; amount: number }>;
    total: number;
    paymentMethod: string;
    date: string;
  }>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScannedImage(reader.result as string);
        setResults({
          storeInfo: {
            name: "Whole Foods Market",
            location: "3540 Wade Ave, Raleigh, NC 27607",
            phone: "919-828-5805"
          },
          items: [
            {
              name: "BNLS BEEF RIBEYE STEAK S1",
              quantity: "1.1 lb",
              pricePerUnit: "$20.99/lb",
              price: 23.09
            },
            {
              name: "365WFM OG LRG BRWN EGGS",
              price: 6.29
            },
            {
              name: "365WFM CHKN THIGH BS",
              quantity: "1.36 lb",
              pricePerUnit: "$5.49/lb",
              price: 7.47
            },
            {
              name: "OG RAINBOW BB CRROT",
              price: 2.49
            },
            {
              name: "365WFM OG SPRING SPIN MIX",
              price: 2.49
            },
            {
              name: "SNSET CV TOMATO MEDLEY",
              regularPrice: 4.49,
              savings: 1.00,
              price: 3.49
            },
            {
              name: "MANDARIN 3LB",
              regularPrice: 6.49,
              savings: 1.50,
              price: 4.99
            },
            {
              name: "ALEXFF OG GRSSFD WHL KFR",
              regularPrice: 7.99,
              savings: 2.00,
              price: 5.99
            },
            {
              name: "LTTLRDWGN MNKY GRNLA",
              price: 7.39
            },
            {
              name: "BANANA",
              quantity: "1.88 lb",
              pricePerUnit: "$0.55/lb",
              price: 1.03
            },
            {
              name: "RED ONION",
              quantity: "0.66 lb",
              pricePerUnit: "$1.99/lb",
              price: 1.31
            },
            {
              name: "OG COSMIC CRSP APPLES",
              quantity: "0.78 lb",
              pricePerUnit: "$3.99/lb",
              price: 3.11
            },
            {
              name: "CHPLHT DARK CHOCOLATE",
              price: 3.19
            },
            {
              name: "365WFM TALL KITCHN BAGS",
              price: 11.79
            }
          ],
          subtotal: 92.12,
          totalSavings: 4.50,
          netSales: 87.62,
          tax: [
            { rate: 7.25, amount: 1.09 },
            { rate: 2.00, amount: 1.45 }
          ],
          total: 90.16,
          paymentMethod: "Discover (Card ending in 4410)",
          date: "2024-01-20"
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
