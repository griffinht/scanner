export type { StoreInfo, ReceiptItem, TaxInfo, ReceiptData };

type StoreInfo = {
  name: string;
  location: string;
  phone: string;
};

type ReceiptItem = {
  name: string;
  price: number;
  quantity?: string;
  pricePerUnit?: string;
  regularPrice?: number;
  savings?: number;
};

type TaxInfo = {
  rate: number;
  amount: number;
};

type ReceiptData = {
  storeInfo: StoreInfo;
  items: ReceiptItem[];
  subtotal: number;
  totalSavings: number;
  netSales: number;
  tax: TaxInfo[];
  total: number;
  paymentMethod: string;
  date: string;
};

export function getMockResults(): ReceiptData {
  return {
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
  };
}

// You can keep or remove the direct export of results depending on your needs
export const results: ReceiptData = getMockResults();