export function Footer() {
  return (
    <footer className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>Free JPG to PNG converter</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/prathamdby/jify"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-800"
            >
              github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
