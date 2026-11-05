"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "mahallausa",
  title: "MahallaUSA admin",
  basePath: "/admin",
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("MahallaUSA")
          .items([
            S.documentTypeListItem("event").title("Events / Tadbirlar"),
            S.documentTypeListItem("announcement").title("Announcements / Eʼlonlar"),
            S.documentTypeListItem("post").title("News / Yangiliklar"),
          ]),
    }),
  ],
});
