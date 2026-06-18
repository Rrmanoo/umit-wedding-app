import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  nitro: true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  plugins: [
    {
      name: "local-asset-proxy",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith("/__l5e/assets-v1/")) {
            const parts = req.url.split("/");
            const filenameWithQuery = parts[parts.length - 1];
            const filename = filenameWithQuery.split("?")[0];
            const requestedBase = path.basename(filename, path.extname(filename));

            const assetDir = path.join(__dirname, "src/assets");
            try {
              if (fs.existsSync(assetDir)) {
                const files = fs.readdirSync(assetDir);
                const matchedFile = files.find((f) => {
                  const base = path.basename(f, path.extname(f));
                  return (
                    base.toLowerCase() === requestedBase.toLowerCase() &&
                    !f.endsWith(".asset.json")
                  );
                });

                if (matchedFile) {
                  const filePath = path.join(assetDir, matchedFile);
                  const content = fs.readFileSync(filePath);
                  const ext = path.extname(matchedFile).toLowerCase();
                  const mimeTypes: Record<string, string> = {
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".jpeg": "image/jpeg",
                    ".webp": "image/webp",
                    ".svg": "image/svg+xml",
                    ".mp3": "audio/mpeg",
                  };
                  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
                  res.end(content);
                  return;
                }
              }
            } catch (err) {
              console.error("Error serving local asset proxy:", err);
            }
          }
          next();
        });
      },
    },
  ],
});

