import { defineConfig } from "sanity";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Beefeaters Football Resource",
  projectId,
  dataset,
  apiVersion,

  plugins: [structure],

  schema: {
    types: schemaTypes,
  },
});
