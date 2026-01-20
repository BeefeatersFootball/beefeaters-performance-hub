"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PdfClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const src = useMemo(() => {
    const raw = sp.get("src") || "";
    return raw ? decodeURIComponent(raw) : "";
  }, [sp]);

  const title = useMemo(() => {
    const raw = sp.get("title") || "PDF";
    return decodeURIComponent(raw);
  }, [sp]);

  const from = useMemo(() => {
    const raw = sp.get("from") || "";
    return raw ? decodeURIComponent(raw) : "";
  }, [sp]);

  if (!src) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Missing PDF link</h1>
        <p className="mt-2 text-gray-300">This PDF doesn’t have a valid file URL.</p>
      </main>
    );
  }

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    if (from) {
      router.push(from);
      return;
    }
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white">
      <header className="p-6 pb-4">
        <button onClick={handleBack} className="text-sm text-gray-300 hover:text-white">
          ← Back
        </button>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold leading-snug">{title}</h1>

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200 hover:bg-white/15"
          >
            Open full screen
          </a>
        </div>
      </header>

      <div className="px-4 pb-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <iframe
            src={src}
            title={title}
            className="w-full"
            style={{
              height: "calc(100vh - 140px)",
              border: 0,
            }}
            allow="fullscreen"
          />
        </div>
      </div>
    </main>
  );
}
