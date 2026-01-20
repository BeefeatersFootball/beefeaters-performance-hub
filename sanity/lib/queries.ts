import { groq } from "next-sanity";

export const sectionBySlugQuery = groq`
*[_type == "section" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  description
}
`;

export const resourcesBySectionSlugQuery = groq`
*[_type == "resource" && section->slug.current == $slug]
| order(pinned desc, publishedAt desc){
  _id,
  title,
  description,
  type,
  youtubeUrl,

  // ✅ For uploaded PDFs (supports multiple possible field names)
  "pdfUrl": coalesce(
    pdfUrl,
    pdfFile.asset->url,
    pdf.asset->url,
    file.asset->url
  ),

  tags,
  pinned,
  publishedAt
}
`;
