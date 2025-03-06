"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  name: string;
  slug: string;
  url: string;
};

interface SidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoryChange(category);
    } else if (selectedCategory === category) {
      onCategoryChange(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card className="w-full md:w-[280px] bg-slate-50 dark:bg-slate-950 p-4 h-auto md:h-screen md:sticky md:top-20 overflow-y-auto max-h-[calc(40vh-5rem)] overflow-auto md:max-h-[calc(100vh-5rem)] mt-5">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-2">
        {loading ? (
          <>
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg"
              >
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            ))}
          </>
        ) : (
          categories.map((category) => (
            <div
              key={category.slug}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Checkbox
                id={category.slug}
                checked={selectedCategory === category.slug}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.slug, checked as boolean)
                }
              />
              <label
                htmlFor={category.slug}
                className="text-sm font-medium leading-none cursor-pointer select-none"
              >
                {category.name}
              </label>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default Sidebar;
