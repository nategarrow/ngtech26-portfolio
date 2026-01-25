export const structure = (S) => S.list().title("Content").items([
    S.listItem()
      .title("Home Page")
      .id("homePage")
      .child(
        S.document()
          .schemaType("homePage")
          .documentId("homePage")
      ),

    S.divider(),

    // Regular document types
    S.documentTypeListItem("project").title("Projects"),
    S.documentTypeListItem("job").title("Jobs"),
    S.documentTypeListItem("testimonial").title("Testimonials"),

    S.divider(),

    S.listItem()
      .title("Site Settings")
      .id("siteSettings")
      .child(
        S.document()
          .schemaType("siteSettings")
          .documentId("siteSettings")
      ),
  ]);