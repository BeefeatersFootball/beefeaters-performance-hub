import { groq } from "next-sanity";

/**
 * Fetch a single Section by slug
 * Used by: app/sections/[slug]/page.tsx
 */
export const sectionBySlugQuery = groq`
  *[_type == "section" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description
  }
`;

/**
 * Fetch all Resources belonging to a Section (by section slug)
 */
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
    pdfUrl,
    tags,
    pinned,
    publishedAt
  }
`;
