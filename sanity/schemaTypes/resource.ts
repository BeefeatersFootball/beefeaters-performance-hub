import { defineType, defineField } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resources",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "reference",
      to: [{ type: "section" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "PDF", value: "pdf" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL (for Video)",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File (upload)",
      type: "file",
      options: { accept: "application/pdf" },
      hidden: ({ parent }) => parent?.type !== "pdf",
    }),
    defineField({
      name: "externalPdfUrl",
      title: "External PDF URL (optional)",
      type: "url",
      description: "Use if you are hosting the PDF elsewhere instead of uploading.",
      hidden: ({ parent }) => parent?.type !== "pdf",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "pinned",
      title: "Pin to top",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Pinned first, newest",
      name: "pinnedNewest",
      by: [
        { field: "pinned", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});
