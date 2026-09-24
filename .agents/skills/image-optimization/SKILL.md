---
name: image-optimization
description: >
  Optimize and audit the public images of the site (homepage expertise
  images and sold-property photos). Use when adding, replacing, or
  retouching images under public/accueil or public/proprietes-vendues,
  when files fail the naming check, or when compressing large source
  photos before commit. Covers the Sharp compression scripts, the
  anti-recompression manifest, and the naming convention.
---

# Image optimization

Public images live in `public/`. Two maintenance flows: **naming enforcement**
(always) and **guarded Sharp compression** (on demand, per group).

## Naming convention (enforced)

- Lowercase ASCII kebab-case, descriptive content/location names.
- No camera-generated names (`dji`, `dsc`, `img`, …) and no trailing sequence numbers.
- Enforced by `pnpm images:check-names` (runs automatically via `prebuild`).
- Rule source: `scripts/check-image-names.cjs`.

## Compression scripts

`scripts/optimize-images.cjs` compresses only images **referenced in `src/`**
(unreferenced files and `*-original.*` backups are left untouched), guarded by
`scripts/.image-manifest.json` so re-runs skip already-processed files.

| Command | Effect |
|---|---|
| `pnpm images:home` | Audit `public/accueil` (read-only). |
| `pnpm images:home:apply` | Compress the accueil group + update manifest. |
| `pnpm images:sold` | Audit `public/proprietes-vendues` (read-only). |
| `pnpm images:sold:apply` | Compress the sold group + update manifest. |

Settings: longest edge capped at 2560px, JPEG mozjpeg quality 72, PNG level 9.
A file is never rewritten larger than its source.

## Expected scope (verified)

- `home` = **28** referenced expertise images under `public/accueil` (source ~67 MB).
- `sold` = **45** referenced photos under `public/proprietes-vendues` (source ~117 MB;
  ~8 unreferenced files intentionally untouched).
- Referenced set is derived from string literals in `src/**` (e.g. `siteConfig.expertise`
  in `src/data/site.ts`, `src/data/soldProperties.ts`, page heroes).

## Notes

- Page hero images at the `public/` root (a-propos, calculette, contact, guides,
  proprietes, and the shared `/propriete-contemporaine-piscine.jpg`) are outside both
  groups; add a group in the script if they need the same flow.
- Next serves AVIF/WebP variants automatically (`next.config.ts` `images.formats`); the
  script only shrinks the source files, it does not generate variants.
- After `:apply`, verify pages still load and commit both the images and the updated manifest.
