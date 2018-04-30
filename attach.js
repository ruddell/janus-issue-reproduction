var Janus = require("janus-gateway-js");
var colors = require("colors");

var janusIp = "paste ip here";
var janus = new Janus.Client(`ws://${janusIp}:8188`, {
  //   token: 'token',
  //   apisecret: "apisecret"
});

janus.createConnection("id").then(function(connection) {
  //   connection.one
  connection.on("error", err => {
    console.error("There was an error".red);
    console.error(err);
  });
  connection.on("close", () => {
    console.error("WebSocket closed!".red);
    // process.exit(1);
  });
  connection.createSession().then(function(session) {
    session.attachPlugin("janus.plugin.streaming").then(function(plugin) {
      //   console.log(plugin)
      plugin.list().then(function(listOfStreams) {
        console.log("List of Streams:".green);
        console.log(listOfStreams.getPluginData());
        console.log("\n");
      });
    });
  });
});
