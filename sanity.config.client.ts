"use client";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Beefeaters Football Resource",

  // ✅ IMPORTANT: tells Sanity Studio it is hosted at /studio
  basePath: "/studio",

  projectId,
  dataset,
  apiVersion,

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
