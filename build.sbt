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
    micrositeTheme := "pattern",
    micrositePalette := Map(
      "brand-primary"     -> "#E05236",
      "brand-secondary"   -> "#3F3242",
      "brand-tertiary"    -> "#2D232F",
      "gray-dark"         -> "#453E46",
      "gray"              -> "#837F84",
      "gray-light"        -> "#E3E2E3",
      "gray-lighter"      -> "#F4F3F4",
      "white-color"       -> "#FFFFFF"
    ),
    micrositeFooterText := Some("Erfreut euch an Brot und Spiel")
  )
  .enablePlugins(MicrositesPlugin)
