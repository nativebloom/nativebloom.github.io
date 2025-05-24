// generate-gallery.js
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname);
const OUTPUT = path.join(__dirname, 'gallery.json');
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

async function buildGallery() {
  console.log('Building Gallery Index...');

  const items = [];

  const folders = await fs.promises.readdir(BASE_DIR, { withFileTypes: true });
  for (const dirent of folders) {
    if (!dirent.isDirectory()) continue;
    const folderName = dirent.name;
    const folderPath = path.join(BASE_DIR, folderName);

    console.log('Searching for folder name...');
    let displayName = folderName;
    const nameFilePath = path.join(folderPath, 'NAME.txt');
    if (fs.existsSync(nameFilePath)) {
      displayName = (await fs.promises.readFile(nameFilePath, 'utf8')).trim();
      console.log('Found folder name ' + displayName);
    }

    console.log('Searching for image files...');
    const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
    const images = files
      .filter(f => f.isFile() && IMAGE_EXTS.includes(path.extname(f.name).toLowerCase()))
      .map(f => f.name);
    console.log('Found images ' + images);

    items.push({ folder: folderName, displayName, images });
  }

  // Write JSON with 2-space indentation
  await fs.promises.writeFile(OUTPUT, JSON.stringify(items, null, 2));
  console.log(`gallery.json updated with ${items.length} folders.`);
}

buildGallery().catch(err => {
  console.error('Error generating gallery:', err);
  process.exit(1);
});
