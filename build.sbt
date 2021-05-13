lazy val `microsite` = (project in file("."))
  .settings(
    moduleName := "microsite",
    micrositeName := "Mittelalterfest 2021",
    micrositeDescription := "Elgg, 13. - 15. August",
    micrositeDocumentationLabelDescription := "Documentation",
    micrositeAuthor := "Timo",
    micrositeTwitterCreator := "@tworrentz",
    micrositePushSiteWith := GitHub4s,
    micrositeGithubToken := sys.env.get("GITHUB_TOKEN"),
    micrositeGithubOwner := "timo-schmid",
    micrositeGithubRepo := "mittelalterfest",
    micrositeBaseUrl := "/mittelalterfest",
    micrositeDocumentationUrl := "/mittelalterfest/pages",
    micrositeDocumentationLabelDescription := "Programm",
    micrositeHomepage := "https://timo-schmid.github.io/mittelalterfest/",
    micrositeOrganizationHomepage := "https://twitter.com/tworrentz",
    micrositeGithubLinks := false,
    micrositeGitterChannel := false,
    micrositeTheme := "light",
    micrositePalette := Map(
      "brand-primary"         -> "#cd8b62",
      "brand-secondary"       -> "#8a8583",
      "white-color"           -> "#f7efd3"
    ),
    micrositeFooterText := None
  )
  .enablePlugins(MicrositesPlugin)
