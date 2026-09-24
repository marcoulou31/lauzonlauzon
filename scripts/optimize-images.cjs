// Compression guardée des images publiques (Sharp).
// Deux groupes scopés par dossier ; seules les images RÉFÉRENCÉES dans src/ sont
// touchées. Audit par défaut ; --apply écrit. Le manifeste évite les recompressions.
//   node scripts/optimize-images.cjs <home|sold> [--apply]

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(ROOT, "src");
const MANIFEST = path.join(__dirname, ".image-manifest.json");

const MAX_EDGE = 2560; // px : suffisant pour le rendu rétina, coupe les JPEG plein capteur.
const JPEG_QUALITY = 72;

const GROUPS = {
  home: { label: "accueil", dir: path.join(PUBLIC, "accueil") },
  sold: { label: "propriétés vendues", dir: path.join(PUBLIC, "proprietes-vendues") },
};

const IMAGE_EXTENSION = /\.(?:jpe?g|png)$/i;
const ORIGINAL_BACKUP = /-original\.[^.]+$/i;

function fail(message) {
  console.error(message);
  process.exit(1);
}

// Chemins publics (/...) littéralement référencés dans le code source.
function collectReferencedPaths() {
  const referenced = new Set();
  const pattern = /["'`](\/[^"'`\s]+?\.(?:jpe?g|png))["'`]/gi;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(?:tsx?|jsx?|mjs|cjs)$/.test(entry.name)) {
        const text = fs.readFileSync(full, "utf8");
        for (const match of text.matchAll(pattern)) {
          referenced.add(match[1]);
        }
      }
    }
  };
  walk(SRC);
  return referenced;
}

function collectImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectImages(full);
    return IMAGE_EXTENSION.test(entry.name) && !ORIGINAL_BACKUP.test(entry.name)
      ? [full]
      : [];
  });
}

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

function humanBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

async function compress(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const pipeline = sharp(filePath).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });
  return ext === ".png"
    ? pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
}

async function main() {
  const groupKey = process.argv[2];
  const apply = process.argv.includes("--apply");
  const group = GROUPS[groupKey];
  if (!group) fail(`Groupe inconnu : « ${groupKey ?? ""} ». Utiliser home ou sold.`);

  const referenced = collectReferencedPaths();
  const manifest = loadManifest();
  const groupManifest = manifest[groupKey] ?? {};

  const targets = collectImages(group.dir).filter((filePath) => {
    const publicPath = "/" + path.relative(PUBLIC, filePath).split(path.sep).join("/");
    return referenced.has(publicPath);
  });

  let originalTotal = 0;
  let processedTotal = 0;
  let touched = 0;
  let skipped = 0;

  for (const filePath of targets) {
    const relative = path.relative(ROOT, filePath);
    const stat = fs.statSync(filePath);
    originalTotal += stat.size;

    const record = groupManifest[relative];
    const alreadyDone =
      record && record.processedSize === stat.size && record.mtimeMs === stat.mtimeMs;

    if (alreadyDone) {
      processedTotal += stat.size;
      skipped += 1;
      continue;
    }

    if (!apply) {
      console.log(`À compresser : ${relative} (${humanBytes(stat.size)})`);
      touched += 1;
      continue;
    }

    const buffer = await compress(filePath);
    if (buffer.length >= stat.size) {
      // Déjà optimale : ne pas gonfler le fichier, on l'enregistre tel quel.
      groupManifest[relative] = { processedSize: stat.size, mtimeMs: stat.mtimeMs };
      processedTotal += stat.size;
      skipped += 1;
      continue;
    }

    fs.writeFileSync(filePath, buffer);
    const after = fs.statSync(filePath);
    groupManifest[relative] = { processedSize: after.size, mtimeMs: after.mtimeMs };
    processedTotal += after.size;
    touched += 1;
    console.log(
      `${relative} : ${humanBytes(stat.size)} → ${humanBytes(after.size)} ` +
        `(-${(100 - (after.size / stat.size) * 100).toFixed(0)}%)`,
    );
  }

  if (apply) {
    manifest[groupKey] = groupManifest;
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  }

  const mode = apply ? "Appliqué" : "Audit";
  console.log(
    `\n[${mode}] Groupe ${group.label} : ${targets.length} image(s) référencée(s), ` +
      `${touched} traitée(s), ${skipped} inchangée(s).`,
  );
  if (apply) {
    console.log(
      `Total après : ${humanBytes(processedTotal)} (source ${humanBytes(originalTotal)}).`,
    );
  } else {
    console.log(`Poids source actuel : ${humanBytes(originalTotal)}.`);
    if (touched > 0) console.log("Relancer avec :apply pour compresser.");
  }
}

main().catch((error) => fail(String(error?.stack ?? error)));
