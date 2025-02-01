"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface AnalysisProps {
  items: Array<{
    name: string;
    price: number;
    regularPrice?: number;
  }>;
  total: number;
  totalSavings: number;
}

interface PieClickData {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
  };
}

export function ReceiptAnalysis({ items, total, totalSavings }: AnalysisProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = {
    Meat: ["RIBEYE", "CHKN", "BEEF"],
    Produce: ["CRROT", "SPIN", "TOMATO", "BANANA", "ONION", "APPLES"],
    Snacks: ["GRNLA", "CHOCOLATE"],
    Other: ["EGGS", "KITCHN", "MANDARIN"],
  };

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? items.filter(item =>
        categories[selectedCategory as keyof typeof categories].some(keyword =>
          item.name.includes(keyword)
        )
      )
    : items;

  const sortedItems = [...filteredItems].sort((a, b) => b.price - a.price);

  const categoryData = Object.entries(categories).map(([category, keywords]) => ({
    name: category,
    value: items
      .filter(item => keywords.some(keyword => item.name.includes(keyword)))
      .reduce((sum, item) => sum + item.price, 0),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handlePieClick = (data: PieClickData) => {
    setSelectedCategory(selectedCategory === data.name ? null : data.name);
  };

  return (
    <div className="border rounded-lg p-4 bg-white mt-4">
      <h2 className="text-xl font-semibold mb-6">
        Spending Visualization
        {selectedCategory && (
          <span className="text-sm font-normal ml-2 text-gray-500">
            (Filtering by {selectedCategory})
          </span>
        )}
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Item Prices Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedItems}>
              <XAxis 
                dataKey="name" 
                tick={false}
                label={{ value: 'Items', position: 'bottom' }}
              />
              <YAxis 
                label={{ 
                  value: 'Price ($)', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                labelFormatter={(label) => label.split(' ').slice(0, 2).join(' ')}
              />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">
            Spending by Category (click to filter)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({name, value}) => `${name}: $${value.toFixed(2)}`}
                onClick={handlePieClick}
                className="cursor-pointer"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={selectedCategory && selectedCategory !== entry.name ? 0.5 : 1}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-sm text-gray-600 mt-4">
          <p>Total Spent: ${total.toFixed(2)}</p>
          <p>Total Saved: ${totalSavings.toFixed(2)}</p>
          {selectedCategory && (
            <p>
              Category Total: $
              {categoryData
                .find(cat => cat.name === selectedCategory)
                ?.value.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}