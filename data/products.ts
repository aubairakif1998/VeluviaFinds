// Product Data for Veluvia Finds
// Add your Amazon affiliate products here, organized by category

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  amazonLink: string;
  price: number;
  discountPrice?: number;
  rating: number;
}

export interface ProductCategories {
  homeDecor: Product[];
  kitchen: Product[];
  jewelry: Product[];
  accessories: Product[];
}

export const featuredProducts: ProductCategories = {
  // HOME DECOR CATEGORY
  homeDecor: [
    {
      id: 1,
      title: "Handcrafted Marble Decorative Bowl",
      description:
        "Elevate your space with this exquisite handcrafted marble bowl, perfect for displaying fruits or as a stunning centerpiece.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example1", // Replace with your affiliate link
      price: 89.99,
      discountPrice: 69.99,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Premium Velvet Throw Pillows Set",
      description:
        "Luxurious velvet throw pillows that add sophistication and comfort to any living space with their rich texture.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example2", // Replace with your affiliate link
      price: 59.99,
      discountPrice: 49.99,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Crystal Table Lamp with Gold Accents",
      description:
        "Illuminate your home with this stunning crystal table lamp featuring elegant gold accents and warm ambient lighting.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example3", // Replace with your affiliate link
      price: 129.99,
      rating: 4.9,
    },
    // ADD MORE HOME DECOR PRODUCTS HERE
    // {
    //   id: 4,
    //   title: "Your Product Title",
    //   description: "Your luxury-focused product description here...",
    //   image: "/placeholder.svg?height=300&width=300", // Replace with actual image URL
    //   amazonLink: "https://amazon.com/dp/YOUR_PRODUCT_ID?tag=YOUR_AFFILIATE_TAG",
    // },
  ],

  // KITCHEN ELEGANCE CATEGORY
  kitchen: [
    {
      id: 4,
      title: "Professional Chef's Knife Set",
      description:
        "Premium forged steel knives with ergonomic handles, designed for culinary excellence and precision cutting.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example4", // Replace with your affiliate link
      price: 149.99,
      discountPrice: 119.99,
      rating: 4.7,
    },
    {
      id: 5,
      title: "Copper Moscow Mule Mugs Set",
      description:
        "Authentic hammered copper mugs that keep drinks perfectly chilled while adding rustic elegance to your bar.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example5", // Replace with your affiliate link
      price: 39.99,
      rating: 4.5,
    },
    {
      id: 6,
      title: "Bamboo Cutting Board Collection",
      description:
        "Sustainable bamboo cutting boards with natural antimicrobial properties, perfect for the eco-conscious chef.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example6", // Replace with your affiliate link
      price: 49.99,
      discountPrice: 39.99,
      rating: 4.4,
    },

    {
      id: 14,
      title: "Professional Chef's Knife Set",
      description:
        "Premium forged steel knives with ergonomic handles, designed for culinary excellence and precision cutting.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example4", // Replace with your affiliate link
      price: 149.99,
      rating: 4.7,
    },
    {
      id: 15,
      title: "Copper Moscow Mule Mugs Set",
      description:
        "Authentic hammered copper mugs that keep drinks perfectly chilled while adding rustic elegance to your bar.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example5", // Replace with your affiliate link
      price: 39.99,
      rating: 4.5,
    },
    {
      id: 16,
      title: "Bamboo Cutting Board Collection",
      description:
        "Sustainable bamboo cutting boards with natural antimicrobial properties, perfect for the eco-conscious chef.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example6", // Replace with your affiliate link
      price: 49.99,
      rating: 4.4,
    },
    // ADD MORE KITCHEN PRODUCTS HERE
    // {
    //   id: 7,
    //   title: "Your Kitchen Product Title",
    //   description: "Your luxury kitchen product description here...",
    //   image: "/placeholder.svg?height=300&width=300", // Replace with actual image URL
    //   amazonLink: "https://amazon.com/dp/YOUR_PRODUCT_ID?tag=YOUR_AFFILIATE_TAG",
    // },
  ],

  // TIMELESS JEWELRY CATEGORY
  jewelry: [
    {
      id: 7,
      title: "Sterling Silver Pearl Necklace",
      description:
        "Timeless elegance meets modern sophistication in this carefully crafted sterling silver necklace with lustrous pearls.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example7", // Replace with your affiliate link
      price: 199.99,
      discountPrice: 159.99,
      rating: 4.9,
    },
    {
      id: 8,
      title: "Rose Gold Diamond Stud Earrings",
      description:
        "Brilliant cut diamonds set in warm rose gold, these earrings add sparkle and refinement to any occasion.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example8", // Replace with your affiliate link
      price: 299.99,
      rating: 4.8,
    },
    {
      id: 9,
      title: "Luxury Watch with Leather Band",
      description:
        "Swiss-inspired timepiece with genuine leather band, combining classic design with modern precision.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example9", // Replace with your affiliate link
      price: 499.99,
      discountPrice: 429.99,
      rating: 4.7,
    },
    // ADD MORE JEWELRY PRODUCTS HERE
    // {
    //   id: 10,
    //   title: "Your Jewelry Product Title",
    //   description: "Your luxury jewelry product description here...",
    //   image: "/placeholder.svg?height=300&width=300", // Replace with actual image URL
    //   amazonLink: "https://amazon.com/dp/YOUR_PRODUCT_ID?tag=YOUR_AFFILIATE_TAG",
    // },
  ],

  // LUXE ACCESSORIES CATEGORY
  accessories: [
    {
      id: 10,
      title: "Italian Leather Handbag",
      description:
        "Handcrafted from the finest Italian leather, this handbag combines functionality with timeless style.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example10", // Replace with your affiliate link
      price: 249.99,
      discountPrice: 199.99,
      rating: 4.8,
    },
    {
      id: 11,
      title: "Silk Scarf Collection",
      description:
        "Luxurious silk scarves with hand-painted designs, perfect for adding a touch of elegance to any outfit.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example11", // Replace with your affiliate link
      price: 79.99,
      rating: 4.6,
    },
    {
      id: 12,
      title: "Premium Sunglasses with Case",
      description:
        "Designer-inspired sunglasses with UV protection and a sophisticated aesthetic, complete with luxury case.",
      image: "/placeholder.svg?height=300&width=300",
      amazonLink: "https://amazon.com/dp/example12", // Replace with your affiliate link
      price: 129.99,
      discountPrice: 99.99,
      rating: 4.5,
    },
    // ADD MORE ACCESSORIES HERE
    // {
    //   id: 13,
    //   title: "Your Accessory Product Title",
    //   description: "Your luxury accessory product description here...",
    //   image: "/placeholder.svg?height=300&width=300", // Replace with actual image URL
    //   amazonLink: "https://amazon.com/dp/YOUR_PRODUCT_ID?tag=YOUR_AFFILIATE_TAG",
    // },
  ],
};

// CATEGORY CONFIGURATION
// You can modify these category settings
export const categoryConfig = {
  homeDecor: {
    title: "Home Decor",
    id: "home-decor",
    description:
      "Transform your living space with curated luxury home decor pieces",
  },
  kitchen: {
    title: "Kitchen Elegance",
    id: "kitchen",
    description: "Premium kitchen essentials for the discerning chef",
  },
  jewelry: {
    title: "Timeless Jewelry",
    id: "jewelry",
    description:
      "Exquisite jewelry pieces that define elegance and sophistication",
  },
  accessories: {
    title: "Luxe Accessories",
    id: "accessories",
    description: "Sophisticated accessories to complete your luxury lifestyle",
  },
};

// HELPER FUNCTIONS
export const getAllProducts = (): Product[] => {
  return [
    ...featuredProducts.homeDecor,
    ...featuredProducts.kitchen,
    ...featuredProducts.jewelry,
    ...featuredProducts.accessories,
  ];
};

export const getProductsByCategory = (
  category: keyof ProductCategories
): Product[] => {
  return featuredProducts[category] || [];
};

export const getProductById = (id: number): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find((product) => product.id === id);
};
