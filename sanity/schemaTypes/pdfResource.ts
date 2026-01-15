import { defineType, defineField } from "sanity";

export default defineType({
  name: "pdfResource",
  title: "PDF Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      title: "PDF File",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Sleep & Recovery", value: "sleep" },
          { title: "Nutrition", value: "nutrition" },
          { title: "Brain Performance & Concussion", value: "brain" },
          { title: "Injury Prevention", value: "injury" },
          { title: "Transition Out of Sport", value: "transition" },
          { title: "Additional Supports", value: "supports" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
