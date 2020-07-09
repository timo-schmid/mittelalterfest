lazy val `microsite` = (project in file("."))
  .settings(
    moduleName := "microsite",
    micrositeName := "Mittelalterfest",
    micrositeDescription := "14. - 16. August",
    micrositePushSiteWith := GitHub4s,
    micrositeGithubToken := sys.env.get("GITHUB_TOKEN"),
    git.remoteRepo := "git@github.com:timo-schmid/mittelalterfest.git"
  )
  .enablePlugins(MicrositesPlugin)
