// Migration script to convert single 'image' field to 'images' array in Firebase
// Run this script once to update existing data

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

// Firebase configuration - replace with your actual config from lib/firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateImageData() {
  try {
    console.log("🚀 Starting image data migration...");

    const querySnapshot = await getDocs(collection(db, "products"));
    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();

      try {
        // Check if product has old 'image' field and no 'images' field
        if (data.image && !data.images) {
          console.log(`📦 Migrating product: ${data.title}`);

          // Update the document
          await updateDoc(doc(db, "products", docSnap.id), {
            images: [data.image], // Convert single image to array
            image: null, // Remove the old field (set to null to delete)
          });

          migrated++;
          console.log(`✅ Successfully migrated: ${data.title}`);
        } else if (data.images && Array.isArray(data.images)) {
          console.log(`⏭️  Product already migrated: ${data.title}`);
          skipped++;
        } else {
          console.log(
            `⚠️  Product needs manual review: ${data.title} (has neither image nor images field)`
          );
        }
      } catch (error) {
        console.error(`❌ Error migrating product ${data.title}:`, error);
        errors++;
      }
    }

    console.log("🎉 Migration complete!");
    console.log(
      `📊 Results: Migrated: ${migrated}, Skipped: ${skipped}, Errors: ${errors}`
    );
  } catch (error) {
    console.error("💥 Migration failed:", error);
  }
}

// Export the function so it can be called
export { migrateImageData };

// If running directly with ts-node, execute the migration
if (require.main === module) {
  migrateImageData()
    .then(() => {
      console.log("Migration script finished");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration script failed:", error);
      process.exit(1);
    });
}
