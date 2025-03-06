"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductItem from "./ProductItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

interface ProductListProps {
  selectedCategory: string | null;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length === 0 || searchQuery.length > 1) {
        setDebouncedSearchQuery(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "";

      if (debouncedSearchQuery.length > 1) {
        url = `https://dummyjson.com/products/search?q=${debouncedSearchQuery}`;
      } else if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${ITEMS_PER_PAGE}&skip=${
          (currentPage - 1) * ITEMS_PER_PAGE
        }`;
      } else {
        url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
          (currentPage - 1) * ITEMS_PER_PAGE
        }`;
      }

      const response = await axios.get(url);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const renderPageButton = (pageNum: number) => (
      <Button
        key={pageNum}
        variant={currentPage === pageNum ? "default" : "outline"}
        onClick={() => setCurrentPage(pageNum)}
        disabled={loading || currentPage === pageNum}
        className="min-w-[40px] cursor-pointer dark:bg-slate-950 dark:text-white"
      >
        {pageNum}
      </Button>
    );

    const pages = [];

    pages.push(renderPageButton(1));

    if (currentPage > 3) {
      pages.push(
        <span key="dots1" className="px-2">
          ...
        </span>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(renderPageButton(i));
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="dots2" className="px-2">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  return (
    <Card className="p-0 mt-4 mx-2 md:mr-4">
      <div className="p-4 flex items-center gap-2 border-b">
        <div className="relative w-full max-w-sm">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-8 py-2 rounded-md border focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {[...Array(20)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70px]" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : products.length === 0 && !loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <p
                    className="text-xl font-semibold"
                    style={{
                      background: "linear-gradient(to right, #7F00FF, #00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    No products found
                  </p>
                  <p className="text-gray-500">
                    Try adjusting your search or category filters
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>
              <div className="flex items-center justify-center gap-2">
                {renderPagination()}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
};

export default ProductList;
