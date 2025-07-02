"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Star,
  Sparkles,
  Menu,
  X,
  Home,
  ChefHat,
  Gem,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { featuredProducts, Product } from "../data/products";

const navigationItems = [
  { name: "Home Decor", href: "#home-decor", icon: Home },
  { name: "Kitchen Elegance", href: "#kitchen", icon: ChefHat },
  { name: "Timeless Jewelry", href: "#jewelry", icon: Gem },
  { name: "Luxe Accessories", href: "#accessories", icon: ShoppingBag },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Sparkles
                className={`h-8 w-8 transition-all duration-500 ${
                  scrolled ? "text-amber-600" : "text-amber-400"
                } group-hover:rotate-12 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span
              className={`text-2xl font-serif font-bold tracking-wide transition-all duration-500 ${
                scrolled ? "text-gray-900" : "text-white"
              } group-hover:text-amber-600`}
            >
              Veluvia Finds
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 group ${
                    scrolled
                      ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                      : "text-white/90 hover:text-amber-300 hover:bg-white/10"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-xl border border-gray-200/50">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 w-full px-6 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`inline-block h-5 w-5 ${
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

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg bg-white hover:scale-105 transform-gpu"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <Star className="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif font-semibold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            {renderStars(product.rating)}
            <span className="ml-2 text-sm text-gray-500">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="mb-4 flex items-end space-x-2">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-medium text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
          <Link
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:via-amber-600 hover:to-yellow-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-500 group/button shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="tracking-wide">View on Amazon</span>
            <ExternalLink className="ml-3 h-5 w-5 group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function CategorySection({
  title,
  products,
  icon,
  id,
  index,
}: {
  title: string;
  products: Product[];
  icon: React.ReactNode;
  id: string;
  index: number;
}) {
  return (
    <section id={id} className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16 opacity-0 animate-fade-in-up"
          style={{
            animationDelay: `${index * 200}ms`,
            animationFillMode: "forwards",
          }}
        >
          <div className="flex items-center justify-center mb-6 group">
            <div className="relative">
              {icon}
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 ml-4 tracking-wide group-hover:text-amber-700 transition-colors duration-500">
              {title}
            </h2>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, productIndex) => (
            <ProductCard
              key={product.id}
              product={product}
              index={productIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VeluviaFindsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8 animate-fade-in-up-delay-500">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-amber-400 mr-4 animate-spin-slow" />
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-100" />
            </div>
            <span className="text-amber-400 font-semibold tracking-widest uppercase text-lg">
              Curated Excellence
            </span>
          </div>

          <h1 className="luxury-heading ... text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-8 leading-tight animate-fade-in-up-delay-1000 tracking-wide">
            Elevate Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 animate-gradient-x">
              Lifestyle
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-up-delay-1500">
            Discover handpicked luxury finds that transform your everyday
            moments into extraordinary experiences
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:via-amber-600 hover:to-yellow-700 text-white font-semibold px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up-delay-2000"
            onClick={() =>
              document
                .querySelector("#home-decor")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Featured Collection
            <Star className="ml-3 h-6 w-6 animate-pulse" />
          </Button>
        </div>
      </section>

      {/* Featured Collections */}
      <CategorySection
        id="home-decor"
        title="Home Decor"
        products={featuredProducts.homeDecor}
        index={0}
        icon={
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12">
            <Home className="w-6 h-6 text-white" />
          </div>
        }
      />

      <div className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CategorySection
          id="kitchen"
          title="Kitchen Elegance"
          products={featuredProducts.kitchen}
          index={1}
          icon={
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
          }
        />
      </div>

      <CategorySection
        id="jewelry"
        title="Timeless Jewelry"
        products={featuredProducts.jewelry}
        index={2}
        icon={
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12">
            <Gem className="w-6 h-6 text-white" />
          </div>
        }
      />

      <div className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CategorySection
          id="accessories"
          title="Luxe Accessories"
          products={featuredProducts.accessories}
          index={3}
          icon={
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          }
        />
      </div>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6 tracking-wide luxury-heading">
            Stay Updated with Luxury Finds
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Be the first to discover new curated luxury items and exclusive
            collections
          </p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl border border-amber-400 bg-white text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none text-lg font-medium shadow-lg transition-all duration-300 focus:shadow-xl"
              required
            />
            <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer with Amazon Affiliate Disclosure */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6 group">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-amber-600 mr-3 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <span className="text-3xl font-serif font-bold text-gray-900 tracking-wide group-hover:text-amber-600 transition-colors duration-300">
                Veluvia Finds
              </span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Curating exceptional products that elevate your lifestyle and
              bring luxury into your everyday moments.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-12">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-8 mb-8 shadow-lg">
              <h3 className="font-serif font-semibold text-gray-900 mb-4 text-xl">
                Amazon Affiliate Disclosure
              </h3>
              <p className="text-gray-700 leading-relaxed">
                As an Amazon Associate, we earn from qualifying purchases. This
                means that if you click on one of our product links and make a
                purchase on Amazon, we may receive a small commission at no
                additional cost to you. This helps support our website and
                allows us to continue curating luxury finds for you.
              </p>
            </div>

            <div className="text-center text-gray-500">
              <p className="text-lg">
                &copy; {new Date().getFullYear()} Veluvia Finds. All rights
                reserved.
              </p>
              <div className="flex justify-center space-x-8 mt-6">
                {/* Social Icons */}
                <a
                  href="https://instagram.com/youraccount"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg hover:scale-110 hover:shadow-amber-400/50 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 0A5.75 5.75 0 002 7.75m0 8.5A5.75 5.75 0 007.75 22m8.5 0A5.75 5.75 0 0022 16.25m0-8.5A5.75 5.75 0 0016.25 2M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm6.25 1.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@youraccount"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg hover:scale-110 hover:shadow-amber-400/50 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16.5 3v9.25a4.25 4.25 0 11-4.25-4.25h.25V6.5a2.25 2.25 0 104.25 0V3h-2.5z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
