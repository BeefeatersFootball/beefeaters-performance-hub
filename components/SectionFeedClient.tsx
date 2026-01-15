// components/SectionFeedClient.tsx
"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";

export type Resource = {
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

export default function SectionFeedClient({ items }: { items: Resource[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((r) => {
      const haystack = [
        r.title,
        r.description ?? "",
        ...(r.tags ?? []),
      ].join(" ").toLowerCase();

      return haystack.includes(q);
    });
  }, [items, query]);

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources…"
          className="w-full rounded-xl bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none ring-1 ring-white/10 focus:ring-[#C4161C]"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((r) => {
          const href =
            r.type === "video"
              ? r.youtubeUrl || ""
              : r.pdfUrl || "";

          return (
            <ResourceCard
              key={r._id}
              title={r.title}
              description={r.description}
              kind={r.type}
              href={href}
              tags={r.tags}
            />
          );
        })}
      </div>
    </section>
  );
}
