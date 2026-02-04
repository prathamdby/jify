export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl mb-4">Features</h2>
        <div className="space-y-4 text-sm text-neutral-600">
          <p>
            <strong className="text-neutral-800">Batch conversion.</strong>{" "}
            Upload multiple JPGs at once. Convert them all with a single click.
            Download individually or as a zip.
          </p>
          <p>
            <strong className="text-neutral-800">Resize controls.</strong> Keep
            original dimensions or set custom width/height. Choose fit mode: max
            (preserve aspect), crop, or scale.
          </p>
          <p>
            <strong className="text-neutral-800">Quality slider.</strong> Adjust
            output quality from 1-100. Lower values = smaller files. Default is
            75 for a good balance.
          </p>
          <p>
            <strong className="text-neutral-800">Strip metadata.</strong> Remove
            EXIF data, color profiles, and comments. Reduces file size and
            protects privacy.
          </p>
          <p>
            <strong className="text-neutral-800">Auto orientation.</strong>{" "}
            Fixes images that appear rotated. Uses EXIF orientation data to
            correct the display.
          </p>
          <p>
            <strong className="text-neutral-800">No signup.</strong> No
            accounts, no watermarks, no limits. Just convert and download.
          </p>
        </div>
      </div>
    </section>
  );
}

export function UsageSection() {
  return (
    <section id="usage" className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl mb-4">Usage</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-800 mb-2">
              Quick convert
            </h3>
            <pre className="bg-neutral-50 border border-neutral-200 rounded p-3 text-sm overflow-x-auto">
              <code className="text-neutral-700">
                1. Drop JPG files into the upload area{"\n"}
                2. Click &quot;Convert to PNG&quot;{"\n"}
                3. Download your files
              </code>
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-800 mb-2">
              With resize
            </h3>
            <pre className="bg-neutral-50 border border-neutral-200 rounded p-3 text-sm overflow-x-auto">
              <code className="text-neutral-700">
                1. Upload images{"\n"}
                2. Set Resize → Custom{"\n"}
                3. Enter width and height{"\n"}
                4. Choose fit mode (max/crop/scale){"\n"}
                5. Convert and download
              </code>
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-800 mb-2">
              Fit modes
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-baseline gap-2">
                <code className="text-neutral-500">max</code>
                <span className="text-neutral-600">
                  Fit within bounds, preserve aspect ratio
                </span>
                <span className="text-neutral-400 text-xs">(default)</span>
              </li>
              <li className="flex items-baseline gap-2">
                <code className="text-neutral-500">crop</code>
                <span className="text-neutral-600">
                  Fill bounds, trim excess
                </span>
              </li>
              <li className="flex items-baseline gap-2">
                <code className="text-neutral-500">scale</code>
                <span className="text-neutral-600">
                  Stretch to exact dimensions
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl mb-4">JPG vs PNG</h2>
        <div className="space-y-4 text-sm text-neutral-600">
          <p>
            <strong className="text-neutral-800">JPG (JPEG).</strong> Lossy
            compression designed for photos. Smaller file sizes but no
            transparency support. Detail is discarded on each save.
          </p>
          <p>
            <strong className="text-neutral-800">PNG.</strong> Lossless
            compression with transparency support. Larger files but preserves
            exact pixels. Ideal for logos, UI, and graphics with sharp edges.
          </p>
          <p>
            <strong className="text-neutral-800">When to convert.</strong>{" "}
            Convert JPG to PNG when you need transparency, sharper edges, or
            plan to edit the image repeatedly. PNG handles re-saves without
            quality loss.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl mb-4">FAQ</h2>
        <div className="space-y-4 text-sm text-neutral-600">
          <p>
            <strong className="text-neutral-800">
              Does converting restore lost JPG quality?
            </strong>{" "}
            No. JPG is already lossy—conversion to PNG preserves what remains
            but can&apos;t recover discarded detail.
          </p>
          <p>
            <strong className="text-neutral-800">How fast is it?</strong> A few
            seconds per image, depending on size. Results appear instantly for
            download.
          </p>
          <p>
            <strong className="text-neutral-800">Is it free?</strong> Yes. No
            signup, no watermarks, no hidden fees.
          </p>
          <p>
            <strong className="text-neutral-800">Are my files stored?</strong>{" "}
            Files are processed on our server and immediately discarded. We
            don&apos;t store or share your images.
          </p>
          <p>
            <strong className="text-neutral-800">
              Can I use results commercially?
            </strong>{" "}
            Yes. Your converted files are yours to use however you want.
          </p>
        </div>
      </div>
    </section>
  );
}
