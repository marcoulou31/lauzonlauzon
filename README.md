This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SQL Server

The project now includes a reusable SQL Server connection layer for the named connection:

- `LauzonConn`

### Environment variables

For CIQ ETL automation, you can also configure:

```bash
CIQ_FTP_HOST=""
CIQ_FTP_USER=""
CIQ_FTP_PASSWORD=""
CIQ_FTP_DIR=""
CIQ_FTP_SECURE="false"
CIQ_ZIP_DIR=""
CRON_SECRET=""
```

The ETL endpoint is available at:

- `GET /api/tache-ciq` for normal execution
- `GET /api/tache-ciq?dryRun=1` for a dry-run validation without writing to SQL
- `GET /api/tache-ciq?force=1` to replay the latest available CIQ archive

For local testing with the bundled sample data:

```bash
CIQ_ZIP_DIR="$PWD/public/etl" pnpm dev
curl "http://127.0.0.1:3000/api/tache-ciq?dryRun=1"
```

Copy `.env.example` to `.env.local` and set:

```bash
LAUZON_CONNECTION_STRING="Server=..."
CONTACT_FORM_FORMSPARK_ID="zOyTj4RtB"
NEXT_PUBLIC_BOTPOISON_PUBLIC_KEY="pk_a6aae5ef-c4a2-46e7-a8b2-b2eda12e7f8b"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-4SPGD8D0N5"
```

`/.env.local` is ignored by git, so secrets stay local.

For contact submissions, you can override the default Formspark destination with:

```bash
CONTACT_FORM_FORMSPARK_ENDPOINT="https://submit-form.com/yourFormId"
```

## Analytics

Google Analytics 4 is loaded only after explicit cookie consent from the user.

- Use `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` to configure the GA4 measurement ID.
- Consent choice is saved in local storage and can be changed via the footer link.
- Pageviews on client-side navigation are handled by GA4 history tracking (Enhanced Measurement).

To verify locally:

1. Open the site in a new private window.
2. Refuse cookies and confirm no request is sent to `googletagmanager.com`.
3. Accept cookies and confirm `gtag/js?id=...` loads.
4. Navigate between pages and validate events in GA4 DebugView.

### Test endpoints

The connection name is supported through the route handler:

- `GET /api/db/LauzonConn`

Each endpoint opens the SQL Server connection and returns the current server and database name.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
