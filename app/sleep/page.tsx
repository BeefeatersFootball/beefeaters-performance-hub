// app/sleep/page.tsx
import Link from "next/link";
import { client } from "@/lib/sanity";
import { resourcesBySectionSlugQuery } from "@/lib/queries";
import SectionFeedClient, { type Resource } from "@/components/SectionFeedClient";

export default async function SleepPage() {
  const slug = "sleep";
  const items: Resource[] = await client.fetch(resourcesBySectionSlugQuery, { slug });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
      <header className="mb-8">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold tracking-tight">Sleep &amp; Recovery</h1>
        <p className="mt-2 max-w-xl text-gray-300">
          Resources to support recovery, readiness, and sustainable performance.
        </p>
      </header>

      <SectionFeedClient items={items} />
    </main>
  );
}
