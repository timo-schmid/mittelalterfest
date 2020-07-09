lazy val `microsite` = (project in file("."))
  .settings(
    moduleName := "microsite",
    micrositeName := "Mittelalterfest",
    micrositeDescription := "14. - 16. August",
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
      "brand-primary"         -> "#475c6c",
      "brand-secondary"       -> "#cd8b62",
      "brand-tertiary"        -> "#8a8583",
      "white-color"           -> "#f7efd3"
    ),
    micrositeFooterText := "Erfreut euch an Brot und Spiel"
  )
  .enablePlugins(MicrositesPlugin)
