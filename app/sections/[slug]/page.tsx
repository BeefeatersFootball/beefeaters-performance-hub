// app/sections/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { resourcesBySectionSlugQuery, sectionBySlugQuery } from "@/lib/queries";
import SectionFeedClient, { type Resource } from "@/components/SectionFeedClient";

type Section = {
  title: string;
  slug: string;
  description?: string;
};

// ✅ Next 16 / App Router safe params typing
export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params so slug is NEVER undefined in prod builds
  const { slug } = await params;

  if (!slug) return notFound();

  const section: Section | null = await client.fetch(sectionBySlugQuery, { slug });

  if (!section) return notFound();

  const items: Resource[] = await client.fetch(resourcesBySectionSlugQuery, { slug });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
      <header className="mb-8">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold tracking-tight">{section.title}</h1>

        <p className="mt-2 max-w-xl text-gray-300">
          {section.description ?? "Explore curated resources for this topic."}
        </p>
      </header>

      <SectionFeedClient items={items} />
    </main>
  );
}
