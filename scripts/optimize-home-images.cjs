/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("crypto");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SOLD = process.argv.includes("--sold");
const DATA_CONFIG = path.join(
  ROOT,
  "src",
  "data",
  SOLD ? "soldProperties.ts" : "site.ts",
);
const MANIFEST_PATH = path.join(
  __dirname,
  SOLD ? "sold-image-optimization.json" : "home-image-optimization.json",
);
const APPLY = process.argv.includes("--apply");
const MIN_SAVINGS_RATIO = 0.1;
const MOSAIC_MAX_EDGE = 1920;
const HERO_MAX_EDGE = 3840;
const PRESERVE_MAX_EDGE = 800;

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function hash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { version: 1, files: {} };
    throw error;
  }
}

async function getImagePaths() {
  const source = await fs.readFile(DATA_CONFIG, "utf8");
  const pattern = SOLD
    ? /src:\s*"(\/proprietes-vendues\/[^"\n]+\.(?:jpe?g|png))"/gi
    : /"(\/accueil\/[^"\n]+\.(?:jpe?g))"/gi;
  const referenced = [...source.matchAll(pattern)].map(([, imagePath]) => imagePath);
  const duplicates = referenced.filter(
    (imagePath, index) => referenced.indexOf(imagePath) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(`Duplicate image references: ${[...new Set(duplicates)].join(", ")}`);
  }

  return SOLD
    ? referenced
    : [...referenced, "/propriete-contemporaine-piscine.jpg"];
}

async function makeCandidate(input, maxEdge, metadata) {
  const largestEdge = Math.max(metadata.width ?? 0, metadata.height ?? 0);
  const pipeline = sharp(input).rotate();

  if (largestEdge > maxEdge) {
    pipeline.resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  return pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

async function main() {
  const imagePaths = await getImagePaths();
  const manifest = await readManifest();
  const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "lauzon-images-"));
  let originalTotal = 0;
  let projectedTotal = 0;
  let optimizedCount = 0;
  let unchangedCount = 0;

  try {
    for (const publicPath of imagePaths) {
      const relativePath = publicPath.slice(1);
      const filePath = path.join(ROOT, "public", relativePath);
      let input;

      try {
        input = await fs.readFile(filePath);
      } catch (error) {
        if (error.code === "ENOENT") throw new Error(`Missing image: ${publicPath}`);
        throw error;
      }

      const metadata = await sharp(input).metadata();
      const currentHash = hash(input);
      const previous = manifest.files[publicPath];
      const largestEdge = Math.max(metadata.width ?? 0, metadata.height ?? 0);
      originalTotal += input.length;

      if (previous?.outputHash === currentHash) {
        projectedTotal += input.length;
        unchangedCount += 1;
        console.log(`unchanged  ${publicPath} (${metadata.width}x${metadata.height}, ${formatBytes(input.length)})`);
        continue;
      }

      if (largestEdge <= PRESERVE_MAX_EDGE) {
        projectedTotal += input.length;
        unchangedCount += 1;
        console.log(`preserved  ${publicPath} (${metadata.width}x${metadata.height}, ${formatBytes(input.length)})`);
        continue;
      }

      const maxEdge =
        publicPath === "/propriete-contemporaine-piscine.jpg"
          ? HERO_MAX_EDGE
          : MOSAIC_MAX_EDGE;
      const candidate = await makeCandidate(input, maxEdge, metadata);
      const savingsRatio = 1 - candidate.length / input.length;
      const shouldReplace = savingsRatio >= MIN_SAVINGS_RATIO;
      projectedTotal += shouldReplace ? candidate.length : input.length;

      if (!shouldReplace) {
        unchangedCount += 1;
        console.log(`kept       ${publicPath} (${formatBytes(input.length)}; projected saving ${(savingsRatio * 100).toFixed(1)}%)`);
        continue;
      }

      const candidatePath = path.join(temporaryDirectory, path.basename(filePath));
      await fs.writeFile(candidatePath, candidate);
      const candidateMetadata = await sharp(candidatePath).metadata();
      const swapsDimensions =
        metadata.orientation !== undefined &&
        metadata.orientation >= 5 &&
        metadata.orientation <= 8;
      const orientedWidth = swapsDimensions ? metadata.height : metadata.width;
      const orientedHeight = swapsDimensions ? metadata.width : metadata.height;

      if (
        (candidateMetadata.width ?? Infinity) > (orientedWidth ?? 0) ||
        (candidateMetadata.height ?? Infinity) > (orientedHeight ?? 0)
      ) {
        throw new Error(`Candidate unexpectedly enlarged: ${publicPath}`);
      }

      console.log(
        `${APPLY ? "optimized" : "candidate"}  ${publicPath} (${metadata.width}x${metadata.height} -> ${candidateMetadata.width}x${candidateMetadata.height}, ${formatBytes(input.length)} -> ${formatBytes(candidate.length)}, ${(savingsRatio * 100).toFixed(1)}%)`,
      );

      if (APPLY) {
        const replacementPath = `${filePath}.optimized`;
        await fs.writeFile(replacementPath, candidate);
        await fs.rename(replacementPath, filePath);
        manifest.files[publicPath] = {
          inputHash: currentHash,
          outputHash: hash(candidate),
          width: candidateMetadata.width,
          height: candidateMetadata.height,
          bytesBefore: input.length,
          bytesAfter: candidate.length,
        };
      }

      optimizedCount += 1;
    }

    if (APPLY) {
      await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
    }
  } finally {
    await fs.rm(temporaryDirectory, { recursive: true, force: true });
  }

  const savings = originalTotal - projectedTotal;
  console.log("");
  console.log(`${APPLY ? "Applied" : "Projected"}: ${optimizedCount} optimized, ${unchangedCount} unchanged`);
  console.log(`Total: ${formatBytes(originalTotal)} -> ${formatBytes(projectedTotal)} (${((savings / originalTotal) * 100).toFixed(1)}% smaller)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
