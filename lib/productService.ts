import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "./products";

// Fetch all products from Firestore
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Handle backward compatibility: convert old 'image' field to 'images' array
      if (data.image && !data.images) {
        data.images = [data.image];
        delete data.image;
      }

      // Ensure images is always an array
      if (!data.images || !Array.isArray(data.images)) {
        data.images = [];
      }

      return {
        id: doc.id,
        ...data,
      } as Product;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get products grouped by category
export const getProductsByCategory = async () => {
  const products = await getProducts();
  return {
    homeDecor: products.filter((p) => p.category === "homeDecor"),
    kitchen: products.filter((p) => p.category === "kitchen"),
    jewelry: products.filter((p) => p.category === "jewelry"),
    accessories: products.filter((p) => p.category === "accessories"),
  };
};

// Get products for a specific category
export const getProductsForCategory = async (
  category: Product["category"]
): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
};

// Get featured products (first 3 from each category)
export const getFeaturedProducts = async () => {
  const categorized = await getProductsByCategory();
  return {
    homeDecor: categorized.homeDecor.slice(0, 3),
    kitchen: categorized.kitchen.slice(0, 3),
    jewelry: categorized.jewelry.slice(0, 3),
    accessories: categorized.accessories.slice(0, 3),
  };
};

// Add a new product (for admin use)
export const addProduct = async (
  product: Omit<Product, "id" | "createdAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update a product (for admin use)
export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<void> => {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, product);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product (for admin use)
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Category configuration
export const categories = [
  { value: "homeDecor", label: "Home Decor", id: "home-decor" },
  { value: "kitchen", label: "Kitchen Elegance", id: "kitchen" },
  { value: "jewelry", label: "Timeless Jewelry", id: "jewelry" },
  { value: "accessories", label: "Luxe Accessories", id: "accessories" },
] as const;
