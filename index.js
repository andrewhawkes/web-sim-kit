var ExtPlaneJs = require("extplanejs");

var ExtPlane = new ExtPlaneJs({
    host: "127.0.0.1",
    port: 51000,
    broadcast: true
});

var subscriptions = [{
  name: "airspeed",
  dataref: "sim/cockpit2/gauges/indicators/airspeed_kts_pilot"
}]

ExtPlane.on("loaded", () => {
    // The refresh interval
    ExtPlane.client.interval(1 / 3);

    // Subscribe to the airspeed
    subscriptions.forEach(subscription => {
      ExtPlane.client.subscribe(subscription.dataref);
    });

    // Handle all data-ref changes
    ExtPlane.on("data-ref", (dataref, value) => {
        console.log(dataref + ": " + value);
    });

});
