"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoritesString = Cookies.get("favorites") || "[]";
    try {
      const favoriteIds = JSON.parse(favoritesString);
      setFavorites(favoriteIds);

      if (favoriteIds.length > 0) {
        fetchFavoriteProducts(favoriteIds);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  const fetchFavoriteProducts = async (ids: number[]) => {
    setLoading(true);
    try {
      const productPromises = ids.map((id) =>
        axios.get(`https://dummyjson.com/products/${id}`)
      );

      const responses = await Promise.all(productPromises);
      const favoriteProducts = responses.map((response) => response.data);

      setProducts(favoriteProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (productId: number) => {
    const productToRemove = products.find(
      (product) => product.id === productId
    );
    const updatedFavorites = favorites.filter((id) => id !== productId);
    setFavorites(updatedFavorites);

    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);

    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 30 });

    if (productToRemove) {
      toast(`Removed from favorites`, {
        description: (
          <div className="text-white text-xs">
            {productToRemove.title} has been removed from your favorites.
          </div>
        ),
        action: {
          label: "Undo",
          onClick: () => {
            const currentFavs = JSON.parse(Cookies.get("favorites") || "[]");
            currentFavs.push(productId);
            Cookies.set("favorites", JSON.stringify(currentFavs), {
              expires: 30,
            });

            setFavorites([...updatedFavorites, productId]);
            setProducts([...updatedProducts, productToRemove]);
          },
        },
        style: {
          color: "white",
          border: "none",
          background: "#ef4444",
        },
      });
    }
  };

  return (
    <div className="w-full p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Favorite Products</h1>

      {loading ? (
        <Card className="p-0">
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
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-12 w-12 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : favorites.length === 0 ? (
        <Card className="p-6 text-center">
          <p>You {"haven't"} added any products to your favorites yet.</p>
        </Card>
      ) : (
        <Card className="p-0">
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={50}
                      height={50}
                      objectFit="cover"
                      quality={50}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 items-center">
                      {product.rating}{" "}
                      <Star size={12} className="stroke-yellow-500" />
                    </div>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Heart
                      size={20}
                      className="cursor-pointer fill-red-500 stroke-red-500 hover:fill-transparent"
                      onClick={() => removeFavorite(product.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
