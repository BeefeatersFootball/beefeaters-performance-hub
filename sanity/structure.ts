// sanity/structure.ts
// Keep this file simple and compatible across Sanity versions.

export const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("section").title("Sections"),
      S.divider(),
      S.documentTypeListItem("videoResource").title("Video Resources"),
      S.documentTypeListItem("pdfResource").title("PDF Resources"),
    ]);
