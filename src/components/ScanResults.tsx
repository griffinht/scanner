"use client";

interface Item {
  name: string;
  price: number;
  quantity?: string;
  pricePerUnit?: string;
  regularPrice?: number;
  savings?: number;
}

interface StoreInfo {
  name: string;
  location: string;
  phone: string;
}

interface ReceiptResults {
  storeInfo: StoreInfo;
  items: Item[];
  subtotal: number;
  totalSavings: number;
  netSales: number;
  tax: { rate: number; amount: number }[];
  total: number;
  paymentMethod: string;
  date: string;
}

interface ScanResultsProps {
  results: ReceiptResults;
}

export function ScanResults({ results }: ScanResultsProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{results.storeInfo.name}</h2>
        <p className="text-gray-600 text-sm">{results.storeInfo.location}</p>
        <p className="text-gray-600 text-sm">{results.storeInfo.phone}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Items:</h3>
        <ul className="space-y-2 mb-4">
          {results.items.map((item, index) => (
            <li key={index} className="text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              {item.quantity && (
                <div className="text-gray-500 text-xs">
                  {item.quantity} @ {item.pricePerUnit}
                </div>
              )}
              {item.savings && (
                <div className="text-green-600 text-xs">
                  Savings: -${item.savings.toFixed(2)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${results.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Savings</span>
            <span>-${results.totalSavings.toFixed(2)}</span>
          </div>
          {results.tax.map((tax, index) => (
            <div key={index} className="flex justify-between">
              <span>Tax ({tax.rate}%)</span>
              <span>${tax.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-base pt-2">
            <span>Total</span>
            <span>${results.total.toFixed(2)}</span>
          </div>
          <div className="text-gray-500 text-xs pt-2">
            Paid with {results.paymentMethod}
          </div>
        </div>
      </div>
    </div>
  );
}