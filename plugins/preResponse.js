exports.plugin = {
  async register(server, options) {
    server.ext("onPreResponse", async (request, h) => {
      const { response } = request;

      if (response.isBoom) {
        response.output.headers["Access-Control-Allow-Credentials"] = "true";
        response.output.headers["Access-Control-Allow-Origins"] = "true";
        response.output.headers["Access-Control-Allow-Methods"] =
          "GET,POST,PUT,DELETE";
      } else {
        response.header("Access-Control-Allow-Credentials", "true");
        response.header("Access-Control-Allow-Origins", "true");
        response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      }

      return h.continue;
    });
  },
  name: "cors",
};
