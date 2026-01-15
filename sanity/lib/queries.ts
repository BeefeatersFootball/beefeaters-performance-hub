export const resourcesBySectionSlugQuery = `
*[_type=="resource" && section->slug.current == $slug]
| order(pinned desc, publishedAt desc) {
  _id,
  title,
  description,
  type,
  youtubeUrl,
  "pdfUrl": coalesce(pdfFile.asset->url, externalPdfUrl),
  tags,
  pinned,
  publishedAt
}
`;
