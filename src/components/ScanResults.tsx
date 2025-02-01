"use client";

interface ScanResultsProps {
  results: {
    total: string;
    date: string;
    items: Array<{ name: string; price: string }>;
  };
}

export function ScanResults({ results }: ScanResultsProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      <p className="text-gray-600 mb-1">Date: {results.date}</p>
      <p className="text-xl font-bold mb-3">Total: {results.total}</p>
      
      <h3 className="font-medium mb-2">Items:</h3>
      <ul className="space-y-1">
        {results.items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}