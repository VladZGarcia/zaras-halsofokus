import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const imageDir = 'public/pictures';
const quality = 80;

async function optimizeSingleImage(imagePath) {
  const parsedPath = path.parse(imagePath);
  const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

  try {
    console.log(`Converting ${imagePath} to WebP...`);
    await sharp(imagePath)
      .webp({ quality })
      .toFile(webpPath);
    console.log(`Successfully converted to ${webpPath}`);
  } catch (err) {
    console.error(`Error converting ${imagePath}:`, err);
  }
}

async function optimizeAllImages() {
  console.log('Starting image optimization...');

  // Find all jpg, jpeg, png, and avif images
  const images = await glob(`${imageDir}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,avif,AVIF}`);

  if (images.length === 0) {
    console.log('No new JPG, JPEG, PNG, or AVIF images to optimize.');
  } else {
    for (const imagePath of images) {
      await optimizeSingleImage(imagePath);
    }
  }

  // Find and re-compress all webp images
  const webpImages = await glob(`${imageDir}/**/*.webp`);

  if (webpImages.length === 0) {
    console.log('No WebP images to re-compress.');
  } else {
    for (const imagePath of webpImages) {
      try {
        console.log(`Re-compressing ${imagePath}...`);
        const buffer = await fs.readFile(imagePath);
        await sharp(buffer)
          .webp({ quality })
          .toFile(imagePath);
        console.log(`Successfully re-compressed ${imagePath}`);
      } catch (err) {
        console.error(`Error re-compressing ${imagePath}:`, err);
      }
    }
  }

  console.log('Image optimization complete.');
}

// Check for a command-line argument
const imageToConvert = process.argv[2];

if (imageToConvert) {
  optimizeSingleImage(imageToConvert);
} else {
  optimizeAllImages();
}

