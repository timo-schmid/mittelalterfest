lazy val `microsite` = (project in file("."))
  .settings(
    moduleName := "microsite",
    micrositeName := "Mittelalterfest",
    micrositeDescription := "Männedorf\n14. - 16. August",
    micrositeDocumentationLabelDescription := "Documentation",
    micrositeAuthor := "Timo",
    micrositeTwitterCreator := "@tworrentz",
    micrositePushSiteWith := GitHub4s,
    micrositeGithubToken := sys.env.get("GITHUB_TOKEN"),
    micrositeGithubOwner := "timo-schmid",
    micrositeGithubRepo := "mittelalterfest",
    micrositeBaseUrl := "/mittelalterfest",
    micrositeHomepage := "https://timo-schmid.github.io/mittelalterfest/",
    micrositeGithubLinks := false,
    micrositeGitterChannel := false,
    micrositeTheme := "light",
    micrositePalette := Map(
      "brand-primary"         -> "#013567",
      "brand-secondary"       -> "#009ADA",
      "white-color"           -> "#FFFFFF"
    ),
    micrositeFooterText := None
  )
  .enablePlugins(MicrositesPlugin)
