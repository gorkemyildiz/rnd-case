"use client";
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

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

const ProductItem = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritesString = Cookies.get("favorites") || "[]";
    try {
      const favorites = JSON.parse(favoritesString);
      setIsFavorite(favorites.includes(product.id));
    } catch (error) {
      console.error(error);
    }
  }, [product.id]);

  const toggleFavorite = () => {
    const favoritesString = Cookies.get("favorites") || "[]";
    let favorites = [];

    try {
      favorites = JSON.parse(favoritesString);
    } catch (error) {
      console.error(error);
    }

    if (isFavorite) {
      favorites = favorites.filter((id: number) => id !== product.id);

      toast(`Removed from favorites`, {
        description: (
          <div className="text-white text-xs">
            {product.title} has been removed from your favorites.
          </div>
        ),
        action: {
          label: "Undo",
          onClick: () => {
            const currentFavs = JSON.parse(Cookies.get("favorites") || "[]");
            currentFavs.push(product.id);
            Cookies.set("favorites", JSON.stringify(currentFavs), {
              expires: 30,
            });
            setIsFavorite(true);
          },
        },
        style: {
          color: "white",
          border: "none",
          background: "#ef4444",
        },
      });
    } else {
      favorites.push(product.id);

      toast(`Added to favorites`, {
        description: (
          <div className="text-white text-xs">
            {" "}
            {product.title} has been added to your favorites.
          </div>
        ),
        action: {
          label: "Undo",
          onClick: () => {
            const currentFavs = JSON.parse(Cookies.get("favorites") || "[]");
            const updatedFavs = currentFavs.filter(
              (id: number) => id !== product.id
            );
            Cookies.set("favorites", JSON.stringify(updatedFavs), {
              expires: 30,
            });
            setIsFavorite(false);
          },
        },
        style: {
          background: "#22c55e",
          color: "white",
          border: "none",
        },
      });
    }

    Cookies.set("favorites", JSON.stringify(favorites), { expires: 30 });

    setIsFavorite(!isFavorite);
  };

  return (
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
          {product.rating} <Star size={12} className="stroke-yellow-500" />
        </div>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <Heart
          size={20}
          className={`cursor-pointer hover:fill-red-500 hover:stroke-red-500 ${
            isFavorite ? "fill-red-500 stroke-red-500" : ""
          }`}
          onClick={toggleFavorite}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
