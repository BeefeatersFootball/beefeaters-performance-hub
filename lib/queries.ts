// lib/queries.ts
import { groq } from "next-sanity";

export const resourcesBySectionSlugQuery = groq`
  *[_type == "resource" && section->slug.current == $slug]
  | order(pinned desc, publishedAt desc) {
    _id,
    title,
    description,
    type,
    youtubeUrl,
    "pdfUrl": pdf.asset->url,
    tags,
    pinned,
    publishedAt
  }
`;
