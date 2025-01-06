import fs from "fs";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/images/extracted_frames");

  try {
    // Read the files in the directory
    const files = fs.readdirSync(imagesDir).filter((file) =>
      /\.(png|jpe?g|svg)$/.test(file)
    );

    // Generate public URLs for each file
    const imageUrls = files.sort().map((file) => `/images/extracted_frames/${file}`);

    return new Response(JSON.stringify(imageUrls), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load images" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
