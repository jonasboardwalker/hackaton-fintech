const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

async function generateIcons() {
  try {
    // Create the icons directory if it doesn't exist
    const iconsDir = path.join(__dirname, "../public/icons");
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Load the SVG
    const svgPath = path.join(__dirname, "../public/icons/icon.svg");
    const svgBuffer = fs.readFileSync(svgPath);

    // Create a data URL from the SVG
    const svgDataUrl = `data:image/svg+xml;base64,${svgBuffer.toString("base64")}`;

    // Load the SVG as an image
    const image = await loadImage(svgDataUrl);

    // Generate 192x192 icon
    const canvas192 = createCanvas(192, 192);
    const ctx192 = canvas192.getContext("2d");
    ctx192.drawImage(image, 0, 0, 192, 192);
    const buffer192 = canvas192.toBuffer("image/png");
    fs.writeFileSync(path.join(iconsDir, "icon-192x192.png"), buffer192);

    // Generate 512x512 icon
    const canvas512 = createCanvas(512, 512);
    const ctx512 = canvas512.getContext("2d");
    ctx512.drawImage(image, 0, 0, 512, 512);
    const buffer512 = canvas512.toBuffer("image/png");
    fs.writeFileSync(path.join(iconsDir, "icon-512x512.png"), buffer512);

    console.log("Icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
