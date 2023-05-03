const Hapi = require("@hapi/hapi"),
  Plugins = require("./plugins"),
  route = require("./app/routes"),
  mongoose = require("mongoose"),
  config = require("config"),
  logger = require("./logger");

const server = new Hapi.server({
  port: config.get("port"),
  routes: {
    cors: true,
  },
});
  (async () => {
    mongoose.connect(config.get("dbURL"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: false,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("error", function (err) {
      logger.logError("Server Initiation", "Database Connection Error", err);
      logger.logError("Server Initiation", "Exiting Process");
      process.exit();
    });

    mongoose.connection.on("open", () => {
      logger.logSuccess("Server Initiation", "Database Connected Successfully");
    });
    // Integrating Plugins
    await server.register(Plugins);

    // Adding Routes
    await server.route(route);

    // Starting Server
    await server.start();
    logger.logSuccess(
      "Server Initiation",
      "Server Connected Successfully at port",
      config.get("port")
    );
  })();
