"use client";
import { useState } from "react";
import ProductList from "./components/ProductList";
import Sidebar from "./layout/Sidebar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full mx-auto mb-4">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="w-full md:h-max">
        <h1 className="mt-4 text-2xl font-bold">Products</h1>
        <ProductList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
