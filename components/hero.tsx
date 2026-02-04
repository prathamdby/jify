import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="px-4 pt-12 pb-8">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-600">
          <span>Free, no signup required</span>
          <ChevronRight className="size-3" />
        </div>
        <h1 className="text-2xl leading-tight mb-4">
          Convert JPG to PNG Instantly
        </h1>
        <p className="text-neutral-600 mb-3">
          Drop your JPG files and get crisp, lossless PNGs. Resize, strip
          metadata, or fix orientation, all in one click.
        </p>
        <p className="text-neutral-500 mb-6">
          Supports batch conversion. Quality controls. No watermarks. Files
          processed securely.
        </p>
      </div>
    </section>
  );
}
