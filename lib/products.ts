import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Product {
  id?: string;
  title: string;
  description: string;
  images: string[]; // Changed from single image to array of images
  amazonLink: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: "homeDecor" | "kitchen" | "jewelry" | "accessories";
  createdAt?: Date;
}

export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
};
