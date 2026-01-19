import Link from "next/link";
import { client } from "@/lib/sanity";
import { resourcesBySectionSlugQuery, sectionBySlugQuery } from "@/lib/queries";
import SectionFeedClient from "@/components/SectionFeedClient";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  type: "video" | "pdf";
  youtubeUrl?: string;
  pdfUrl?: string;
  tags?: string[];
  pinned?: boolean;
  publishedAt?: string;
};

type Section = {
  title: string;
  slug: string;
  description?: string;
};

export default async function SectionPage(props: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // ✅ Works whether Next gives params as an object or a Promise
  const params = await props.params;
  const slug = params?.slug;

  // ✅ Guard: if slug is missing, don't run GROQ at all
  if (!slug) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Missing section slug</h1>
        <p className="mt-2 text-gray-300">
          The URL is missing a section identifier.
        </p>
      </main>
    );
  }

  // ✅ IMPORTANT: pass { slug } as the second argument
  const section: Section | null = await client.fetch(sectionBySlugQuery, { slug });

  if (!section) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
        <Link href="/" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Section not found</h1>
        <p className="mt-2 text-gray-300">
          This section hasn’t been created in Sanity yet.
        </p>
      </main>
    );
  }

  // ✅ IMPORTANT: pass { slug } here too
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
