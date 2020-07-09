lazy val `microsite` = (project in file("."))
  .settings(
    moduleName := "microsite",
    micrositeName := "Mittelalterfest",
    micrositeDescription := "14. - 16. August"
  )
  .enablePlugins(MicrositesPlugin)
