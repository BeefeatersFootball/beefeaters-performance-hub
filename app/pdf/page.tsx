import { Suspense } from "react";
import PdfClient from "./PdfClient";

export const dynamic = "force-dynamic";

export default function PdfPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            Loading PDF…
          </div>
        </main>
      }
    >
      <PdfClient />
    </Suspense>
  );
}
