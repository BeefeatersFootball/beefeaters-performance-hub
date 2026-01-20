import { groq } from "next-sanity";

export const sectionBySlugQuery = groq`
*[_type == "section" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  description
}
`;

export const resourcesBySectionSlugQuery = groq`
  *[
    _type == "resource" &&
    defined(section) &&
    section->slug.current == $slug
  ]
  | order(pinned desc, publishedAt desc){
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
