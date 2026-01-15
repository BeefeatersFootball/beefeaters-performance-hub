export const sectionBySlugQuery = `
*[_type == "section" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  description
}
`;

export const resourcesBySectionSlugQuery = `
*[_type == "resource" && section->slug.current == $slug]
| order(coalesce(pinned,false) desc, _createdAt desc) {
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
