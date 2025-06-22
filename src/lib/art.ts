'use server';

import fs from 'fs/promises'; // Use promises version for async/await
import path from 'path';
import sharp from 'sharp';

const artDirectory = path.join(process.cwd(), 'public', 'art');

export type ImageData = {
  src: string;
  alt: string;
  blurDataURL?: string; // Add blurDataURL
};

export async function getArtImages() {
  const fileNames = await fs.readdir(artDirectory); // Use await for fs.readdir

  const imagePromises = fileNames
    .filter((fileName) => /\.(jpg|jpeg|png|gif)$/i.test(fileName))
    .map(async (fileName) => {
      const filePath = path.join(artDirectory, fileName);
      const buffer = await fs.readFile(filePath); // Read file as buffer

      // Generate blurDataURL
      const blurDataURL = await sharp(buffer)
        .resize(10, 10) // Resize to a tiny image
        .toBuffer()
        .then(buffer => `data:image/png;base64,${buffer.toString('base64')}`)
        .catch(() => undefined); // Handle errors gracefully

      return {
        src: `/art/${fileName}`,
        alt: path.parse(fileName).name.replace(/[-_]/g, ' '),
        blurDataURL,
      };
    });

  const images = await Promise.all(imagePromises);
  return images;
}
