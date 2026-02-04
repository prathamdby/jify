# Jify

Convert JPG images to PNG format instantly. Free, no signup required.

## Features

- **Batch conversion.** Upload multiple JPGs, convert all at once
- **Resize controls.** Keep original or set custom dimensions
- **Fit modes.** Max (preserve aspect), Crop, or Scale
- **Quality slider.** Balance file size vs image quality (1-100)
- **Strip metadata.** Remove EXIF, color profiles, comments
- **Auto orientation.** Fix rotated images using EXIF data
- **Drag & drop.** Drop files, browse, or paste from clipboard
- **Batch download.** Download all as a zip file

## Tech Stack

- [Next.js 16](https://nextjs.org) with App Router
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Sharp](https://sharp.pixelplumbing.com) for image processing
- [JSZip](https://stuk.github.io/jszip/) for batch downloads
- [Radix UI](https://radix-ui.com) primitives

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to use the converter.

## Project Structure

```
app/
├── page.tsx              # Main page (component composition)
├── layout.tsx            # Root layout with metadata
├── globals.css           # Global styles
└── api/convert/route.ts  # Image conversion API

components/
├── navbar.tsx            # Header navigation
├── hero.tsx              # Hero section
├── converter.tsx         # Main converter with all logic
├── sections.tsx          # Features, Usage, Comparison, FAQ
├── footer.tsx            # Footer
├── info-tooltip.tsx      # Reusable tooltip component
└── ui/                   # shadcn/ui components
```

## API

### POST /api/convert

Converts JPG images to PNG format.

**Request:** `multipart/form-data`

| Field          | Type    | Description                 |
| -------------- | ------- | --------------------------- |
| `image`        | File[]  | JPG/JPEG files to convert   |
| `resizeOption` | string  | `original` or `resize`      |
| `width`        | number  | Target width (if resizing)  |
| `height`       | number  | Target height (if resizing) |
| `fitOption`    | string  | `max`, `crop`, or `scale`   |
| `quality`      | number  | 1-100                       |
| `strip`        | boolean | Remove metadata             |
| `autoOrient`   | boolean | Fix orientation             |

**Response:** `string[]`. Array of base64-encoded PNG images

## License

[MIT](LICENSE)
