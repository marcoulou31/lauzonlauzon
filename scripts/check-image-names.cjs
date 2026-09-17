/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public");
const IMAGE_EXTENSION = /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i;
const VALID_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/;
const GENERIC_CAMERA_NAME = /^(?:dji|dsc|img|image|photo)(?:-|\d|$)/;
const GENERIC_SEQUENCE_SUFFIX = /-(?:0?[1-9]|[1-9]\d)\.[^.]+$/;

function collectImages(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? collectImages(filePath)
      : IMAGE_EXTENSION.test(entry.name)
        ? [filePath]
        : [];
  });
}

const violations = collectImages(ROOT).flatMap((filePath) => {
  const name = path.basename(filePath);
  const reasons = [];

  if (!VALID_NAME.test(name)) {
    reasons.push("utiliser uniquement des minuscules ASCII et des tirets");
  }
  if (GENERIC_CAMERA_NAME.test(name)) {
    reasons.push("remplacer le nom de caméra par une description");
  }
  if (GENERIC_SEQUENCE_SUFFIX.test(name)) {
    reasons.push("remplacer le numéro de séquence par une description");
  }

  return reasons.length > 0
    ? [{ filePath: path.relative(path.join(ROOT, ".."), filePath), reasons }]
    : [];
});

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(`${violation.filePath}: ${violation.reasons.join("; ")}`);
  }
  process.exitCode = 1;
} else {
  console.log("Nomenclature valide pour toutes les images publiques.");
}
