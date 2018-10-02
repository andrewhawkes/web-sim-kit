var ExtPlaneJs = require("extplanejs");
var fs = require("fs");

fs.readFile("./config.json", (error, data) => {
  if (error) throw error;
    
  connectToSimulator(JSON.parse(data));
});

function connectToSimulator(config) {
    var ExtPlane = new ExtPlaneJs({
    host: config.host | "127.0.0.1",
    port: config.port | 51000,
    broadcast: true
});

var subscriptions = config.subscriptions | [];

ExtPlane.on("loaded", () => {
    // The refresh interval
    ExtPlane.client.interval(config.refresh | 0.2);

    // Subscribe to the airspeed
    subscriptions.forEach(subscription => {
      ExtPlane.client.subscribe(subscription.dataref);
    });

    // Handle all data-ref changes
    ExtPlane.on("data-ref", (dataref, value) => {
        console.log(dataref + ": " + value);
    });
});
}
