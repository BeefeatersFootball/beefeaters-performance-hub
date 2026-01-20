// app/pdf/page.tsx
import Link from "next/link";

export default async function PdfPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string; title?: string }>;
}) {
  const sp = await searchParams;
  const src = sp?.src ? decodeURIComponent(sp.src) : "";
  const title = sp?.title ? decodeURIComponent(sp.title) : "PDF";

  if (!src) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Missing PDF link</h1>
        <p className="mt-2 text-gray-300">
          This PDF doesn’t have a valid file URL.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white">
      <header className="p-6">
        <Link href="javascript:history.back()" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-3 text-xl font-bold">{title}</h1>
        <p className="mt-1 text-xs text-gray-300 break-all">{src}</p>
      </header>

      {/* PDF viewer */}
      <div className="px-4 pb-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <iframe
            src={src}
            title={title}
            className="h-[80vh] w-full"
          />
        </div>
      </div>
    </main>
  );
}
