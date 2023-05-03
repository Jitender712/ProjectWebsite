const Inert = require("inert"),
  Vision = require("vision"),
  HapiSwagger = require("hapi-swagger"),
  Pack = require("../package"),
  // goodConsole = require('./goodConsole'),
  swaggerOptions = {
    schemes: ["http", "https"],
    info: { title: "LDT Taxi", version: Pack.version },
    basePath: "/",
    pathPrefixSize: 2,
    documentationPath : "/documentation",
    
  },
  authToken = require("./auth-Token");



module.exports = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: authToken,
    name: authToken.plugin.name,
  },
  // {
  //   plugin: goodConsole,
  //   name: goodConsole.plugin.name
  // }
];
