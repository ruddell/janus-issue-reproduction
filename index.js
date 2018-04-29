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

        var streamId = 12345678;
        console.log(`Creating Stream: ${streamId}`.green);
        plugin
          .create(streamId, {
            is_private: false,
            request: "create",
            data: false,
            audiortpmap: "opus/48000/2",
            description: "Description here",
            video: false,
            type: "rtp",
            audiopt: 97,
            audioport: 34672,
            id: streamId,
            audio: true
          })
          .then(function(response) {
            console.log("Create Stream Response:".green);
            console.log(response.getPluginData());
            console.log("\n");

            plugin.list().then(function(listOfStreams) {
              console.log("List of Streams:".green);
              console.log(listOfStreams.getPluginData());
              console.log("\n");

              console.log(`Destroying Stream: ${streamId}`.green);
              plugin.destroy(streamId).then(function(destroyResponse) {
                // This part is never reached
                console.log("Destroy Stream Response:".green);
                console.log(destroyResponse.getPluginData());
                console.log("\n");
              });
            });
          });
      });
    });
  });
});
