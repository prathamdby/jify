import Link from "next/link";

export function Navbar() {
  return (
    <header className="py-4 px-4">
      <div className="mx-auto max-w-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-neutral-800">
          <div className="size-8 rounded bg-neutral-900 flex items-center justify-center">
            <span className="text-white text-sm font-medium">J</span>
          </div>
          <span className="font-medium">jify</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="#features"
            className="hidden sm:inline text-neutral-500 hover:text-neutral-800 underline"
          >
            features
          </a>
          <a
            href="#usage"
            className="hidden sm:inline text-neutral-500 hover:text-neutral-800 underline"
          >
            usage
          </a>
          <a
            href="#faq"
            className="text-neutral-500 hover:text-neutral-800 underline"
          >
            faq
          </a>
          <a
            href="https://github.com/prathamdby/jify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-800 underline"
          >
            github
          </a>
        </nav>
      </div>
    </header>
  );
}
