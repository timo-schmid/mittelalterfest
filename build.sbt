lazy val `microsite` = (project in file("."))
  .settings(moduleName := "microsite")
  .enablePlugins(MicrositesPlugin)
