# Firebase Data Migration: Single Image to Multiple Images

## Overview

This project has been updated to support multiple images per product instead of a single image. The `Product` interface now uses `images: string[]` instead of `image: string`.

## What Changed

- **Before**: `image: string` - Single image URL
- **After**: `images: string[]` - Array of image URLs

## Backward Compatibility

The application automatically handles backward compatibility:

- If existing products have an `image` field, it will be converted to `images: [image]`
- Products without images will get an empty array `images: []`
- Products already using `images` array will work as expected

## Migration Options

### Option 1: Automatic Migration (Recommended)

The app automatically handles the migration when fetching data. No action needed!

### Option 2: Manual Database Migration

If you want to permanently update your Firebase data structure:

1. **Install ts-node** (if not already installed):

   ```bash
   npm install -g ts-node
   ```

2. **Update Firebase environment variables** in `.env.local`:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Run the migration script**:
   ```bash
   ts-node scripts/migrate-images.ts
   ```

## Adding Multiple Images to Products

### In Firebase Console

1. Go to your Firestore database
2. Find a product document
3. Replace the `image` field with `images` field (array type)
4. Add multiple image URLs to the array:
   ```json
   {
     "images": [
       "https://example.com/image1.jpg",
       "https://example.com/image2.jpg",
       "https://example.com/image3.jpg"
     ]
   }
   ```

### Programmatically

```typescript
import { updateProduct } from "./lib/productService";

// Update a product with multiple images
await updateProduct(productId, {
  images: [
    "https://example.com/front-view.jpg",
    "https://example.com/side-view.jpg",
    "https://example.com/detail-view.jpg",
  ],
});
```

## Features

### Product Detail Page

- **Image Carousel**: Navigate between multiple images with arrow buttons
- **Thumbnail Navigation**: Click thumbnails to jump to specific images
- **Image Counter**: Shows current image position (e.g., "2 / 5")
- **Dot Navigation**: Click dots below main image to navigate

### Product Cards

- **First Image Display**: Product cards show the first image from the array
- **Fallback Handling**: If no images exist, shows placeholder image

## Image Recommendations

- **Format**: JPG or PNG
- **Resolution**: At least 800x800px for detail view
- **Aspect Ratio**: Square (1:1) or product-specific ratios
- **File Size**: Optimize for web (< 200KB per image)
- **Naming**: Use descriptive names (e.g., "product-front.jpg", "product-detail.jpg")

## Troubleshooting

### Images Not Loading

1. Check that image URLs are publicly accessible
2. Verify HTTPS URLs (HTTP may be blocked)
3. Check browser console for CORS errors

### Migration Issues

1. Ensure Firebase credentials are correct
2. Check Firestore security rules allow updates
3. Verify network connection to Firebase

### Data Structure Issues

1. Ensure `images` field is an array in Firestore
2. Check that image URLs are strings
3. Remove any `null` or empty values from the array
