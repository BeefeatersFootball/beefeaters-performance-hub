import { defineType, defineField } from "sanity";

export default defineType({
  name: "videoResource",
  title: "Video Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Embed URL",
      type: "url",
      description: "Use the embed format: https://www.youtube.com/embed/VIDEO_ID",
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
