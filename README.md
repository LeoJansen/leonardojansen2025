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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
## Media for VideoText

The hero uses a video texture for animated text. To enable it:

- Place a supported video in `public/` (for example `public/intro.mp4`). Prefer MP4 (H.264 + AAC) or WebM (VP8/VP9).
- Pass the path as an absolute URL from the public folder (e.g. `/intro.mp4`) to `VideoText` via the `videoSrc` prop.
- If no `videoSrc` is provided or the source is unsupported/missing, the component falls back to a plain material without video.

Notes:
- Autoplay requires the video to be muted and `playsInline` (handled in the component).
- If you see `NotSupportedError: Failed to load because no supported source was found.`, verify the file exists under `/public`, the path is correct, and the codec is supported by your browser.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
