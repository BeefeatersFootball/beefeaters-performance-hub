// components/ResourceCard.tsx
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  kind: "video" | "pdf";
  href: string;
  tags?: string[];
  from?: string; // ✅ new
};

export function ResourceCard({ title, description, kind, href, tags, from }: Props) {
  const icon = kind === "video" ? "🎥" : "📄";
  const label = kind === "video" ? "Video" : "PDF";
  const isPdf = kind === "pdf";

  const internalPdfHref = `/pdf?src=${encodeURIComponent(href)}&title=${encodeURIComponent(
    title
  )}${from ? `&from=${encodeURIComponent(from)}` : ""}`;

  const CardInner = (
    <div className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#C4161C] hover:bg-white/10">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
              {label}
            </span>
          </div>

          {description ? (
            <p className="mt-2 text-sm text-gray-300">{description}</p>
          ) : null}

          {tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <span className="text-[#C4161C] text-xl opacity-0 transition group-hover:opacity-100">
          →
        </span>
      </div>
    </div>
  );

  // PDF: internal route (same tab)
  if (isPdf) {
    return href ? (
      <Link href={internalPdfHref}>{CardInner}</Link>
    ) : (
      <div className="opacity-60">{CardInner}</div>
    );
  }

  // Video: external new tab
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {CardInner}
    </a>
  ) : (
    <div className="opacity-60">{CardInner}</div>
  );
}
