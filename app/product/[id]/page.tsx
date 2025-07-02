"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getProducts } from "../../../lib/productService";
import { Product } from "../../../lib/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find((p) => p.id === params.id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`inline-block h-6 w-6 ${
            i <= Math.round(rating) ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      );
    }
    return stars;
  };

  // Helper to append affiliate tag
  const getAffiliateLink = (url: string) => {
    if (url.includes("tag=veluviafinds-20")) return url;
    if (url.includes("?")) return url + "&tag=veluviafinds-20";
    return url + "?tag=veluviafinds-20";
  };

  // Helper to get image URLs
  const getImageUrls = (product: Product): string[] => {
    if (!product.images || product.images.length === 0) {
      return ["/placeholder.svg?height=600&width=600"];
    }
    return product.images.filter((img) => img && img.trim() !== "");
  };

  const nextImage = () => {
    if (product) {
      const images = getImageUrls(product);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      const images = getImageUrls(product);
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-3 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const images = getImageUrls(product);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-serif font-bold text-gray-900">
                Veluvia Finds
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <Image
                src={images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg?height=600&width=600";
                }}
              />

              {/* Image Navigation (show only if multiple images) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110 z-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110 z-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Image Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? "bg-amber-600"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Row (show only if multiple images) */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      index === currentImageIndex
                        ? "border-amber-600 ring-2 ring-amber-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=96&width=96";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 luxury-heading leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-8">
                {renderStars(product.rating)}
                <span className="ml-3 text-lg text-gray-600">
                  {product.rating.toFixed(1)} out of 5
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end space-x-3 mb-10">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-medium text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-4xl font-bold text-amber-600">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-green-600 font-semibold">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                  Product Description
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Purchase Button */}
            <div className="space-y-4">
              <Link
                href={getAffiliateLink(product.amazonLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:via-amber-600 hover:to-yellow-700 text-white font-semibold py-6 px-8 rounded-xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span className="tracking-wide">View on Amazon</span>
                  <ExternalLink className="ml-3 h-6 w-6" />
                </Button>
              </Link>

              <p className="text-sm text-gray-500 text-center">
                As an Amazon Associate, we earn from qualifying purchases at no
                extra cost to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
